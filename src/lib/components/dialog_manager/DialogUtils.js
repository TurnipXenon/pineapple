import { dialogVariableStore } from "$lib/components/dialog_manager/DialogManagerStore";
class _DialogUtils {
    isNodeVisited = (dialogId) => {
        const value = Number(dialogVariableStore.getItem(`+${dialogId}`));
        return !isNaN(value) && value > 0;
    };
}
export const DialogUtils = new _DialogUtils();
//# sourceMappingURL=DialogUtils.js.map