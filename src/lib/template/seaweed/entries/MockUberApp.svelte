<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import Card from "$pkg/components/Card.svelte";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import WindowSetGraph from "$pkg/assets/others/window-set.png";
	import ThisWebsiteFootage from "$pkg/assets/others/seaweed-showcase.mp4";
	import Chip from "$pkg/components/Chip.svelte";

	// noinspection JSUnusedGlobalSymbols
	export let props: EntryProps;
</script>

<Card>
	<section class="project-card" slot="content">
		<div class="project-card-body">
			<h2>Mock Uber App</h2>

			<p>A course project app meant to emulate how Uber works by playing with <span
				class="qt-google">Google Maps API</span>.
			</p>
			<p>
				I implemented all interfaces related to the NoSQL cloud database <span
				class="qt-firebase qt-google qt-infra">Firebase</span>, making writing code easier for other programmers
				(<span
				class="qt-android">Android</span> / <span class="qt-java">Java</span>). I also wrote documentation to said
				code and added instrumented tests that are tested by the continuous integration tool <span
				class="qt-infra">Travis CI</span>, ensuring that our code is tested
			</p>

			<section class="game-link-section">
				<!-- todo: mock uber app find link -->
				<button type="button" class="game-button turnip-button"
				        role="link"
				        title="https://github.com/CMPUT301W20T10/UberApp"
				        on:click={() => window.open("https://github.com/CMPUT301W20T10/UberApp")}>
					<img src={GithubIcon} class="long-btn-image" alt="github icon">
				</button>
			</section>
		</div>
	</section>
</Card>
