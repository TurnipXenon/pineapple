import type { OverlayType, PageMeta } from "$pkg";
import { type LocalStore } from "$pkg/util/localStore.svelte";
import { createContext } from "svelte";

export const [getEnablePortraitContext, setEnablePortraitContext] = createContext<LocalStore<boolean>>();
export const [getEnableDialogPreferenceContext, setEnableDialogPreferenceContext] = createContext<LocalStore<boolean>>();

// note to self: proper two way binding is seen with the variables below
// see https://svelte.dev/docs/svelte/context#Using-context-with-state
export const [getEnableDialogOverlayContext, setEnableDialogOverlayContext] = createContext<{ value: boolean }>();

export const [getOverlayTypeContext, setOverlayTypeContext] = createContext<LocalStore<OverlayType>>();
export const [getIgnoreOverlayOverride, setIgnoreOverlayOverride] = createContext<boolean>();
export const [getSiteLayout, setSiteLayout] = createContext<PageMeta[]>();
