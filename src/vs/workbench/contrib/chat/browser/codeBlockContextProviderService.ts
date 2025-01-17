/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable, toDisposable } from 'vs/base/common/lifecycle';
import { ICodeBlockActionContextProvider, IChatCodeBlockContextProviderService } from 'vs/workbench/contrib/chat/browser/chat';

export class ChatCodeBlockContextProviderService implements IChatCodeBlockContextProviderService {
	declare _serviceBrand: undefined;
	private readonly _providers = new Map<string, ICodeBlockActionContextProvider>();

	get providers(): ICodeBlockActionContextProvider[] {
		return [...this._providers.values()];
	}
	registerProvider(provider: ICodeBlockActionContextProvider, id: string): IDisposable {
		this._providers.set(id, provider);
		return toDisposable(() => this._providers.delete(id));
	}
}
