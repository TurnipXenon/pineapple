import { commandMap } from "$lib/components/dialog_manager/behavior_tree/expression/commands/CommandMap";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
export class CommandExpressionNode {
    process(nodeArgs) {
        const commandNode = commandMap.get(nodeArgs.token);
        if (commandNode === undefined) {
            if (nodeArgs.token.startsWith("#")) {
                console.error(`Unimplemented command: ${nodeArgs.token}`);
            }
            return {
                nextState: nodeArgs.initState,
                status: BehaviorStatus.Failure
            };
        }
        commandNode.process(nodeArgs);
        return {
            nextState: nodeArgs.initState,
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=CommandExpressionNode.js.map