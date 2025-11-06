/** from https://www.reddit.com/r/sveltejs/comments/1d43d8p/svelte_5_runes_with_localstorage_thanks_to_joy_of/ */
import { browser } from "$app/environment";

export class LocalStore<T> {
	value = $state<T>() as T;
	key = "";

	constructor(key: string, defaultValue: T) {
		this.key = key;
		this.value = defaultValue;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = this.deserialize(item);
		}

		$effect(() => {
			localStorage.setItem(this.key, this.serialize(this.value));
		});
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T {
		return JSON.parse(item);
	}
}

export interface LocalStoreRestriction {
	enablePortrait?: boolean;
}

const localStoreDefault: Readonly<LocalStoreRestriction> = {}

export const createLocalStore = <k extends keyof LocalStoreRestriction>(key: k, value: LocalStoreRestriction[k]) => {
	return new LocalStore(key, localStoreDefault[key]);
}
