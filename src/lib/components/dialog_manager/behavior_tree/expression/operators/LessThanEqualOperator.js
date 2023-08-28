import { OperatorLogicNode, OperatorType } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
export class LessThanEqualOperator extends OperatorLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        nodeArgs.initState.operandStack.push(String(Number(currentOperands[0]) <= Number(currentOperands[1])));
    };
    getOperatorType = () => {
        return OperatorType.Binary;
    };
    getToken = () => {
        return "<=";
    };
}
//# sourceMappingURL=LessThanEqualOperator.js.map