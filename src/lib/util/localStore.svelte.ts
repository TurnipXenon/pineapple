/** from https://www.reddit.com/r/sveltejs/comments/1d43d8p/svelte_5_runes_with_localstorage_thanks_to_joy_of/ */
import { browser } from "$app/environment";
import type { OverlayType } from "$pkg";

type LocalStorageState = 'initial' | 'accessed' | 'writable';

export class LocalStore<T> {
	value = $state<T>() as T;
	key = "";
	valueType: "undefined" | "object" | "boolean" | "number" | "string" | "function" | "symbol" | "bigint";
	defaultValue: T;

	constructor(key: string, defaultValue: T) {
		this.key = key;
		this.defaultValue = defaultValue;
		this.value = defaultValue;
		this.valueType = typeof defaultValue;
		let localStorageState: LocalStorageState = $state<LocalStorageState>('initial');

		if (browser) {
			const item = localStorage.getItem(`pinya-local-${key}`);
			if (item) {
				this.value = this.deserialize(item);
				console.log(`initializing initial ${this.key}: ${this.value}`)
			}
			localStorageState = 'accessed';
		}

		$effect(() => {
			console.log(`updating ${this.key}: ${this.value}`)
			switch (localStorageState) {
				case "initial":
					// completely ignore all next changes
					break;
				case "accessed":
					// for the initial change, we ignore it but allow the next changes to be writable
					localStorageState = 'writable';
					console.log(`setting writable for ${this.key}`)
					break;
				case "writable":
					localStorage.setItem(`pinya-local-${this.key}`, this.serialize(this.value));
					console.log(`initializing after ${this.key}: ${this.value}`)
					break;
			}
		});
	}

	serialize(value: T): string {
		if (this.valueType !== "object") {
			return value as string;
		}

		return JSON.stringify(value);
	}

	deserialize(item: string): T {
			console.log(`deserializing item ${item}`)
		if (this.valueType === "string") {
			console.log(`deserializing string ${item}`)
			return item as never;
		}

		try {
			return JSON.parse(item);
		} catch (error) {
			console.error(error);
			return this.defaultValue;
		}
	}
}

export interface LocalStoreRestriction {
	"enable-portrait": boolean;
	"enable-dialog-overlay": boolean;
	"overlay-type": OverlayType;
}

const localStoreDefault: Readonly<LocalStoreRestriction> = {
	"enable-portrait": true,
	"enable-dialog-overlay": true, // todo: turn to false once we implement an onboarding/welcome screen
	"overlay-type": 'dialog',
};

export const createLocalStore = <k extends keyof LocalStoreRestriction>(key: k) => {
	return new LocalStore(key, localStoreDefault[key]);
};

// export const createAllLocalStore = () => {
// 	let enablePortrait = $state(createLocalStore('enablePortrait'));
// 	return {
// 		enablePortrait
// 	}
// }
