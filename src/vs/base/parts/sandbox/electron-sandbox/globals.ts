/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { INodeProcess, IProcessEnvironment } from "vs/base/common/platform"
import { ISandboxConfiguration } from "vs/base/parts/sandbox/common/sandboxTypes"
import {
  IpcRenderer,
  ProcessMemoryInfo,
  WebFrame,
} from "vs/base/parts/sandbox/electron-sandbox/electronTypes"

/**
 * In Electron renderers we cannot expose all of the `process` global of node.js
 */
export interface ISandboxNodeProcess extends INodeProcess {
  /**
   * The process.platform property returns a string identifying the operating system platform
   * on which the Node.js process is running.
   */
  readonly platform: string

  /**
   * The process.arch property returns a string identifying the CPU architecture
   * on which the Node.js process is running.
   */
  readonly arch: string

  /**
   * The type will always be `renderer`.
   */
  readonly type: string

  /**
   * A list of versions for the current node.js/electron configuration.
   */
  readonly versions: { [key: string]: string | undefined }

  /**
   * The process.env property returns an object containing the user environment.
   */
  readonly env: IProcessEnvironment

  /**
   * The `execPath` will be the location of the executable of this application.
   */
  readonly execPath: string

  /**
   * A listener on the process. Only a small subset of listener types are allowed.
   */
  on: (type: string, callback: Function) => void

  /**
   * The current working directory of the process.
   */
  cwd: () => string

  /**
   * Resolves with a ProcessMemoryInfo
   *
   * Returns an object giving memory usage statistics about the current process. Note
   * that all statistics are reported in Kilobytes. This api should be called after
   * app ready.
   *
   * Chromium does not provide `residentSet` value for macOS. This is because macOS
   * performs in-memory compression of pages that haven't been recently used. As a
   * result the resident set size value is not what one would expect. `private`
   * memory is more representative of the actual pre-compression memory usage of the
   * process on macOS.
   */
  getProcessMemoryInfo: () => Promise<ProcessMemoryInfo>

  /**
   * Returns a process environment that includes all shell environment variables even if
   * the application was not started from a shell / terminal / console.
   *
   * There are different layers of environment that will apply:
   * - `process.env`: this is the actual environment of the process before this method
   * - `shellEnv`   : if the program was not started from a terminal, we resolve all shell
   *                  variables to get the same experience as if the program was started from
   *                  a terminal (Linux, macOS)
   * - `userEnv`    : this is instance specific environment, e.g. if the user started the program
   *                  from a terminal and changed certain variables
   *
   * The order of overwrites is `process.env` < `shellEnv` < `userEnv`.
   */
  shellEnv(): Promise<IProcessEnvironment>
}

export interface IpcMessagePort {
  /**
   * Acquire a `MessagePort`. The main process will transfer the port over to
   * the `responseChannel` with a payload of `requestNonce` so that the source can
   * correlate the response.
   *
   * The source should install a `window.on('message')` listener, ensuring `e.data`
   * matches `nonce`, `e.source` matches `window` and then receiving the `MessagePort`
   * via `e.ports[0]`.
   */
  acquire(responseChannel: string, nonce: string): void
}

export interface ISandboxContext {
  /**
   * A configuration object made accessible from the main side
   * to configure the sandbox browser window. Will be `undefined`
   * for as long as `resolveConfiguration` is not awaited.
   */
  configuration(): ISandboxConfiguration | undefined

  /**
   * Allows to await the resolution of the configuration object.
   */
  resolveConfiguration(): Promise<ISandboxConfiguration>
}

const vscodeGlobal = (globalThis as any).vscode
export const ipcRenderer: IpcRenderer = vscodeGlobal.ipcRenderer
export const ipcMessagePort: IpcMessagePort = vscodeGlobal.ipcMessagePort
export const webFrame: WebFrame = vscodeGlobal.webFrame
export const process: ISandboxNodeProcess = vscodeGlobal.process
export const context: ISandboxContext = vscodeGlobal.context

/**
 * A set of globals that are available in all windows that either
 * depend on `preload.js` or `preload-aux.js`.
 */
export interface ISandboxGlobals {
  readonly ipcRenderer: Pick<
    import("vs/base/parts/sandbox/electron-sandbox/electronTypes").IpcRenderer,
    "send" | "invoke"
  >
  readonly webFrame: import("vs/base/parts/sandbox/electron-sandbox/electronTypes").WebFrame
}
