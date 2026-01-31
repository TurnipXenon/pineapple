<!-- @component
Layout and logic for Settings

TODO: delete GeneralSettingsModal.svelte
-->

<script lang="ts">
	import ConstrastIcon from "$pkg/assets/icons/icon-contrast.svg";
	import DarkIcon from "$pkg/assets/icons/icon-dark-mode.svg";
	import LightIcon from "$pkg/assets/icons/icon-light-mode.svg";
	import PineappleSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";

	import LanguagePicker from "$pkg/ui/modules/modals/general-settings/LanguagePicker.svelte";
	import {
		getEnableDialogPreferenceContext,
		getEnablePortraitContext
	} from "$pkg/util/context/pineappleBaseContextDefinitions";
	import type { LocalStore } from "$pkg/util/localStore.svelte";
	import { setMode, userPrefersMode } from "mode-watcher";

	interface ToggleItem {
		key: "light" | "dark" | "system"
		imageSrc: string,
		label: string,
	}

	const modes: ToggleItem[] = [
		{ key: "light", imageSrc: LightIcon, label: "Light" },
		{ key: "dark", imageSrc: DarkIcon, label: "Dark" },
		{ key: "system", imageSrc: ConstrastIcon, label: "System" }
	];

	let selectedItem: ToggleItem = $state(modes[0]);

	// when mode is edited outside, adjust toggle button
	// do not use runes here because we only want explicit changes outside
	// our control here!
	userPrefersMode.subscribe((value) => {
		const si = modes.find(m => m.key === value);
		if (selectedItem !== si && si) {
			selectedItem = si;
		}
	});

	let enableDialogPreference = getEnableDialogPreferenceContext();
	let enablePortraitContext = getEnablePortraitContext();

	// when mode is changed inside the button, adjust the mode
	$effect(() => {
		switch (selectedItem?.key) {
			case "dark":
				setMode("dark");
				break;
			case "light":
				setMode("light");
				break;
			case "system":
				setMode("system");
				break;
			default:
				break;
		}
	});
</script>

<div class="wrapper">
	<fieldset id="dark-mode-fieldset" class="border-primary-500 border-2 flex-col p-2 md:flex-row">
		<legend class="apply-current-surface pl-4 pr-4">Mode</legend>
		<div id="field-flex">
			{#each modes as mode (mode)}
				<button
					type="button"
					title={mode.label}
					class={`btn pt-3 pb-3 hover:brightness-125
				${mode.key === selectedItem.key ? 'selected bg-secondary-400 dark:bg-secondary-800' : 'preset-outlined-primary-300-700'}
				`}
					onclick={() => { setMode(mode.key) }}
				>
					<img
						src={mode.imageSrc}
						aria-hidden="true"
						alt=""
						class={`icon
					${mode.key === selectedItem.key ? 'reverse' : ''}
					`}
					>
					<div>
						{mode.label}
					</div>
				</button>
			{/each}
		</div>
	</fieldset>

	<LanguagePicker />

	<div class="switch-default">
		<PineappleSwitch
			name="conversation-preference"
			bind:checked={enableDialogPreference.value}>
		</PineappleSwitch>
		<label for="conversation-preference">
			Conversation preference: {enableDialogPreference.value ? "Always on" : "Always off"}
		</label>
	</div>
	<div class="switch-default">
		<PineappleSwitch
			name="portrait-preference"
			bind:checked={enablePortraitContext.value}>
		</PineappleSwitch>
		<label for="portrait-preference">
			Show conversation portrait: {enablePortraitContext.value ? "Always on" : "Always off"}
		</label>
	</div>
</div>

<style>
    :global {
        html {
            --primary-btn-color-selected: var(--color-secondary-400);
        }

        html.dark {
            --primary-btn-color-selected: var(--color-secondary-800);
        }
    }

    .actions {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 1.4lh;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: start;
        text-align: start;
        gap: 1lh;
        overflow-y: auto;
        font-size: var(--text-base);
    }

    #dark-mode-fieldset {
        legend {
            background: transparent;
        }

        #field-flex {
            display: flex;
		        flex-wrap: wrap;
            gap: 1rem;
            padding: 0.25lh 1rem;
        }

        button {
            img {
                filter: invert(80%);
            }
        }

        button.selected {
            background-color: var(--primary-btn-color-selected);

            img {
                filter: unset;
            }
        }
    }

    .switch-default {
		    display: flex;
		    justify-items: center;
		    gap: 1em;
    }
</style>
