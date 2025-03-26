<script module lang="ts">
	import HeaderHepCat from "$pkg/assets/temp/header-hep-cat.mp4";
	import BitbucketIcon from "$pkg/assets/icons/bitbucket-icon.svg";
	import type { ProjectComponentProps } from "$pkg/ui/templates/seaweed-layout/ProjectComponentProps";
	import { default as FourPartCard } from "$pkg/ui/components/FourPartCard.svelte";
	import { default as ImageIcon } from "$pkg/ui/elements/ImageIcon.svelte";
	import { default as PinyaButton } from "$pkg/ui/elements/PinyaButton/PinyaButton.svelte";
	import { type ButtonVariant } from "$pkg/ui/elements/PinyaButton/PinyaButtonProps";
	import { ItchLogoHotLink } from "$pkg/consts";

	const key = "Hepcat";
	export { component, key };
</script>

{#snippet component(props: ProjectComponentProps)}
	<FourPartCard>
		{#snippet headerCover()}
			<video playsinline autoplay muted loop preload="none" id="hepcat-video" class="game-video-cover">
				<source src={HeaderHepCat} type="video/mp4">
			</video>
		{/snippet}

		{#snippet header()}
			<h3>Hepcat</h3>

			<blockquote>
				"Cats, Jazz, and a little bit of Death. What more could anyone ask for?"
			</blockquote>
		{/snippet}


		<p>This is a course project made by a team of six for <a
			href="https://sites.google.com/ualberta.ca/cmput250/">CMPUT 250</a>, and it won <a
			href="https://webdocs.cs.ualberta.ca/~nathanst/certificate/">Game of the year.</a>
		</p>

		<p>
			Hep Cat is a <span class="qt-rhythm">rhythm</span> game made in <a
			href="https://www.rpgmakerweb.com/products/programs/rpg-maker-mv" target="_blank"
			class='qt-rpgmaker'>
			RPG Maker MV</a> with the help of additional custom-made <span class='qt-js'>Javascript</span>
			plugins. I
			wrote the rhythm game plugin's framework. For this plugin to work, I
			had to write a <span class='qt-python'>Python</span> script that parses osu! files
			into readable JSON
			files.
		</p>


		<section class="game-link-section">
			<PinyaButton
				buttonVariant={ButtonVariant.Image}
				title="https://bitbucket.org/egginchicken/hep-cat/src/master/"
				onclick={()=> window.open("https://bitbucket.org/egginchicken/hep-cat/src/master/")}>
				<ImageIcon alt="bitbucket icon" src={BitbucketIcon} />
			</PinyaButton>
			<PinyaButton
				buttonVariant={ButtonVariant.Image}
				title="https://just-a-phantom.itch.io/hep-cat"
				onclick={()=> window.open("https://just-a-phantom.itch.io/hep-cat")}>
				<ImageIcon alt="itch.io icon" src={ItchLogoHotLink}></ImageIcon>
			</PinyaButton>
		</section>
	</FourPartCard>
{/snippet}


<style>
    #hepcat-video {
        object-position: top;
        max-height: 64rem;
    }
</style>