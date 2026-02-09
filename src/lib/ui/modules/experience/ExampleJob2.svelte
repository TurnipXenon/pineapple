<!-- TODO: Documentation: consider documentation showcase -->

<script module lang="ts">
	import type { ProjectComponentProps } from "$pkg/ui/templates/SeaweedLayout/ProjectComponentProps";
	import { default as FourPartCard } from "$pkg/ui/components/FourPartCard.svelte";
	import { TextChip } from "$pkg/ui/elements/TextChip";

	const key = "Senior Developer at Current Company";
	const dateStarted = "2024-01-01";
	// No dateFinished export - indicates ongoing position
	const tags = ["rust", "systems", "performance", "ongoing"];
	export { component, key, dateStarted, tags };
</script>

{#snippet component(props: ProjectComponentProps)}
	<FourPartCard>
		{#snippet headerCover()}
			<div class="company-logo-placeholder">
				<h1>CC</h1>
			</div>
		{/snippet}

		{#snippet header()}
			<h3>Senior Developer</h3>
			<h4>Current Company</h4>
			<p class="date-range">Jan 2024 - Present</p>
		{/snippet}

		<p>
			Currently working on high-performance systems using
			<TextChip queryClass="qt-rust">Rust</TextChip>.
			Leading development of critical infrastructure components and mentoring junior developers.
		</p>
		<div class="ongoing-badge">
			<TextChip queryClass="qt-ongoing">Ongoing</TextChip>
		</div>
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
		background: linear-gradient(135deg, var(--color-secondary-500), var(--color-tertiary-500));
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

	.ongoing-badge {
		margin-top: 0.5rem;
	}
</style>
