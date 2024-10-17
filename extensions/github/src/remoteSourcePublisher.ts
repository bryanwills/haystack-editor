/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { publishRepository } from './publish';
import { API as GitAPI, RemoteSourcePublisher, Repository } from './typings/git';

export class GithubRemoteSourcePublisher implements RemoteSourcePublisher {
	readonly name = 'GitHub';
	readonly icon = 'github';

	constructor(private gitAPI: GitAPI) { }

	publishRepository(repository: Repository): Promise<void> {
		return publishRepository(this.gitAPI, repository);
	}
}
