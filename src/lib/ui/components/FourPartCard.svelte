<script lang="ts">

	import type { Snippet } from 'svelte';
	import { PinyaCard, type PinyaCardProps } from '$pkg/ui/elements';

	interface Props extends PinyaCardProps {
		headerCover?: Snippet;
		header?: Snippet;
		footer?: Snippet;
	}

	let {
		children,
		header,
		footer,
		headerCover,
		paddingClass = '',
		...props
	}: Props = $props();
</script>

<PinyaCard {...props} {paddingClass}>
	<section class="mb-6">

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