/**
 * Copyright 2026 The ODML Authors.
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
import { RecursiveRequired } from './types.js';
import { Backend, SamplerType, SessionConfig as WasmSessionConfig } from './wasm_binding_types.js';
export { SamplerType };
/**
 * Configures how to sample the next token.
 */
export interface SamplerParameters {
    type?: SamplerType;
    k?: number;
    p?: number;
    temperature?: number;
    seed?: number;
}
/**
 * Configures a LiteRT-LM Session.
 */
export interface SessionConfig {
    audioModalityEnabled?: boolean;
    visionModalityEnabled?: boolean;
    samplerParams?: SamplerParameters;
    stopTokenIds?: number[][];
    startTokenId?: number;
    numOutputCandidates?: number;
    samplerBackend?: Backend;
    applyPromptTemplateInSession?: boolean;
    useExternalSampler?: boolean;
    /**
     * The maximum number of tokens to generate per response. For thinking
     * models, both thinking (reasoning) tokens and the final response tokens
     * count towards this limit.
     */
    maxOutputTokens?: number;
}
/**
 * Converts a SessionConfig to a WasmSessionConfig.
 */
export declare function sessionConfigToWasmSessionConfig(sessionConfig: SessionConfig, wasm?: import("./wasm_binding_types.js").LiteRtLmWasm): WasmSessionConfig;
/**
 * Converts a WasmSessionConfig to a SessionConfig.
 *
 * All fields will be populated with the WASM object's values, which may be
 * default values if they were not set.
 */
export declare function wasmSessionConfigToSessionConfig(wasmSessionConfig: WasmSessionConfig): RecursiveRequired<SessionConfig>;
//# sourceMappingURL=session_config.d.ts.map