<script>

	import { ItchLogoHotLink } from "$pkg/consts";
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";

	import MailIcon from "$pkg/assets/icons/mail.svg";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import LinkedinIcon from "$pkg/assets/icons/linkedin.svg";
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
	<button type="button" class="social-button turnip-button"
	        role="link"
	        title="https://github.com/TurnipXenon"
	        onclick={() => window.open("https://github.com/TurnipXenon")}>
		<img src={GithubIcon} alt="github icon">
		{#if (!isSmallVersion)}
			<span>TurnipXenon</span>
		{/if}
	</button>
	{#if allowLinkedIn}
		<button type="button" class="social-button turnip-button"
		        role="link"
		        title={`https://www.linkedin.com/in/${linkedinSlug}/`}
		        onclick={() => window.open(`https://www.linkedin.com/in/${linkedinSlug}/`)}>
			<img src={LinkedinIcon} alt="linkedin icon">
			{#if (!isSmallVersion)}
				<span>{linkedinSlug}</span>
			{/if}
		</button>
	{/if}
	<button type="button" class="social-button turnip-button"
	        role="link"
	        title={`mailto:${email}`}
	        onclick={() => window.open(`mailto:${email}`)}>
		<img src={MailIcon} alt="mail icon" />
		{#if (!isSmallVersion)}
			<span>{email}</span>
		{/if}
	</button>
	{#if (shouldShowExtra)}
		<button type="button" class="social-button turnip-button"
		        role="link"
		        title="https://turnipxenon.itch.io/"
		        transition:scale
		        onclick={() => window.open("https://turnipxenon.itch.io/")}>
			<img src={ItchLogoHotLink} alt="itch icon">
			{#if (!isSmallVersion)}
				<span>TurnipXenon</span>
			{/if}
		</button>
	{/if}
</div>

<style lang="postcss">
    .social-button {
        @apply btn preset-filled-primary-500;
    }

    button > img {
        max-height: 1lh;
    }

    button {
        min-width: 0;
        min-height: 0;
    }

    .socials {
        display: flex;
        flex-wrap: wrap;
        justify-content: var(--preferred-justify-content);
    }

    .socials > button {
        margin: 0 0.5em var(--preferred-overall-margin-bottom);
    }

    .socials.isSmall > button {
        margin-left: 0.25em;
        margin-right: 0.25em;
    }
</style>