<script lang="ts">
	export let name = "Turnip";
	export let email = "turnipxenon@gmail.com";
	export let linkedinSlug = "turnip-xenon";
	export let metaWebsite = "https://www.crouton.com/test/portfolio-base-layout";
	export let letChaos = true;

	import SeaweedBaseLayout from "$pkg/components/layouts/SeaweedBaseLayout.svelte";
	import { Accordion, AccordionItem, getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { ItchLogoHotLink } from "$pkg/consts";
	import { page } from "$app/stores";
	import SocialSection from "../../routes/portfolio/SocialSection.svelte";
	import Card from "$pkg/components/Card.svelte";
	import Chip from "$pkg/components/Chip.svelte";
	import { onMount } from "svelte";

	import HeaderPengi from "$pkg/assets/temp/header-pengi.mp4";
	import HeaderSoulwork from "$pkg/assets/temp/header-soulwork.mp4";
	import HeaderHepCat from "$pkg/assets/temp/header-hep-cat.mp4";
	import HeaderChefWings from "$pkg/assets/game_dev/footage-chef-wings.gif";
	import ElementVisbilityDetector from "$pkg/components/ElementVisbilityDetector.svelte";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import BitbucketIcon from "$pkg/assets/icons/bitbucket-icon.svg";
	import LinkIcon from "$pkg/assets/icons/link-icon.svg";
	import WeaverFootage from "$pkg/assets/others/weaver-footage.gif";
	import WindowSetGraph from "$pkg/assets/others/window-set.png";
	import ThisWebsiteFootage from "$pkg/assets/others/seaweed-showcase.mp4";
	import WebThumbnailImage from "$pkg/assets/placeholder/placeholder_circle.png";
	import { ToggleableContentType } from "$pkg/components/ToggleableContentType";

	const modalStore = getModalStore();
	let isVisible = true;
	let mainParent: HTMLElement;

	$: isSocialsGone = !isVisible;

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

	const cmput401Info: ModalSettings = {
		type: "confirm",
		title: "Information",
		body: "As a full disclosure, this link will lead you to <a href='https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398' target='_blank'>" +
			"https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398</a>. " +
			"We currently don't have any tests yet ensuring that the link is correct. " +
			`Click confirm to go to the site. Please report any bugs at <a href='mailto:${email}' target='_blank'>` +
			`${email}</a>.`,
		response: (r: boolean) => {
			if (r) {
				window.open("https://selk.io/birb-project/trunk/");
			}
		}
	};

	let qtfontWeight = "normal";
	let additionalFontWeight = "";
	/** qt values and what they mean:
	 *  undefined: set all qt terms to font-weight: bold
	 *  clear: unset all terms to font-weight: normal
	 *  <term>: only set qt-<term> to bold
	 *  <term1>,<term2>: only set qt-<term1> and qt-<term2> to bold,
	 **/
	const filterSearchParams = (searchParams: URLSearchParams) => {
		if (document === undefined) {
			return;
		}

		const qtValue = searchParams.get("qt")?.trim();
		if (qtValue === undefined) {
			qtfontWeight = "bold";
			return;
		}
		qtfontWeight = "normal";
		const dynamicStyle = qtValue.split(",").map((term) => {
			return `span.qt-${term} { font-weight: bold !important; }`;
		}).join("\n");

		// from https://stackoverflow.com/a/1720483/17836168

		// https://stackoverflow.com/a/24285947/17836168
		const style = document.createElement("style");
		style.type = "text/css";
		style.innerText = dynamicStyle;
		document.head.appendChild(style);
		console.log(dynamicStyle);
	};

	const chaoticWordBank = ["niko", "toba", "seal", "aquarium", "ojisan", "baikal"];
	let chaosDone = false;
	const runChaos = (node: Element) => {
		// change all text content to gibberish
		for (let child of Array.from(node.children)) {
			if (child.nodeType === Node.ELEMENT_NODE) {
				runChaos(child);
				for (const childOfChild of child.childNodes) {
					if (childOfChild.nodeType === Node.TEXT_NODE && childOfChild.textContent?.trim()) {
						const max = childOfChild.textContent.length;
						childOfChild.textContent = "";
						while (childOfChild.textContent.length < max) {
							childOfChild.textContent += (chaoticWordBank[Math.floor(Math.random() * chaoticWordBank.length)] + " ");
						}
					}
				}

				// change all links to crouton
				if (child.hasAttribute("href")) {
					child.setAttribute("href", "https://crouton.net/");
				}

				// change all images to niko if aria != hidden?
				if (child.hasAttribute("src") && !child.hasAttribute("aria-hidden")) {
					console.log(child);
					if (child.hasAttribute("alt")) {
						child.setAttribute("src", "https://p.potaufeu.asahi.com/a2b9-p/picture/21583312/5c3310aec77068e24844c663aa62b37c.jpg");
					} else {
						child.setAttribute("src", "https://video.twimg.com/ext_tw_video/1318728494256410624/pu/vid/640x360/TMklz6hiTkQu3xhn.mp4");
						child.setAttribute("muted", "true");

						if (child.tagName.trim() === "IFRAME") {
							child.style.autoplay = false;
						}
					}
				}
				if (child.tagName.trim() === "VIDEO") {
					child.setAttribute("src", "https://video.twimg.com/ext_tw_video/1318728494256410624/pu/vid/640x360/TMklz6hiTkQu3xhn.mp4");
					child.setAttribute("muted", "true");
				}

				// change all button events
				if (child.tagName.trim() === "BUTTON") {
					// remove anon function: https://stackoverflow.com/a/41343451/17836168
					child.setAttribute("disabled", "true");
				}
			}
		}
	};

	onMount(() => {
		if (!letChaos && $page.url.searchParams) {
			filterSearchParams($page.url.searchParams);
		}

		if (letChaos) {
			runChaos(document.body);
			chaosDone = true;
		}
	});

	let mainVisibility = "visible";
	$: mainVisibility = letChaos && !chaosDone ? "hidden" : "visible";
</script>

<svelte:head>
	<meta charset="utf-8" />
	<title>Welcome to my portfolio</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:url" content={metaWebsite} />
	<meta property="og:title" content={name} />
	<meta property="og:description" content={`Welcome to ${name}'s portfolio website`} />
	<meta property="og:image" content={WebThumbnailImage} />
</svelte:head>

<SeaweedBaseLayout bind:shouldDisplayLeadingIcons={isSocialsGone}>
	<!-- todo: limit main size to 1080 px? -->
	<main style={`
	--qt-font-weight: ${qtfontWeight};${additionalFontWeight};
	visibility: ${mainVisibility};
	`}>

		<div class="experience-and-about-div">

			<div class="greater-about-div">

				<Card>
					<section class="section-card" slot="content">
						<!--						<ToggleableContent toggle={ToggleableContentType.Gibberish}>-->

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
						<!--						</ToggleableContent>-->
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
						<div style="text-align: end">Twitch, Remote</div>
					</div>
					<ul>
						<li>Contributed to <span class="qt-go">Golang</span> and <span class="qt-ts">Typescript</span> codebases,
							across several teams, to accommodate adjustments for public-facing user safety related features, in
							preparation for complying with EU’s <a target="_blank"
							                                       href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/digital-services-act/europe-fit-digital-age-new-online-rules-platforms_en">
								Digital Services Act</a>, also including feature flags, alarms, unit tests, end-to-end testing, and
							documentation
						</li>
						<li>Improved observability for upcoming features by setting up new <span class="qt-aws qt-infra">AWS</span>
							resources to integrate internal data platform tools with existing alarms in our team’s microservice,
							utilizing <span class="qt-aws qt-infra">Cloudwatch</span> and <span class="qt-aws qt-infra">Kinesis Data Stream</span>,
							while adhering to best practices for <span class="qt-aws qt-infra">AWS CDK</span> (infrastructure as code)
						</li>
					</ul>
					<br>

					<h2>Software Engineer Intern</h2>
					<div class="two-column-separated">
						<div>May 2022 – Aug 2022</div>
						<div style="text-align: end">Twitch, San Francisco</div>
					</div>
					<ul>
						<li>
							Built a <span class="qt-infra">load testing service</span> that can be configured to generate different
							message types at different volumes that can be easily extended to target different chat services
						</li>
						<li>
							Used Twitch’s set of custom tools, including Twitch’s custom RPC protocol, to create a backend
							service with business logic written in <span class="qt-go">Go</span> and cloud infrastructure utilizing
							<span
								class="qt-infra qt-aws">ECS on Fargate, Cloudwatch, and DynamoDB</span>
							, defined in <span class="qt-ts">Typescript</span>-flavored CDK
						</li>
						<li>
							Wrote a technical specification document for the service’s MVP and possible future features, and
							additional documentation on how to use the service and how to extend the load testing service to include
							new services to test
						</li>
					</ul>
					<br>
					<!-- todo: turn off flashing when accordion is expanded -->
					<Accordion hover="hover:bg-surface-hover-token">
						<AccordionItem class="variant-filled-primary rounded-md">
							<div slot="summary">
								<h2 class="mt-2">More experience</h2>
							</div>
							<svelte:fragment slot="content">
								<section class="more-section">
									{#if (!letChaos)}
										<h2>Software Engineer Intern</h2>
										<div class="two-column-separated">
											<div>May 2021 – Dec 2021</div>
											<div style="text-align: end">Twitch / Amazon Web Services Canada, Remote</div>
										</div>
										<ul>
											<li>
												Implemented and wrote tests for a feature in Twitch’s backend authentication
												systems and frontend web application that will help suggest security improvements to
												over hundreds of thousands of users daily
											</li>
											<li>
												Learned <span class="qt-go">Go</span>, <span class="qt-ts">Typescript</span>, <span
												class="qt-react">React</span>, and other new technologies on the go to contribute to
												the codebase
											</li>
										</ul>
									{:else}
										niko baikal seal from toba aquarium
									{/if}
									<br>
								</section>
							</svelte:fragment>
						</AccordionItem>
					</Accordion>
				</section>
			</Card>

		</div>

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

		<Card>
			<section class="section-card title-card" slot="content">
				<h1 class="text-center">Projects</h1>
			</section>
		</Card>

		<section class="projects-section">
			<Card>
				<section class="project-card" slot="content">
					<iframe id="migrante-alberta"
					        width="560" height="315" src="https://www.youtube.com/embed/ZemWwf8jh8E?si=RZwSfYHI-0Ael-RE"
					        title="YouTube video player" style="border: none"
					        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					        allowfullscreen></iframe>
					<div class="project-card-body">
						<!-- todo: add regression to see if page is gone: https://cmput401.ca/api/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398 -->

						<h2>Migrante Alberta</h2>
						<p>We developed a mobile-first cross-platform application to be used by the Canadian-based
							Filipino non-profit advocacy group, Migrante Alberta, to help new immigrants navigate
							through local services and events
						</p>
						<p>
							<Chip>Flutter</Chip>
							<Chip>Dart</Chip>
							<Chip>Python</Chip>
							<Chip>Django</Chip>
							<Chip>Heroku</Chip>
							<Chip>Android</Chip>
							<Chip>Postgresql</Chip>
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
							        title="https://selk.io/birb-project/trunk/"
							        on:click={() => modalStore.trigger(cmput401Info)}>
								<img src={LinkIcon} class="long-btn-image" alt="itch icon">
								<span>cmput401.ca</span>
							</button>
						</section>

					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">
					<div class="project-card-body">

						<h2>Decentralized social media</h2>

						<p>We made a full stack decentralized social media app made with <span class="qt-react">React</span> +
							<span class="qt-js">Javascript</span> for the client code, <span class="qt-django">Django</span> + <span
								class="qt-python">Python</span> for the backend code, and <span class="qt-heroku">Heroku</span> for
							deployment. This project was made
							for
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
							        role="link"
							        title="https://github.com/hgshah/cmput404-project"
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

						A custom dialog interpreter, written in <span class="qt-ts">Typescript</span>, that tokenizes then
						transpiles custom Yarnspinner dialog into a <span class="qt-ts">Typescript</span> file. The said files can
						be used on a corresponding runner or library, also implemented alongside it, allowing the ability to play a
						custom-flavor of YarnSpinner dialogs on <span class="qt-svelte">Svelte</span>.

						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        role="link"
							        title="https://github.com/TurnipXenon/pineapple/blob/main/docs/PineappleFiberSpec.md"
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
						<h2>Full-stack <span class="qt-c">C</span> app</h2>

						<p>
							A terminal-based app consisting of a server observing several terminal apps all concurrently
							sending updates to the server, which then broadcasts these information concurrently to all the
							other terminal apps connected.
						</p>
						<p>
							The project involves <span class="qt-foundation">multiprocessing</span> programming featuring pthreads and
							mutexes, and <span class="qt-foundation">networking</span> via sockets.
						</p>

						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        role="link"
							        title="https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md"
							        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md")}>
								<img src={GithubIcon} class="long-btn-image" alt="github icon">
							</button>
						</section>
					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">
					<img
						alt="A graph that visualizes the number of memory pages made by Quicksort cached within the window set as
						time goes by. The trend appears to look like a damping harmonic motion that does not go below the zero line. More
						details include the data size being 200000 entries, each data point skips 1060174 data points, with a
						page size of 4096 bytes, and window size of 100000 bytes."
						src={WindowSetGraph} />
					<div class="project-card-body">
						<h2>Working set simulation</h2>

						<p>
							A <span class="qt-c">C</span> program that simulates the working set model based on the output of memory
							addresses
							<span class="qt-valgrind">valgrind</span> detects as being accessed by a program being ran. It's
							implemented using a nested hashmap <span class="qt-foundation">data structure</span> implemented from
							scratch. The working set is the collection of memory pages referenced by a program within a certain time
							frame. It comes with a report analyzing and benchmarking how memory allocation, between sorting <span
							class="qt-foundation">algorithms</span> heapsort, quicksort, and radixsort, is affected by the window set
							size, page size, and their input size.
						</p>

						<section class="game-link-section">
							<button type="button" class="game-button turnip-button"
							        role="link"
							        title="https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/REPORT.pdf"
							        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/REPORT.pdf")}>
								<img src={GithubIcon} class="long-btn-image" alt="github icon">
								<span>Benchmark report</span>
							</button>
							<button type="button" class="game-button turnip-button"
							        role="link"
							        title="https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/DESIGN.md"
							        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/DESIGN.md")}>
								<img src={GithubIcon} class="long-btn-image" alt="github icon">
								<span>Design</span>
							</button>
						</section>
					</div>
				</section>
			</Card>

			<Card>
				<section class="project-card" slot="content">

					<video playsinline autoplay muted loop preload="none">
						<source src={ThisWebsiteFootage} type="video/mp4">
						video unavailable. original video contains clips of this website being resized and light-dark mode being
						toggled.
					</video>
					<div class="project-card-body">
						<h2>This webpage!</h2>

						<p>
							The webpage is made of two parts. The webpage that has the content for everything here, I've
							lovingly called Seaweed. I kept seaweed as a private package. On the other hand, the base package which I
							want to use for all spin offs of my websites is called Pineapple and have kept that codebase public.
						</p>

						<p>
							<Chip>Svelte</Chip>
							<Chip>Skeleton (Svelte UI library)</Chip>
							<Chip>Typescript</Chip>
							<Chip>Vercel</Chip>
							<Chip>YarnSpinner</Chip>
						</p>

						<section class="game-link-section">
							<button type="button" class="btn variant-filled-primary turnip-button"
							        role="link"
							        title="https://github.com/TurnipXenon/pineapple"
							        on:click={() => window.open("https://github.com/TurnipXenon/pineapple")}>
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

						<p>A course project app meant to emulate how Uber works by playing with <span class="qt-google">Google Maps API</span>.
						</p>
						<p>
							I implemented all interfaces related to the NoSQL cloud database <span
							class="qt-firebase qt-google qt-infra">Firebase</span>, making writing code easier for other programmers (<span
							class="qt-android">Android</span> / <span class="qt-java">Java</span>). I also wrote documentation to said
							code and added instrumented tests that are tested by the continuous integration tool <span
							class="qt-infra">Travis CI</span>, ensuring that our code is tested
						</p>

						<section class="game-link-section">
							<!-- todo: mock uber app find link -->
							<button type="button" class="game-button turnip-button"
							        role="link"
							        title="https://github.com/CMPUT301W20T10/UberApp"
							        on:click={() => window.open("https://github.com/CMPUT301W20T10/UberApp")}>
								<img src={GithubIcon} class="long-btn-image" alt="github icon">
							</button>
						</section>
					</div>
				</section>
			</Card>

		</section>

	</main>

	<SocialSection slot="extraLeadingIcons"
	               isSlot={true}
	               email={email}
	               linkedinSlug={linkedinSlug}
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
</style>