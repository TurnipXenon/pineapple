import type { BehaviorState } from "$pkg/components/dialog_manager/behavior_tree/line_processors/BehaviorState";
import type { BaseBehaviorResult } from "$pkg/components/dialog_manager/behavior_tree/core/BaseBehaviorResult";

export interface LineBehaviorResult extends BaseBehaviorResult {
	renderedLine: string;
	nextState: BehaviorState;
}
