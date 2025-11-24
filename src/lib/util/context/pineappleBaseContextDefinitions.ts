import type { OverlayType } from "$pkg";
import { LocalStore } from "$pkg/util/localStore.svelte";
import { createContext } from "svelte";

export const [getEnablePortraitContext, setEnablePortraitContext] = createContext<LocalStore<boolean>>();
export const [getEnableDialogOverlayContext, setEnableDialogOverlayContext] = createContext<LocalStore<boolean>>();
export const [getOverlayTypeContext, setOverlayTypeContext] = createContext<LocalStore<OverlayType>>();
