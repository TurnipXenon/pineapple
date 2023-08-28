import { browser } from "$app/environment";
import { OperatorNode } from "$lib/components/dialog_manager/behavior_tree/expression/OperatorNode";
import { OperandNode } from "$lib/components/dialog_manager/behavior_tree/expression/OperandNode";
import { ExpressionSelectorNode } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionSelectorNode";
import { btreeUtils } from "$lib/components/dialog_manager/behavior_tree/core/BTreeUtils";
import { CommandExpressionNode } from "$lib/components/dialog_manager/behavior_tree/expression/commands/CommandExpressionNode";
class ExpressionEvaluator {
    evaluatorTree = new ExpressionSelectorNode([
        new OperatorNode(),
        new CommandExpressionNode(),
        new OperandNode()
    ]);
    // from https://stackoverflow.com/a/175787/17836168
    isNumeric = (str) => {
        return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str))); // ...and ensure strings of whitespace fail
    };
    getPrecedence = (token) => {
        switch (token) {
            case "&&":
            case "||":
            case "^":
                return 1;
            case "==":
            case "!=":
                return 2;
            case "<":
            case ">":
            case ">=":
            case "<=":
                return 3;
            case "+":
            case "-":
                return 4;
            case "*":
            case "/":
            case "%":
                return 3;
            case "!":
                return 4;
            case "(":
            case ")":
                return 0; // hack lol
            default:
                // usable to test if operator lol
                // console.error(`Unknown token: ${token}`);
                return -1;
        }
    };
    evaluateFreeform = (line, prefix) => {
        if (!browser) {
            return []; // do not process when not in browser
        }
        // tokenize first!
        const infixTokens = [];
        const expression = line
            .split("//")[0]
            .trim()
            .slice(prefix === "" ? 0 : prefix.trim().length + 1, line.length - 2);
        // region tokenizer
        // console.log("Tokenizing:", expression);
        const operators = "+-*/%!<>=&|^";
        let currentToken = "";
        let escapeToggle = false;
        let quoteToggle = false;
        let operatorFound = false;
        for (const character of expression) {
            if (escapeToggle) {
                currentToken += character;
                escapeToggle = false;
            }
            else if (quoteToggle) {
                currentToken += character;
                if (character === '"') {
                    infixTokens.push(currentToken);
                    currentToken = "";
                    quoteToggle = false;
                }
            }
            else if (operatorFound) {
                if (operators.includes(character)) {
                    currentToken += character;
                }
                else if ("()".includes(character)) {
                    if (currentToken !== "") {
                        infixTokens.push(currentToken);
                    }
                    infixTokens.push(character);
                    currentToken = "";
                    operatorFound = false;
                }
                else {
                    operatorFound = false;
                    infixTokens.push(currentToken);
                    if (character !== " ") {
                        currentToken = character;
                    }
                    else {
                        currentToken = "";
                    }
                }
            }
            else if (character === "," || character === " ") {
                if (currentToken !== "") {
                    infixTokens.push(currentToken);
                    currentToken = "";
                }
            }
            else if (character === '"') {
                // do quote stuff unless we had an escape toggle
                currentToken += character;
                quoteToggle = true;
            }
            else if (operators.includes(character)) {
                if (currentToken !== "") {
                    infixTokens.push(currentToken);
                }
                currentToken = character;
                operatorFound = true;
            }
            else if ("()".includes(character)) {
                if (currentToken !== "") {
                    // determine if function
                    if (currentToken[0] !== "$" && // should not be a variable stand-in
                        currentToken[0] !== '"' && // should not be a string literal
                        !this.isNumeric(currentToken[0]) // should not be a number literal
                    ) {
                        currentToken = `#${currentToken}`;
                    }
                    infixTokens.push(currentToken);
                }
                infixTokens.push(character);
                currentToken = "";
            }
            else {
                currentToken += character;
            }
        }
        if (currentToken !== "") {
            infixTokens.push(currentToken);
        }
        // console.log(infixTokens);
        // endregion tokenizer
        // region infix to postfix
        // convert from infix to postfix
        // algo from https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/
        // console.log(infixTokens);
        const postfixTokens = [];
        const stack = [];
        infixTokens.forEach((token) => {
            if (token.startsWith("#")) {
                stack.push(token);
            }
            else if (token === "(") {
                stack.push("(");
            }
            else if (token === ")") {
                while (btreeUtils.peek(stack) !== "(") {
                    // just for safety
                    if (stack.length === 0) {
                        console.error("Assumption was made in postfix conversion that stack will not be empty! It was wrong!");
                        throw new Error("Wrong postfix conversion!");
                    }
                    postfixTokens.push(stack.pop());
                }
                stack.pop(); // remove "("
                if (stack.length > 0 && btreeUtils.peek(stack).startsWith("#")) {
                    postfixTokens.push(stack.pop());
                }
            }
            else if (![-1, 5].includes(this.getPrecedence(token))) {
                while (stack.length > 0 &&
                    this.getPrecedence(btreeUtils.peek(stack)) >= this.getPrecedence(token)) {
                    postfixTokens.push(stack.pop());
                }
                stack.push(token);
            }
            else {
                // operand
                postfixTokens.push(token);
            }
        });
        // pop all remaining elements from the stack
        while (stack.length > 0) {
            postfixTokens.push(stack.pop());
        }
        // console.log("Finished postfix", postfixTokens);
        // endregion infix to postfix
        // evaluate
        let currentState = {
            operandStack: []
        };
        postfixTokens.forEach((token) => {
            // console.log("Current token", token);
            const result = this.evaluatorTree.process({
                initState: currentState,
                token: token
            });
            // console.log("Token evaluated with result", result.nextState.operandStack.toString());
            currentState = result.nextState;
        });
        // console.log("Result", currentState.operandStack);
        return currentState.operandStack;
    };
    /**
     * evaluates a yarn if or elseif statement
     * @param line is the current line being evaluated
     * @param prefix is either "<<if" or "<<elseif"
     */
    evaluate = (line, prefix) => {
        if (!browser) {
            return false; // do not process when not in browser
        }
        return String(btreeUtils.peek(this.evaluateFreeform(line, prefix))) === "true";
    };
}
export const expressionEvaluator = new ExpressionEvaluator();
//# sourceMappingURL=ExpressionEvaluator.js.map