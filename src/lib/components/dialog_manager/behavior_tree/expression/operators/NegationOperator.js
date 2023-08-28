import { OperatorLogicNode, OperatorType } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
export class NegationOperator extends OperatorLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        nodeArgs.initState.operandStack.push(String(!btreeUtils.isTrue(currentOperands[0])));
    };
    getOperatorType = () => {
        return OperatorType.Unary;
    };
    getToken = () => {
        return "!";
    };
}
//# sourceMappingURL=NegationOperator.js.map