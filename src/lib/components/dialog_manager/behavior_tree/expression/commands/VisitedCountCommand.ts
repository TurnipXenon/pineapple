import { CommandLogicNode } from "$pkg/components/dialog_manager/behavior_tree/expression/commands/CommandLogicNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import { dialogVariableStore } from "$pkg/components/dialog_manager/DialogManagerStore";

/**
 * Used for command like
 * visited_count("node name here");
 *
 * Pushed a number in the operand stack
 */
export class VisitedCountCommand extends CommandLogicNode {
	doOperation = (currentOperands: string[], nodeArgs: ExpressionArguments) => {
		const value = Number(dialogVariableStore.getItem(`+${currentOperands[0]}`));
		if (isNaN(value) || value === 0) {
			nodeArgs.initState.operandStack.push("0");
		} else {
			nodeArgs.initState.operandStack.push(String(value));
		}
	};

	getArgumentCount = (): number => {
		return 1;
	};

	getToken = (): string => {
		return "#visited_count";
	};
}
