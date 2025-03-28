/**
 * DialogManager is the object we want to interact with in Svelte
 */

import { writable } from "svelte/store";
import type { DialogDetail } from "$pkg/types/pineapple_fiber/DialogDetail";
import { DialogState } from "$pkg/types/pineapple_fiber/DialogState";
import { tweened } from "svelte/motion";
import { backOut } from "svelte/easing";
import { PortraitType } from "$pkg/types/pineapple_fiber/PortraitType";
import AresHappy from "$pkg/assets/characters/ares/ares_happy.webp";
import AresBlushing from "$pkg/assets/characters/ares/ares_blushing.webp";
import AresDisappointed from "$pkg/assets/characters/ares/ares_disappointed.webp";
import AresLetsGo from "$pkg/assets/characters/ares/ares_lets_go.webp";
import AresMad from "$pkg/assets/characters/ares/ares_mad.webp";
import AresNeutral from "$pkg/assets/characters/ares/ares_neutral.webp";
import AresSlightlyMad from "$pkg/assets/characters/ares/ares_slightly_mad.webp";
import AresSurprised from "$pkg/assets/characters/ares/ares_surprised.webp";
import AresYay from "$pkg/assets/characters/ares/ares_yay.webp";
import {
	defaultDialogMessage,
	dialogVariableStore,
	enableDialogueOverlay,
	updateRate
} from "$pkg/components/dialog_manager/DialogManagerStore";
import { DialogProcessor } from "$pkg/components/dialog_manager/DialogProcessor";
import { parseYarn } from "$pkg/scripts/pineapple_fiber/PineappleFiberParser";
import type { IDialogManager } from "$pkg/components/dialog_manager/IDialogManager";

const shouldDebugYarn = false;

export type OnSetDialogChoiceCallback = (newMessage: DialogDetail) => void;

export class DialogManager implements IDialogManager {
	dialogMessageMap: Map<string, DialogDetail> = new Map();
	currentDialogTree: DialogDetail[] = [];
	fullCurrentMessage: string = defaultDialogMessage[0].textContent;
	currentMessageMeta: DialogDetail = defaultDialogMessage[0];
	currentMessage = writable("");
	currentIndex = 0;
	previousTimestamp = 0;
	isDoneTransition = false;
	currentPortrait = writable("");
	portraitMap: Map<string, any> = new Map();
	currentState = DialogState.Visible;
	currentReadableState = writable(this.currentState);
	hidePercent = tweened(100, {
		duration: 400,
		easing: backOut
	}); // 100 = 100%
	skipNextActiveTime = 0;
	dialogProcessor = new DialogProcessor();
	// for queueing actions
	_setDialogChoiceQueue: DialogDetail[] = [];
	_setDialogChoiceMutex = false;
	onSetDialogListeners: OnSetDialogChoiceCallback[] = [];
	enableDialogueOverlayCache = false;

	constructor() {
		enableDialogueOverlay.subscribe((value) => {
			// todo: investigate why we cant put setDialogDefault inside the then clause
			// ISSUE #82 https://github.com/TurnipXenon/pineapple/issues/82
			this.enableDialogueOverlayCache = value;
			if (value) {
				this.hidePercent.set(0).then(() => {
					this.currentState = DialogState.Visible;
					this.currentReadableState.set(this.currentState);
				});
			} else {
				this.hidePercent.set(100).then(() => {
					this.currentState = DialogState.Invisible;
					this.currentReadableState.set(this.currentState);
				});
				this.setDialogTree([{ textContent: "" }]);
			}
		});
	}

	/**
	 * when users interact with the dialog, they can skip the transition like in a game
	 * note that there is a cool down to this, check out skipNextActiveTime
	 */
	skipAnimation = () => {
		if (
			this.previousTimestamp > this.skipNextActiveTime &&
			this.currentState == DialogState.Visible &&
			!this.isDoneTransition // crucial for dynamic links!
		) {
			this.currentIndex = this.fullCurrentMessage.length - 1;
			this.currentMessage.update(() => this.fullCurrentMessage.slice(0, this.currentIndex));
		}
	};

	/**
	 * hides or shows the dialog UI
	 * @param shouldEnable
	 */
	enableDialog = (shouldEnable: boolean) => {
		enableDialogueOverlay.update(() => shouldEnable);
	};

	/**
	 * sets the possible dialog that might appear on the Dialog UI
	 * note that it overwrites the previous tree and does not append on it due to the possibility
	 * of node name conflicts
	 * @param newDialogTree
	 */
	setDialogTree = (newDialogTree: DialogDetail[]) => {
		this.currentDialogTree = newDialogTree;

		this.dialogMessageMap.clear();
		newDialogTree.map((value) => {
			if (value.dialogId) {
				this.dialogMessageMap.set(value.dialogId!, value);
			}
		});

		// lazy load map
		if (this.portraitMap.size == 0) {
			this.portraitMap.set(PortraitType.AresHappy.toString(), AresHappy);
			this.portraitMap.set(PortraitType.AresBlushing.toString(), AresBlushing);
			this.portraitMap.set(PortraitType.AresDisappointed.toString(), AresDisappointed);
			this.portraitMap.set(PortraitType.AresLetsGo.toString(), AresLetsGo);
			this.portraitMap.set(PortraitType.AresMad.toString(), AresMad);
			this.portraitMap.set(PortraitType.AresNeutral.toString(), AresNeutral);
			this.portraitMap.set(PortraitType.AresSlightlyMad.toString(), AresSlightlyMad);
			this.portraitMap.set(PortraitType.AresSurprised.toString(), AresSurprised);
			this.portraitMap.set(PortraitType.AresYay.toString(), AresYay);
		}

		this.setDialogChoice(newDialogTree[0]);
	};

	/**
	 * Remember to call this before SetDialogTree
	 * and unsubscribe during onDestroy
	 * @param callback
	 */
	subscribeToSetDialogChoice = (callback: OnSetDialogChoiceCallback) => {
		this.onSetDialogListeners.push(callback);
	};

	/**
	 * Remember to call this during onDestroy
	 * @param callback
	 * todo: double check if this works???
	 */
	unsubscribeToSetDialogChoice = (callback: OnSetDialogChoiceCallback) => {
		// from: https://stackoverflow.com/a/5767357/17836168
		const index = this.onSetDialogListeners.indexOf(callback);
		if (index > -1) {
			// only splice array when item is found
			this.onSetDialogListeners.splice(index, 1); // 2nd parameter means remove one item only
		}
	};

	/**
	 * Sets the next dialog to show depending on which special choice a href link the user
	 * has interacted with
	 * @param newMessage
	 *
	 * you can listen to this!
	 */
	setDialogChoice = (newMessage: DialogDetail | undefined) => {
		if (!newMessage || !newMessage.textContent) {
			return;
		}

		this._setDialogChoiceQueue.push(newMessage);

		if (!this._setDialogChoiceMutex) {
			this._setDialogChoiceMutex = true; // not a true mutex but this will do
			this._setDialogChoice();
		}
	};

	_setDialogChoice = () => {
		const newMessage = this._setDialogChoiceQueue.shift();
		if (newMessage === undefined) {
			this._setDialogChoiceMutex = false; // set it free!
			this.onSetDialogListeners.forEach((listener) => {
				listener(this.currentMessageMeta);
			});
			return;
		}

		this.currentMessageMeta = newMessage;

		// set the portrait
		let portraitValue = AresHappy;
		if (this.currentMessageMeta.portraitType) {
			portraitValue = this.portraitMap.get(this.currentMessageMeta.portraitType);
		}
		if (portraitValue) {
			this.currentPortrait.update(() => portraitValue);
		}

		// process the dialogue here line-by-line
		this.fullCurrentMessage = this.dialogProcessor.processDialog(this.currentMessageMeta);
		this.currentMessage.update(() => "");
		this.currentIndex = 0;
		this.skipNextActiveTime = this.previousTimestamp + 1000; // guard
		this.isDoneTransition = false; // must be after the guard

		if (shouldDebugYarn) {
			console.info(`Currently processing node: ${this.currentMessageMeta.dialogId}`);
		}

		// save that we visited AND processed the node
		if (this.currentMessageMeta.dialogId) {
			const key = `+${this.currentMessageMeta.dialogId}`;
			const value = Number(dialogVariableStore.getItem(key));
			if (isNaN(value)) {
				dialogVariableStore.setItem(key, "1");
			} else {
				dialogVariableStore.setItem(key, `${value + 1}`);
			}
		}

		// reloop this to process all messages
		this._setDialogChoice();
	};

	setDialogToDefault = () => {
		this.setDialogTree(defaultDialogMessage);
	};

	/**
	 * updates the information and detail frame by frame
	 * you can think of this like the main game loop
	 *
	 * @param timestamp
	 *
	 * todo: this might be too big we might want to refactor this method for better readability
	 * ISSUE #81 https://github.com/TurnipXenon/pineapple/issues/81
	 */
	update = (timestamp: number) => {
		if (this.currentState == DialogState.Invisible || this.currentState == DialogState.Busy) {
			window.requestAnimationFrame(this.update);
			return;
		}

		// if visible

		// text transition loop
		if (!this.isDoneTransition && this.currentIndex > this.fullCurrentMessage.length) {
			const elementList = document.getElementsByClassName("dialog-choice");
			for (const el of elementList) {
				el.addEventListener("click", (event) => {
					// todo: make more robust; for now we're assuming first class is our choice
					const choice = el.classList[0].split("-")[1];
					this.setDialogChoice(this.dialogMessageMap.get(choice));
				});
			}

			this.isDoneTransition = true;
		}

		// guard: skip if done or if not yet time to update
		if (
			this.currentIndex > this.fullCurrentMessage.length ||
			this.previousTimestamp + updateRate > timestamp
		) {
			window.requestAnimationFrame(this.update);
			return;
		}
		this.previousTimestamp = timestamp;

		// check if valid text
		// there is an assumption that previous character is valid
		// let validCharacterIndex = this.currentLength - 1;
		// validCharacterIndex++;
		// the code above is just to show you how it looks like but let's assume
		// that currentLength = validCharacter + 1
		while (
			this.fullCurrentMessage[this.currentIndex] == "<" &&
			this.currentIndex + 1 < this.fullCurrentMessage.length
			) {
			// find valid character, trap with closing
			this.currentIndex = this.fullCurrentMessage.indexOf(">", this.currentIndex) + 1;
			// normalize
			this.currentIndex = Math.min(this.currentIndex, this.fullCurrentMessage.length - 1);
		}

		this.currentMessage.update(() => this.fullCurrentMessage.slice(0, this.currentIndex));

		// increment
		++this.currentIndex;

		window.requestAnimationFrame(this.update);
	};

	enableDialogOverlay(enable: boolean) {
		enableDialogueOverlay.set(enable);
	}

	toggleDialogOverlay() {
		enableDialogueOverlay.set(!this.enableDialogueOverlayCache);
	};

	async parseAndSetDialogTree(dialogYarn: string): Promise<DialogDetail[]> {
		return parseYarn(dialogYarn)
			.then((dialogTree) => {
				console.log(dialogTree);
				this.setDialogTree(dialogTree);
				return dialogTree;
			});
	}
}
