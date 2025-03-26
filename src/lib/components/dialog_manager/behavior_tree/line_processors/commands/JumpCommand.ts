import type { LineBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";
import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import { SetVariableNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/SetVariableNode";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
import { getDialogManager } from "$pkg/components/dialog_manager/DialogMangerInit";
import type { IDialogManager } from "$pkg";

export class JumpCommand implements LineBehaviorNode {
	setVariableNode = new SetVariableNode();
	dialogManager: undefined | IDialogManager = undefined;

	constructor() {
		getDialogManager().then(dm => this.dialogManager = dm);
	}

	process(nodeArgs: LineNodeArguments): LineBehaviorResult {
		if (this.dialogManager === undefined) {
			console.error('Dialog Manger not yet initialized');
			return {
				renderedLine: "",
				nextState: nodeArgs.initState,
				status: BehaviorStatus.Failure
			};
		}

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
		const dialogChoice = this.dialogManager.dialogMessageMap.get(btreeUtils.simplifyToken(choiceName));
		if (dialogChoice !== undefined) {
			// force choice
			this.dialogManager.setDialogChoice(dialogChoice);
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
