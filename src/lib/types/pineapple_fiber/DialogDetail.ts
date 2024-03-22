import type { PortraitType } from "$pkg/types/pineapple_fiber/PortraitType";

export interface DialogDetail {
	textContent: string;
	dialogId?: string;
	portraitType?: PortraitType;
}
