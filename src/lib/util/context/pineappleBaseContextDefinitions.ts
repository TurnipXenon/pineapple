import { createContext } from "svelte";

export const [getEnablePortraitContext, setEnablePortraitContext] = createContext<{value: boolean}>();
