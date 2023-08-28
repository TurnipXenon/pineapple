class BTreeUtils {
    /**
     * peek the top of a stack object with the assumption it's not an empty stack
     * todo: add possible protection like an assertion
     * @param stack
     * @return top of the stack
     */
    peek = (stack) => {
        return stack[stack.length - 1];
    };
    removeQuotes = (value) => {
        return value
            .replace(/^"/, "") // remove possible " at the start: https://stackoverflow.com/a/2182602
            .replace(/"$/, ""); // remove possible " at the end: https://stackoverflow.com/a/12249011
    };
    simplifyToken = (oldToken) => {
        if (oldToken[0] == "$") {
            const value = localStorage.getItem(oldToken);
            if (value) {
                return value;
            }
            console.error(`Value obtained in local storage false: ${oldToken}`);
            return "";
        }
        return btreeUtils.removeQuotes(oldToken);
    };
    isTrue = (value) => {
        return value.trim().toLowerCase() === "true";
    };
    isFalse = (value) => {
        return value.trim().toLowerCase() === "false";
    };
}
export const btreeUtils = new BTreeUtils();
//# sourceMappingURL=BTreeUtils.js.map