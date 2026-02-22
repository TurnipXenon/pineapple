import { DialogManager } from "$pkg/components/dialog_manager/DialogManager";
import { DialogTestUtility as du } from "$pkg/test/DialogTestUtility";
import { describe, expect, it } from "vitest";
import TutorialYarn from "./Tutorial.yarn?raw";

describe("Tutorial.yarn", () => {
	it("parses without throwing and returns dialog nodes", async () => {
		await du.assertBasicChecks(TutorialYarn);
	});

	// todo: verify all choices have a jump?

	it("dialog goes through the entire tutorial the first time", async () => {
		const dialogManager = new DialogManager();
		const dialogTree = await dialogManager.parseAndSetDialogTree(TutorialYarn);
		expect(dialogManager.currentDialogTree).toBe(dialogTree);
		expect(dialogManager.currentMessageMeta.dialogId).toBe("TutorialStart");

		du.assertDialogJump(dialogManager, "TutorialStart2");
		du.expectValidChoice(dialogManager, "TutorialChoiceB");
		du.assertDialogJump(dialogManager, "TutorialChoiceA");
		du.expectInvalidChoice(dialogManager, "TutorialMerge");
		du.assertDialogJump(dialogManager, "TutorialChoiceB");
		du.expectInvalidChoice(dialogManager, "TutorialChoiceA");
		du.assertDialogJump(dialogManager, "TutorialMerge");
		du.assertDialogJump(dialogManager, "TutorialChoicesResult");
		du.assertDialogJump(dialogManager, "TutorialSettings");
		du.assertDialogJump(dialogManager, "TutorialDialogToggle");
		du.assertDialogJump(dialogManager, "TutorialEnd");
		du.expectInvalidChoice(dialogManager, "");
		du.assertDialogJump(dialogManager, "TutorialStart");
		expect(dialogManager.dialogVariableStore.getItem("$tutorialReturnAddress")).toBeNull();
	});

	describe("TutorialStart2", () => {
		it("should reach TutorialMerge", async () => {
			const dialogManager = new DialogManager();
			await dialogManager.parseAndSetDialogTree(TutorialYarn);
			dialogManager.setDialogChoiceById("TutorialStart2");
			du.assertDialogJump(dialogManager, "TutorialChoiceB");
			du.expectInvalidChoice(dialogManager, "TutorialMerge");
			du.assertDialogJump(dialogManager, "TutorialChoiceA");
			du.assertDialogJump(dialogManager, "TutorialMerge");
		});
	});

	describe("TutorialEnd", () => {
		it("should go to tutorialReturnAddress", async () => {
			const dialogManager = new DialogManager();
			await dialogManager.parseAndSetDialogTree(TutorialYarn);
			dialogManager.dialogVariableStore.setItem("$tutorialReturnAddress", "TutorialChoicesResult");
			expect(dialogManager.dialogVariableStore.getItem("$tutorialReturnAddress")).toBe("TutorialChoicesResult");
			dialogManager.setDialogChoiceById("TutorialEnd");
			du.assertDialogJump(dialogManager, "TutorialChoicesResult");
		});

		it("should not go to random IDs", async () => {
			const dialogManager = new DialogManager();
			await dialogManager.parseAndSetDialogTree(TutorialYarn);
			dialogManager.dialogVariableStore.setItem("$tutorialReturnAddress", "TutorialChoicesResult");
			dialogManager.setDialogChoiceById("TutorialEnd");
			du.expectValidChoice(dialogManager, "TutorialStart");
			expect(dialogManager.fullCurrentMessage).not.toContain("choice-TutorialA dialog-choice");
		});
	});
});
