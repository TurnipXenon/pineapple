<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import Card from "$pkg/components/Card.svelte";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import WindowSetGraph from "$pkg/assets/others/window-set.png";
	import ThisWebsiteFootage from "$pkg/assets/others/seaweed-showcase.mp4";
	import Chip from "$pkg/components/chip/Chip.svelte";

	// noinspection JSUnusedGlobalSymbols
	export let props: EntryProps;
</script>

<Card>
	<section class="project-card" slot="content">

		<video playsinline autoplay muted loop preload="none">
			<source src={ThisWebsiteFootage} type="video/mp4">
			video unavailable. original video contains clips of this website being resized and light-dark mode being
			toggled.
		</video>
		<div class="project-card-body">
			<h2>This webpage!</h2>

			<p>
				The webpage is made of two parts. The webpage that has the content for everything here, I've
				lovingly called Seaweed. I kept seaweed as a private package. On the other hand, the base package which I
				want to use for all spin offs of my websites is called Pineapple and have kept that codebase public.
			</p>

			<p>
				<Chip>Svelte</Chip>
				<Chip>Skeleton (Svelte UI library)</Chip>
				<Chip>Typescript</Chip>
				<Chip>Vercel</Chip>
				<Chip>YarnSpinner</Chip>
				<Chip>Postgres (SQL database)</Chip>
				<Chip>Prisma ORM</Chip>
			</p>

			<section class="game-link-section">
				<button type="button" class="btn variant-filled-primary turnip-button"
				        role="link"
				        title="https://github.com/TurnipXenon/pineapple"
				        on:click={() => window.open("https://github.com/TurnipXenon/pineapple")}>
					<img src={GithubIcon} class="long-btn-image" alt="github icon">
				</button>
			</section>
		</div>
	</section>
</Card>
