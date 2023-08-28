import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
import { dialogVariableStore } from "$lib/components/dialog_manager/DialogManagerStore";
import type { LineBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";
import { expressionEvaluator } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionEvaluator";

/**
 * This is a leaf node that returns:
 * - Success: if it is a set line, and updates a new entry in localStorage
 * - Failure: if it is not a set line
 */
export class SetVariableNode implements LineBehaviorNode {
	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		if (!nodeArgs.line.startsWith("<<set")) {
			return {
				nextState: nodeArgs.initState,
				renderedLine: "",
				status: BehaviorStatus.Failure
			};
		}

		const setValuePair = nodeArgs.line.split("=");
		const key = setValuePair[0].slice("<<set ".length).trim();
		setValuePair.shift();
		const preValue = setValuePair.join("=").trim();
		const value = expressionEvaluator.evaluateFreeform(preValue, "");
		dialogVariableStore.setItem(key, btreeUtils.peek(value));

		return {
			nextState: nodeArgs.initState,
			renderedLine: "",
			status: BehaviorStatus.Success
		};
	}
}
