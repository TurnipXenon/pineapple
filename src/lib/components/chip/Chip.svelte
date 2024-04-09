<script lang="ts">
	import { modeCurrent as isLightMode } from "@skeletonlabs/skeleton";

	export let onClick: undefined | (() => void) = undefined;
	export let checked = false;

	$: textColorClass = $isLightMode ? "local-light" : "local-dark";
	let buttonClass = "variant-filled-tertiary";
	const toggleChipColor = (isLightMode: boolean, checked: boolean) => {
		if (isLightMode) {
			buttonClass = checked ? "variant-filled-tertiary" : "variant-filled-primary";
		} else {
			buttonClass = checked ? "variant-filled-tertiary" : "variant-soft-tertiary";
		}
	};
	$: toggleChipColor($isLightMode, checked);
</script>

<!-- aria wanrning is okay to ignore since it dynamically shifts between button or span -->
{#if onClick}
	<button class={`chip ${buttonClass} ${textColorClass}`}
	        on:click={onClick}>
		<slot />
	</button>
{:else }
	<span class={`local-chip variant-filled-tertiary ${textColorClass}`}>
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
        background-color: rgb(var(--color-tertiary-500) / var(--tw-bg-opacity));
    }

    .local-light {
        color: rgb(var(--theme-font-color-base));
    }

    .local-dark {
        color: whitesmoke;
        /*color: rgb(var(--theme-font-color-dark));*/
    }
</style>
