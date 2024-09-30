/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode"

export async function exists(resource: vscode.Uri): Promise<boolean> {
  try {
    const stat = await vscode.workspace.fs.stat(resource)
    // stat.type is an enum flag
    return !!(stat.type & vscode.FileType.File)
  } catch {
    return false
  }
}

export function looksLikeAbsoluteWindowsPath(path: string): boolean {
  return /^[a-zA-Z]:[\/\\]/.test(path)
}
