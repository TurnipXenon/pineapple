import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
/**
 * EndIfNode is a leaf node returns the following results:
 * - Success: if it is an endif node, and updates the behaviorState
 * - Failure: if it is not an endif node
 */
export class EndIfNode {
    process(nodeArgs) {
        if (!nodeArgs.line.startsWith("<<endif>>")) {
            return {
                nextState: nodeArgs.initState,
                renderedLine: "",
                status: BehaviorStatus.Failure
            };
        }
        nodeArgs.initState.ifModeStack.pop();
        return {
            nextState: nodeArgs.initState,
            renderedLine: "",
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=EndIfNode.js.map