import {
	OperatorLogicNode,
	OperatorType
} from "$pkg/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";

export class InequalityOperator extends OperatorLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		nodeArgs.initState.operandStack.push(String(currentOperands[0] !== currentOperands[1]));
	};

	getOperatorType = (): OperatorType => {
		return OperatorType.Binary;
	};

	getToken = (): string => {
		return "!=";
	};
}
