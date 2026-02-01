import type { OverlayType, PageMeta } from "$pkg";
import type { LocalStore } from "$pkg/util/localStore.svelte";
import { getContext, setContext } from "svelte";

const enablePortraitKey = Symbol("enable-portrait");
const enableDialogPreferenceKey = Symbol("enable-dialog-preference");
const enableDialogOverlayKey = Symbol("enable-dialog-overlay");
const overlayTypeKey = Symbol("overlay-type");
const ignoreOverlayOverrideKey = Symbol("ignore-overlay-override");
const siteLayoutKey = Symbol("site-layout");

export const getEnablePortraitContext = () => getContext<LocalStore<boolean>>(enablePortraitKey);
export const setEnablePortraitContext = (value: LocalStore<boolean>) =>
	setContext(enablePortraitKey, value);

export const getEnableDialogPreferenceContext = () =>
	getContext<LocalStore<boolean>>(enableDialogPreferenceKey);
export const setEnableDialogPreferenceContext = (value: LocalStore<boolean>) =>
	setContext(enableDialogPreferenceKey, value);

// note to self: proper two way binding is seen with the variables below
// see https://svelte.dev/docs/svelte/context#Using-context-with-state
export const getEnableDialogOverlayContext = () =>
	getContext<{ value: boolean }>(enableDialogOverlayKey);
export const setEnableDialogOverlayContext = (value: { value: boolean }) =>
	setContext(enableDialogOverlayKey, value);

export const getOverlayTypeContext = () => getContext<LocalStore<OverlayType>>(overlayTypeKey);
export const setOverlayTypeContext = (value: LocalStore<OverlayType>) =>
	setContext(overlayTypeKey, value);

export const getIgnoreOverlayOverride = () => getContext<boolean>(ignoreOverlayOverrideKey);
export const setIgnoreOverlayOverride = (value: boolean) =>
	setContext(ignoreOverlayOverrideKey, value);

export const getSiteLayout = () => getContext<PageMeta[]>(siteLayoutKey);
export const setSiteLayout = (value: PageMeta[]) => setContext(siteLayoutKey, value);
