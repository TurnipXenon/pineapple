import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
export class IgnoreJumpNode {
    process(nodeArgs) {
        if (!nodeArgs.line.startsWith("// ignore jumps")) {
            return {
                renderedLine: "",
                nextState: nodeArgs.initState,
                status: BehaviorStatus.Failure
            };
        }
        nodeArgs.initState.ignoreJumps = true;
        return {
            renderedLine: "",
            nextState: nodeArgs.initState,
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=IgnoreJumpNode.js.map