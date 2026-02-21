import type { DialogManager } from "$pkg/components/dialog_manager/DialogManager";

export const assertDialogJump = (dialogManager: DialogManager, dialogId: string) => {
	const expectedChoiceMarkup = `"choice-${dialogId} dialog-choice"`;

	if (!dialogManager.fullCurrentMessage.includes(expectedChoiceMarkup)) {
		throw new Error(`Missing dialog ID in current message: ${dialogId}`);
	}

	dialogManager.setDialogChoiceById(dialogId);

	if (dialogManager.currentMessageMeta.dialogId !== dialogId) {
		throw new Error(
			`Expected currentMessageMeta.dialogId to be ${dialogId}, got ${dialogManager.currentMessageMeta.dialogId}`
		);
	}
};
