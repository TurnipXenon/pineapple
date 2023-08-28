import { CommandLogicNode } from "$lib/components/dialog_manager/behavior_tree/expression/commands/CommandLogicNode";
import { dialogVariableStore } from "$lib/components/dialog_manager/DialogManagerStore";
/**
 * Used for command like
 * visited_count("node name here");
 *
 * Pushed a number in the operand stack
 */
export class VisitedCountCommand extends CommandLogicNode {
    doOperation = (currentOperands, nodeArgs) => {
        const value = Number(dialogVariableStore.getItem(`+${currentOperands[0]}`));
        if (isNaN(value) || value === 0) {
            nodeArgs.initState.operandStack.push("0");
        }
        else {
            nodeArgs.initState.operandStack.push(String(value));
        }
    };
    getArgumentCount = () => {
        return 1;
    };
    getToken = () => {
        return "#visited_count";
    };
}
//# sourceMappingURL=VisitedCountCommand.js.map