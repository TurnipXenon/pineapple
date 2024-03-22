import { BehaviorStatus } from "$pkg/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import type { LineBehaviorNode } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";
import type { LineNodeArguments } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";

export class IgnoreJumpNode implements LineBehaviorNode {
	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		if (!nodeArgs.line.startsWith("// ignore jumps")) {
			return {
				renderedLine: "",
				nextState: nodeArgs.initState,
				status: BehaviorStatus.Failure
			};
		}

		nodeArgs.initState.ignoreJumps = true;

		return {
			renderedLine: "",
			nextState: nodeArgs.initState,
			status: BehaviorStatus.Success
		};
	}
}
