import {
	OperatorLogicNode,
	OperatorType
} from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";

export class EqualityOperator extends OperatorLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		// todo: evaluate possible weird cases when doing number comparisons
		// ISSUE #88 https://github.com/TurnipXenon/pineapple/issues/88
		nodeArgs.initState.operandStack.push(String(currentOperands[0] === currentOperands[1]));
	};

	getOperatorType = (): OperatorType => {
		return OperatorType.Binary;
	};

	getToken = (): string => {
		return "==";
	};
}
