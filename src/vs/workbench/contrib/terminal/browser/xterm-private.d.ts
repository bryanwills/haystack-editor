/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IBufferCell } from "@xterm/xterm"

export type XtermAttributes = Omit<
  IBufferCell,
  "getWidth" | "getChars" | "getCode"
> & { clone?(): XtermAttributes }

export interface IXtermCore {
  viewport?: {
    readonly scrollBarWidth: number
    _innerRefresh(): void
  }

  _inputHandler: {
    _curAttrData: XtermAttributes
  }

  _renderService: {
    dimensions: {
      css: {
        cell: {
          width: number
          height: number
        }
      }
    }
    _renderer: {
      value?: unknown
    }
  }
}
