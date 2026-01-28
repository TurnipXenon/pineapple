<!-- @component
# Note:
When with texts, wrap the text content inside a div so flex wont apply
-->

<script lang="ts">
	import type { PinyaCardProps } from "./PinyaCardProps";

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

<style lang="scss">
		@use "$styles/surface-colors" as *;

    :global {
        html {
            --pinya-card-bg-color: var(--color-primary-200);
            --pinya-card-border-color: var(--color-primary-500);
        }

        html.dark {
            --pinya-card-bg-color: var(--color-surface-900);
            --pinya-card-border-color: transparent;
        }
    }

    .pinya-card-default {
		    @extend %card-body;
        /*might need to switch*/
        padding: 1lh calc(var(--spacing) * 8);
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: var(--container-md);
        border-width: 2px;
        border-color: var(--pinya-card-border-color);
    }
</style>
