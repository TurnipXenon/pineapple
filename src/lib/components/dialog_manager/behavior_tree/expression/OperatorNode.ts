import type { ExpressionBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionBehaviorNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { operatorMap } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorMap";

/**
 * A leaf node that returns:
 * - Success if the current token is an operator, and does its associated logic
 * - Failure if it is not an operator
 */
export class OperatorNode implements ExpressionBehaviorNode {
	process(nodeArgs: ExpressionArguments): ExpressionResult {
		if (!operatorMap.exists(nodeArgs.token)) {
			return {
				nextState: nodeArgs.initState,
				status: BehaviorStatus.Failure
			};
		}

		const logic = operatorMap.get(nodeArgs.token);
		if (logic === undefined) {
			console.error(`Unimplemented operator: ${nodeArgs.token}`);
			return {
				nextState: nodeArgs.initState,
				status: BehaviorStatus.Failure
			};
		}

		logic.process(nodeArgs);

		return {
			nextState: nodeArgs.initState,
			status: BehaviorStatus.Success
		};
	}
}
