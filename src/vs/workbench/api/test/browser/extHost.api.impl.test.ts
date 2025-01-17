/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { URI } from 'vs/base/common/uri';
import { originalFSPath } from 'vs/base/common/resources';
import { isWindows } from 'vs/base/common/platform';
import { ensureNoDisposablesAreLeakedInTestSuite } from 'vs/base/test/common/utils';

suite('ExtHost API', function () {
	test('issue #51387: originalFSPath', function () {
		if (isWindows) {
			assert.strictEqual(originalFSPath(URI.file('C:\\test')).charAt(0), 'C');
			assert.strictEqual(originalFSPath(URI.file('c:\\test')).charAt(0), 'c');

			assert.strictEqual(originalFSPath(URI.revive(JSON.parse(JSON.stringify(URI.file('C:\\test'))))).charAt(0), 'C');
			assert.strictEqual(originalFSPath(URI.revive(JSON.parse(JSON.stringify(URI.file('c:\\test'))))).charAt(0), 'c');
		}
	});

	ensureNoDisposablesAreLeakedInTestSuite();
});
