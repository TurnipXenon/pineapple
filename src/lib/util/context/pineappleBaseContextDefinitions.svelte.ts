import type { OverlayType, PageMeta } from "$pkg";
import { createLocalStore, type LocalStore } from "$pkg/util/localStore.svelte";
import { get, writable, type Writable } from "svelte/store";

let enablePortraitContext: LocalStore<boolean> = createLocalStore("enable-portrait");
let enableDialogPreferenceContext: LocalStore<boolean> = createLocalStore("enable-dialog-preference");
let overlayTypeContext: LocalStore<OverlayType> = createLocalStore("overlay-type");
let enableDialogOverlayContext: Writable<boolean> = writable(get(enableDialogPreferenceContext));
let ignoreOverlayOverride = true;
let siteLayout: PageMeta[] = [];

export const getEnablePortraitContext = () => enablePortraitContext;
export const setEnablePortraitContext = (value: LocalStore<boolean>) => {
	enablePortraitContext = value;
};

export const getEnableDialogPreferenceContext = () => enableDialogPreferenceContext;
export const setEnableDialogPreferenceContext = (value: LocalStore<boolean>) => {
	enableDialogPreferenceContext = value;
};

export const getEnableDialogOverlayContext = () => enableDialogOverlayContext;
export const setEnableDialogOverlayContext = (value: Writable<boolean>) => {
	enableDialogOverlayContext = value;
};

export const getOverlayTypeContext = () => overlayTypeContext;
export const setOverlayTypeContext = (value: LocalStore<OverlayType>) => {
	overlayTypeContext = value;
};

export const getIgnoreOverlayOverride = () => ignoreOverlayOverride;
export const setIgnoreOverlayOverride = (value: boolean) => {
	ignoreOverlayOverride = value;
};

export const getSiteLayout = () => siteLayout;
export const setSiteLayout = (value: PageMeta[]) => {
	siteLayout = value;
};
