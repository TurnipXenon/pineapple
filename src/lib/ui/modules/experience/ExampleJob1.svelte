<!-- TODO: Documentation: consider documentation showcase -->

<script module lang="ts">
	import { default as FourPartCard } from "$pkg/ui/components/FourPartCard.svelte";
	import { TextChip } from "$pkg/ui/elements/TextChip";
	import type { ProjectComponentProps } from "$pkg/ui/templates/SeaweedLayout/ProjectComponentProps";

	const key = "Software Engineer at Old Company";
	const dateStarted = "2022-01-01";
	const dateFinished = "2024-12-31";
	const tags = ["typescript", "svelte", "web"];

	// note that we can cheat the regex by doing this!
	// qt-web
	export { component, key, dateStarted, dateFinished, tags };
</script>

<script lang="ts">

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
			<h4>Old Company</h4>
			<p class="date-range">Jan 2022 - Dec 2024</p>
		{/snippet}

		<p>
			<span class="qt-typescript">TypeScript</span> and
			<span class="qt-svelte">Svelte</span>. Why would anyone hire that though?
		</p>

		<div class="text-chip-container">
			{#each tags as t (t)}
				<TextChip queryClass="qt-{t}">{t}</TextChip>
			{/each}
		</div>
	</FourPartCard>
{/snippet}

<style>
    :global {
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
            border-top-right-radius: var(--radius-xl);
            border-top-left-radius: var(--radius-xl);
        }

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
