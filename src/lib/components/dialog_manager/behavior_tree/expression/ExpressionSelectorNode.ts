import { SelectorNode } from "$pkg/components/dialog_manager/behavior_tree/core/SelectorNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionResult";
import { BehaviorStatus } from "$pkg/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import type { ExpressionBehaviorNode } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionBehaviorNode";

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
