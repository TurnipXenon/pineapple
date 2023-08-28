import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import type { LineBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";

/**
 * EndIfNode is a leaf node returns the following results:
 * - Success: if it is an endif node, and updates the behaviorState
 * - Failure: if it is not an endif node
 */
export class EndIfNode implements LineBehaviorNode {
	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		if (!nodeArgs.line.startsWith("<<endif>>")) {
			return {
				nextState: nodeArgs.initState,
				renderedLine: "",
				status: BehaviorStatus.Failure
			};
		}

		nodeArgs.initState.ifModeStack.pop();
		return {
			nextState: nodeArgs.initState,
			renderedLine: "",
			status: BehaviorStatus.Success
		};
	}
}
