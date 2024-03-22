import type { ExpressionBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionBehaviorNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";

export enum OperatorType {
	Unary,
	Binary
}

/**
 * a leaf node that will always run success
 * do the processing outside comparing with getToken
 */
export abstract class OperatorLogicNode implements ExpressionBehaviorNode {
	abstract getToken: () => string;
	abstract getOperatorType: () => OperatorType;
	abstract doOperation: (currentOperands: string[], nodeArgs: ExpressionArguments) => void;

	process(nodeArgs: ExpressionArguments): ExpressionResult {
		const currentOperands: string[] = [];
		switch (this.getOperatorType()) {
			case OperatorType.Unary:
				currentOperands.unshift(<string>nodeArgs.initState.operandStack.pop());
				break;
			case OperatorType.Binary:
				currentOperands.unshift(<string>nodeArgs.initState.operandStack.pop());
				currentOperands.unshift(<string>nodeArgs.initState.operandStack.pop());
				break;
			default:
				console.error(`Unimplemented operator type: ${this.getOperatorType()}`);
				break;
		}

		this.doOperation(currentOperands, nodeArgs);

		return {
			nextState: nodeArgs.initState,
			status: BehaviorStatus.Success
		};
	}
}
