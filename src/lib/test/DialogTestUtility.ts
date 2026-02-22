import { DialogManager } from "$pkg/components/dialog_manager/DialogManager";
import { assert, expect } from "vitest";

export const DialogTestUtility = {
	assertBasicChecks: async (yarnDialog: string) => {
		const dialogManager = new DialogManager();
		const parsePromise = dialogManager.parseAndSetDialogTree(yarnDialog);

		await expect(parsePromise).resolves.toEqual(expect.any(Array));

		const dialogTree = await parsePromise;
		expect(dialogTree.length).toBeGreaterThan(0);
		// detect jump with no choice
		expect(dialogTree.find(d => d.warningList?.find(wl => wl.includes("Jump name is not used in any <choice> tag")))).toBeUndefined();
		// detect choice with no jump
		expect(dialogTree.find(d => d.warningList?.find(wl => wl.includes("Choice has no jump")))).toBeUndefined();
	},

	assertDialogJump: (dialogManager: DialogManager, dialogId: string) => {
		const expectedChoiceMarkup = `"choice-${dialogId} dialog-choice"`;
		assert.include(dialogManager.fullCurrentMessage, expectedChoiceMarkup, `Missing dialog ID in current message: ${dialogId}`);
		dialogManager.setDialogChoiceById(dialogId);
		assert.equal(dialogManager.currentMessageMeta.dialogId, dialogId, `Expected currentMessageMeta.dialogId to be ${dialogId}`);
	},

	expectInvalidChoice: (dialogManager: DialogManager, invalidChoice: string | string[]) => {
		if (typeof invalidChoice !== "string") {
			invalidChoice.forEach(choice => DialogTestUtility.expectInvalidChoice(dialogManager, choice));
			return;
		}

		const expectedChoiceMarkup = `"choice-${invalidChoice} dialog-choice"`;
		expect(dialogManager.fullCurrentMessage).not.toContain(expectedChoiceMarkup);
		expect(dialogManager.currentMessageMeta.dialogId).not.toBe(invalidChoice);
	},

	expectValidChoice: (dialogManager: DialogManager, validChoice: string | string[]) => {
		if (typeof validChoice !== "string") {
			validChoice.forEach(choice => DialogTestUtility.expectValidChoice(dialogManager, choice));
			return;
		}

		const expectedChoiceMarkup = `"choice-${validChoice} dialog-choice"`;
		expect(dialogManager.fullCurrentMessage).toContain(expectedChoiceMarkup);
	}
} as const;
