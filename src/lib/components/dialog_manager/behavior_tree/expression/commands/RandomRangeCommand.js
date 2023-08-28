import { CommandLogicNode } from "$lib/components/dialog_manager/behavior_tree/expression/commands/CommandLogicNode";
/**
 * Used for command like
 * random_range(1, 2);
 */
export class RandomRangeCommand extends CommandLogicNode {
    /**
     * From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
     */
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    doOperation = (currentOperands, nodeArgs) => {
        nodeArgs.initState.operandStack.push(String(this.getRandomInt(Number(currentOperands[0]), Number(currentOperands[1]))));
    };
    getArgumentCount = () => {
        return 2;
    };
    getToken = () => {
        return "#random_range";
    };
}
//# sourceMappingURL=RandomRangeCommand.js.map