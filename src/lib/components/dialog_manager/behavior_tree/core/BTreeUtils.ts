import type { DialogMapStore } from "$lib/types/pineapple_fiber/DialogVariableStore";

class BTreeUtils {
	/**
	 * peek the top of a stack object with the assumption it's not an empty stack
	 * todo: add possible protection like an assertion
	 * @param stack
	 * @return top of the stack
	 */
	peek = <T>(stack: T[]): T => {
		return stack[stack.length - 1];
	};

	removeQuotes = (value: string): string => {
		return value
			.replace(/^"/, "") // remove possible " at the start: https://stackoverflow.com/a/2182602
			.replace(/"$/, ""); // remove possible " at the end: https://stackoverflow.com/a/12249011
	};

	simplifyToken = (oldToken: string, dialogVariableStore?: DialogMapStore): string => {
		if (oldToken[0] == "$") {
			const value = dialogVariableStore?.getItem(oldToken) ?? null;
			if (value) {
				return value;
			}
			console.log(`Value not found in dialog variable store: ${oldToken}`);
			return "";
		}

		return btreeUtils.removeQuotes(oldToken);
	};

	isTrue = (value: string): boolean => {
		return value.trim().toLowerCase() === "true";
	};

	isFalse = (value: string): boolean => {
		return value.trim().toLowerCase() === "false";
	};
}

export const btreeUtils = new BTreeUtils();
