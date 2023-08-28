import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
export class LineCommentNode {
    process(nodeArgs) {
        if (!nodeArgs.line.startsWith("//")) {
            return {
                renderedLine: "",
                nextState: nodeArgs.initState,
                status: BehaviorStatus.Failure
            };
        }
        return {
            renderedLine: "",
            nextState: nodeArgs.initState,
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=LineCommentNode.js.map