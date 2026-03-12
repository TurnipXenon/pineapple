import { DialogManager } from "$pkg/components/dialog_manager/DialogManager";
import { assert, expect, it } from "vitest";

export const DialogTestUtility = {
	describeBasicChecks: async (yarnDialog: string, externalNodes: string[] = []) => {
		const dialogManager = new DialogManager();
		const parsePromise = dialogManager.parseAndSetDialogTree(yarnDialog);

		it("should pass basic check", async () => {
			await expect(parsePromise).resolves.toEqual(expect.any(Array));

			const dialogTree = await parsePromise;
			expect(dialogTree.length).toBeGreaterThan(0);
		});

		const dialogTree = await parsePromise;
		dialogTree.forEach((dialog) => {
			it(`should have no warnings for ${dialog.dialogId}`, () => {
				expect(dialog.warningList, dialog.warningList?.join("\n")).toBeUndefined();

				// regex get all:
				// (?<=This is).*?(?=sentence)
				//<a class="choice-Seal dialog-choice"
				const regexArray = dialog.textContent.matchAll(
					/(?<=<a class="choice-).*?(?= dialog-choice)/g
				);
				regexArray.forEach((rg) => {
					const targetId = rg[0];
					expect(
						externalNodes.includes(targetId)
							? true
							: dialogTree.find((d) => d.dialogId === targetId),
						`targetId ${targetId} not found`
					).not.toBeUndefined();
				});
			});
		});
	},

	assertDialogJump: (
		dialogManager: DialogManager,
		dialogId: string,
		expectedFutureDialogId: string = ""
	) => {
		const expectedChoiceMarkup = `"choice-${dialogId} dialog-choice"`;
		assert.include(
			dialogManager.fullCurrentMessage,
			expectedChoiceMarkup,
			`Missing dialog ID in current message: ${dialogId}`
		);
		dialogManager.setDialogChoiceById(dialogId);
		assert.equal(
			dialogManager.currentMessageMeta.dialogId,
			expectedFutureDialogId ? expectedFutureDialogId : dialogId,
			`Expected currentMessageMeta.dialogId to be ${expectedFutureDialogId ? expectedFutureDialogId : dialogId}`
		);
	},

	expectInvalidChoice: (dialogManager: DialogManager, invalidChoice: string | string[]) => {
		if (typeof invalidChoice !== "string") {
			invalidChoice.forEach((choice) =>
				DialogTestUtility.expectInvalidChoice(dialogManager, choice)
			);
			return;
		}

		const expectedChoiceMarkup = `"choice-${invalidChoice} dialog-choice"`;
		expect(dialogManager.fullCurrentMessage).not.toContain(expectedChoiceMarkup);
		expect(dialogManager.currentMessageMeta.dialogId).not.toBe(invalidChoice);
	},

	expectValidChoice: (dialogManager: DialogManager, validChoice: string | string[]) => {
		if (typeof validChoice !== "string") {
			validChoice.forEach((choice) => DialogTestUtility.expectValidChoice(dialogManager, choice));
			return;
		}

		const expectedChoiceMarkup = `"choice-${validChoice} dialog-choice"`;
		expect(dialogManager.fullCurrentMessage).toContain(expectedChoiceMarkup);
	}
} as const;
