<script>
    import MailIcon from "$pkg/assets/icons/mail.svg";
    import GithubIcon from "$pkg/assets/icons/github-mark.svg";
    import {ItchLogoHotLink} from "$pkg/consts";
    import LinkedinIcon from "$pkg/assets/icons/linkedin.svg";

    export let isSmallVersion = false;
    export let email = "turnipxenon@gmail.com";
    export let linkedinSlug = "turnip-xenon";
</script>

<div class="socials" class:isSmall={isSmallVersion}>
	<!-- todo: add alt and highlight on the buttons -->
	<button type="button" class="btn variant-filled-primary"
	        on:click={() => window.open("https://github.com/TurnipXenon")}>
		<img src={GithubIcon} alt="github icon">
		{#if (!isSmallVersion)}
			<span>TurnipXenon</span>
		{/if}
	</button>
	<button type="button" class="btn variant-filled-primary"
	        on:click={() => window.open("https://turnipxenon.itch.io/")}>
		<img src={ItchLogoHotLink} alt="itch icon">
		{#if (!isSmallVersion)}
			<span>TurnipXenon</span>
		{/if}
	</button>
	<button type="button" class="btn variant-filled-primary"
	        on:click={() => window.open(`https://www.linkedin.com/in/${linkedinSlug}}/`)}>
		<img src={LinkedinIcon} alt="linkedikn icon">
		{#if (!isSmallVersion)}
			<span>{linkedinSlug}</span>
		{/if}
	</button>
	<button type="button" class="btn variant-filled-primary"
	        on:click={() => window.open(`mailto:${email}`)}>
		<img src={MailIcon} alt="mail icon"/>
		{#if (!isSmallVersion)}
			<span>{email}</span>
		{/if}
	</button>
</div>

<style>
    button > img {
        max-height: 1lh;
    }

    .socials {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .socials > button {
        margin: 0 0.5em 0.5lh;
    }

    .socials.isSmall > button {
        margin: 0 0.5em;
    }
</style>