/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict"

var updateGrammar = require("vscode-grammar-updater")

function adaptLess(grammar) {
  grammar.name = "Less"
  grammar.scopeName = "source.css.less"
}

async function updateGrammars() {
  await updateGrammar.update(
    "radium-v/Better-Less",
    "Syntaxes/Better%20Less.tmLanguage",
    "./syntaxes/less.tmLanguage.json",
    adaptLess,
    "master",
  )
}

updateGrammars()
