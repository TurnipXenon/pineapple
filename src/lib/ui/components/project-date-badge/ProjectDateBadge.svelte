<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { ProjectDateBageProps } from "$pkg/ui/components/project-date-badge/ProjectDateBageProps";
	import { TextLink } from "$pkg/ui/elements/index";

	let {
		dateStarted,
		dateFinished,
		isOngoing = false,
		commitCount,
		gitRepoLink
	}: ProjectDateBageProps = $props();

	function formatDate(date: Date | string): string {
		const d = date instanceof Date ? date : new Date(date);
		return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
	}

	function getDurationText(start: Date | string, end?: Date | string): string {
		const startDate = start instanceof Date ? start : new Date(start);
		const endDate = end ? (end instanceof Date ? end : new Date(end)) : new Date();

		const totalMonths =
			(endDate.getFullYear() - startDate.getFullYear()) * 12 +
			(endDate.getMonth() - startDate.getMonth());

		if (totalMonths < 1) {
			const days = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
			return `${days} day${days !== 1 ? "s" : ""}`;
		}

		const years = Math.floor(totalMonths / 12);
		const months = totalMonths % 12;

		if (years === 0) return `${months} mo${months !== 1 ? "s" : ""}`;
		if (months === 0) return `${years} yr${years !== 1 ? "s" : ""}`;
		return `${years} yr${years !== 1 ? "s" : ""} ${months} mo${months !== 1 ? "s" : ""}`;
	}

	const hasData = $derived(!!dateStarted);
</script>

{#if hasData}
	<section transition:slide class="project-date-badge">
		<div class="badge-row">
			<span class="date-info">
				{formatDate(dateStarted!)}
				<span class="separator">→</span>
				{#if isOngoing}
					<span class="ongoing-label">Present</span>
				{:else if dateFinished}
					{formatDate(dateFinished)}
				{:else}
					<span class="unknown-label">?</span>
				{/if}
			</span>

			{#if dateStarted}
				<span class="duration">
					{getDurationText(dateStarted, isOngoing ? undefined : dateFinished)}
				</span>
			{/if}
		</div>

		{#if commitCount != null || isOngoing}
			<div class="badge-row secondary-row">
				{#if isOngoing}
					<span class="ongoing-badge">ongoing</span>
				{/if}
				{#if commitCount != null && gitRepoLink}
					<TextLink href={gitRepoLink} target="_blank" rel="noopener noreferrer" class="commit-count">
						{commitCount} commit{commitCount !== 1 ? "s" : ""}
					</TextLink>
				{:else if commitCount != null}
					<span class="commit-count">{commitCount} commit{commitCount !== 1 ? "s" : ""}</span>
				{/if}
			</div>
		{/if}
	</section>
{/if}

<style>
    .project-date-badge {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        padding: 0.75rem 0;
        margin-top: 0.75rem;
        border-top: 1px solid var(--color-surface-900-100);
        font-size: 0.8125rem;
        line-height: 1.4;
    }

    .badge-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .date-info {
        color: var(--color-surface-900-100);
    }

    .separator {
        margin: 0 0.25rem;
        color: var(--color-surface-900-100);
    }

    .ongoing-label {
        color: var(--color-primary-400-600);
        font-weight: 600;
    }

    .unknown-label {
        color: var(--color-surface-900-100);
        font-style: italic;
    }

    .duration {
        color: var(--color-surface-900-100);
        font-weight: 500;
    }

    .secondary-row {
        justify-content: flex-start;
        gap: 0.5rem;
    }

    .ongoing-badge {
        display: inline-block;
        padding: 0.125rem 0.5rem;
        border-radius: var(--radius-md, 0.375rem);
        background-color: var(--color-primary-50-900);
        color: var(--color-primary-700);
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.025em;
    }

    :global(html.dark) .ongoing-badge {
        color: var(--color-primary-300);
    }

    .commit-count {
        font-size: 0.75rem;
        color: var(--color-surface-900-100);
    }

    a.commit-count {
        text-decoration: none;
    }

    a.commit-count:hover {
        text-decoration: underline;
        color: var(--color-primary-400-600);
    }
</style>
