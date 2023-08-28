import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { IfMode } from "$lib/components/dialog_manager/behavior_tree/line_processors/IfMode";
import type { LineBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";
import { expressionEvaluator } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionEvaluator";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";

/**
 * IfNode is a leaf node which tries to determine whether the current line is an
 * if statement and returns:
 * - Success: if it is an if node, successfully processes a line, and updates the behaviorState
 * - Failure: if it is not an if node or we did not want to process the line
 */
export class IfNode implements LineBehaviorNode {
	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		if (!nodeArgs.line.startsWith("<<if")) {
			return {
				renderedLine: "",
				nextState: nodeArgs.initState,
				status: BehaviorStatus.Failure
			};
		}

		const currentIfMode = btreeUtils.peek(nodeArgs.initState.ifModeStack);
		if ([IfMode.EvaluateNext, IfMode.Ignore].includes(currentIfMode)) {
			// skip! we found a nested if
			console.log("Skipping if node because");
			nodeArgs.initState.ifModeStack.push(IfMode.Ignore);
			return {
				renderedLine: "",
				nextState: nodeArgs.initState,
				status: BehaviorStatus.Success
			};
		}

		if (expressionEvaluator.evaluate(nodeArgs.line, "<<if")) {
			nodeArgs.initState.ifModeStack.push(IfMode.Evaluated);
		} else {
			nodeArgs.initState.ifModeStack.push(IfMode.EvaluateNext);
		}

		return {
			renderedLine: "",
			nextState: nodeArgs.initState,
			status: BehaviorStatus.Success
		};
	}
}
