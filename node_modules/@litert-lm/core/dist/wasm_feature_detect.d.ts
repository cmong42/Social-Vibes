/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
interface SupportStatus {
    supported: boolean;
    error?: Error;
}
declare interface WasmFeatureValues {
    relaxedSimd: Promise<SupportStatus> | undefined;
    threads: Promise<SupportStatus> | undefined;
    jspi: Promise<SupportStatus> | undefined;
}
declare const WASM_FEATURE_VALUES: WasmFeatureValues;
/** Returns true if JSPI is supported in the browser. */
export declare function isJspiSupported(): boolean;
declare const WASM_FEATURE_CHECKS: Record<keyof typeof WASM_FEATURE_VALUES, () => Promise<SupportStatus>>;
/**
 * Check if a given WASM feature is supported.
 *
 * @param feature The feature to check.
 * @return A promise that resolves to true if the feature is supported,
 *     false otherwise.
 */
export declare function supportsFeature(feature: keyof typeof WASM_FEATURE_CHECKS): Promise<boolean>;
/**
 * Throw an error if a given WASM feature is not supported.
 *
 * @param feature The feature to check.
 * @throws An error if the feature is not supported.
 */
export declare function throwIfFeatureNotSupported(feature: keyof typeof WASM_FEATURE_CHECKS): Promise<void>;
export {};
//# sourceMappingURL=wasm_feature_detect.d.ts.map