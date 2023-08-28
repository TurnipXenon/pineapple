import { CommandLogicNode } from "$lib/components/dialog_manager/behavior_tree/expression/commands/CommandLogicNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";

/**
 * Used for command like
 * random_range(1, 2);
 */
export class RandomRangeCommand extends CommandLogicNode {
	/**
	 * From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
	 */
	getRandomInt = (min: number, max: number): number => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		nodeArgs.initState.operandStack.push(
			String(this.getRandomInt(Number(currentOperands[0]), Number(currentOperands[1])))
		);
	};

	getArgumentCount = (): number => {
		return 2;
	};

	getToken = (): string => {
		return "#random_range";
	};
}
