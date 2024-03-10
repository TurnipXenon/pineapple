<script>
	import MailIcon from "$pkg/assets/icons/mail.svg";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import { ItchLogoHotLink } from "$pkg/consts";
	import LinkedinIcon from "$pkg/assets/icons/linkedin.svg";
	import { onMount } from "svelte";

	export let isSmallVersion = false;
	export let email = "turnipxenon@gmail.com";
	export let linkedinSlug = "turnip-xenon";
	export let isSlot = false;

	let shouldShowExtra = false;
	const style = `
		--preferred-justify-content: ${isSlot ? "flex-start" : "center"};
		--preferred-overall-margin-bottom: ${isSlot ? "0" : "0.75lh"};
	`;

	onMount(() => {
		shouldShowExtra = window.screen.availWidth >= 440;
	});
</script>

<div class="socials" class:isSmall={isSmallVersion} style={style}>
	<!-- todo: add alt and highlight on the buttons -->
	<button type="button" class="social-button turnip-button"
	        on:click={() => window.open("https://github.com/TurnipXenon")}>
		<img src={GithubIcon} alt="github icon">
		{#if (!isSmallVersion)}
			<span>TurnipXenon</span>
		{/if}
	</button>
	<button type="button" class="social-button turnip-button"
	        on:click={() => window.open(`https://www.linkedin.com/in/${linkedinSlug}}/`)}>
		<img src={LinkedinIcon} alt="linkedikn icon">
		{#if (!isSmallVersion)}
			<span>{linkedinSlug}</span>
		{/if}
	</button>
	<button type="button" class="social-button turnip-button"
	        on:click={() => window.open(`mailto:${email}`)}>
		<img src={MailIcon} alt="mail icon" />
		{#if (!isSmallVersion)}
			<span>{email}</span>
		{/if}
	</button>
	{#if (shouldShowExtra)}
		<button type="button" class="social-button turnip-button"
		        on:click={() => window.open("https://turnipxenon.itch.io/")}>
			<img src={ItchLogoHotLink} alt="itch icon">
			{#if (!isSmallVersion)}
				<span>TurnipXenon</span>
			{/if}
		</button>
	{/if}
</div>

<style lang="postcss">
    .social-button {
        @apply btn variant-filled-primary;
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