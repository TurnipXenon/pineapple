<!-- TODO: Documentation: consider documentation showcase -->

<script module lang="ts">
	import type { ProjectComponentProps } from "$pkg/ui/templates/SeaweedLayout/ProjectComponentProps";
	import { default as FourPartCard } from "$pkg/ui/components/FourPartCard.svelte";
	import { TextChip } from "$pkg/ui/elements/TextChip";

	const key = "Software Engineer at Company X";
	const dateStarted = "2022-01-01";
	const dateFinished = "2024-12-31";
	const tags = ["typescript", "svelte", "web"];
	export { component, key, dateStarted, dateFinished, tags };
</script>

{#snippet component(props: ProjectComponentProps)}
	<FourPartCard>
		{#snippet headerCover()}
			<div class="company-logo-placeholder">
				<h1>CX</h1>
			</div>
		{/snippet}

		{#snippet header()}
			<h3>Software Engineer</h3>
			<h4>Company X</h4>
			<p class="date-range">Jan 2022 - Dec 2024</p>
		{/snippet}

		<p>
			Built scalable web applications using
			<TextChip queryClass="qt-typescript">TypeScript</TextChip> and
			<TextChip queryClass="qt-svelte">Svelte</TextChip>.
			Collaborated with cross-functional teams to deliver high-quality software solutions.
		</p>
	</FourPartCard>
{/snippet}

<style>
	.company-logo-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: 150px;
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
		color: white;
		font-size: 2rem;
		font-weight: bold;
	}

	.date-range {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin-bottom: 0.5rem;
	}

	h4 {
		margin-top: 0.25rem;
		margin-bottom: 0.5rem;
		color: var(--color-text-secondary);
	}
</style>
