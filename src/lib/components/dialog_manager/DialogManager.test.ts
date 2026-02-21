import { afterEach, describe, expect, it, vi } from "vitest";
import { dialogManager } from "./DialogManager";
import { DialogUtils } from "./DialogUtils";

afterEach(() => {
	vi.restoreAllMocks();
});

describe("DialogUtils.isNodeVisited", () => {
	it("returns true when stored value is a positive number", () => {
		vi.spyOn(dialogManager.dialogVariableStore, "getItem").mockReturnValue("2");

		expect(DialogUtils.isNodeVisited("Intro")).toBe(true);
	});

	it("returns false when value is missing or not a positive number", () => {
		vi.spyOn(dialogManager.dialogVariableStore, "getItem")
			.mockReturnValueOnce(null)
			.mockReturnValueOnce("0");

		expect(DialogUtils.isNodeVisited("Missing")).toBe(false);
		expect(DialogUtils.isNodeVisited("Zero")).toBe(false);
	});
});
