<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		onClick?: undefined | (() => void);
		checked?: boolean;
		children?: import('svelte').Snippet;
	}

	let { onClick = undefined, checked = true, children }: Props = $props();

	let textColorClass = $derived($isLightMode ? "local-light" : "local-dark");
	let buttonClass = $state("preset-filled-tertiary-500");
	const toggleChipColor = (isLightMode: boolean, checked: boolean) => {
		if (isLightMode) {
			buttonClass = checked ? "normal-bg" : "light-unchecked-bg";
		} else {
			buttonClass = checked ? "normal-bg" : "dark-unchecked-bg";
		}
	};
	run(() => {
		toggleChipColor($isLightMode, checked);
	});
</script>

{#if onClick}
	<button class={`chip ${buttonClass} ${textColorClass}`}
	        onclick={onClick}>
		{@render children?.()}
	</button>
{:else }
	<span class={`local-chip normal-bg ${textColorClass}`}>
		{@render children?.()}
	</span>
{/if}

<style lang="postcss">
    .local-chip {
        @apply chip;
        border-radius: 1em;
        margin: 0.25em;
        font-weight: bold;
        pointer-events: none;
    }

    .normal-bg {
        --tw-bg-opacity: 1;
        background-color: rgb(var(--color-tertiary-500) / var(--tw-bg-opacity));
    }

    .dark-unchecked-bg {
        background-color: rgb(var(--color-tertiary-500) / 0.2);
    }

    .light-unchecked-bg {
        background-color: rgb(var(--color-primary-500) / var(--tw-bg-opacity));
    }

    .local-light {
        color: rgb(var(--theme-font-color-base));
    }

    .local-dark {
        color: whitesmoke;
        /*color: rgb(var(--theme-font-color-dark));*/
    }
</style>
