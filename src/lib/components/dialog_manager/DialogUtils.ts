import { dialogManager } from "$lib/components/dialog_manager/DialogManager";

class _DialogUtils {
	isNodeVisited = (dialogId: string): boolean => {
		const value = Number(dialogManager.dialogVariableStore.getItem(`+${dialogId}`));
		return !isNaN(value) && value > 0;
	};
}

export const DialogUtils = new _DialogUtils();
