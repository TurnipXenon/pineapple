<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import LinkedinIcon from "$pkg/assets/icons/linkedin.svg";

	import MailIcon from "$pkg/assets/icons/mail.svg";
	import RevealInfo from "$pkg/components/reveal-info/RevealInfo.svelte";
	import type { RevealInfoRecord } from "$pkg/components/reveal-info/RevealInfoCollection";
	import { ItchLogoHotLink } from "$pkg/consts";
	import { getDefaultEmail, getDefaultLinkedin } from "$pkg/ui/components/socialSectionRemote.remote";
	import ImageIcon from "$pkg/ui/elements/ImageIcon.svelte";
	import { PinyaButton } from "$pkg/ui/elements/PinyaButton/index";
	import { ButtonVariant } from "$pkg/ui/elements/PinyaButtonCommon/ButtonVariant";
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";

	type SocialSectionProps = {
		isSmallVersion?: boolean,
		emailRemoteQuery?: RevealInfoRecord,
		linkedinRemoteQuery?: RevealInfoRecord,
		isSlot?: boolean,
		allowLinkedIn?: boolean
	};

	let {
		isSmallVersion = false,
		emailRemoteQuery,
		linkedinRemoteQuery,
		isSlot = false,
		allowLinkedIn = true
	}: SocialSectionProps = $props();

	const getDefaultEmailQuery = {
		query: {
			run: getDefaultEmail,
			type: "void"
		},
		placeholder: "See email"
	} as const;
	const getDefaultLinkedinQuery = {
		query: {
			run: getDefaultLinkedin,
			type: "void"
		},
		placeholder: "See Linkedin"
	} as const;

	let shouldShowExtra = $state(false);
	const style = `
		--preferred-justify-content: ${isSlot ? "flex-start" : "center"};
		--preferred-overall-margin-bottom: ${isSlot ? "0" : "0.75lh"};
	`;

	onMount(() => {
		shouldShowExtra = window.screen.availWidth >= 440;
	});
</script>

<div class="socials" class:isSmall={isSmallVersion} style={style} data-nosnippet>
	<PinyaButton
		buttonVariant={ButtonVariant.SmallIcon}
		title="https://github.com/TurnipXenon"
		onclick={() => window.open("https://github.com/TurnipXenon")}>
		<ImageIcon src={GithubIcon} alt="github icon" />
		{#if (!isSmallVersion)}
			<span>TurnipXenon</span>
		{/if}
	</PinyaButton>
	{#if allowLinkedIn}
		<RevealInfo
			infoRecord={linkedinRemoteQuery ?? getDefaultLinkedinQuery}
			buttonVariant={ButtonVariant.SmallIcon}
			titleBuilder={(info) => `https://www.linkedin.com/in/${info}/`}
			onclickBuilder={(info) => (() => window.open(`https://www.linkedin.com/in/${info}/`))}>
			{#snippet bodySnippet(info)}
				<ImageIcon src={LinkedinIcon} alt="linkedin icon" />
				{#if (!isSmallVersion)}
					<span>{info}</span>
				{/if}
			{/snippet}
		</RevealInfo>
	{/if}
	<RevealInfo
		infoRecord={emailRemoteQuery ?? getDefaultEmailQuery}
		buttonVariant={ButtonVariant.SmallIcon}
		titleBuilder={(info) => `mailto:${info}`}
		onclickBuilder={(info) => (() => window.open(`mailto:${info}`))}
	>
		{#snippet bodySnippet(info)}
			<ImageIcon src={MailIcon} aria-hidden />
			{#if (!isSmallVersion)}
				<span>{info}</span>
			{/if}
		{/snippet}
	</RevealInfo>
	{#if (shouldShowExtra)}
		<div transition:scale>
			<PinyaButton
				buttonVariant={ButtonVariant.SmallIcon}
				title="https://turnipxenon.itch.io/"
				onclick={() => window.open("https://turnipxenon.itch.io/")}
				classes="h-full"
			>
				<ImageIcon src={ItchLogoHotLink} alt="itch icon" />
				{#if (!isSmallVersion)}
					<span>TurnipXenon</span>
				{/if}
			</PinyaButton>
		</div>
	{/if}
</div>

<style>
    :global(.socials button span) {
        font-size: 0.8em;
    }

    .socials {
        display: flex;
        flex-wrap: wrap;
        justify-content: var(--preferred-justify-content);
        gap: 0.7rem;
        align-items: stretch;
    }
</style>
