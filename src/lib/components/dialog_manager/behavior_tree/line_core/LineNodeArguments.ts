import type { BehaviorState } from "$pkg/components/dialog_manager/behavior_tree/line_processors/BehaviorState";

export interface LineNodeArguments {
	line: string;
	lineIndex: number;
	initState: BehaviorState;
}
