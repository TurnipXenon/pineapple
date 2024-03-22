import {
	OperatorLogicNode,
	OperatorType
} from "$pkg/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import { btreeUtils } from "$pkg/components/dialog_manager/behavior_tree/core/BTreeUtils";

export class XorOperator extends OperatorLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		// todo: evaluate possible weird cases when doing number comparisons
		// ISSUE #88 https://github.com/TurnipXenon/pineapple/issues/88
		const A = btreeUtils.isTrue(currentOperands[0]);
		const B = btreeUtils.isTrue(currentOperands[1]);
		nodeArgs.initState.operandStack.push(String(!((A && B) || A || B)));
	};

	getOperatorType = (): OperatorType => {
		return OperatorType.Binary;
	};

	getToken = (): string => {
		return "^";
	};
}
