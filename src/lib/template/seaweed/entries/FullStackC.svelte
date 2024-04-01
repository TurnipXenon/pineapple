<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import Card from "$pkg/components/Card.svelte";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";

	// noinspection JSUnusedGlobalSymbols
	export let props: EntryProps;
</script>

<Card>
	<section class="project-card" slot="content">
		<div class="project-card-body">
			<h2>Full-stack <span class="qt-c">C</span> app</h2>

			<p>
				A terminal-based app consisting of a server observing several terminal apps all concurrently
				sending updates to the server, which then broadcasts these information concurrently to all the
				other terminal apps connected.
			</p>
			<p>
				The project involves <span class="qt-foundation">multiprocessing</span> programming featuring pthreads and
				mutexes, and <span class="qt-foundation">networking</span> via sockets.
			</p>

			<section class="game-link-section">
				<button type="button" class="game-button turnip-button"
				        role="link"
				        title="https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md"
				        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md")}>
					<img src={GithubIcon} class="long-btn-image" alt="github icon">
				</button>
			</section>
		</div>
	</section>
</Card>

