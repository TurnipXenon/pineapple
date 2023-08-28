import type { BehaviorNode } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorNode";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
import type { BaseBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/core/BaseBehaviorResult";

/**
 * Selector is a composite behavior node where it tries to process everything until it
 * finds a non-failing node
 */
export abstract class SelectorNode<Argument, Result extends BaseBehaviorResult>
	implements BehaviorNode<Argument, Result>
{
	nodeList: BehaviorNode<Argument, Result>[];
	abstract defaultResult: () => Result;

	protected constructor(nodeList: BehaviorNode<Argument, Result>[]) {
		this.nodeList = nodeList;
	}

	process(nodeArgs: Argument): Result {
		let finalResult: Result = this.defaultResult();

		for (const node of this.nodeList) {
			const currentResult = node.process(nodeArgs);
			if (currentResult.status !== BehaviorStatus.Failure) {
				finalResult = currentResult;
				break;
			}
		}

		return finalResult;
	}
}
