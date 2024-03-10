<!--todo: probably add a timer that auto scrolls the carousel-->
<!--todo: highlight current item visible-->

<script lang="ts">
	import type { Writable } from "svelte/store";
	import SeaweedBaseLayout from "$pkg/components/layouts/SeaweedBaseLayout.svelte";
	import { Accordion, AccordionItem, getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { ItchLogoHotLink } from "$lib/consts";

	import HeaderPengi from "$lib/assets/temp/header-pengi.mp4";
	import HeaderSoulwork from "$lib/assets/temp/header-soulwork.mp4";
	import HeaderHepCat from "$lib/assets/temp/header-hep-cat.mp4";
	import HeaderChefWings from "$lib/assets/game_dev/footage-chef-wings.gif";
	import ElementVisbilityDetector from "$pkg/components/ElementVisbilityDetector.svelte";
	import GithubIcon from "$lib/assets/icons/github-mark.svg";
	import BitbucketIcon from "$lib/assets/icons/bitbucket-icon.svg";
	import LinkIcon from "$lib/assets/icons/link-icon.svg";
	import WeaverFootage from "$lib/assets/others/weaver-footage.gif";
	import SocialSection from "./SocialSection.svelte";
	import type { PageData } from "./+page.server";
	import Card from "$pkg/components/Card.svelte";

	export let shouldDisplaySocialIcons: Writable<boolean>;

	export let data: PageData;
	console.log(`Page data message ${data.itchMeta}`);
	const modalStore = getModalStore();
	let isVisible = true;

	$: isSocialsGone = !isVisible;

	/* todo: modifiable attributes */
	const name = "Turnip";
	const email = "turnipxenon@gmail.com";
	const linkedinSlug = "turnip-xenon";

	const chefWingsWarning: ModalSettings = {
		type: "confirm",
		title: "Warning: please confirm",
		body: "This will directly link to the game itself, since this game does not have any game page or any " +
			"publicly viewable source code. Are you sure you wish to proceed?",
		response: (r: boolean) => {
			if (r) {
				window.open("https://selk.io/birb-project/trunk/");
			}
		}
	};
</script>

<SeaweedBaseLayout bind:shouldDisplayLeadingIcons={isSocialsGone}>
	<!-- todo: limit main size to 1080 px? -->
	<main>

		<div class="experience-and-about-div">

			<div class="greater-about-div">

				<Card>
					<section class="section-card" slot="content">
						<h1>About</h1>

						<p>
							Hi! My name is {name}! I work as a software developer. Outside of that, I like making games, and
							trying to do everything in between required to make one. I have some showcased below, our visit
							my itch.io page for more of them.
						</p>
						<!-- todo: link the degree details idk -->
						<p>
							I also graduated with BS Computing Science, Specializing in Software Practice, and a
							certificate in Computer Game Development at University of Alberta.
						</p>
						<p>
							I'm inspired by games like Harvest Moon: Friends of Mineral Town, Rune Factory 4, Theatrhythm,
							Bravely Default: Flying Fairy, Boku no Natsuyasumi 2, and A Short Hike.
						</p>

						<!-- todo: maybe put cute stuff here -->
					</section>
				</Card>

				<Card>
					<section class="section-card" slot="content">
						<SocialSection email={email} linkedinSlug={linkedinSlug}></SocialSection>
						<ElementVisbilityDetector bind:isVisible={isVisible}>
						</ElementVisbilityDetector>
					</section>
				</Card>

			</div>

			<Card>
				<section class="section-card" slot="content">
					<h1>Experience</h1>

					<h2>Software Engineer</h2>
					<div class="two-column-separated">
						<div>July 2023 – January 2024</div>
						<div>Twitch, Remote</div>
					</div>
					<ul>
						<li>Contributed to Golang and Typescript codebases, across several teams, to accommodate adjustments
							for
							public-facing user safety related features, in preparation for complying with EU’s
							<a target="_blank"
							   href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/digital-services-act/europe-fit-digital-age-new-online-rules-platforms_en">Digital
								Services</a>
							Act, also including feature flags, alarms, unit tests, end-to-end testing, and documentation
						</li>
						<li>Improved observability for upcoming features by setting up new AWS resources to integrate
							internal
							data platform tools with existing alarms in our team’s microservice, utilizing Cloudwatch and
							Kinesis Data Stream, while adhering to best practices for AWS CDK (infrastructure as code)
						</li>
					</ul>
					<br>

					<h2>Software Engineer Intern</h2>
					<div class="two-column-separated">
						<div>May 2022 – Aug 2022</div>
						<div>Twitch, San Francisco</div>
					</div>
					<ul>
						<li>
							Built a load testing service that can be configured to generate different message types at
							different
							volumes
							that can be easily extended to target different chat services
						</li>
						<li>
							Used Twitch’s set of custom tools, including Twitch’s custom RPC protocol, to create a backend
							service with
							business logic written in Go and cloud infrastructure utilizing ECS on Fargate, Cloudwatch, and
							DynamoDB,
							defined in Typescript-flavored CDK
						</li>
						<li>
							Wrote a technical specification document for the service’s MVP and possible future features, and
							additional
							documentation on how to use the service and how to extend the load testing service to include
							new
							services
							to test
						</li>
					</ul>
					<br>
					<!-- todo: turn off flashing when accordion is expanded -->
					<Accordion>
						<AccordionItem class="variant-filled-primary rounded-md">
							<svelte:fragment slot="summary">
								<h2>More experience</h2>
							</svelte:fragment>
							<svelte:fragment slot="content">
								<section class="more-section">
									<h2>Software Engineer Intern</h2>
									<div class="two-column-separated">
										<div>May 2021 – Dec 2021</div>
										<div>Twitch / Amazon Web Services Canada, Remote</div>
									</div>
									<ul>
										<li>
											Implemented and wrote tests for a feature in Twitch’s backend authentication
											systems
											and frontend web application that will help suggest security improvements to
											over
											hundreds of thousands of users daily
										</li>
										<li>
											Learned Go, Typescript, React, and other new technologies on the go to
											contribute to
											the codebase
										</li>
									</ul>
									<br>
								</section>
							</svelte:fragment>
						</AccordionItem>
					</Accordion>
				</section>
			</Card>

		</div>

		<Card>
			<div class="section-card" slot="content" style="width: 800px">
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
							Pengi is a text-based adventure made in Unity. I acted as the sole programmer for the
							team. Most of the work revolves around UI and creating <a
							href="https://yarnspinner.dev/" target="_blank">YarnSpinner</a> commands for writers
							to use to create expressive stage directions in the script.
						</p>

						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        on:click={()=> window.open("https://github.com/GreenTea-M/ProjectPengi")}>
								<img alt="github icon" src={GithubIcon}>
							</button>
							<button type="button" class="game-button turnip-button"
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
					<video playsinline autoplay muted loop preload="none">
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
							href="https://www.rpgmakerweb.com/products/programs/rpg-maker-mv" target="_blank">
							RPG Maker MV</a> with the help of additional custom-made
							Javascript plugins. I wrote the rhythm game plugin's framework. For this plugin to work, I
							had to write a Python script that parses osu! files into readable JSON files.
						</p>


						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        on:click={()=> window.open("https://bitbucket.org/egginchicken/hep-cat/src/master/")}>
								<img alt="bitbucket icon" src={BitbucketIcon}>
							</button>
							<button type="button" class="game-button turnip-button"
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
							system that extends Unity’s existing Monobehavior lifecycle with new events, and the
							dialogue, event, and level systems that coordinate the game flow using the interactive
							dialogue tool YarnSpinner
						</p>

						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
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
							on
							the stage. I also helped program the unique physics-based gameplay mechanic. This was
							written using C#.
						</p>


						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        on:click={()=> window.open("https://github.com/Zeyu-Li/Clockwork")}>
								<img alt="github icon" src={GithubIcon}>
							</button>
							<button type="button" class="game-button turnip-button"
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
						        on:click={() => window.open("https://turnipxenon.itch.io/")}>
							<img src={ItchLogoHotLink} class="long-btn-image" alt="itch icon">
							<span>TurnipXenon</span>
						</button>
					</section>

				</section>
			</Card>
		</section>

		<Card>
			<section class="section-card" style="width: 800px" slot="content">
				<h1 class="text-center">Projects</h1>
			</section>
		</Card>

		<section class="projects-section">
			<Card>
				<section class="project-card" slot="content">
					<iframe id="migrante-alberta"
					        width="560" height="315" src="https://www.youtube.com/embed/ZemWwf8jh8E?si=RZwSfYHI-0Ael-RE"
					        title="YouTube video player" frameborder="0"
					        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					        allowfullscreen></iframe>
					<div class="project-card-body">
						<!-- todo: add regression to see if page is gone: https://cmput401.ca/api/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398 -->

						<h2>Migrante Alberta</h2>
						<p>We developed a mobile-first cross-platform application to be used by the Canadian-based
							Filipino non-profit advocacy group, Migrante Alberta, to help new immigrants navigate
							through local services and events
						</p>
						<!-- todo: add a way to ask what did i do via chat?  -->
						<!--					<p>-->
						<!--						I helped make reusable Flutter components for the application’s frontend, Dart utility files to-->
						<!--						help ease writing and debugging calls to the backend, and a troubleshooting documentation-->
						<!--						for handling common issues-->
						<!--					</p>-->
						<!--					<p>-->
						<!--						Added Python unit tests to the backend endpoints, refactored the backend’s authentication-->
						<!--						system from plain text to using Django’s authentication system, and wrote a script to ease-->
						<!--						deployment to Heroku-->
						<!--					</p>-->

						<!-- todo: add tags with Dart, Flutter, Python, Django, Heroku, Android -->

						<section class="game-link-section">
							<button type="button" class="btn variant-filled-primary turnip-button"
							        on:click={() => window.open("https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398")}>
								<img src={LinkIcon} class="long-btn-image" alt="itch icon">
								<span>cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398</span>
							</button>
						</section>

					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">
					<div class="project-card-body">

						<h2>Decentralized social media</h2>

						<p>We made a full stack decentralized social media app made with React + Javascript for the client
							code, Django + Python for the backend code, and Heroku for deployment. This project was made for
							our Web Applications and Architecture class.</p>
						<p>The application can connect with three other decentralized social media app in the same class:
						</p>
						<ul>
							<li>
								<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-14"
								   target="_blank">Also
									a social media with the same Django + Python backend server where they act on behalf of
									our users interacting with theirs</a></li>
							<li>
								<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-7"
								   target="_blank">A
									social media that uses Fast API + Python for their backend server</a></li>
							<li>
								<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-12"
								   target="_blank">Another
									social media that has Django + Python for their backend but we have to act on behalf of
									our
									users interacting with their users</a>
							</li>
						</ul>

						<!-- todo: add tags with Javascript, React, Python, Django, Heroku -->

						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        on:click={() => window.open("https://github.com/hgshah/cmput404-project")}>
								<img src={GithubIcon} alt="github icon">
							</button>
						</section>
					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">
					<img alt="Footage of a visual novel-like dynamic dialog interaction happening on the same page we are on"
					     src={WeaverFootage} />

					<div class="project-card-body">
						<h2>Customized Yarnspinner interpreter and dialog runner</h2>

						A custom dialog interpreter, written in Typescript, that tokenizes then transpiles custom
						Yarnspinner dialog
						into a Typescript file. The said files can be used on a corresponding runner or library, also
						implemented alongside it, allowing the ability to play a custom-flavor of YarnSpinner dialogs on
						Svelte.

						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        on:click={() => window.open("https://github.com/TurnipXenon/pineapple/blob/main/docs/PineappleFiberSpec.md")}>
								<img src={GithubIcon} alt="github icon">
							</button>
						</section>
					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">
					<div class="project-card-body">
						<h2>Full-stack C app</h2>

						<p>
							A terminal-based app consisting of a server observing several terminal apps all concurrently
							sending updates to the server, which then broadcasts these information concurrently to all the
							other terminal apps connected.
						</p>
						<p>
							The project features multiprocessing programming featuring pthreads and mutexes, and networking
							via sockets.
						</p>

						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md")}>
								<img src={GithubIcon} class="long-btn-image" alt="github icon">
							</button>
						</section>
					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">
					<div class="project-card-body">
						<h2>Mock Uber App</h2>

						<p>A course project app meant to emulate how Uber works.</p>
						<p>
							I implemented all interfaces related to the NoSQL cloud database Firebase, making writing code
							easier for other programmers (Android / Java). I also wrote documentation to said code and added
							instrumented tests that are tested by the continuous integration tool Travis CI, ensuring that
							the code I write is tested
						</p>

						<section class="game-link-section">
							<!-- todo: mock uber app find link -->
							<button type="button" class="game-button turnip-button"
							        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md")}>
								<img src={GithubIcon} class="long-btn-image" alt="github icon">
							</button>
						</section>
					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">
					<div class="project-card-body">
						<h2>Working set simulation</h2>

						<p>
							A C program that simulates the working set model based on the output of memory addresses
							valgrind detects as being accessed by a program being ran. The working set is the collection
							of memory pages referenced by a program within a certain time frame. It comes with a report
							analyzing how the window set sizes vary between popular sorting algorithms being used on big
							datasets.
						</p>

						<section class="game-link-section">
							<!-- todo: mock uber app find link -->
							<button type="button" class="game-button turnip-button"
							        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md")}>
								<img src={GithubIcon} class="long-btn-image" alt="github icon">
							</button>
						</section>
					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">
					<div class="project-card-body">
						<h2>This webpage!</h2>

						<p>
							The webpage is made of two parts. The webpage that has the content for everything here, I've
							lovingly called Seaweed. I kept seaweed as a private package. On the other hand, the base package which I
							want to use for all spin offs of my websites is called Pineapple and have kept that codebase public.
						</p>

						<section class="game-link-section">
							<button type="button" class="btn variant-filled-primary turnip-button"
							        on:click={() => window.open("https://github.com/TurnipXenon/pineapple")}>
								<img src={GithubIcon} class="long-btn-image" alt="github icon">
								<span>Pineapple</span>
							</button>
						</section>
					</div>
				</section>
			</Card>
		</section>

	</main>

	<SocialSection slot="extraLeadingIcons" email={email} linkedinSlug={linkedinSlug}
	               isSmallVersion={true}></SocialSection>
</SeaweedBaseLayout>

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
</style>