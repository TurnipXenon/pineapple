import type { IDialogManager } from "$pkg/components/dialog_manager/IDialogManager";
import type { DialogManager } from "$pkg/components/dialog_manager/DialogManager";

/**
 * strictly must be declared last! or you might receive a weird error that looks like:
 *
 * 2:04:21 AM [vite] Error when evaluating SSR module /src/lib/components/dialog_manager/DialogManagerStore.ts:
 * |- TypeError: Cannot read properties of undefined (reading '0')
 *     at <instance_members_initializer> (/src/lib/components/dialog_manager/DialogManager.ts:38:67)
 *     at new DialogManager (/src/lib/components/dialog_manager/DialogManager.ts:53:14)
 *     at eval (/src/lib/components/dialog_manager/DialogManagerStore.ts:15:23)
 *     at async instantiateModule (file:///C:/Users/Pumpkin/Projects/Web/pineapple/node_modules/vite/dist/node/chunks/dep-934dbc7c.js:54360:9)
 *
 * what this means is that one member of dialogManager cannot be initialized. in our case, it was the
 * defaultDialogMessage not yet being initialized
 */
let _dialogManager: IDialogManager | undefined = undefined;
export const getDialogManager = async () => {
	if (_dialogManager === undefined) {
		const dm = await import('./DialogManager');
		_dialogManager = new dm.DialogManager();	
	}
	
	return _dialogManager;
};
