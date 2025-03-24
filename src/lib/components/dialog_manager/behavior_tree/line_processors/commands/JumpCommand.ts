import type { LineBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";
import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { SetVariableNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/SetVariableNode";
import { dialogManager } from "$lib/components/dialog_manager/DialogManagerStore";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";

export class JumpCommand implements LineBehaviorNode {
	setVariableNode = new SetVariableNode();

	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		if (!nodeArgs.line.startsWith("<<jump")) {
			return {
				renderedLine: "",
				nextState: nodeArgs.initState,
				status: BehaviorStatus.Failure
			};
		}

		if (nodeArgs.initState.ignoreJumps) {
			return {
				nextState: nodeArgs.initState,
				renderedLine: "",
				status: BehaviorStatus.Success
			};
		}

		const choiceName = nodeArgs.line
			.slice("<<jump ".length, nodeArgs.line.length - ">>".length)
			.replace(/^\{/, "") // remove possible " at the start: https://stackoverflow.com/a/2182602
			.replace(/}$/, ""); // remove possible " at the end: https://stackoverflow.com/a/12249011;
		const dialogChoice = dialogManager.dialogMessageMap.get(btreeUtils.simplifyToken(choiceName));
		if (dialogChoice !== undefined) {
			// force choice
			dialogManager.setDialogChoice(dialogChoice);
		} else {
			console.error(
				`Unknown jump node at line ${
					nodeArgs.lineIndex + 1
				}: ${choiceName} or ${btreeUtils.simplifyToken(choiceName)}`
			);
		}

		return {
			nextState: nodeArgs.initState,
			renderedLine: "",
			status: BehaviorStatus.Success
		};
	}
}
