<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import HeaderPengi from "$pkg/assets/temp/header-pengi.mp4";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import { ItchLogoHotLink } from "$pkg/consts";
	import Card from "$pkg/components/Card.svelte";

	export let props: EntryProps;
</script>

<Card>
	<section class="game-card" slot="content">
		<video playsinline autoplay muted loop preload="none">
			video unavailable. original video contains pengi gameplay showing the dynamic dialog
			layout and character animation.
			<source src={HeaderPengi} type="video/mp4">
		</video>

		<section class="game-card-body">

			<h1>Pengi</h1>

			<blockquote>
				Well well, quite the dreamer, aren’t you? Might be hard to get in... costs a lot of
				money...
			</blockquote>

			<p>
				Pengi is a text-based adventure made in <span class="qt-unity">Unity</span>. I acted as the sole
				programmer for the team. Most of the work revolves around UI and creating <a
				href="https://yarnspinner.dev/" target="_blank">YarnSpinner</a> commands for writers
				to use to create expressive stage directions in the script.
			</p>

			<section class="game-link-section">
				<button type="button" class="game-button turnip-button"
				        role="link"
				        title="https://github.com/GreenTea-M/ProjectPengi"
				        on:click={()=> window.open("https://github.com/GreenTea-M/ProjectPengi")}>
					<img alt="github icon" src={GithubIcon}>
				</button>
				<button type="button" class="game-button turnip-button"
				        role="link"
				        title="https://turnipxenon.itch.io/pengi"
				        on:click={()=> window.open("https://turnipxenon.itch.io/pengi")}>
					<img alt="itch.io icon" src={ItchLogoHotLink}>
				</button>
			</section>
		</section>
	</section>
</Card>
