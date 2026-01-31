<!-- TODO: Documentation: consider documentation showcase -->

<!-- @component
# Note:
When with texts, wrap the text content inside a div so flex wont apply
-->

<script lang="ts">
	import type { PinyaCardProps } from "./PinyaCardProps";

	let _props: PinyaCardProps = $props();

	let cardClass = $derived(`pinya-card
	${_props.paddingClass ?? "default-padding"} ${_props.flexClass ?? "default-flex"} ${_props.className ?? ""}
	${_props.widthClass ?? "default-width"} ${_props.borderClass ?? "default-border"} ${_props.marginClass ?? "default-margin"}
	${_props.colorClass ?? "default-color"}
	${_props.class ?? ""}
	`);
</script>

{#if _props.includeDataNoSnippet}
	<div
		id={_props.id}
		data-nosnippet
		class={`card text-start rounded-xl pinya-card ${cardClass}`}
	>
		{@render _props?.children?.()}
	</div>
{:else }
	<div
		id={_props.id}
		class={`card text-start rounded-xl pinya-card ${cardClass}`}
	>
		{@render _props?.children?.()}
	</div>
{/if}

<style lang="scss">
    @use "$styles/surface-colors" as *;

    :global {
        html {
            --pinya-card-bg-color: var(--color-surface-200);
            --pinya-card-border-color: var(--color-primary-500);
        }

        html.dark {
            --pinya-card-bg-color: var(--color-surface-900);
            --pinya-card-border-color: transparent;
        }

        :root {
            scrollbar-color: var(--color-primary-400-600) var(--pinya-card-bg-color);
            scrollbar-width:thin
        }
    }

    .default-color {
        @extend %card-body;
    }

    /*might need to switch*/
    .default-padding {
        padding: 1lh calc(var(--spacing) * 8);
    }

    .default-flex {
        display: flex;
        flex-direction: column;
    }

    .default-width {
        width: 100%;
        max-width: var(--container-md);
    }

    .default-border {
        border-width: 2px;
        border-color: var(--pinya-card-border-color);
    }
</style>
