import { OperatorLogicNode, OperatorType } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
export class DivisionOperator extends OperatorLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        // todo: Add division protection
        // ISSUE #96 https://github.com/TurnipXenon/pineapple/issues/96
        nodeArgs.initState.operandStack.push(String(Number(currentOperands[0]) / Number(currentOperands[1])));
    };
    getOperatorType = () => {
        return OperatorType.Binary;
    };
    getToken = () => {
        return "/";
    };
}
//# sourceMappingURL=DivisionOperator.js.map