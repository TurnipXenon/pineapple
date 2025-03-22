<script module lang="ts">
	import GithubIcon from '$pkg/assets/icons/github-mark.svg';
	import ThisWebsiteFootage from '$pkg/assets/others/seaweed-showcase.mp4';
	import type { ProjectComponentProps } from '../../templates/seaweed-layout/ProjectComponentProps';

	const key = 'This Webpage';
	export { component, key };
</script>
<script>
	import { FourPartCard } from "$pkg/ui/components/index";
	import { ButtonVariant, ImageIcon, PinyaButton, TextChip } from "$pkg/ui/elements/index.js";
</script>

{#snippet component(props: ProjectComponentProps)}
	<FourPartCard>

		{#snippet headerCover()}
			<video
				playsinline autoplay muted loop preload="none"
				class="game-video-cover"
			>
				<source src={ThisWebsiteFootage} type="video/mp4">
				video unavailable. original video contains clips of this website being resized and light-dark mode being
				toggled.
			</video>
		{/snippet}

		{#snippet header()}
			<h2>This webpage!</h2>
		{/snippet}

		<p>
			The webpage is made with two parts. The webpage that has the content for everything here, I've lovingly called
			Seaweed. I kept seaweed as a private package. On the other hand, the base package which I want to use for all
			spin offs of my websites is called Pineapple and have kept that codebase public.
		</p>
		<p>The webpage can dynamically emphasize terms, rearrange the layout, use different terms, and save all these
			configurations as a shortened link. Additionally fetches the latest blog entries from turnipxenon.com via REST
			calls.</p>

		<div class="text-chip-container">
			<TextChip queryClass="qt-svelte">Svelte 5</TextChip>
			<TextChip queryClass="qt-tailwind">Tailwind 4</TextChip>
			<TextChip queryClass="qt-skeleton">Skeleton (Svelte UI library)</TextChip>
			<TextChip queryClass="qt-ts">Typescript</TextChip>
			<TextChip queryClass="qt-vercel qt-cicd">Vercel</TextChip>
			<TextChip queryClass="qt-gamedev">YarnSpinner</TextChip>
			<TextChip queryClass="qt-postgres qt-db">Postgres (SQL database)</TextChip>
			<TextChip queryClass="qt-prisma qt-db">Prisma ORM</TextChip>
			<TextChip queryClass="qt-rest">RESTful API</TextChip>
		</div>

		<section class="game-link-section">
			<PinyaButton
				buttonVariant={ButtonVariant.Image}
				title="https://github.com/TurnipXenon/pineapple"
				onclick={() => window.open("https://github.com/TurnipXenon/pineapple")}>
				<ImageIcon src={GithubIcon} class="long-btn-image" alt="github icon" />
			</PinyaButton>
		</section>
	</FourPartCard>
{/snippet}