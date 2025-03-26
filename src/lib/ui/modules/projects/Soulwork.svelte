<script module lang="ts">
	import HeaderSoulwork from "$pkg/assets/temp/header-soulwork.mp4";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import type { ProjectComponentProps } from "$pkg/ui/templates/index";
	import { default as FourPartCard } from "$pkg/ui/components/FourPartCard.svelte";
	import { default as ImageIcon } from "$pkg/ui/elements/ImageIcon.svelte";
	import { default as PinyaButton } from "$pkg/ui/elements/PinyaButton/PinyaButton.svelte";
	import { type ButtonVariant } from "$pkg/ui/elements/PinyaButton/PinyaButtonProps";
	import { ItchLogoHotLink } from "$pkg/consts";

	const key = "Soulwork";
	export { component, key };
</script>

{#snippet component(props: ProjectComponentProps)}
	<FourPartCard>
		{#snippet headerCover()}
			<video
				playsinline autoplay muted loop preload="none"
				class="game-video-cover"
			>
				<source src={HeaderSoulwork} type="video/mp4">
			</video>
		{/snippet}

		{#snippet header()}
			<h1>Soulwork</h1>
		{/snippet}

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
			<PinyaButton
				buttonVariant={ButtonVariant.Image}
				title="https://github.com/Zeyu-Li/Clockwork"
				onclick={()=> window.open("https://github.com/Zeyu-Li/Clockwork")}>
				<ImageIcon alt="github icon" src={GithubIcon} />
			</PinyaButton>
			<PinyaButton
				buttonVariant={ButtonVariant.Image}
				title="https://itch.io/jam/time-to-game-jam-gadec-fall-game-jam/rate/514331"
				onclick={()=> window.open("https://itch.io/jam/time-to-game-jam-gadec-fall-game-jam/rate/514331")}>
				<ImageIcon alt="itch.io icon" src={ItchLogoHotLink} />
			</PinyaButton>
		</section>
	</FourPartCard>
{/snippet}