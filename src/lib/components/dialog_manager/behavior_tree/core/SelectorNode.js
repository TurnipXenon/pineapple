import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
/**
 * Selector is a composite behavior node where it tries to process everything until it
 * finds a non-failing node
 */
export class SelectorNode {
    nodeList;
    constructor(nodeList) {
        this.nodeList = nodeList;
    }
    process(nodeArgs) {
        let finalResult = this.defaultResult();
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
//# sourceMappingURL=SelectorNode.js.map