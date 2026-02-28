import type { ExpressionState } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionState";
import type { DialogMapStore } from "$lib/types/pineapple_fiber/DialogVariableStore";

export interface ExpressionArguments {
	token: string;
	initState: ExpressionState;
	dialogVariableStore: DialogMapStore;
}
