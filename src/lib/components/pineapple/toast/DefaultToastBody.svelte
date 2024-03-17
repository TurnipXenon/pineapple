<script lang="ts">
	import type { Props } from "$pkg/components/pineapple/toast/DefaultToastBody";
	import type { DismissToastCallback } from "$pkg/components/pineapple/toast/Toast";
	import CloseIcon from "$pkg/assets/icons/close.svg";

	export let props: Props;
	export let dismissToastCallback: DismissToastCallback | undefined;
	export let shouldEnableButton = false;
</script>

<div class="body-container">
	<!-- todo: support markdown? -->
	<button class="btn"
	        disabled={!shouldEnableButton}
	        on:click={dismissToastCallback}>
		<img class="img-icon" src={CloseIcon} alt="close button">
	</button>
	<div class="text-container">
		<span>{props.message}</span>
	</div>
</div>

<style lang="postcss">
    .body-container {
        display: flex;
        gap: 1em;
    }

    .text-container {
        margin-top: 0.25lh;
        margin-right: 1em;
    }

    .text-container:dir(rtl) {
        margin-left: 1em;
    }

    .btn {
        @apply bg-surface-100 dark:bg-surface-900;
        border-radius: 8px;
		    padding: 0.5em;
    }
</style>
