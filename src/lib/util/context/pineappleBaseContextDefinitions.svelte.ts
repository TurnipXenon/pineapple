import { createLocalStore } from "$pkg/util/localStore.svelte";

// export const [getEnablePortraitContext, setEnablePortraitContext] = createContext<LocalStore<boolean>>();
export const getEnablePortraitContext = () => createLocalStore("enable-portrait");
// export const [getEnableDialogPreferenceContext, setEnableDialogPreferenceContext] = createContext<LocalStore<boolean>>();
export const getEnableDialogPreferenceContext = () => createLocalStore("enable-dialog-preference");

// note to self: proper two way binding is seen with the variables below
// see https://svelte.dev/docs/svelte/context#Using-context-with-state
// export const [getEnableDialogOverlayContext, setEnableDialogOverlayContext] = createContext<{value: boolean}>();
export const getEnableDialogOverlayContext = () => ({ value: false });

// export const [getOverlayTypeContext, setOverlayTypeContext] = createContext<LocalStore<OverlayType>>();
export const getOverlayTypeContext = () => createLocalStore("overlay-type");
// export const [getIgnoreOverlayOverride, setIgnoreOverlayOverride] = createContext<boolean>();
export const getIgnoreOverlayOverride = () => ({ value: false });
// export const [getSiteLayout, setSiteLayout] = createContext<PageMeta[]>();
export const getSiteLayout = () => [];
