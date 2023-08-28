import { OperatorLogicNode, OperatorType } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
export class InequalityOperator extends OperatorLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        nodeArgs.initState.operandStack.push(String(currentOperands[0] !== currentOperands[1]));
    };
    getOperatorType = () => {
        return OperatorType.Binary;
    };
    getToken = () => {
        return "!=";
    };
}
//# sourceMappingURL=InequalityOperator.js.map