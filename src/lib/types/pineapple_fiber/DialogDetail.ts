import type { PortraitType } from "$lib/types/pineapple_fiber/PortraitType";

export interface DialogDetail {
	textContent: string;
	dialogId?: string;
	portraitType?: PortraitType;
}
