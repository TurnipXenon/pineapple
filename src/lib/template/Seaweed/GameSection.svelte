<script lang="ts">
	export let email = "turnipxenon@gmail.com";

	import HeaderPengi from "$pkg/assets/temp/header-pengi.mp4";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import { ItchLogoHotLink } from "$pkg/consts";
	import HeaderHepCat from "$pkg/assets/temp/header-hep-cat.mp4";
	import BitbucketIcon from "$pkg/assets/icons/bitbucket-icon.svg";
	import HeaderChefWings from "$pkg/assets/game_dev/footage-chef-wings.gif";
	import LinkIcon from "$pkg/assets/icons/link-icon.svg";
	import HeaderSoulwork from "$pkg/assets/temp/header-soulwork.mp4";
	import Card from "$pkg/components/Card.svelte";
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";

	const modalStore = getModalStore();
	const chefWingsWarning: ModalSettings = {
		type: "confirm",
		title: "Warning: please confirm",
		body: "This will directly link to the game itself, since this game does not have any game page or any " +
			"publicly viewable source code. The game is only playable on desktop. " +
			`Are you sure you wish to proceed? If there are any bugs, please report at <a href='mailto:${email}' target='_blank'>` +
			`${email}</a>.`,
		response: (r: boolean) => {
			if (r) {
				window.open("https://selk.io/birb-project/trunk/");
			}
		}
	};
</script>

<Card>
	<div class="section-card title-card" slot="content">
		<h1 class="text-center">Games</h1>
	</div>
</Card>

<section class="games-section">

	<Card>
		<section class="game-card" slot="content">
			<video playsinline autoplay muted loop preload="none">
				video unavailable. original video contains pengi gameplay showing the dynamic dialog
				layout and character animation.
				<source src={HeaderPengi} type="video/mp4">
			</video>

			<section class="game-card-body">

				<h1>Pengi</h1>

				<blockquote>
					Well well, quite the dreamer, aren’t you? Might be hard to get in... costs a lot of
					money...
				</blockquote>

				<p>
					Pengi is a text-based adventure made in <span class="qt-unity">Unity</span>. I acted as the sole
					programmer for the team. Most of the work revolves around UI and creating <a
					href="https://yarnspinner.dev/" target="_blank">YarnSpinner</a> commands for writers
					to use to create expressive stage directions in the script.
				</p>

				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/GreenTea-M/ProjectPengi"
					        on:click={()=> window.open("https://github.com/GreenTea-M/ProjectPengi")}>
						<img alt="github icon" src={GithubIcon}>
					</button>
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://turnipxenon.itch.io/pengi"
					        on:click={()=> window.open("https://turnipxenon.itch.io/pengi")}>
						<img alt="itch.io icon" src={ItchLogoHotLink}>
					</button>
				</section>
			</section>
		</section>
	</Card>

	<Card>
		<section class="game-card" slot="content">
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
					        on:click={()=> window.open("https://bitbucket.org/egginchicken/hep-cat/src/master/")}>
						<img alt="bitbucket icon" src={BitbucketIcon}>
					</button>
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://just-a-phantom.itch.io/hep-cat"
					        on:click={()=> window.open("https://just-a-phantom.itch.io/hep-cat")}>
						<img alt="itch.io icon" src={ItchLogoHotLink}>
					</button>
				</section>
			</section>
		</section>
	</Card>

	<Card>
		<section class="game-card" slot="content">
			<img src={HeaderChefWings} alt="todo" loading="lazy">
			<section class="game-card-body">

				<h1>Chef Wings</h1>
				<p>
					A “roguelite-lite” where you gather ingredients in a procedurally-generated dungeon and use
					them to cook for customers and then critics!
				</p>
				<p>
					I built and documented several of the game’s systems including the game state management
					system that extends <span class="qt-unity">Unity’s</span> existing Monobehavior lifecycle with new events,
					and the dialogue, event, and level systems that coordinate the game flow using the interactive
					dialogue tool YarnSpinner
				</p>

				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        title="https://selk.io/birb-project/trunk/"
					        on:click={()=>modalStore.trigger(chefWingsWarning)}>
						<img alt="itch.io icon" src={LinkIcon}>
						<span>selk.io/birb-project/trunk/</span>
					</button>
				</section>
			</section>
		</section>
	</Card>
	<Card>
		<section class="game-card" slot="content">
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
					        on:click={()=> window.open("https://github.com/Zeyu-Li/Clockwork")}>
						<img alt="github icon" src={GithubIcon}>
					</button>
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://itch.io/jam/time-to-game-jam-gadec-fall-game-jam/rate/514331"
					        on:click={()=> window.open("https://itch.io/jam/time-to-game-jam-gadec-fall-game-jam/rate/514331")}>
						<img alt="itch.io icon" src={ItchLogoHotLink}>
					</button>
				</section>
			</section>
		</section>
	</Card>
	<Card overrideStyle="align-self: flex-start;">
		<section class="game-card itch-promo" slot="content">
			<h1 class="mb-12 text-center">Check out my itch.io page for more games</h1>

			<section class="game-link-section">
				<button type="button" class="btn variant-filled-primary turnip-button"
				        role="link"
				        title="https://turnipxenon.itch.io/"
				        on:click={() => window.open("https://turnipxenon.itch.io/")}>
					<img src={ItchLogoHotLink} class="long-btn-image" alt="itch icon">
					<span>TurnipXenon</span>
				</button>
			</section>

		</section>
	</Card>
</section>

<style lang="postcss">
    main {
        width: 100%;
        overflow: visible;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1.5em;
    }

    .section-card {
        padding: 3em;
        max-width: 800px;
    }

    .game-card, .project-card {
        width: 100vw;
        max-width: 36em;
        margin-bottom: 3em;
    }

    .game-card > video {
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
        max-height: 24em;
        width: 100%;
        object-fit: cover;
    }

    #migrante-alberta, .game-card > img, .project-card > img {
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
    }

    #migrante-alberta {
        width: 100%;
        object-fit: cover;
    }

    .game-button {
        @apply btn variant-filled-primary;
    }

    .game-button > img {
        max-height: 1lh;
        /* todo: consider night mode day mode */
    }

    .two-column-separated {
        display: flex;
        justify-content: space-between;
    }

    .more-section {
        padding: 1em;
    }

    .greater-about-div {
        display: flex;
        flex-direction: column;
        max-width: 36em;
    }

    .experience-and-about-div {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
    }

    .game-card-body, .project-card-body {
        padding: 1em;
    }

    .game-card-body > blockquote {
        margin-bottom: 0.7lh;
    }

    .game-card-body > h1, .project-card-body > h2 {
        text-align: center;
    }

    .game-link-section {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1em;
        margin-top: 1em;
    }

    .games-section, .projects-section {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
        justify-content: center;
    }

    .projects-section {
        align-items: flex-start;
        /*justify-content: flex-start;*/
    }

    .long-btn-image {
        max-height: 1lh;
    }

    .itch-promo {
        padding: 4em;
    }

    #hepcat-video {
        object-position: 0 0;
    }

    .title-card {
        width: clamp(360px, 80vw, 800px);
    }

    [class*='qt-'] {
        font-weight: var(--qt-font-weight);
    }

    .accordion-header {
        margin-top: 0.25em;
    }
</style>