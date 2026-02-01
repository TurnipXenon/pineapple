<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { Accordion } from "melt/builders";
	import { setContext } from "svelte";
	import type { SvelteSet } from "svelte/reactivity";
	import { accordionContextKey, type AccordionContext } from "./accordionContext";
	import type { PinyaAccordionProps } from "./PinyaAccordionProps";

	let {
		children,
		openItems = $bindable([]),
		multiple = true,
		...props
	}: PinyaAccordionProps = $props();
	let accordion = $derived(new Accordion({
		value: (() => {
			if (openItems) {
				if (multiple) {
					return new Set(openItems);
				} else if (openItems.length > 0) {
					return openItems[0];
				}
			}

			return undefined;
		})(),
		onValueChange: (t: SvelteSet<string> | string | undefined) => {
			if (typeof t === "string") {
				openItems = t ? [t] : [];
			} else if (t) {
				openItems = [...t];
			} else {
				openItems = [];
			}
		}, multiple
	}));
	setContext<AccordionContext>(accordionContextKey, (key) => accordion.getItem(key));
	setContext<string[]>('accordionOpenItems', openItems);
</script>

<div {...props} class={`pinya-accordion-root ${props.class ?? ''}`} {...accordion.root}>
	{@render children?.()}
</div>

<style>
    :global {
        .pinya-accordion-root {
            .pinya-accordion-item {
                &:first-child,
                &:first-child > .accordion-heading,
                &:first-child > .accordion-heading .consider-top-edge {
                    border-top-left-radius: var(--radius-lg);
                    border-top-right-radius: var(--radius-lg);
                }
            }

            .pinya-accordion-item {
                &:last-child,
                &:last-child > .accordion-panel,
                &:last-child > .accordion-heading .consider-bottom-edge,
                &:last-child > .accordion-heading .consider-top-edge[data-state="closed"] {
                    border-bottom-left-radius: var(--radius-lg);
                    border-bottom-right-radius: var(--radius-lg);
                }
            }
        }
    }
</style>
