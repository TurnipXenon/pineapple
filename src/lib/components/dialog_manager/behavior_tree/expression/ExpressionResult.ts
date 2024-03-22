import type { BaseBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/core/BaseBehaviorResult";
import type { ExpressionState } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionState";

export interface ExpressionResult extends BaseBehaviorResult {
	nextState: ExpressionState;
}
