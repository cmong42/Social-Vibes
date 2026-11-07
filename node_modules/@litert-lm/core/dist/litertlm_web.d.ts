/**
 * Copyright 2026 Google LLC
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
import { WasmModule } from '@litertjs/wasm-utils';
import { LiteRtLmWasm } from './wasm_binding_types.js';
/**
 * Set up the default WebGPU device for the LiteRT LM Wasm module.
 */
export declare function setupDefaultWebGpuDevice(): Promise<void>;
/**
 * Run LiteRt LM models in the browser.
 */
export declare class LiteRtLm {
    readonly liteRtLmWasm: LiteRtLmWasm;
    static DEFAULT_WASM_PATH: string;
    constructor(wasmModule: WasmModule);
    setupDefaultWebGpuDevice(): Promise<void>;
    delete(): void;
}
//# sourceMappingURL=litertlm_web.d.ts.map