import { OperatorLogicNode, OperatorType } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
export class OrOperator extends OperatorLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        nodeArgs.initState.operandStack.push(String(btreeUtils.isTrue(currentOperands[0]) || btreeUtils.isTrue(currentOperands[1])));
    };
    getOperatorType = () => {
        return OperatorType.Binary;
    };
    getToken = () => {
        return "||";
    };
}
//# sourceMappingURL=OrOperator.js.map