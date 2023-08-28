import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
/**
 * Puts the token as an operand
 * It's always successful
 */
export class OperandNode {
    process(nodeArgs) {
        nodeArgs.initState.operandStack.push(btreeUtils.simplifyToken(nodeArgs.token));
        return {
            nextState: nodeArgs.initState,
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=OperandNode.js.map