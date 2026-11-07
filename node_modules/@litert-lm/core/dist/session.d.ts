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
import { Mutex } from './mutex.js';
import { SessionConfig } from './session_config.js';
import { RecursiveRequired } from './types.js';
import { Responses as WasmResponses, Session as WasmSession } from './wasm_binding_types.js';
/**
 * LiteRT-LM Session
 */
export declare class Session {
    private readonly session;
    private readonly mutexes;
    readonly config: RecursiveRequired<SessionConfig>;
    private isBusy;
    constructor(session: WasmSession, mutexes: {
        executor: Mutex;
    });
    runPrefill(inputs: string[]): Promise<void>;
    runDecode(): Promise<Responses>;
    /**
     * Sends a signal to cancel any current generation.
     */
    cancel(): void;
    /**
     * Clones the session. The cloned session will have all the settings and
     * context of the original session up to the point that clone is called.
     */
    clone(): Promise<Session>;
    delete(): Promise<void>;
}
declare class Responses {
    private readonly responses;
    constructor(responses: WasmResponses);
    getTexts(): string[];
    delete(): void;
}
export {};
//# sourceMappingURL=session.d.ts.map