import type { ExpressionBehaviorNode } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionBehaviorNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionResult";
import { BehaviorStatus } from "$pkg/components/dialog_manager/behavior_tree/core/BehaviorStatus";

export abstract class CommandLogicNode implements ExpressionBehaviorNode {
	abstract getToken: () => string;
	abstract getArgumentCount: () => number;
	abstract doOperation: (currentOperands: string[], nodeArgs: ExpressionArguments) => void; // do side effects on to the result instead

	process(nodeArgs: ExpressionArguments): ExpressionResult {
		const currentOperands = nodeArgs.initState.operandStack.slice(
			nodeArgs.initState.operandStack.length - this.getArgumentCount(),
			nodeArgs.initState.operandStack.length
		);
		nodeArgs.initState.operandStack = nodeArgs.initState.operandStack.slice(
			0,
			nodeArgs.initState.operandStack.length - this.getArgumentCount()
		);

		if (currentOperands.length !== this.getArgumentCount()) {
			console.error(`Insufficient operands/arguments found for command ${this.getToken()}`);
			console.error(`Arguments found instead: ${currentOperands}`);
			console.error(`Error occurred at token: ${nodeArgs.token}`);
		} else {
			this.doOperation(currentOperands, nodeArgs);
		}

		return {
			nextState: nodeArgs.initState,
			status: BehaviorStatus.Success
		};
	}
}
