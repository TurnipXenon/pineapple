/** from https://www.reddit.com/r/sveltejs/comments/1d43d8p/svelte_5_runes_with_localstorage_thanks_to_joy_of/ */
import { browser } from "$app/environment";
import type { OverlayType } from "$pkg";
import { writable, type Writable } from "svelte/store";

// const localConsole = console;
const localConsole: Console | undefined = undefined;

export type LocalStore<T> = Writable<T>;

export interface LocalStoreRestriction {
	"enable-portrait": boolean;
	"enable-dialog-preference": boolean;
	"overlay-type": OverlayType;
}

const localStoreDefault: Readonly<LocalStoreRestriction> = {
	"enable-portrait": true,
	"enable-dialog-preference": true,
	"overlay-type": "dialog"
};

export const createLocalStore = <k extends keyof LocalStoreRestriction>(key: k) => {
	const defaultValue = localStoreDefault[key];
	const valueType = typeof defaultValue;
	const store = writable(defaultValue);
	const storageKey = `pinya-local-${key}`;

	const serialize = (value: LocalStoreRestriction[k]) => {
		if (valueType !== "object") {
			return `${value}`;
		}

		return JSON.stringify(value);
	};

	const deserialize = (item: string): LocalStoreRestriction[k] => {
		localConsole?.log(`deserializing item ${item}`);
		if (valueType === "string") {
			localConsole?.log(`deserializing string ${item}`);
			return item as LocalStoreRestriction[k];
		}

		try {
			return JSON.parse(item) as LocalStoreRestriction[k];
		} catch (error) {
			console.error(error);
			return defaultValue;
		}
	};

	if (browser) {
		const item = localStorage.getItem(storageKey);
		if (item) {
			store.set(deserialize(item));
			localConsole?.log(`initializing initial ${storageKey}: ${item}`);
		}
	}

	let skipWrite = true;
	store.subscribe((value) => {
		if (!browser) {
			return;
		}

		if (skipWrite) {
			skipWrite = false;
			return;
		}

		localStorage.setItem(storageKey, serialize(value));
		localConsole?.log(`initializing after ${storageKey}: ${value}`);
	});

	return store;
};
