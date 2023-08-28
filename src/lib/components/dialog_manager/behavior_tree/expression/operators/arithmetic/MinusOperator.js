import { OperatorLogicNode, OperatorType } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
export class MinusOperator extends OperatorLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        // todo: evaluate possible weird cases when doing number comparisons
        // ISSUE #88 https://github.com/TurnipXenon/pineapple/issues/88
        nodeArgs.initState.operandStack.push(String(Number(currentOperands[0]) - Number(currentOperands[1])));
    };
    getOperatorType = () => {
        return OperatorType.Binary;
    };
    getToken = () => {
        return "-";
    };
}
//# sourceMappingURL=MinusOperator.js.map