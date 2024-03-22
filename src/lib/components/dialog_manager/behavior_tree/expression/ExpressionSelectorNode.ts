import { SelectorNode } from "$lib/components/dialog_manager/behavior_tree/core/SelectorNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionResult";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import type { ExpressionBehaviorNode } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionBehaviorNode";

export class ExpressionSelectorNode extends SelectorNode<ExpressionArguments, ExpressionResult> {
	constructor(nodeList: ExpressionBehaviorNode[]) {
		super(nodeList);
	}

	defaultResult = (): ExpressionResult => {
		return {
			nextState: {
				operandStack: []
			},
			status: BehaviorStatus.Failure
		};
	};
}
