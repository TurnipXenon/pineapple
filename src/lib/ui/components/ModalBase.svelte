<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	import type { ModalProps } from 'svelte-modals';

	import { onMount, type Snippet } from 'svelte';
	import { PinyaCard } from '$pkg/ui/elements';

	// https://svelte-modals.mattjennin.gs/modal-components/props/#typescript
	interface ModalBaseProps extends ModalProps {
		children: Snippet,
	}

	let {
		children,
		isOpen,
		close
	}: ModalBaseProps = $props();

	let container = $state<HTMLDivElement>();
	onMount(() => {
		const focusableElement = container?.querySelector('input, select, textarea, button, object, a, area[href], [tabindex]');
		if (focusableElement) {
			(focusableElement as HTMLElement).focus();
		}

		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape') {
				close();
			}
		});
	});
</script>

{#if isOpen}
	<dialog aria-modal="true" in:scale|global={{
		start: 0.95,
		duration: 750,
		easing: elasticOut,
		opacity: 0.9
	}}>
		<div class="interactable" bind:this={container}>
			<PinyaCard
				widthClass="max-w-xl2"
				paddingClass="pl-8 pr-8 pt-4 pb-8"
			>
				{@render children?.()}
			</PinyaCard>
		</div>
	</dialog>
{/if}

<style>
    dialog {
        padding: 0;
        background-color: transparent;
        border-color: transparent;
        z-index: 20;
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .interactable {
        pointer-events: auto;
    }
</style>
