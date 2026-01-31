<!-- TODO: Documentation: consider documentation showcase -->

<!-- TODO: remove tailwind like classes -->

<script lang="ts">
	import Placeholder from "$pkg/ui/elements/Placeholder.svelte";
	import { getContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { type AccordionContext, accordionContextKey } from "./accordionContext";

	let {
		control: controlSnippet,
		controlIndicator = undefined,
		panel: panelSnippet = undefined,
		hasNoChild = false,
		pinyaValue,
		...props
	}: {
		control: Snippet;
		/** take advantage that the parent has [data-state="closed"] */
		controlIndicator?: Snippet;
		panel?: Snippet;
		pinyaValue?: string
		hasNoChild?: boolean,
	} & HTMLAttributes<HTMLDivElement> = $props();

	let uid = $props.id();
	let accordionContext = getContext<AccordionContext>(accordionContextKey);
	let accordionItem = $derived(hasNoChild
		? { heading: {}, trigger: {}, content: {} }
		: accordionContext({ id: pinyaValue ?? uid })
	);
</script>

<div {...props} class="pinya-accordion-item consider-top-edge consider-bottom-edge bg-primary-100 dark:bg-tertiary-900 dark:saturate-75 {props.class}">
	{#if accordionItem}
		<div {...accordionItem.heading} class="consider-top-edge accordion-heading">
			{#if hasNoChild}
				<div {...accordionItem.trigger} class="consider-top-edge add-padding like-button consider-bottom-edge">
					{#if controlIndicator}
						{@render controlSnippet?.()}
						{@render controlIndicator()}
					{:else }
						<div>{@render controlSnippet?.()}</div>
					{/if}
				</div>
			{:else}
				<button {...accordionItem.trigger} class="consider-top-edge add-padding">
					{#if controlIndicator}
						{@render controlSnippet?.()}
						{@render controlIndicator()}
					{:else }
						<div>{@render controlSnippet?.()}</div>
						<svg class="indicator" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<line class="line-h" x1="5" y1="12" x2="19" y2="12" />
							<line class="line-v" x1="12" y1="5" x2="12" y2="19" />
						</svg>
					{/if}
				</button>
			{/if}
		</div>
		{#if !hasNoChild}
			<div {...accordionItem.content} class="accordion-panel consider-bottom-edge add-padding">
				{@render panelSnippet?.()}
			</div>
		{/if}
	{:else }
		<Placeholder classes="mb-2" />
	{/if}
</div>

<style lang="scss">
    @use "$styles/surface-colors" as *;

    .pinya-accordion-item:not(:last-child) .accordion-heading::after {
        content: "";
        display: block;
        height: 2px;
        width: 100%;
        background-color: var(--color-primary-300-700);
    }

    button, .like-button {
        @extend %surface-primary-button;
        width: 100%;
        text-align: start;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .add-padding {
        padding: 0.25lh 1rem;
    }

    .indicator {
        width: 1rem;
        height: 1rem;
        margin-left: auto;
        transition: transform 200ms ease;
    }

    .indicator line {
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
    }

    .indicator .line-v {
        transform-origin: 50% 50%;
        transition: transform 200ms ease;
    }

    button[data-state="open"] .indicator {
        transform: rotate(180deg);
    }

    button[data-state="open"] .indicator .line-v {
        transform: scaleY(0);
    }

    [data-melt-accordion-content] {
        overflow: hidden;
        max-height: 1000px;
        opacity: 1;
        transform: translateY(0);
        transition: max-height 200ms ease,
        opacity 200ms ease,
        padding 200ms ease;
    }

    [data-melt-accordion-content][data-state="closed"] {
        max-height: 0;
        opacity: 0;
        transform: translateY(-8px);
        padding-top: 0;
        padding-bottom: 0;
    }

    @media (prefers-reduced-motion: reduce) {
        [data-melt-accordion-content] {
            transition: none;
        }
    }
</style>
