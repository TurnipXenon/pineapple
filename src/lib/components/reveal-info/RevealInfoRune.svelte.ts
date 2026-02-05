import { SvelteMap } from "svelte/reactivity";

const createRevealInfoState = () => {
		const revealInfoState = new SvelteMap<string, string>();

		return {
			get data() {
				return revealInfoState;
			},
			setInfoState: (key: string, value: string) => {
				revealInfoState.set(key, value);
			}
		};
	}
;

export const revealInfoState = createRevealInfoState();
