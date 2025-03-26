<script lang="ts">
	import type { ModalProps } from 'svelte-modals';
	import { setMode, userPrefersMode } from 'mode-watcher';

	import { m } from '$pkg/paraglide/messages';
	import ModalBase from '$pkg/ui/components/ModalBase.svelte';
	import DarkIcon from '$pkg/assets/icons/icon-dark-mode.svg';
	import LightIcon from '$pkg/assets/icons/icon-light-mode.svg';
	import ConstrastIcon from '$pkg/assets/icons/icon-contrast.svg';
	import LanguagePicker from '$pkg/ui/modules/modals/general-settings/LanguagePicker.svelte';

	let props: ModalProps = $props();


	interface ToggleItem {
		key: 'light' | 'dark' | 'system'
		imageSrc: string,
		label: string,
	}

	const modes: ToggleItem[] = [
		{ key: 'light', imageSrc: LightIcon, label: 'Light' },
		{ key: 'dark', imageSrc: DarkIcon, label: 'Dark' },
		{ key: 'system', imageSrc: ConstrastIcon, label: 'System' }
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

	// when mode is changed inside the button, adjust the mode
	$effect(() => {
		switch (selectedItem?.key) {
			case 'dark':
				setMode('dark');
				break;
			case 'light':
				setMode('light');
				break;
			case 'system':
				setMode('system');
				break;
			default:
				break;
		}
	});
</script>

<ModalBase {...props}>
	<div class="wrapper">
		<h2>{m.settings()}</h2>

		<fieldset class="btn-group border-primary-500 border-2 flex-col p-2 md:flex-row">
			<legend class="bg-surface-100-900 pl-4 pr-4">Mode</legend>
			{#each modes as mode (mode)}
				<button
					type="button"
					title={mode.label}
					class={`btn pt-3 pb-3 hover:brightness-125
				${mode.key === selectedItem.key ? 'bg-secondary-400 dark:bg-secondary-800' : 'preset-outlined-primary-300-700'}
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
					{mode.label}
				</button>
			{/each}
		</fieldset>

		<LanguagePicker />

		<div class="actions">
			<button class="btn preset-filled-primary-400-600 text-surface-100" onclick={() => props.close()}
							title="Close modal">
				Close
			</button>
		</div>
	</div>
</ModalBase>

<style>
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
    }
</style>