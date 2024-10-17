/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { join } from 'path';
import { Application, Logger } from '../../../../automation';
import { installAllHandlers } from '../../utils';

export function setup(logger: Logger) {
	describe('Launch', () => {

		// Shared before/after handling
		installAllHandlers(logger, opts => ({ ...opts, userDataDir: join(opts.userDataDir, 'ø') }));

		it('verifies that application launches when user data directory has non-ascii characters', async function () {
			const app = this.app as Application;
			await app.workbench.explorer.openExplorerView();
		});
	});
}
