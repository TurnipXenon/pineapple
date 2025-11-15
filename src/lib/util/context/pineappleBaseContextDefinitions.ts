import { LocalStore } from "$pkg/util/localStore.svelte";
import { createContext } from "svelte";

export const [getEnablePortraitContext, setEnablePortraitContext] = createContext<LocalStore<boolean>>();
