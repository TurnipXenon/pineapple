import type { LineNodeArguments } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { btreeUtils } from "$pkg/components/dialog_manager/behavior_tree/core/BTreeUtils";
import { IfMode } from "$pkg/components/dialog_manager/behavior_tree/line_processors/IfMode";
import { BehaviorStatus } from "$pkg/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import type { LineBehaviorNode } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";

/**
 * This is a leaf node that returns:
 * - Success: if the currentIfMode is Ignore or EvaluateNext
 * - Failure: otherwise
 */
export class IgnoreGuardNode implements LineBehaviorNode {
	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		const currentIfMode = btreeUtils.peek(nodeArgs.initState.ifModeStack);
		if ([IfMode.Ignore, IfMode.EvaluateNext].includes(currentIfMode)) {
			return {
				nextState: nodeArgs.initState,
				renderedLine: "",
				status: BehaviorStatus.Success
			};
		}

		return {
			nextState: nodeArgs.initState,
			renderedLine: "",
			status: BehaviorStatus.Failure
		};
	}
}
