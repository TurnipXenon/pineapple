import { OperatorLogicNode, OperatorType } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
export class AndOperator extends OperatorLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        // todo: evaluate possible weird cases when doing number comparisons
        // ISSUE #88 https://github.com/TurnipXenon/pineapple/issues/88
        nodeArgs.initState.operandStack.push(String(btreeUtils.isTrue(currentOperands[0]) && btreeUtils.isTrue(currentOperands[1])));
    };
    getOperatorType = () => {
        return OperatorType.Binary;
    };
    getToken = () => {
        return "&&";
    };
}
//# sourceMappingURL=AndOperator.js.map