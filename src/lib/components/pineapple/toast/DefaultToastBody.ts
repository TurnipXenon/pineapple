import DefaultToastBody from "./DefaultToastBody.svelte";

export interface Props {
	message: string;
}

export interface DefaultToastPair {
	component: typeof DefaultToastBody;
	props: Props;
}
