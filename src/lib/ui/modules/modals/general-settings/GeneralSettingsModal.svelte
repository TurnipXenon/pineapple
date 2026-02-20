<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import ConstrastIcon from "$pkg/assets/icons/icon-contrast.svg";
	import DarkIcon from "$pkg/assets/icons/icon-dark-mode.svg";
	import LightIcon from "$pkg/assets/icons/icon-light-mode.svg";

	import { m } from "$pkg/external/paraglide/messages";
	import ModalBase from "$pkg/ui/components/ModalBase.svelte";
	import SettingsPanel from "$pkg/ui/modules/universal-overlay/SettingsPanel.svelte";
	import { setMode, userPrefersMode } from "mode-watcher";
	import type { ModalProps } from "svelte-modals";

	let props: ModalProps = $props();


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

<ModalBase {...props}>
	<div class="wrapper">
		<h2>{m.settings()}</h2>

		<SettingsPanel close={props.close} />

		<div class="actions">
			<button class="btn preset-filled-primary-400-600 text-surface-100" onclick={() => props.close()}
			        title="Close modal">
				Close
			</button>
		</div>
	</div>
</ModalBase>

<style lang="scss">
    @use "$styles/surface-colors" as *;

    .actions {
        display: flex;
        flex-direction: row-reverse;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: start;
        text-align: start;
        overflow: auto;
        max-height: calc(100vh - 3lh);
    }
</style>
