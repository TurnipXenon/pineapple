import { IfMode } from "$pkg/components/dialog_manager/behavior_tree/line_processors/IfMode";

export class BehaviorState {
	ifModeStack: IfMode[] = [IfMode.Search];
	ignoreJumps = false;
}
