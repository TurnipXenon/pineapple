import type { ExpressionBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionBehaviorNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionResult";
import { commandMap } from "$lib/components/dialog_manager/behavior_tree/expression/commands/CommandMap";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";

export class CommandExpressionNode implements ExpressionBehaviorNode {
	process(nodeArgs: ExpressionArguments): ExpressionResult {
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
