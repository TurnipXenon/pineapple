import { DialogManager } from "$pkg/components/dialog_manager/DialogManager";
import { assert, describe, expect, it } from "vitest";
import TutorialYarn from "./Tutorial.yarn?raw";

const assertDialogJump = (dialogManager: DialogManager, dialogId: string) => {
	assert.include(
		dialogManager.fullCurrentMessage,
		`"choice-${dialogId} dialog-choice"`,
		"Missing dialog ID in current message"
	);
	dialogManager.setDialogChoiceById(dialogId);
	expect(dialogManager.currentMessageMeta.dialogId).toBe(dialogId);
};

describe("Tutorial.yarn", () => {
	it("parses without throwing and returns dialog nodes", async () => {
		const dialogManager = new DialogManager();
		const parsePromise = dialogManager.parseAndSetDialogTree(TutorialYarn);

		await expect(parsePromise).resolves.toEqual(expect.any(Array));

		const dialogTree = await parsePromise;
		expect(dialogTree.length).toBeGreaterThan(0);
		expect(dialogTree.some((node) => node.dialogId === "TutorialStart")).toBe(true);
	});

	// todo: verify all choices have a jump?

	it("dialog goes through the entire tutorial the first time", async () => {
		const dialogManager = new DialogManager();
		const dialogTree = await dialogManager.parseAndSetDialogTree(TutorialYarn);

		expect(dialogManager.currentDialogTree).toBe(dialogTree);
		expect(dialogManager.currentMessageMeta.dialogId).toBe("TutorialStart");

		assertDialogJump(dialogManager, "TutorialStart2");
		assertDialogJump(dialogManager, "TutorialChoiceA");
		assertDialogJump(dialogManager, "TutorialChoiceB");
		assertDialogJump(dialogManager, "TutorialMerge");
	});
});
