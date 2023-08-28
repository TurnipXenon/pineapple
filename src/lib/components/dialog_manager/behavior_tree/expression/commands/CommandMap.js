import { RandomRangeCommand } from "$lib/components/dialog_manager/behavior_tree/expression/commands/RandomRangeCommand";
import { VisitedCountCommand } from "$lib/components/dialog_manager/behavior_tree/expression/commands/VisitedCountCommand";
import { VisitedCommand } from "$lib/components/dialog_manager/behavior_tree/expression/commands/VisitedCommand";
class CommandMap {
    _commandMap = new Map();
    constructor() {
        [new RandomRangeCommand(), new VisitedCountCommand(), new VisitedCommand()].forEach((commandLogic) => {
            this._commandMap.set(commandLogic.getToken(), commandLogic);
        });
    }
    get = (command) => {
        return this._commandMap.get(command);
    };
    exists = (command) => {
        return this.get(command) !== undefined;
    };
}
export const commandMap = new CommandMap();
//# sourceMappingURL=CommandMap.js.map