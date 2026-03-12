<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { PinyaCard, type PinyaCardProps } from "$pkg/ui/elements";
	import type { Snippet } from "svelte";

	interface Props extends PinyaCardProps {
		headerCover?: Snippet;
		header?: Snippet;
		footer?: Snippet;
	}

	let { children, header, footer, headerCover, ...props }: Props = $props();
</script>

<PinyaCard {...props} class={`pinya-four-part-card ${props.class}`}>
	<section class="mb-6 flex-wrapper">
		{#if headerCover}
			<section class="card-header-cover w-full">
				{@render headerCover()}
			</section>
		{/if}

		<section class="card-content pl-6 pr-6">
			{#if header}
				<section class="card-header mt-4 mb-4">
					{@render header()}
				</section>
			{/if}

			{@render children()}

			{#if footer}
				<section class="card-footer">
					{@render footer()}
				</section>
			{/if}
		</section>
	</section>
</PinyaCard>

<style>
	:global {
		.pinya-four-part-card.pinya-card {
			padding: 0;

			.card-header-cover > img {
				border-radius: calc(var(--radius-xl) - 2px);
			}

			word-wrap: break-word;
			-webkit-hyphens: auto;
			-moz-hyphens: auto;
			-ms-hyphens: auto;
			hyphens: auto;
		}

		html.dark .pinya-four-part-card {
			border: 0;
			.card-header-cover > img {
				border-radius: var(--radius-xl);
			}
		}
	}
</style>
