import { dialogVariableStore } from "$pkg/components/dialog_manager/DialogManagerStore";

class _DialogUtils {
	isNodeVisited = (dialogId: string): boolean => {
		const value = Number(dialogVariableStore.getItem(`+${dialogId}`));
		return !isNaN(value) && value > 0;
	};
}

export const DialogUtils = new _DialogUtils();
