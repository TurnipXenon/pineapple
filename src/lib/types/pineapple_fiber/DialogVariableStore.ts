/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { browser } from "$app/environment";

export type DialogMapStore = Storage;

export const createNewMapStore = (): DialogMapStore => {
	return browser
		? localStorage
		: {
				// dumb storage if not in browser
				length: 0,
				setItem: (key: string, value: string) => {},
				getItem: (key: string): string | null => {
					return null;
				},
				clear: () => {},
				key: (index: number): string | null => {
					return null;
				},
				removeItem: (key: string) => {}
		  };
};
