<script lang="ts">
	import type { EntryProps } from "./EntryProps";
	import HeaderHepCat from "$pkg/assets/temp/header-hep-cat.mp4";
	import BitbucketIcon from "$pkg/assets/icons/bitbucket-icon.svg";
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
			<!-- todo: move the image crop a bit lower -->
			<video playsinline autoplay muted loop preload="none" id="hepcat-video">
				<source src={HeaderHepCat} type="video/mp4">
			</video>

			<section class="game-card-body">

				<h1>Hepcat</h1>

				<blockquote>
					"Cats, Jazz, and a little bit of Death. What more could anyone ask for?"
				</blockquote>


				<p>This is a course project made by a team of six for <a
					href="https://sites.google.com/ualberta.ca/cmput250/">CMPUT 250</a>, and it won <a
					href="https://webdocs.cs.ualberta.ca/~nathanst/certificate/">Game of the year.</a>
				</p>

				<p>
					Hep Cat is a rhythm game made in <a
					href="https://www.rpgmakerweb.com/products/programs/rpg-maker-mv" target="_blank" class="qt-rpgmaker">
					RPG Maker MV</a> with the help of additional custom-made <span class="qt-js">Javascript</span> plugins. I
					wrote the rhythm game plugin's framework. For this plugin to work, I
					had to write a <span class="qt-python">Python</span> script that parses osu! files into readable JSON
					files.
				</p>


				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://bitbucket.org/egginchicken/hep-cat/src/master/"
					        onclick={()=> window.open("https://bitbucket.org/egginchicken/hep-cat/src/master/")}>
						<img alt="bitbucket icon" src={BitbucketIcon}>
					</button>
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://just-a-phantom.itch.io/hep-cat"
					        onclick={()=> window.open("https://just-a-phantom.itch.io/hep-cat")}>
						<img alt="itch.io icon" src={ItchLogoHotLink}>
					</button>
				</section>
			</section>
		</section>
	{/snippet}
</Card>
