import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
import { IfMode } from "$lib/components/dialog_manager/behavior_tree/line_processors/IfMode";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
/**
 * This is a leaf node that returns:
 * - Success: if the currentIfMode is Ignore or EvaluateNext
 * - Failure: otherwise
 */
export class IgnoreGuardNode {
    process(nodeArgs) {
        const currentIfMode = btreeUtils.peek(nodeArgs.initState.ifModeStack);
        if ([IfMode.Ignore, IfMode.EvaluateNext].includes(currentIfMode)) {
            return {
                nextState: nodeArgs.initState,
                renderedLine: "",
                status: BehaviorStatus.Success
            };
        }
        return {
            nextState: nodeArgs.initState,
            renderedLine: "",
            status: BehaviorStatus.Failure
        };
    }
}
//# sourceMappingURL=IgnoreGuardNode.js.map