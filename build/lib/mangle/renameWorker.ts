/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as ts from 'typescript';
import * as workerpool from 'workerpool';
import { StaticLanguageServiceHost } from './staticLanguageServiceHost';

let service: ts.LanguageService | undefined;

function findRenameLocations(
	projectPath: string,
	fileName: string,
	position: number,
): readonly ts.RenameLocation[] {
	if (!service) {
		service = ts.createLanguageService(new StaticLanguageServiceHost(projectPath));
	}

	return service.findRenameLocations(fileName, position, false, false, {
		providePrefixAndSuffixTextForRename: true,
	}) ?? [];
}

workerpool.worker({
	findRenameLocations
});
