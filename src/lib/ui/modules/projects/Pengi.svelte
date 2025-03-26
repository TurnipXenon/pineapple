<script module lang="ts">
	import HeaderPengi from "$pkg/assets/temp/header-pengi.mp4";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import type { ProjectComponentProps } from "$pkg/ui/templates/seaweed-layout/ProjectComponentProps";
	import { default as FourPartCard } from "$pkg/ui/components/FourPartCard.svelte";
	import { default as ImageIcon } from "$pkg/ui/elements/ImageIcon.svelte";
	import { default as PinyaButton } from "$pkg/ui/elements/PinyaButton/PinyaButton.svelte";
	import { type ButtonVariant } from "$pkg/ui/elements/PinyaButton/PinyaButtonProps";
	import { ItchLogoHotLink } from "$pkg/consts";

	const key = "Pengi";
	export { component, key };
</script>

{#snippet component(props: ProjectComponentProps)}
	<FourPartCard>
		{#snippet headerCover()}
			<video class="rounded-t-xl max-h-64 not-prose object-cover w-full" playsinline autoplay muted loop preload="none">
				video unavailable. original video contains pengi gameplay showing the dynamic dialog
				layout and character animation.
				<source src={HeaderPengi} type="video/mp4">
			</video>
		{/snippet}

		{#snippet header()}
			<h3>Pengi</h3>

			<blockquote>
				Well well, quite the dreamer, aren’t you? Might be hard to get in... costs a lot of
				money...
			</blockquote>
		{/snippet}

		<p>
			Pengi is a text-based adventure made in <span class='qt-unity'>Unity</span> (<span class='qt-cs'>C#</span>). I
			acted as the sole
			programmer for the team. Most of the work revolves around UI and creating <a
			href="https://yarnspinner.dev/" target="_blank">YarnSpinner</a> commands for writers
			to use to create expressive stage directions in the script.
		</p>

		<section class="game-link-section">
			<PinyaButton
				buttonVariant={ButtonVariant.Image}
				aria-label="Click to go to Project Pengi in Github"
				title="https://github.com/GreenTea-M/ProjectPengi"
				onclick={() => window.open("https://github.com/GreenTea-M/ProjectPengi")}
			>
				<ImageIcon alt="" aria-hidden="true" src={GithubIcon} />
			</PinyaButton>
			<PinyaButton
				buttonVariant={ButtonVariant.Image}
				aria-label="Click to go to Project Pengi in Itch.io"
				title="https://turnipxenon.itch.io/pengi"
				onclick={() => window.open("https://turnipxenon.itch.io/pengi")}
			>
				<ImageIcon alt="" aria-hidden="true" src={ItchLogoHotLink} />
			</PinyaButton>
		</section>

	</FourPartCard>
{/snippet}