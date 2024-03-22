import {
	OperatorLogicNode,
	OperatorType
} from "$pkg/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import { btreeUtils } from "$pkg/components/dialog_manager/behavior_tree/core/BTreeUtils";

export class NegationOperator extends OperatorLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		nodeArgs.initState.operandStack.push(String(!btreeUtils.isTrue(currentOperands[0])));
	};

	getOperatorType = (): OperatorType => {
		return OperatorType.Unary;
	};

	getToken = (): string => {
		return "!";
	};
}
