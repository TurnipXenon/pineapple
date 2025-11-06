<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import type { GeneralUIProps } from "$pkg/ui/elements/GeneralUIProps";
	import { ColorScheme } from "./ColorScheme";

	type PinyaButtonProps = HTMLImgAttributes & GeneralUIProps;

	const {
		colorScheme = ColorScheme.Primary,
		...props
	}: PinyaButtonProps = $props();

	const chooseTailwindClass = () => {
		switch (colorScheme) {
			case ColorScheme.Warning:
				return 'btn preset-filled-warning-600-400 text-surface-100 hover:brightness-110';
			case ColorScheme.Surface:
				return 'btn preset-filled-surface-800-200 text-surface-100-900 hover:brightness-110';
			default:
				console.error('Unimplemented color scheme');
			// eslint-disable-next-line no-fallthrough
			case ColorScheme.Primary:
				return 'icon-filter-on-primary-button';
		}
	};

	const tailwindClass = chooseTailwindClass();
</script>

<img
	{...props}
	class={`image-icon ${tailwindClass}`}>

<style>
		:global(.image-icon) {
        height: calc(var(--spacing) * 8);
		}

		:global(.small-icon-button .image-icon) {
        height: calc(var(--spacing) * 6);
		}

    :global(.icon-filter-on-primary-button) {
				/* based on secondary-950 */
        filter: brightness(0) saturate(100%) invert(18%) sepia(10%) saturate(4620%) hue-rotate(331deg) brightness(90%) contrast(88%);
    }

    @media (prefers-color-scheme: dark) {
        :global(.icon-filter-on-primary-button) {
						/* based on surface-0 */
            filter: brightness(0) saturate(100%) invert(85%) sepia(3%) saturate(993%) hue-rotate(326deg) brightness(113%) contrast(105%);
        }
    }
</style>
