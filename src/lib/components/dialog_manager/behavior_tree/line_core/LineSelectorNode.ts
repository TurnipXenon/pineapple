import { SelectorNode } from "$pkg/components/dialog_manager/behavior_tree/core/SelectorNode";
import type { LineNodeArguments } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";
import { BehaviorState } from "$pkg/components/dialog_manager/behavior_tree/line_processors/BehaviorState";
import { BehaviorStatus } from "$pkg/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import type { LineBehaviorNode } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineBehaviorNode";

export class LineSelectorNode extends SelectorNode<LineNodeArguments, LineBehaviorResult> {
	constructor(nodeList: LineBehaviorNode[]) {
		super(nodeList);
	}

	defaultResult = (): LineBehaviorResult => {
		return {
			nextState: new BehaviorState(),
			renderedLine: "",
			status: BehaviorStatus.Failure
		};
	};
}
