<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import Card from "$pkg/components/Card.svelte";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import ThisWebsiteFootage from "$pkg/assets/others/seaweed-showcase.mp4";
	import { Chip } from "$pkg";

	// noinspection JSUnusedGlobalSymbols
	interface Props {
		props: EntryProps;
	}

	let { props }: Props = $props();
</script>

<Card>
	{#snippet content()}
		<section class="project-card" >

			<video playsinline autoplay muted loop preload="none">
				<source src={ThisWebsiteFootage} type="video/mp4">
				video unavailable. original video contains clips of this website being resized and light-dark mode being
				toggled.
			</video>
			<div class="project-card-body">
				<h2>This webpage!</h2>

				<p>
					The webpage is made with two parts. The webpage that has the content for everything here, I've lovingly called Seaweed. I kept seaweed as a private package. On the other hand, the base package which I want to use for all spin offs of my websites is called Pineapple and have kept that codebase public.
				</p>
				<p>The webpage can dynamically emphasize terms, rearrange the layout, use different terms, and save all these configurations as a shortened link. Additionally fetches the latest blog entries from turnipxenon.com via REST calls.</p>

				<p>
					<Chip>Svelte</Chip>
					<Chip>Skeleton (Svelte UI library)</Chip>
					<Chip>Typescript</Chip>
					<Chip>Vercel</Chip>
					<Chip>YarnSpinner</Chip>
					<Chip>Postgres (SQL database)</Chip>
					<Chip>Prisma ORM</Chip>
					<Chip>RESTful API</Chip>
				</p>

				<section class="game-link-section">
					<button type="button" class="btn preset-filled-primary-500 turnip-button"
					        role="link"
					        title="https://github.com/TurnipXenon/pineapple"
					        onclick={() => window.open("https://github.com/TurnipXenon/pineapple")}>
						<img src={GithubIcon} class="long-btn-image" alt="github icon">
					</button>
				</section>
			</div>
		</section>
	{/snippet}
</Card>
