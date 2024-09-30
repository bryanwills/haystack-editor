/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

"use strict"

const withDefaults = require("../shared.webpack.config")
const path = require("path")

module.exports = withDefaults({
  context: path.join(__dirname, "client"),
  entry: {
    extension: "./src/node/htmlClientMain.ts",
  },
  output: {
    filename: "htmlClientMain.js",
    path: path.join(__dirname, "client", "dist", "node"),
  },
})
