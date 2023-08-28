import type { ExpressionState } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionState";

export interface ExpressionArguments {
	token: string;
	initState: ExpressionState;
}
