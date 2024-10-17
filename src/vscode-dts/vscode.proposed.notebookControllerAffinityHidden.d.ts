/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode' {
	// https://github.com/microsoft/vscode/issues/161144
	export enum NotebookControllerAffinity2 {
		Default = 1,
		Preferred = 2,
		Hidden = -1
	}

	export interface NotebookController {
		updateNotebookAffinity(notebook: NotebookDocument, affinity: NotebookControllerAffinity | NotebookControllerAffinity2): void;
	}
}
