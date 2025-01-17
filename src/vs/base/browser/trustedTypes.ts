/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { onUnexpectedError } from "vs/base/common/errors"

export function createTrustedTypesPolicy<
  Options extends TrustedTypePolicyOptions
>(
  policyName: string,
  policyOptions?: Options
):
  | undefined
  | Pick<
      TrustedTypePolicy<Options>,
      "name" | Extract<keyof Options, keyof TrustedTypePolicyOptions>
    > {
  interface IMonacoEnvironment {
    createTrustedTypesPolicy<Options extends TrustedTypePolicyOptions>(
      policyName: string,
      policyOptions?: Options
    ):
      | undefined
      | Pick<
          TrustedTypePolicy<Options>,
          "name" | Extract<keyof Options, keyof TrustedTypePolicyOptions>
        >
  }
  const monacoEnvironment: IMonacoEnvironment | undefined = (globalThis as any)
    .MonacoEnvironment

  if (monacoEnvironment?.createTrustedTypesPolicy) {
    try {
      return monacoEnvironment.createTrustedTypesPolicy(
        policyName,
        policyOptions
      )
    } catch (err) {
      onUnexpectedError(err)
      return undefined
    }
  }
  try {
    if (typeof window === "undefined") {
      // Fallback to worker global scope.
      return self.trustedTypes?.createPolicy(policyName, policyOptions)
    }
    return window.trustedTypes?.createPolicy(policyName, policyOptions)
  } catch (err) {
    onUnexpectedError(err)
    return undefined
  }
}
