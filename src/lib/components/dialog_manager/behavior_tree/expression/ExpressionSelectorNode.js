import { SelectorNode } from "$lib/components/dialog_manager/behavior_tree/core/SelectorNode";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
export class ExpressionSelectorNode extends SelectorNode {
    constructor(nodeList) {
        super(nodeList);
    }
    defaultResult = () => {
        return {
            nextState: {
                operandStack: []
            },
            status: BehaviorStatus.Failure
        };
    };
}
//# sourceMappingURL=ExpressionSelectorNode.js.map