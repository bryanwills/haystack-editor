/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/
import { DocumentSymbol, SymbolKind } from "vs/editor/common/languages"

export function isContainerSymbol(symbol: DocumentSymbol): boolean {
  switch (symbol.kind) {
    case SymbolKind.Class:
    case SymbolKind.Interface:
    case SymbolKind.Enum:
    case SymbolKind.Struct:
    case SymbolKind.Function:
    case SymbolKind.Method:
    case SymbolKind.Constructor:
      return true
    default:
      return false
  }
}
