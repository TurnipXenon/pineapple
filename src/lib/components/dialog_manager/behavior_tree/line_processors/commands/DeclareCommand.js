import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { SetVariableNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/SetVariableNode";
export class DeclareCommand {
    setVariableNode = new SetVariableNode();
    process(nodeArgs) {
        if (!nodeArgs.line.startsWith("<<declare")) {
            return {
                renderedLine: "",
                nextState: nodeArgs.initState,
                status: BehaviorStatus.Failure
            };
        }
        // determine if we need to set?
        const setValuePair = nodeArgs.line.split("=");
        const key = setValuePair[0].slice("<<declare ".length).trim(); // remove "<<declare "
        if (localStorage.getItem(key) !== null) {
            return {
                renderedLine: "",
                nextState: nodeArgs.initState,
                status: BehaviorStatus.Success
            };
        }
        // if it does not exist, let's set it!
        setValuePair.shift();
        const preValue = setValuePair.join("=").split(" as ");
        preValue.pop(); // remove " as ??? >>"
        const value = preValue.join(" as ");
        const result = this.setVariableNode.process({
            initState: nodeArgs.initState,
            line: `<<set ${key} = ${value}>>`,
            lineIndex: nodeArgs.lineIndex
        });
        return {
            nextState: result.nextState,
            renderedLine: "",
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=DeclareCommand.js.map