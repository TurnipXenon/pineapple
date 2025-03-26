import type { DialogDetail } from "$pkg/types/pineapple_fiber/DialogDetail";
import { type Writable } from "svelte/store";
import { DialogState } from "$pkg/types/pineapple_fiber/DialogState";
import { type Tweened } from "svelte/motion";
import { DialogProcessor } from "$pkg/components/dialog_manager/DialogProcessor";
import type { OnSetDialogChoiceCallback } from "$pkg/components/dialog_manager/DialogManager";

export interface IDialogManager {
	dialogMessageMap: Map<string, DialogDetail>;
	currentDialogTree: DialogDetail[];
	fullCurrentMessage: string;
	currentMessageMeta: DialogDetail;
	currentMessage: Writable<string>;
	currentIndex: number;
	previousTimestamp: number;
	isDoneTransition: boolean;
	currentPortrait: Writable<unknown>;
	portraitMap: Map<string, any>;
	currentState: DialogState;
	currentReadableState: Writable<DialogState>;
	hidePercent: Tweened<number>;
	skipNextActiveTime: number;
	dialogProcessor: DialogProcessor;
	_setDialogChoiceQueue: DialogDetail[];
	_setDialogChoiceMutex: boolean;
	onSetDialogListeners: OnSetDialogChoiceCallback[];
	enableDialogueOverlayCache: boolean;
	skipAnimation: () => void;
	enableDialog: (shouldEnable: boolean) => void;
	setDialogTree: (newDialogTree: DialogDetail[]) => void;
	subscribeToSetDialogChoice: (callback: OnSetDialogChoiceCallback) => void;
	unsubscribeToSetDialogChoice: (callback: OnSetDialogChoiceCallback) => void;
	setDialogChoice: (newMessage: (DialogDetail | undefined)) => void;
	_setDialogChoice: () => void;
	setDialogToDefault: () => void;
	update: (timestamp: number) => void;

	enableDialogOverlay(enable: boolean): void;

	toggleDialogOverlay(): void;

	parseAndSetDialogTree(dialogYarn: string): Promise<DialogDetail[]>;
}