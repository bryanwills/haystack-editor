/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as fs from 'fs';
import { getTempFile } from './temp.electron';

export const onCaseInsensitiveFileSystem = (() => {
	let value: boolean | undefined;
	return (): boolean => {
		if (typeof value === 'undefined') {
			if (process.platform === 'win32') {
				value = true;
			} else if (process.platform !== 'darwin') {
				value = false;
			} else {
				const temp = getTempFile('typescript-case-check');
				fs.writeFileSync(temp, '');
				value = fs.existsSync(temp.toUpperCase());
			}
		}
		return value;
	};
})();
