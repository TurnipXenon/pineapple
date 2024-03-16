import type { ComponentType } from "svelte";
import { writable } from "svelte/store";
import type { DefaultToastBodyProps } from "$pkg/components/pineapple/toast/DefaultToastBodyProps";
import DefaultToastBody from "$pkg/components/pineapple/toast/DefaultToastBody.svelte";

/**
 * Default toast duration is 5 seconds
 */
export const DefaultToastParamsDuration = 5000;

export type CustomToastProps = DefaultToastBodyProps;

// todo: note may not be possible
export interface ToastParams {
	component: ComponentType;
	/**
	 * Time in millisecond. If undefined, defaults to DefaultToastParamsDuration
	 */
	duration?: number;
	props?: CustomToastProps;
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
		component: DefaultToastBody,
		props: {
			message
		}
	});
};
