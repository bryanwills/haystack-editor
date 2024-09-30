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
import {
  LanguageClient,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node"
import { MdLanguageClient, startClient } from "./client/client"
import { activateShared } from "./extension.shared"
import { VsCodeOutputLogger } from "./logging"
import { IMdParser, MarkdownItEngine } from "./markdownEngine"
import { getMarkdownExtensionContributions } from "./markdownExtensions"
import { githubSlugifier } from "./slugify"

export async function activate(context: vscode.ExtensionContext) {
  const contributions = getMarkdownExtensionContributions(context)
  context.subscriptions.push(contributions)

  const logger = new VsCodeOutputLogger()
  context.subscriptions.push(logger)

  const engine = new MarkdownItEngine(contributions, githubSlugifier, logger)

  const client = await startServer(context, engine)
  context.subscriptions.push(client)
  activateShared(context, client, engine, logger, contributions)
}

function startServer(
  context: vscode.ExtensionContext,
  parser: IMdParser,
): Promise<MdLanguageClient> {
  const clientMain =
    vscode.extensions.getExtension("vscode.markdown-language-features")
      ?.packageJSON?.main || ""

  const serverMain = `./server/${clientMain.indexOf("/dist/") !== -1 ? "dist" : "out"}/node/workerMain`
  const serverModule = context.asAbsolutePath(serverMain)

  // The debug options for the server
  const debugOptions = {
    execArgv: [
      "--nolazy",
      "--inspect=" + (7000 + Math.round(Math.random() * 999)),
    ],
  }

  // If the extension is launch in debug mode the debug server options are use
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  }

  // pass the location of the localization bundle to the server
  process.env["HAYSTACK_L10N_BUNDLE_LOCATION"] = vscode.l10n.uri?.toString() ?? ""

  return startClient((id, name, clientOptions) => {
    return new LanguageClient(id, name, serverOptions, clientOptions)
  }, parser)
}
