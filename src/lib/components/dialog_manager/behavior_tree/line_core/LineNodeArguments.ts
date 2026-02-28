import type { BehaviorState } from "$lib/components/dialog_manager/behavior_tree/line_processors/BehaviorState";
import type { DialogMapStore } from "$lib/types/pineapple_fiber/DialogVariableStore";

export interface LineNodeArguments {
	line: string;
	lineIndex: number;
	initState: BehaviorState;
	dialogVariableStore: DialogMapStore;
}
