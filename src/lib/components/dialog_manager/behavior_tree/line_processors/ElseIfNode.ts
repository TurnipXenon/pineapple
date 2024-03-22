import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
import { IfMode } from "$lib/components/dialog_manager/behavior_tree/line_processors/IfMode";
import type { LineBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";
import { expressionEvaluator } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionEvaluator";

/**
 * ElseIfNode is a leaf node that returns:
 * - Success if it is an elseif node, and updates the behaviorState
 * - Failure if it is not an elseif node
 */
export class ElseIfNode implements LineBehaviorNode {
	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		if (!nodeArgs.line.startsWith("<<elseif")) {
			return {
				nextState: nodeArgs.initState,
				renderedLine: "",
				status: BehaviorStatus.Failure
			};
		}

		const currentIfMode = btreeUtils.peek(nodeArgs.initState.ifModeStack);
		switch (currentIfMode) {
			case IfMode.Search:
				// probably a syntax error
				console.error("Syntax error found in yarn dialog!");
				console.error(`Check out line ${nodeArgs.lineIndex + 1}: ${nodeArgs.line}`);
				break;
			case IfMode.Ignore:
				// just move on
				break;
			case IfMode.Evaluated:
				// previous case was true therefore ignore
				nodeArgs.initState.ifModeStack.pop();
				nodeArgs.initState.ifModeStack.push(IfMode.Ignore);
				break;
			case IfMode.EvaluateNext:
				// since all the previous evaluations were false,
				// let's try evaluating this like the if statement
				if (expressionEvaluator.evaluate(nodeArgs.line, "<<elseif")) {
					nodeArgs.initState.ifModeStack.pop();
					nodeArgs.initState.ifModeStack.push(IfMode.Evaluated);
				} // else: retain the EvaluateNext status
				break;
			default:
				console.error("Unimplemented if state!");
				console.error(`Check out line ${nodeArgs.lineIndex + 1}: ${nodeArgs.line}`);
				break;
		}

		return {
			nextState: nodeArgs.initState,
			renderedLine: "",
			status: BehaviorStatus.Success
		};
	}
}
