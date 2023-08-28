import type { BehaviorState } from "$lib/components/dialog_manager/behavior_tree/line_processors/BehaviorState";
import type { BaseBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/core/BaseBehaviorResult";

export interface LineBehaviorResult extends BaseBehaviorResult {
	renderedLine: string;
	nextState: BehaviorState;
}
