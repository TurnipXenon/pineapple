import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
export var OperatorType;
(function (OperatorType) {
    OperatorType[OperatorType["Unary"] = 0] = "Unary";
    OperatorType[OperatorType["Binary"] = 1] = "Binary";
})(OperatorType || (OperatorType = {}));
/**
 * a leaf node that will always run success
 * do the processing outside comparing with getToken
 */
export class OperatorLogicNode {
    process(nodeArgs) {
        const currentOperands = [];
        switch (this.getOperatorType()) {
            case OperatorType.Unary:
                currentOperands.unshift(nodeArgs.initState.operandStack.pop());
                break;
            case OperatorType.Binary:
                currentOperands.unshift(nodeArgs.initState.operandStack.pop());
                currentOperands.unshift(nodeArgs.initState.operandStack.pop());
                break;
            default:
                console.error(`Unimplemented operator type: ${this.getOperatorType()}`);
                break;
        }
        this.doOperation(currentOperands, nodeArgs);
        return {
            nextState: nodeArgs.initState,
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=OperatorLogicNode.js.map