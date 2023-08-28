import { writable } from "svelte/store";
/**
 * Enables background in main layout
 *
 * @example
 * When updating to false, remember to restore the value to true, our default value, onDestroy.
 * Avoid async to prevent weird flashes of updates!
 * ```
 * import {enableBackground} from "$lib/store.ts";
 * enableBackground.update(() => false);
 *
 * onDestroy(() => {
 *     enableBackground.update(() =>  true);
 * });
 * ```
 */
export const enableBackground = writable(true);
//# sourceMappingURL=store.js.map