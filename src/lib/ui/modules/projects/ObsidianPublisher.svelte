<!-- TODO: Documentation: consider documentation showcase -->

<script module lang="ts">
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import LinkIcon from "$pkg/assets/icons/link-icon.svg";
	import { default as FourPartCard } from "$pkg/ui/components/FourPartCard.svelte";
	import ProjectDateBadge from "$pkg/ui/components/project-date-badge/ProjectDateBadge.svelte";
	import { default as ImageIcon } from "$pkg/ui/elements/ImageIcon.svelte";
	import { default as PinyaButton } from "$pkg/ui/elements/PinyaButton/PinyaButton.svelte";
	import { ButtonVariant } from "$pkg/ui/elements/PinyaButtonCommon/ButtonVariant";
	import { default as TextChip } from "$pkg/ui/elements/TextChip/TextChip.svelte";
	import type { ProjectComponentProps } from "$pkg/ui/templates/SeaweedLayout/ProjectComponentProps";

	const key = "ObsidianPublisher";
	const startCommit = "https://github.com/TurnipXenon/obsidian-blog-publisher/commit/d8eaecacc3703a57c16b400d3bea6428b0dbfaee"; // fill in GitHub commit URL to auto-resolve dateStarted
	const gitRepoLink = "https://github.com/TurnipXenon/obsidian-blog-publisher";
	const tags = ["plugin", "typescript", "obsidian"];
	export { component, key, startCommit, gitRepoLink, tags };
</script>
<script>
	import { TextLink } from "$pkg/ui/elements/index";
</script>

{#snippet component(props: ProjectComponentProps)}
	<FourPartCard>

		{#snippet headerCover()}
			<img
				class="game-video-cover"
				alt="Screenshot showing the blog on the left and the source Obsidian page on the right with a UI on top prompting the user which selection or webpage to push"
				src="https://github.com/TurnipXenon/obsidian-blog-publisher/raw/main/docs/showcase.png" />
		{/snippet}

		{#snippet header()}
			<h3>Blog Publisher Plugin</h3>
		{/snippet}

		<p>
			An Obsidian plugin that publishes my blog to a selected website.
			It generates AST of the Markdown files, which it then publishes to a git repo.
			The plugin follows it up with a Cloudflare rebuild of the website, which would read the contents of the repo.
			A module in the website called
			<TextLink href="https://github.com/TurnipXenon/pineapple/pull/152">Parsnip</TextLink>
			generates custom pages based on these AST files.
		</p>

		<ProjectDateBadge
			dateStarted={props.snippetMeta?.dateStarted}
			dateFinished={props.snippetMeta?.dateFinished}
			isOngoing={props.snippetMeta?.tags?.includes("ongoing") ?? false}
			commitCount={props.snippetMeta?.commitCount}
			gitRepoLink={props.snippetMeta?.gitRepoLink}
		/>

		<section class="game-link-section">
			<PinyaButton
				buttonVariant={ButtonVariant.Image}
				title="https://github.com/TurnipXenon/obsidian-blog-publisher"
				onclick={() => window.open("https://github.com/TurnipXenon/obsidian-blog-publisher")}>
				<ImageIcon src={GithubIcon} class="long-btn-image" alt="github icon" />
			</PinyaButton>
			<PinyaButton
				data-nosnippet
				buttonVariant={ButtonVariant.SmallIcon}
				title="https://www.turnipxenon.com/blogs"
				onclick={() => window.open("https://www.turnipxenon.com/blogs")}>
				<ImageIcon src={LinkIcon} aria-hidden />
				<span>turnipxenon.com/blogs</span>
			</PinyaButton>
		</section>

	</FourPartCard>
{/snippet}
