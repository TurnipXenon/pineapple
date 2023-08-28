import {
	OperatorLogicNode,
	OperatorType
} from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";

export class OrOperator extends OperatorLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		nodeArgs.initState.operandStack.push(
			String(btreeUtils.isTrue(currentOperands[0]) || btreeUtils.isTrue(currentOperands[1]))
		);
	};

	getOperatorType = (): OperatorType => {
		return OperatorType.Binary;
	};

	getToken = (): string => {
		return "||";
	};
}
