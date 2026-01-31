<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import ConstrastIcon from "$pkg/assets/icons/icon-contrast.svg";
	import DarkIcon from "$pkg/assets/icons/icon-dark-mode.svg";
	import LightIcon from "$pkg/assets/icons/icon-light-mode.svg";

	import { localizeHref } from "$pkg/external/paraglide/runtime";
	import { PinyaAccordion, PinyaAccordionItem } from "$pkg/ui/components/index";
	import ModalBase from "$pkg/ui/components/ModalBase.svelte";
	import NestedNavigation from "$pkg/ui/components/NestedNavigation.svelte";
	import { TextLink } from "$pkg/ui/elements/index";
	import { getSiteLayout } from "$pkg/util/context/pineappleBaseContextDefinitions";
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

	let siteLayout = getSiteLayout();
</script>

<ModalBase {...props} class="navigation-modal">
	<h2>Navigation</h2>

	<div class="wrapper nested-navigation">
		<NestedNavigation layout={siteLayout} depth={0} close={props.close} openBehavior="open-active"></NestedNavigation>
	</div>

	<div class="actions">
		<button class="btn preset-filled-primary-400-600 text-surface-100" onclick={() => props.close()}
		        title="Close modal">
			Close
		</button>
	</div>
</ModalBase>

<style lang="scss">
    @use "$styles/surface-colors" as *;

    .actions {
        display: flex;
        flex-direction: row-reverse;
    }

    :global {
        .navigation-modal {
            min-width: min(24lh, 100vw);
            max-height: min(24lh, 100vh);
            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 0.1lh;
            padding: 0;

            & > * {
                padding: 0.5lh 1rem;
            }
        }

        .nested-navigation {
            overflow: auto;
            padding: 0;

            & > * {
                margin: 1lh 1rem;
            }

            .wrapper {
                padding-inline-start: 1rem;
            }
        }
    }


    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: start;
        text-align: start;
        gap: 0.4lh;
    }
</style>
