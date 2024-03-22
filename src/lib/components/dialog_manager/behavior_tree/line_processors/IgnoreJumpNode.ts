import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import type { LineBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";
import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";

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
