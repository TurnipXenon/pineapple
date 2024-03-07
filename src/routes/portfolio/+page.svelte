<!--todo: probably add a timer that auto scrolls the carousel-->
<!--todo: highlight current item visible-->

<script lang="ts">
    import FABIcon from "$lib/assets/bg_tiled/bg_tiled_turnip.png";
    import SeaweedBaseLayout from "$lib/components/SeaweedBaseLayout.svelte";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import StickyElement from "$lib/components/StickyElement.svelte";

    import HeaderPengi from "$lib/assets/temp/header-pengi.mp4";
    // import GithubLogo from "$lib/assets/temp/github-logo.png";
    // import BitbucketLogo from "$lib/assets/temp/bitbucket-logo.png";
    import HeaderSoulwork from "$lib/assets/temp/header-soulwork.mp4";
    import HeaderHepCat from "$lib/assets/temp/header-hep-cat.mp4";
    import CarouselElement from "$pkg/components/CarouselElement.svelte";
    // import HeaderThinkingOfFlowers from "$lib/assets/game_dev/footage-thinking-of-flowers.webm";
    // import HeaderGameJamMama from "$lib/assets/game_dev/screenshot-game-jam-mama.png";
    // import HeaderWetAssRoad from "$lib/assets/game_dev/screenshot-wet-ass-road.png";
    // import HeaderDepreciated from "$lib/assets/game_dev/footage-depreciation.webm";
    // import HeaderStringHop from "$lib/assets/game_dev/screenshot-string-hop.png";
    import HeaderChefWings from "$lib/assets/game_dev/footage-chef-wings.gif";
    import {onMount} from "svelte";
    // import HeaderLoveAmidstTheTimelessRift from "$lib/assets/game_dev/love-amidst-the-timeless-rift.png";

    let elemMovies: HTMLDivElement;
    let stickyElem: HTMLElement;
    let elemCarousel: HTMLDivElement;
    let elemCarousel2: HTMLDivElement;

    enum AssetType {
        Image,
        Video
    }

    type UnsplashAsset = {
        src: string;
        type: AssetType;
    };

    const unsplashAssets: UnsplashAsset[] = [
        {
            src: HeaderPengi,
            type: AssetType.Video,
        },
        {
            src: HeaderHepCat,
            type: AssetType.Video,
        },
        {
            src: HeaderChefWings,
            type: AssetType.Image,
        },
        {
            src: HeaderSoulwork,
            type: AssetType.Video,
        },
        {
            src: HeaderPengi,
            type: AssetType.Video,
        },
    ];

    let isSocialSticky = false;
    const gameCarouselCount = 5;
    let activeGameIndex = 0;

    function carouselLeft(): void {
        activeGameIndex = (activeGameIndex - 1) % gameCarouselCount;

        if (activeGameIndex < 0) {
            activeGameIndex += gameCarouselCount;
        }
    }

    function carouselRight(): void {
        activeGameIndex = (activeGameIndex + 1) % gameCarouselCount;
    }

    function carouselThumbnail(index: number) {
        activeGameIndex = index;
    }

    function multiColumnLeft(): void {
        let x = elemMovies.scrollWidth;
        if (elemMovies.scrollLeft !== 0) x = elemMovies.scrollLeft - elemMovies.clientWidth;
        elemMovies.scroll(x, 0);
    }

    function multiColumnRight(): void {
        let x = 0;
        // -1 is used because different browsers use different methods to round scrollWidth pixels.
        if (elemMovies.scrollLeft < elemMovies.scrollWidth - elemMovies.clientWidth - 1) x = elemMovies.scrollLeft + elemMovies.clientWidth;
        elemMovies.scroll(x, 0);
    }

    // todo: document
    // https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
    const determineVisibility = (selfIndex: number, activeIndex: number): string => {
        return selfIndex === activeIndex ? "visible" : "collapse";
    };

    onMount(() => {
        console.log(`Child count: ${elemCarousel.childElementCount}`);
    });
</script>

<button type="button" class="btn-icon variant-filled fab">
	<img src={FABIcon} alt="interactable floating action button represented as a turnip">
</button>

<SeaweedBaseLayout>
	<!-- todo: limit main size to 1080 px? -->
	<main>

		<section>
			<h1>About</h1>

			Hi! My name is Turnip! I work as a software developer. Outside of that, I like making games, and
			trying to do everything in between required to make one. I have some showcased below, our visit my itch.io
			page for more of them.<br>
			I'm inspired by games like Harvest Moon: Friends of Mineral Town, Rune Factory 4, Theatrhythm,
			Bravely Default: Flying Fairy, Boku no Natsuyasumi 2, and A Short Hike.

		</section>
		<!--		<section bind:this={stickyElem} class="socials">-->

		<StickyElement isFirst={true}>
			email: <a href="mailto:turnipxenon@gmail.com">turnipxenon@gmail.com</a>
		</StickyElement>
		<StickyElement>
			github: <a href="https://github.com/TurnipXenon" target="_blank">github.com/TurnipXenon</a>
		</StickyElement>
		<StickyElement>
			itch: <a href="https://turnipxenon.itch.io/" target="_blank">github.com/TurnipXenon</a>
		</StickyElement>
		<!-- todo: when linkedin gets the sticky status, let's render a different style here -->
		<StickyElement>
			linkedin: <a href="https://www.linkedin.com/in/turnip-xenon/"
			             target="_blank">linkedin.com/in/turnip-xenon</a>
		</StickyElement>

		<section>
			<h1>Experience</h1>

			<h2>Software Engineer I, L4</h2>
			<p>July 2023 – January 2024</p>
			<p>Twitch, Remote</p>
			<ul>
				<li>Contributed to Golang and Typescript codebases, across several teams, to accommodate adjustments for
					public-facing user safety related features, in preparation for complying with EU’s
					<a href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/digital-services-act/europe-fit-digital-age-new-online-rules-platforms_en"
					   target="_blank">Digital Services</a>
					Act, also including feature flags, alarms, unit tests, end-to-end testing, and documentation
				</li>
				<li>Improved observability for upcoming features by setting up new AWS resources to integrate internal
					data platform tools with existing alarms in our team’s microservice, utilizing Cloudwatch and
					Kinesis Data Stream, while adhering to best practices for AWS CDK (infrastructure as code)
				</li>
			</ul>

			<h2>Software Engineer Intern</h2>
			<p>May 2022 – Aug 2022</p>
			<p>Twitch, San Francisco</p>
			<ul>
				<li>
					Built a load testing service that can be configured to generate different message types at different
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
					documentation on how to use the service and how to extend the load testing service to include new
					services
					to test
				</li>
			</ul>


			<Accordion>
				<AccordionItem>
					<!-- todo: add logo downwards chevron -->
					<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment>-->
					<svelte:fragment slot="summary">More experience</svelte:fragment>
					<svelte:fragment slot="content">
						<section>
							<h2>Software Engineer Intern</h2>
							<p>May 2021 – Dec 2021</p>
							<p>Twitch / Amazon Web Services Canada, Remote</p>
							<ul>
								<li>
									Implemented and wrote tests for a feature in Twitch’s backend authentication systems
									and frontend web application that will help suggest security improvements to over
									hundreds of thousands of users daily
								</li>
								<li>
									Learned Go, Typescript, React, and other new technologies on the go to contribute to
									the codebase
								</li>
							</ul>
						</section>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</section>


		<section>
			<h1>Games</h1>

			<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
				<!-- Button: Left -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
					<i class="fa-solid fa-arrow-left"/>
				</button>
				<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex">
					<!-- remember to update the count of items on gameCarouselCount when adding or removing a
						CarouselElement here -->
					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={0}>
						<div class="carousel-element">
							<h2>Pengi</h2>
							<video playsinline autoplay muted loop preload="none">
								video unavailable. original video contains pengi gameplay showing the dynamic dialog
								layout and character animation.
								<source src={HeaderPengi} type="video/mp4">
							</video>

							<p>
								(Oct 2020 - Dec 2020)
							</p>
							<p>
								Well well, quite the dreamer, aren’t you? Might be hard to get in... costs a lot of
								money...
							</p>

							<p>
								Pengi is a text-based adventure made in Unity. I acted as the sole programmer for the
								team. Most of the work revolves around UI and creating <a
									href="https://yarnspinner.dev/" target="_blank">YarnSpinner</a> commands for writers
								to use to create expressive stage directions in the script.
							</p>

							<p>
								This is a course project made by a team of six for STS 350: Understanding Video Games.
							</p>

							<!--							https://turnipxenon.itch.io/pengi-->
							<!--							https://github.com/GreenTea-M/ProjectPengi-->
						</div>
					</CarouselElement>
					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={1}>
						<div class="carousel-element">
							<h2>Hepcat</h2>
							<video playsinline autoplay muted loop preload="none">
								<source src={HeaderHepCat} type="video/mp4">
							</video>

							(Jan 2020 - Apr 2020)
							"Cats, Jazz, and a little bit of Death. What more could anyone ask for?"

							Hep Cat is a rhythm game made in <a
								href="https://www.rpgmakerweb.com/products/programs/rpg-maker-mv" target="_blank">RPG
							Maker
							MV</a> with the help of additional custom-made
							Javascript plugins. I wrote the rhythm game plugin's framework. For this plugin to work, I
							had to write a Python script that parses osu! files into readable JSON files.

							This is a course project made by a team of six for <a
								href="https://sites.google.com/ualberta.ca/cmput250/">CMPUT 250.</a>

							<!--							https://just-a-phantom.itch.io/hep-cat-->
							<!--							https://bitbucket.org/egginchicken/hep-cat/src/master/-->
						</div>
					</CarouselElement>
					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={2}>
						<div class="carousel-element">
							<h2>Chef Wings</h2>
							<img src={HeaderChefWings} alt="todo" loading="lazy">

							(Jan 2022 - Apr 2022)

							A “roguelite-lite” where you gather ingredients in a procedurally-generated dungeon and use
							them to cook for customers and then critics!
							I built and documented several of the game’s systems including the game state management
							system that extends Unity’s existing Monobehavior lifecycle with new events, and the
							dialogue, event, and level systems that coordinate the game flow using the interactive
							dialogue tool YarnSpinner

							<!--							https://selk.io/birb-project/trunk/-->
						</div>
					</CarouselElement>
					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={3}>
						<div class="carousel-element">
							<h2>Soulwork</h2>
							<video playsinline autoplay muted loop preload="none">
								<source src={HeaderSoulwork} type="video/mp4">
							</video>

							<p>
								(Nov 2019)
							</p>

							<p>
								Soulwork is a 2D platforming game that uses unique physics to solve puzzle-based levels.
								This project is a Time to Game Jam entry, restricting game development to be under 48
								hours.
								I helped make the level designing tools used by the designers to drag-and-drop objects
								on
								the stage. I also helped program the unique physics-based gameplay mechanic. This was
								written using C#.
							</p>

							<!--							https://itch.io/jam/time-to-game-jam-gadec-fall-game-jam/rate/514331-->
							<!--							https://github.com/Zeyu-Li/Clockwork-->
						</div>
					</CarouselElement>
					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={4}>
						<div class="carousel-element">
							<h2>And more...</h2>
							<video playsinline autoplay muted loop preload="none">
								<source src={HeaderHepCat} type="video/mp4">
							</video>

							I make more games. You can check them out at my itch page!

						</div>
					</CarouselElement>
					<!-- remember to update the count of items on gameCarouselCount when adding or removing a
						CarouselElement here -->
				</div>

				<!-- Button: Right -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
					<i class="fa-solid fa-arrow-right"/>
				</button>
			</div>

			<!-- from:  -->
			<div class="card p-4 grid grid-cols-6 gap-4 carousel-thumbnail-container">
				{#each unsplashAssets as unsplashId, i}
					<div class="carousel-thumbnail">
						<button type="button" on:click={() => carouselThumbnail(i)}>
							{#if unsplashId.type === AssetType.Video}
								<video playsinline autoplay muted loop preload="none">
									<source src={unsplashId.src} type="video/mp4">
								</video>
							{:else }
								<!--todo: improve alt-->
								<img
										class="rounded-container-token"
										src={unsplashId.src}
										alt={unsplashId.src}
										loading="lazy"
								/>
							{/if}
						</button>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h1>Projects</h1>

			<div class="project-carousel-container">

				<div class="card p-4 grid grid-cols-6 gap-4 carousel-thumbnail-container">

					<!-- todo: fix layout -->

					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={0}>
						<div class="card project-carousel-element">
							Migrante Alberta, Group Project Jan 2022 – Apr 2022
							https://cmput401.ca/projects/d5b366aa-bd10-4031-aba5-a4bc6ff5b649
							cmput401.ca/projects/d5b366aa-bd10-4031-aba5-a4bc6ff5b649
							Developed a mobile-first cross-platform application to be used by the Canadian-based
							Filipino non-profit advocacy group, Migrante Alberta, to help new immigrants navigate
							through local services and events
							Created reusable Flutter components for the application’s frontend, Dart utility files to
							help ease writing and debugging calls to the backend, and a troubleshooting documentation
							for handling common issues
							Added Python unit tests to the backend endpoints, refactored the backend’s authentication
							system from plain text to using Django’s authentication system, and wrote a script to ease
							deployment to Heroku
							https://www.migrantealberta.ca/
						</div>
					</CarouselElement>
					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={0}>
						<div class="card project-carousel-element">
							<h3>This webpage!!!</h3>

							The webpage is made of two parts. The webpage that has the content for everything here, I've
							lovingly called Seaweed. Then the base package which I want to use for all spin offs of my
							websites. I call that one Pineapple. An interesting part of the base package is it has a
							dialog interpreter based on YarnSpinner.

							todo: github link
							todo: add tags
						</div>
					</CarouselElement>
					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={0}>
						<div class="card project-carousel-element">
							<h3>Working set simulation</h3>

							A C program that simulates the working set model based on the output of memory addresses
							valgrind detects as being accessed by a program being ran. The working set is the collection
							of memory pages referenced by a program within a certain time frame. It comes with a report
							analyzing how the window set sizes vary between popular sorting algorithms being used on big
							datasets.

							https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/DESIGN.md

						</div>
					</CarouselElement>


					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={0}>
						<div class="card project-carousel-element">
							<h3>Client-server application in C</h3>

							multiprocessing
							networking via socket programming

							https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md
						</div>
					</CarouselElement>


					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={0}>
						<div class="card project-carousel-element">
							Mock Uber App, Group Project Jan 2020 – Apr 2020
							github.com/CMPUT301W20T10/UberApp
							Implemented all interfaces related to the NoSQL cloud database Firebase, making writing code
							easier for other programmers (Android / Java)
							Wrote documentation to said code and added instrumented tests that are tested by the
							continuous integration tool Travis CI, ensuring that the code I write is tested

						</div>
					</CarouselElement>


					<CarouselElement activeGameIndex={activeGameIndex} selfIndex={0}>
						<div class="card project-carousel-element">
							<h3>Full stack decentralized social media</h3>

							https://github.com/hgshah/cmput404-project
						</div>
					</CarouselElement>
				</div>
			</div>
		</section>

		<section>
			<h2>Education</h2>
			BS Computing Science, Specialization in Software Practice June 2023
			With Certificate in Computer Game Development
			University of Alberta
		</section>

	</main>
</SeaweedBaseLayout>

<style>
    main {
        overflow: visible;
    }

    /*todo: consider left handedness or customizability*/
    .fab {
        position: fixed;
        height: 5em;
        width: 5em;
        bottom: 3em;
        right: 2em;
        box-shadow: 0.5em 0.5em 0.5em gray;
    }

    .fab img {
        object-fit: contain;
    }

    .carousel-element {
        text-align: center;
        height: 25lh;
    }

    .carousel-element > video, .carousel-element > img {
        max-height: 15lh;
        margin-left: auto;
        margin-right: auto;
    }

    .carousel-thumbnail {
        width: 10lh;
        height: 10lh;
    }

    .carousel-thumbnail-container {
        justify-content: center;
        display: flex;
        flex-direction: row;
        max-width: 1960px;
    }

    .carousel-thumbnail > *, .carousel-thumbnail > * > * {
        object-fit: cover;
        width: 6lh;
        height: 6lh;
        border-radius: 1lh;
    }

    .project-carousel-element {
        width: 12lh;
        height: 12lh;
    }

    .project-carousel-container {
        justify-content: flex-start;
        display: flex;
        flex-direction: row;
        max-width: 1960px;
    }
</style>