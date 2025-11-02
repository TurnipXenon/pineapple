<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">/**
 * When with texts, wrap the text content inside a div so flex wont apply
 */
import type { PinyaCardProps } from "./PinyaCardProps";

	// borderClass = "border-[2px] border-primary-500 dark:border-0",
	// colorClass = "bg-surface-200 dark:bg-surface-900",
let _props: PinyaCardProps = $props();

let cardClass = $derived(`
	${_props.paddingClass ?? ""} ${_props.flexClass ?? ""} ${_props.className ?? ""}
	${_props.widthClass ?? ""} ${_props.borderClass ?? ""} ${_props.marginClass ?? ""}
	${_props.colorClass ?? ""}
	${_props.class ?? ""}
	`);
</script>

{#if _props.includeDataNoSnippet}
	<div
		id={_props.id}
		data-nosnippet
		class={`card text-start rounded-xl pinya-card-default ${cardClass}`}
	>
		{@render _props?.children?.()}
	</div>
{:else }
	<div
		id={_props.id}
		class={`card text-start rounded-xl pinya-card-default ${cardClass}`}
	>
		{@render _props?.children?.()}
	</div>
{/if}

<style>
    .pinya-card-default {
        /*might need to switch*/
        padding: calc(var(--spacing) * 16) 1lh;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: var(--container-md);
        border-width: 2px;
        border-color: var(--color-primary-500);
    }

    .dark {
		    .pinya-card-default {
          border-color: var(--color-primary-0);
		    }
    }
</style>
