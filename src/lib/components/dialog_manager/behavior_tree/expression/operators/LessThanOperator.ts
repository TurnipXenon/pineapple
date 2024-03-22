import {
	OperatorLogicNode,
	OperatorType
} from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";

export class LessThanOperator extends OperatorLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		nodeArgs.initState.operandStack.push(
			String(Number(currentOperands[0]) < Number(currentOperands[1]))
		);
	};

	getOperatorType = (): OperatorType => {
		return OperatorType.Binary;
	};

	getToken = (): string => {
		return "<";
	};
}
