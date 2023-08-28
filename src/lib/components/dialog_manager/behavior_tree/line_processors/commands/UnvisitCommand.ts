import type { LineBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";
import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { dialogVariableStore } from "$lib/components/dialog_manager/DialogManagerStore";
import { browser } from "$app/environment";

/**
 * Unvisits a node
 */
export class UnvisitCommand implements LineBehaviorNode {
	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		if (!nodeArgs.line.startsWith("<<unvisit") || !browser) {
			return {
				renderedLine: "",
				nextState: nodeArgs.initState,
				status: BehaviorStatus.Failure
			};
		}

		const nodeName = nodeArgs.line
			.slice("<<unvisit ".length, nodeArgs.line.length - ">>".length)
			.replace(/^\{/, "") // remove possible " at the start: https://stackoverflow.com/a/2182602
			.replace(/}$/, ""); // remove possible " at the end: https://stackoverflow.com/a/12249011;
		const key = `+${nodeName}`;
		dialogVariableStore.removeItem(key);

		return {
			nextState: nodeArgs.initState,
			renderedLine: "",
			status: BehaviorStatus.Success
		};
	}
}
