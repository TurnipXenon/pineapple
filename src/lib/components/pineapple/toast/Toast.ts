import type { ComponentType } from "svelte";
import { writable } from "svelte/store";

/**
 * Default toast duration is 5 seconds
 */
export const DefaultToastParamsDuration = 5000;

// todo: note may not be possible
export interface ToastParams {
	component: ComponentType;
	/**
	 * Time in millisecond. If undefined, defaults to DefaultToastParamsDuration
	 */
	duration?: number;
}

/**
 * todo: do not call directly documentation
 */
export const activeToast = writable<ToastParams | undefined>();

/**
 *
 * @param component
 */
export const showComponentInToast = (component: ToastParams) => {
	// todo: queue component
	activeToast.update((toast) => {
		if (toast !== undefined) {
			// todo: add toast to queue
			return toast;
		} else {
			return component;
		}
	});
};
