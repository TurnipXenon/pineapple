import { SelectorNode } from "$lib/components/dialog_manager/behavior_tree/core/SelectorNode";
import { BehaviorState } from "$lib/components/dialog_manager/behavior_tree/line_processors/BehaviorState";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
export class LineSelectorNode extends SelectorNode {
    constructor(nodeList) {
        super(nodeList);
    }
    defaultResult = () => {
        return {
            nextState: new BehaviorState(),
            renderedLine: "",
            status: BehaviorStatus.Failure
        };
    };
}
//# sourceMappingURL=LineSelectorNode.js.map