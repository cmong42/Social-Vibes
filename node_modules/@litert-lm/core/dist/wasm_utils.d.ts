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
import { EmscriptenVector } from './wasm_binding_types.js';
/**
 * Convert an EmscriptenVector to a native array and delete the vector
 *
 * Deletes the EmscriptenVector when done. The caller must still delete the
 * individual elements of the returned array.
 */
export declare function consumeEmscriptenVectorToArray<T>(vector: EmscriptenVector<T>): T[];
/**
 * Fill an EmscriptenVector from an Iterable.
 *
 * The EmscriptenVector must be large enough to hold the data.
 */
export declare function fillEmscriptenVector<T>(data: Iterable<T>, vector: EmscriptenVector<T>): void;
//# sourceMappingURL=wasm_utils.d.ts.map