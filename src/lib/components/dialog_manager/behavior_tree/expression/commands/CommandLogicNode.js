import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
export class CommandLogicNode {
    process(nodeArgs) {
        const currentOperands = nodeArgs.initState.operandStack.slice(nodeArgs.initState.operandStack.length - this.getArgumentCount(), nodeArgs.initState.operandStack.length);
        nodeArgs.initState.operandStack = nodeArgs.initState.operandStack.slice(0, nodeArgs.initState.operandStack.length - this.getArgumentCount());
        if (currentOperands.length !== this.getArgumentCount()) {
            console.error(`Insufficient operands/arguments found for command ${this.getToken()}`);
            console.error(`Arguments found instead: ${currentOperands}`);
            console.error(`Error occurred at token: ${nodeArgs.token}`);
        }
        else {
            this.doOperation(currentOperands, nodeArgs);
        }
        return {
            nextState: nodeArgs.initState,
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=CommandLogicNode.js.map