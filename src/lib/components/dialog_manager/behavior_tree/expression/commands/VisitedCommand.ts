import { CommandLogicNode } from "$lib/components/dialog_manager/behavior_tree/expression/commands/CommandLogicNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import { VisitedCountCommand } from "$lib/components/dialog_manager/behavior_tree/expression/commands/VisitedCountCommand";

/**
 * Used for command like
 * visited("node name here");
 *
 * Pushes a boolean in the operand stack
 *
 * Some design decision note:
 * I opted for composition over inheritance.
 * This may look like a good case for composition but my philosophy is if they both are equally
 * viable, always prefer composition. It will help in the long run if we do refactoring
 */
export class VisitedCommand extends CommandLogicNode {
	visitedCountCommand = new VisitedCountCommand();

	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		this.visitedCountCommand.process(nodeArgs);

		const value = Number(nodeArgs.initState.operandStack.pop());

		if (isNaN(value) || value === 0) {
			nodeArgs.initState.operandStack.push("false");
		} else {
			nodeArgs.initState.operandStack.push("true");
		}
	};

	getArgumentCount = (): number => {
		return 0; // let the child work; this is only a decorator
	};

	getToken = (): string => {
		return "#visited";
	};
}
