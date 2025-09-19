<script lang="ts">
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";

	import MailIcon from "$pkg/assets/icons/mail.svg";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import LinkedinIcon from "$pkg/assets/icons/linkedin.svg";
	import { ItchLogoHotLink } from "$pkg/consts";
	import { PinyaButton } from "$pkg/ui/elements/PinyaButton/index";
	import ImageIcon from "$pkg/ui/elements/ImageIcon.svelte";
	import { ButtonVariant } from "$pkg/ui/elements/PinyaButtonCommon/ButtonVariant";

	/** @type {{isSmallVersion?: boolean, email?: string, linkedinSlug?: string, isSlot?: boolean, allowLinkedIn?: boolean}} */
	let {
		isSmallVersion = false,
		email = "turnipxenon@gmail.com",
		linkedinSlug = "turnip-xenon",
		isSlot = false,
		allowLinkedIn = true
	} = $props();

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
		<PinyaButton
			buttonVariant={ButtonVariant.SmallIcon}
			title={`https://www.linkedin.com/in/${linkedinSlug}/`}
			onclick={() => window.open(`https://www.linkedin.com/in/${linkedinSlug}/`)}>
			<ImageIcon src={LinkedinIcon} alt="linkedin icon" />
			{#if (!isSmallVersion)}
				<span>{linkedinSlug}</span>
			{/if}
		</PinyaButton>
	{/if}
	<PinyaButton
		buttonVariant={ButtonVariant.SmallIcon}
		title={`mailto:${email}`}
		onclick={() => window.open(`mailto:${email}`)}
	>
		<ImageIcon src={MailIcon} alt="mail icon" />
		{#if (!isSmallVersion)}
			<span>{email}</span>
		{/if}
	</PinyaButton>
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

<style lang="postcss">
    span {
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
