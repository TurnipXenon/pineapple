/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { browser } from "$app/environment";

export type DialogMapStore = Storage;

const createInMemoryStore = (): DialogMapStore => {
	const state = new Map<string, string>();

	return {
		get length() {
			return state.size;
		},
		setItem: (key: string, value: string) => {
			state.set(key, value);
		},
		getItem: (key: string): string | null => {
			return state.has(key) ? state.get(key)! : null;
		},
		clear: () => {
			state.clear();
		},
		key: (index: number): string | null => {
			return Array.from(state.keys())[index] ?? null;
		},
		removeItem: (key: string) => {
			state.delete(key);
		}
	};
};

export const createNewMapStore = (): DialogMapStore => {
	const isVitest = Boolean(import.meta.env?.VITEST);

	return browser
		? localStorage
		: isVitest
			? createInMemoryStore()
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
