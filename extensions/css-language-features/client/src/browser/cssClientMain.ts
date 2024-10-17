/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ExtensionContext, Uri, l10n } from 'vscode';
import { BaseLanguageClient, LanguageClientOptions } from 'vscode-languageclient';
import { startClient, LanguageClientConstructor } from '../cssClient';
import { LanguageClient } from 'vscode-languageclient/browser';

declare const Worker: {
	new(stringUrl: string): any;
};
declare const TextDecoder: {
	new(encoding?: string): { decode(buffer: ArrayBuffer): string };
};

let client: BaseLanguageClient | undefined;

// this method is called when vs code is activated
export async function activate(context: ExtensionContext) {
	const serverMain = Uri.joinPath(context.extensionUri, 'server/dist/browser/cssServerMain.js');
	try {
		const worker = new Worker(serverMain.toString());
		worker.postMessage({ i10lLocation: l10n.uri?.toString(false) ?? '' });

		const newLanguageClient: LanguageClientConstructor = (id: string, name: string, clientOptions: LanguageClientOptions) => {
			return new LanguageClient(id, name, clientOptions, worker);
		};

		client = await startClient(context, newLanguageClient, { TextDecoder });

	} catch (e) {
		console.log(e);
	}
}

export async function deactivate(): Promise<void> {
	if (client) {
		await client.stop();
		client = undefined;
	}
}

