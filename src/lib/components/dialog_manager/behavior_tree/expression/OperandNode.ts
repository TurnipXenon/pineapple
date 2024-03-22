import type { ExpressionBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionBehaviorNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";

/**
 * Puts the token as an operand
 * It's always successful
 */
export class OperandNode implements ExpressionBehaviorNode {
	process(nodeArgs: ExpressionArguments): ExpressionResult {
		nodeArgs.initState.operandStack.push(btreeUtils.simplifyToken(nodeArgs.token));
		return {
			nextState: nodeArgs.initState,
			status: BehaviorStatus.Success
		};
	}
}
