import type { CommandLogicNode } from "$pkg/components/dialog_manager/behavior_tree/expression/commands/CommandLogicNode";
import { RandomRangeCommand } from "$pkg/components/dialog_manager/behavior_tree/expression/commands/RandomRangeCommand";
import { VisitedCountCommand } from "$pkg/components/dialog_manager/behavior_tree/expression/commands/VisitedCountCommand";
import { VisitedCommand } from "$pkg/components/dialog_manager/behavior_tree/expression/commands/VisitedCommand";

class CommandMap {
	_commandMap: Map<string, CommandLogicNode> = new Map();

	constructor() {
		[new RandomRangeCommand(), new VisitedCountCommand(), new VisitedCommand()].forEach(
			(commandLogic) => {
				this._commandMap.set(commandLogic.getToken(), commandLogic);
			}
		);
	}

	get = (command: string): CommandLogicNode | undefined => {
		return this._commandMap.get(command);
	};

	exists = (command: string): boolean => {
		return this.get(command) !== undefined;
	};
}

export const commandMap = new CommandMap();
