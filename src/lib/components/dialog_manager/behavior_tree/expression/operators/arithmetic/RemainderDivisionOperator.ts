import {
	OperatorLogicNode,
	OperatorType
} from "$pkg/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";

export class RemainderDivisionOperator extends OperatorLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		// todo: Add division protection
		// ISSUE #96 https://github.com/TurnipXenon/pineapple/issues/96
		nodeArgs.initState.operandStack.push(
			String(Number(currentOperands[0]) % Number(currentOperands[1]))
		);
	};

	getOperatorType = (): OperatorType => {
		return OperatorType.Binary;
	};

	getToken = (): string => {
		return "%";
	};
}
