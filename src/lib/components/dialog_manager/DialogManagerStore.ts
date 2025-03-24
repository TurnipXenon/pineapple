/**
 * DialogManagerStore is for variables that will be used as a Svelte store
 * or is saved in local storage
 */

import type { DialogMapStore } from "$lib/types/pineapple_fiber/DialogVariableStore";
import { createNewMapStore } from "$lib/types/pineapple_fiber/DialogVariableStore";
import { writable } from "svelte/store";
import type { DialogDetail } from "$lib/types/pineapple_fiber/DialogDetail";

/**
 * Enables the dialogue overlay
 *
 * @example
 * When updating to false, remember to restore the value to true, our default value, onDestroy.
 * Avoid async to prevent weird flashes of updates!
 * ```
 * import {enableDialogueOverlay} from "$lib/store.ts";
 * enableDialogueOverlay.update(() => false);
 *
 * onDestroy(() => {
 *     enableDialogueOverlay.update(() =>  true);
 * });
 * ```
 */
export const enableDialogueOverlay = writable(false);

export const dialogVariableStore: DialogMapStore = createNewMapStore();
export const updateRate: number = 40 / 1000; // *at least* 40ms per letter

// todo: if we go through doing yarn to typescript, move this!
export const defaultDialogMessage: DialogDetail[] = [
	{
		textContent: `<p>I don't really have anything to say. Have you drank water? Or perhaps, you've checked out <a target="_blank" class="external-link" href="http://crouton.net">one of the best webpages</a> out there?`
	}
];

