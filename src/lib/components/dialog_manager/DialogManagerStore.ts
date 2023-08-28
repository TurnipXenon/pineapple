/**
 * DialogManagerStore is for variables that will be used as a Svelte store
 * or is saved in local storage
 */

import type { DialogMapStore } from "$lib/types/pineapple_fiber/DialogVariableStore";
import { createNewMapStore } from "$lib/types/pineapple_fiber/DialogVariableStore";
import { writable } from "svelte/store";
import type { DialogDetail } from "$lib/types/pineapple_fiber/DialogDetail";
import { DialogManager } from "$lib/components/dialog_manager/DialogManager";

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
export const enableDialogueOverlay = writable(true);

export const dialogVariableStore: DialogMapStore = createNewMapStore();
export const updateRate: number = 40 / 1000; // *at least* 40ms per letter

// todo: if we go through doing yarn to typescript, move this!
export const defaultDialogMessage: DialogDetail[] = [
	{
		textContent: `<p>Have you drank water? Or perhaps, you've checked out <a target="_blank" class="external-link" href="http://crouton.net">one of the best webpages</a> out there?`
	}
];

/**
 * strictly must be declared last! or you might receive a weird error that looks like:
 *
 * 2:04:21 AM [vite] Error when evaluating SSR module /src/lib/components/dialog_manager/DialogManagerStore.ts:
 * |- TypeError: Cannot read properties of undefined (reading '0')
 *     at <instance_members_initializer> (/src/lib/components/dialog_manager/DialogManager.ts:38:67)
 *     at new DialogManager (/src/lib/components/dialog_manager/DialogManager.ts:53:14)
 *     at eval (/src/lib/components/dialog_manager/DialogManagerStore.ts:15:23)
 *     at async instantiateModule (file:///C:/Users/Pumpkin/Projects/Web/pineapple/node_modules/vite/dist/node/chunks/dep-934dbc7c.js:54360:9)
 *
 * what this means is that one member of dialogManager cannot be initialized. in our case, it was the
 * defaultDialogMessage not yet being initialized
 */
export const dialogManager = new DialogManager();
