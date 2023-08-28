import { OperatorLogicNode, OperatorType } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
export class XorOperator extends OperatorLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        // todo: evaluate possible weird cases when doing number comparisons
        // ISSUE #88 https://github.com/TurnipXenon/pineapple/issues/88
        const A = btreeUtils.isTrue(currentOperands[0]);
        const B = btreeUtils.isTrue(currentOperands[1]);
        nodeArgs.initState.operandStack.push(String(!((A && B) || A || B)));
    };
    getOperatorType = () => {
        return OperatorType.Binary;
    };
    getToken = () => {
        return "^";
    };
}
//# sourceMappingURL=XorOperator.js.map