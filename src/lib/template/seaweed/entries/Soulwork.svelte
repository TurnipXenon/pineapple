<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import HeaderSoulwork from "$pkg/assets/temp/header-soulwork.mp4";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import { ItchLogoHotLink } from "$pkg/consts";
	import Card from "$pkg/components/Card.svelte";

	interface Props {
		props: EntryProps;
	}

	let { props }: Props = $props();
</script>

<Card>
	{#snippet content()}
		<section class="game-card" >
			<video playsinline autoplay muted loop preload="none">
				<source src={HeaderSoulwork} type="video/mp4">
			</video>
			<section class="game-card-body">

				<h1>Soulwork</h1>

				<p>
					Soulwork is a 2D platforming game that uses unique physics to solve puzzle-based levels.
					This project is a Time to Game Jam entry, restricting game development to be under 48
					hours.
				</p>
				<p>
					I helped make the level designing tools used by the designers to drag-and-drop objects
					on the stage. I also helped program the unique physics-based gameplay mechanic. This was
					was made in <span class="qt-unity">Unity</span> written using <span class="qt-cs">C#</span>.
				</p>


				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/Zeyu-Li/Clockwork"
					        onclick={()=> window.open("https://github.com/Zeyu-Li/Clockwork")}>
						<img alt="github icon" src={GithubIcon}>
					</button>
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://itch.io/jam/time-to-game-jam-gadec-fall-game-jam/rate/514331"
					        onclick={()=> window.open("https://itch.io/jam/time-to-game-jam-gadec-fall-game-jam/rate/514331")}>
						<img alt="itch.io icon" src={ItchLogoHotLink}>
					</button>
				</section>
			</section>
		</section>
	{/snippet}
</Card>
