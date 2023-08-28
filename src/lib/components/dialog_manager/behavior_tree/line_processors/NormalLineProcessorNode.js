import { browser } from "$app/environment";
import { BehaviorStatus } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorStatus";
/**
 * This is a leaf node that ALWAYS returns success
 * It processes the line in search for variables it can replace when rendered
 */
export class NormalLineProcessorNode {
    process(nodeArgs) {
        const renderedLine = nodeArgs.line
            .split("{$") // look for initial token
            .map((token, index) => {
            if (index == 0) {
                return token; // ignore first character
            }
            return token
                .split("}") // split at the end and dont process the rest
                .map((varToken, index) => {
                if (index == 0 && browser) {
                    const varValue = localStorage.getItem(`$${varToken}`);
                    if (varValue !== null) {
                        // null guard
                        return varValue;
                    }
                    // just return the token I guess? LOL
                    console.warn(`Null variable in yarn: ${varToken}. Make sure that all variables were set before using them.`);
                }
                return varToken;
            })
                .join(""); // combine all variable replaced strings
        })
            .join(""); // combine all processed strings
        return {
            nextState: nodeArgs.initState,
            renderedLine: renderedLine,
            status: BehaviorStatus.Success
        };
    }
}
//# sourceMappingURL=NormalLineProcessorNode.js.map