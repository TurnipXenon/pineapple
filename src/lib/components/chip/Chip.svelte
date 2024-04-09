<script lang="ts">
	import { modeCurrent as isLightMode } from "@skeletonlabs/skeleton";

	export let onClick: undefined | (() => void) = undefined;
	export let checked = true;

	$: textColorClass = $isLightMode ? "local-light" : "local-dark";
	let buttonClass = "variant-filled-tertiary";
	const toggleChipColor = (isLightMode: boolean, checked: boolean) => {
		if (isLightMode) {
			buttonClass = checked ? "normal-bg" : "light-unchecked-bg";
		} else {
			buttonClass = checked ? "normal-bg" : "dark-unchecked-bg";
		}
	};
	$: toggleChipColor($isLightMode, checked);
</script>

{#if onClick}
	<button class={`chip ${buttonClass} ${textColorClass}`}
	        on:click={onClick}>
		<slot />
	</button>
{:else }
	<span class={`local-chip normal-bg ${textColorClass}`}>
		<slot />
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
