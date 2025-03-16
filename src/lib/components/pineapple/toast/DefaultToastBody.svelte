<script lang="ts">
	import type { Props } from "$pkg/components/pineapple/toast/DefaultToastBody";
	import type { DismissToastCallback } from "$pkg/components/pineapple/toast/Toast";
	import CloseIcon from "$pkg/assets/icons/close.svg";

	interface Props_1 {
		props: Props;
		dismissToastCallback: DismissToastCallback | undefined;
		shouldEnableButton?: boolean;
	}

	let { props, dismissToastCallback, shouldEnableButton = false }: Props_1 = $props();
</script>

<div class="body-container">
	<!-- todo: support markdown? -->
	<button class="btn bg-surface-100 dark:bg-surface-900"
	        disabled={!shouldEnableButton}
	        onclick={dismissToastCallback}>
		<img class="img-icon" src={CloseIcon} alt="close button">
	</button>
	<div class="text-container">
		<span>{props.message}</span>
	</div>
</div>

<style>
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
        border-radius: 8px;
		    padding: 0.5em;
    }
</style>
