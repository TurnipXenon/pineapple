import { createContext } from "svelte";

export type ParagraphImageState = "searching" | "image-found" | "no-image-found";

export const [getParagraphImageStateContext, setParagraphImageStateContext] = createContext<{
	value: ParagraphImageState
}>();
