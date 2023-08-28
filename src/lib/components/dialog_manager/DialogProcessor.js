import { BehaviorState } from "$lib/components/dialog_manager/behavior_tree/line_processors/BehaviorState";
import { IfNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/IfNode";
import { EndIfNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/EndIfNode";
import { ElseNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/ElseNode";
import { ElseIfNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/ElseIfNode";
import { SetVariableNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/SetVariableNode";
import { IgnoreGuardNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/IgnoreGuardNode";
import { NormalLineProcessorNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/NormalLineProcessorNode";
import { LineSelectorNode } from "$lib/components/dialog_manager/behavior_tree/line_core/LineSelectorNode";
import { browser } from "$app/environment";
import { LineCommentNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/LineCommentNode";
import { DeclareCommand } from "$lib/components/dialog_manager/behavior_tree/line_processors/commands/DeclareCommand";
import { JumpCommand } from "$lib/components/dialog_manager/behavior_tree/line_processors/commands/JumpCommand";
import { IgnoreJumpNode } from "$lib/components/dialog_manager/behavior_tree/line_processors/IgnoreJumpNode";
import { UnvisitCommand } from "$lib/components/dialog_manager/behavior_tree/line_processors/commands/UnvisitCommand";
/**
 * DialogProcessor processes dialogs
 */
export class DialogProcessor {
    processingTree = new LineSelectorNode([
        /*region comment based formats*/
        new IgnoreJumpNode(),
        new LineCommentNode(),
        /*endregion commend based formats*/
        new EndIfNode(),
        new ElseIfNode(),
        new ElseNode(),
        new IfNode(),
        new IgnoreGuardNode(),
        /*region commands*/
        new SetVariableNode(),
        new DeclareCommand(),
        new JumpCommand(),
        new UnvisitCommand(),
        /*endregion commands*/
        new NormalLineProcessorNode()
    ]);
    /**
     * process the dialog line by line and return a presentable string
     * @param dialogDetail
     */
    processDialog = (dialogDetail) => {
        if (!browser) {
            return ""; // don't process any line in the server
        }
        let currentState = new BehaviorState();
        // split each yarn line
        return dialogDetail.textContent
            .trim()
            .split("\n")
            .map((line_, index) => {
            const result = this.processingTree.process({
                initState: currentState,
                line: line_.trim(),
                lineIndex: index
            });
            currentState = result.nextState;
            return result.renderedLine;
        })
            .join("\n"); // combine all processed lines
    };
}
//# sourceMappingURL=DialogProcessor.js.map