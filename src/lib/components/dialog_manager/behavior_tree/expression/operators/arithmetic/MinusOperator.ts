import {
	OperatorLogicNode,
	OperatorType
} from "$pkg/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";

export class MinusOperator extends OperatorLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		// todo: evaluate possible weird cases when doing number comparisons
		// ISSUE #88 https://github.com/TurnipXenon/pineapple/issues/88
		nodeArgs.initState.operandStack.push(
			String(Number(currentOperands[0]) - Number(currentOperands[1]))
		);
	};

	getOperatorType = (): OperatorType => {
		return OperatorType.Binary;
	};

	getToken = (): string => {
		return "-";
	};
}
