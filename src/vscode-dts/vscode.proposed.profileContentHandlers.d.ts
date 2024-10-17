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

	export interface ProfileContentHandler {
		readonly name: string;
		readonly description?: string;
		saveProfile(name: string, content: string, token: CancellationToken): Thenable<{ readonly id: string; readonly link: Uri } | null>;
		readProfile(idOrUri: string | Uri, token: CancellationToken): Thenable<string | null>;
	}

	export namespace window {
		export function registerProfileContentHandler(id: string, profileContentHandler: ProfileContentHandler): Disposable;
	}

}
