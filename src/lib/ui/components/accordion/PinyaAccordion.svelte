<script lang="ts">
	import { Accordion } from "melt/builders";
	import { setContext, type Snippet } from "svelte";
	import type { SvelteSet } from "svelte/reactivity";
	import { accordionContextKey, type AccordionContext } from "./accordionContext";

	let {
		children,
		openItems = $bindable(),
		multiple = true
	}: {
		children: Snippet,
		openItems?: string[],
		multiple?: boolean,
	} = $props();
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
</script>

<div class="pinya-accordion-root" {...accordion.root}>
	{@render children?.()}
</div>

<style>
    :global {
        .pinya-accordion-root {
            .pinya-accordion-item {
                &:first-child, &:first-child .consider-top-edge {
                    border-top-left-radius: var(--radius-lg);
                    border-top-right-radius: var(--radius-lg);
                }
            }

            .pinya-accordion-item {
                &:last-child, &:last-child .consider-bottom-edge, &:last-child .consider-top-edge[data-state="closed"] {
                    border-bottom-left-radius: var(--radius-lg);
                    border-bottom-right-radius: var(--radius-lg);
                }
            }
        }
    }
</style>
