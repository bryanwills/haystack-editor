/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as dom from 'vs/base/browser/dom';
import { Button } from 'vs/base/browser/ui/button/button';
import { toAction } from 'vs/base/common/actions';
import { CancellationToken } from 'vs/base/common/cancellation';
import { toErrorMessage } from 'vs/base/common/errorMessage';
import { isCancellationError } from 'vs/base/common/errors';
import { Event } from 'vs/base/common/event';
import { Disposable, MutableDisposable, toDisposable } from 'vs/base/common/lifecycle';
import 'vs/css!./postEditWidget';
import { ContentWidgetPositionPreference, ICodeEditor, IContentWidget, IContentWidgetPosition } from 'vs/editor/browser/editorBrowser';
import { IBulkEditResult, IBulkEditService } from 'vs/editor/browser/services/bulkEditService';
import { Range } from 'vs/editor/common/core/range';
import { DocumentDropEdit, DocumentPasteEdit } from 'vs/editor/common/languages';
import { TrackedRangeStickiness } from 'vs/editor/common/model';
import { createCombinedWorkspaceEdit } from 'vs/editor/contrib/dropOrPasteInto/browser/edit';
import { localize } from 'vs/nls';
import { IContextKey, IContextKeyService, RawContextKey } from 'vs/platform/contextkey/common/contextkey';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { INotificationService } from 'vs/platform/notification/common/notification';


interface EditSet<Edit extends DocumentPasteEdit | DocumentDropEdit> {
	readonly activeEditIndex: number;
	readonly allEdits: ReadonlyArray<Edit>;
}

interface ShowCommand {
	readonly id: string;
	readonly label: string;
}

class PostEditWidget<T extends DocumentPasteEdit | DocumentDropEdit> extends Disposable implements IContentWidget {
	private static readonly baseId = 'editor.widget.postEditWidget';

	readonly allowEditorOverflow = true;
	readonly suppressMouseDown = true;

	private domNode!: HTMLElement;
	private button!: Button;

	private readonly visibleContext: IContextKey<boolean>;

	constructor(
		private readonly typeId: string,
		private readonly editor: ICodeEditor,
		visibleContext: RawContextKey<boolean>,
		private readonly showCommand: ShowCommand,
		private readonly range: Range,
		private readonly edits: EditSet<T>,
		private readonly onSelectNewEdit: (editIndex: number) => void,
		@IContextMenuService private readonly _contextMenuService: IContextMenuService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IKeybindingService private readonly _keybindingService: IKeybindingService,
	) {
		super();

		this.create();

		this.visibleContext = visibleContext.bindTo(contextKeyService);
		this.visibleContext.set(true);
		this._register(toDisposable(() => this.visibleContext.reset()));

		this.editor.addContentWidget(this);
		this.editor.layoutContentWidget(this);

		this._register(toDisposable((() => this.editor.removeContentWidget(this))));

		this._register(this.editor.onDidChangeCursorPosition(e => {
			if (!range.containsPosition(e.position)) {
				this.dispose();
			}
		}));

		this._register(Event.runAndSubscribe(_keybindingService.onDidUpdateKeybindings, () => {
			this._updateButtonTitle();
		}));
	}

	private _updateButtonTitle() {
		const binding = this._keybindingService.lookupKeybinding(this.showCommand.id)?.getLabel();
		this.button.element.title = this.showCommand.label + (binding ? ` (${binding})` : '');
	}

	private create(): void {
		this.domNode = dom.$('.post-edit-widget');

		this.button = this._register(new Button(this.domNode, {
			supportIcons: true,
		}));
		this.button.label = '$(insert)';

		this._register(dom.addDisposableListener(this.domNode, dom.EventType.CLICK, () => this.showSelector()));
	}

	getId(): string {
		return PostEditWidget.baseId + '.' + this.typeId;
	}

	getDomNode(): HTMLElement {
		return this.domNode;
	}

	getPosition(): IContentWidgetPosition | null {
		return {
			position: this.range.getEndPosition(),
			preference: [ContentWidgetPositionPreference.BELOW]
		};
	}

	showSelector() {
		this._contextMenuService.showContextMenu({
			getAnchor: () => {
				const pos = dom.getDomNodePagePosition(this.button.element);
				return { x: pos.left + pos.width, y: pos.top + pos.height };
			},
			getActions: () => {
				return this.edits.allEdits.map((edit, i) => toAction({
					id: '',
					label: edit.title,
					checked: i === this.edits.activeEditIndex,
					run: () => {
						if (i !== this.edits.activeEditIndex) {
							return this.onSelectNewEdit(i);
						}
					},
				}));
			}
		});
	}
}

export class PostEditWidgetManager<T extends DocumentPasteEdit | DocumentDropEdit> extends Disposable {

	private readonly _currentWidget = this._register(new MutableDisposable<PostEditWidget<T>>());

	constructor(
		private readonly _id: string,
		private readonly _editor: ICodeEditor,
		private readonly _visibleContext: RawContextKey<boolean>,
		private readonly _showCommand: ShowCommand,
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
		@IBulkEditService private readonly _bulkEditService: IBulkEditService,
		@INotificationService private readonly _notificationService: INotificationService,
	) {
		super();

		this._register(Event.any(
			_editor.onDidChangeModel,
			_editor.onDidChangeModelContent,
		)(() => this.clear()));
	}

	public async applyEditAndShowIfNeeded(ranges: readonly Range[], edits: EditSet<T>, canShowWidget: boolean, resolve: (edit: T, token: CancellationToken) => Promise<T>, token: CancellationToken) {
		const model = this._editor.getModel();
		if (!model || !ranges.length) {
			return;
		}

		const edit = edits.allEdits.at(edits.activeEditIndex);
		if (!edit) {
			return;
		}

		const onDidSelectEdit = async (newEditIndex: number) => {
			const model = this._editor.getModel();
			if (!model) {
				return;
			}

			await model.undo();
			this.applyEditAndShowIfNeeded(ranges, { activeEditIndex: newEditIndex, allEdits: edits.allEdits }, canShowWidget, resolve, token);
		};

		const handleError = (e: Error, message: string) => {
			if (isCancellationError(e)) {
				return;
			}

			this._notificationService.error(message);
			if (canShowWidget) {
				this.show(ranges[0], edits, onDidSelectEdit);
			}
		};

		let resolvedEdit: T;
		try {
			resolvedEdit = await resolve(edit, token);
		} catch (e) {
			return handleError(e, localize('resolveError', "Error resolving edit '{0}':\n{1}", edit.title, toErrorMessage(e)));
		}

		if (token.isCancellationRequested) {
			return;
		}

		const combinedWorkspaceEdit = createCombinedWorkspaceEdit(model.uri, ranges, resolvedEdit);

		// Use a decoration to track edits around the trigger range
		const primaryRange = ranges[0];
		const editTrackingDecoration = model.deltaDecorations([], [{
			range: primaryRange,
			options: { description: 'paste-line-suffix', stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges }
		}]);

		this._editor.focus();
		let editResult: IBulkEditResult;
		let editRange: Range | null;
		try {
			editResult = await this._bulkEditService.apply(combinedWorkspaceEdit, { editor: this._editor, token });
			editRange = model.getDecorationRange(editTrackingDecoration[0]);
		} catch (e) {
			return handleError(e, localize('applyError', "Error applying edit '{0}':\n{1}", edit.title, toErrorMessage(e)));
		} finally {
			model.deltaDecorations(editTrackingDecoration, []);
		}

		if (token.isCancellationRequested) {
			return;
		}

		if (canShowWidget && editResult.isApplied && edits.allEdits.length > 1) {
			this.show(editRange ?? primaryRange, edits, onDidSelectEdit);
		}
	}

	public show(range: Range, edits: EditSet<T>, onDidSelectEdit: (newIndex: number) => void) {
		this.clear();

		if (this._editor.hasModel()) {
			this._currentWidget.value = this._instantiationService.createInstance(PostEditWidget<T>, this._id, this._editor, this._visibleContext, this._showCommand, range, edits, onDidSelectEdit);
		}
	}

	public clear() {
		this._currentWidget.clear();
	}

	public tryShowSelector() {
		this._currentWidget.value?.showSelector();
	}
}
