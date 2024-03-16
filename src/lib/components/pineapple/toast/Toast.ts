import { writable } from "svelte/store";
import type { DefaultToastPair } from "$pkg/components/pineapple/toast/DefaultToastBody";
import DefaultToastBody from "$pkg/components/pineapple/toast/DefaultToastBody.svelte";
import type { TestCustomToastPair } from "$pkg/components/pineapple/toast/custom-toast/TestCustomToast";

/**
 * Default toast duration is 5 seconds
 */
export const DefaultToastParamsDuration = 5000;

export type CustomToastPairs = DefaultToastPair
	| TestCustomToastPair;

// todo: note may not be possible
export interface ToastParams {
	componentAndProps: CustomToastPairs;
	/**
	 * Time in millisecond. If undefined, defaults to DefaultToastParamsDuration
	 */
	duration?: number;
}

/**
 * todo: do not call directly documentation
 */
export const activeToast = writable<ToastParams | undefined>();

export const toastQueue: ToastParams[] = [];

/**
 *
 * @param newToast
 */
export const showComponentInToast = (newToast: ToastParams) => {
	// todo: queue component
	activeToast.update((currentToast) => {
		if (currentToast !== undefined) {
			toastQueue.push(newToast);
			return currentToast;
		} else {
			return newToast;
		}
	});
};

export const showTextInToast = (message: string) => {
	showComponentInToast({
		componentAndProps: {
			component: DefaultToastBody,
			props: {
				message
			}
		}
	});
};
