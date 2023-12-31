// this file was generated by PineappleWeaver.ts
// do not edit!
			
import { PortraitType } from "$lib/types/pineapple_fiber/PortraitType";
import { dialogManager } from "$lib/components/dialog_manager/DialogManagerStore";
import type { DialogDetail } from "$lib/types/pineapple_fiber/DialogDetail";

class _ErrorYarn {
	dialogList: DialogDetail[] = [
		{
			dialogId: "ErrorStart",
			portraitType: PortraitType.AresDisappointed,
			textContent: `<p>Huh... We didn't find that page. Sorry about that. You can go back to our <a href="/">homepage.</a><br>
Gomen oomf chan o(TヘTo)</p>`
		},
	];
	
	/* Remember to call DialogManager.subscribeToSetDialogChoice before calling this in Svelte */
	setDialogTree = () => {
		dialogManager.setDialogTree(this.dialogList);
	};
}

export const ErrorYarn = new _ErrorYarn();
