<script lang="ts">
	export let letChaos = true;
	export let name = "Turnip";
	export let email = "turnipxenon@gmail.com";
	export let linkedinSlug = "turnip-xenon";
	export let domain = "http://localhost:5173/portfolio/actual/";

	import SocialSection from "$pkg/components/SocialSection.svelte";
	import "./seaweed.postcss";
	import SeaweedBaseLayout from "$pkg/components/layouts/SeaweedBaseLayout.svelte";
	import { Accordion, AccordionItem, CodeBlock, SlideToggle } from "@skeletonlabs/skeleton";
	import { page } from "$app/stores";
	import Card from "$pkg/components/Card.svelte";
	import { onMount } from "svelte";
	import ElementVisbilityDetector from "$pkg/components/ElementVisbilityDetector.svelte";
	import GameSection from "$pkg/template/Seaweed/GameSection.svelte";
	import ProjectSection from "$pkg/template/Seaweed/ProjectSection.svelte";

	let isVisible = true;
	let isAdvanceSettingOn = false;

	$: isSocialsGone = !isVisible;

	// region query params
	import gameContent from "./GameSection.svelte?raw";
	import projectContent from "./ProjectSection.svelte?raw";
	import selfContent from "./SeaweedTemplate.svelte?raw";

	let qtMap = new Map<string, boolean>();
	const paramQTSet = new Set<string>();

	const syncQT = () => {
		if (qtMap.size === 0 || paramQTSet.size === 0) {
			return;
		}

		qtMap.forEach((_, k) => {
			qtMap.set(k, paramQTSet.has(k));
		});

		// force svelte refresh
		qtMap = qtMap;
	};

	const parseQTTerms = async () => {
		const qtSet = new Set<string>();
		const rawTermList: string[] = [];
		[gameContent, projectContent, selfContent].forEach(body => {
			// parse the qt-* term which exists within elements like:
			// <span class="qt-*">TERM</span>
			rawTermList.push(
				...body // step 3: destructure the array
					.split("\"") // step 1: split the text as double quotations (") as the delimiter
					.filter(s => s.startsWith("qt-")) // step 2: filter out texts that does not begin with "qt-"
			);
		});

		// step 4: some spans contain multiple classes, split them up
		// then add them to qtTerms
		// e.g. <span class="qt-1 qt-2">TERM</span>
		rawTermList.forEach(t => {
			t.split(" ").forEach(nt => {
				// filter out some of this meta terms
				if (["qt-1", "qt-2", "qt-*", "qt-"].includes(nt)) {
					return;
				}

				// adding to set ensures the entry is unique
				qtSet.add(nt);
			});
		});

		// activate svelte reactivity
		qtSet.forEach(t => qtMap.set(t, true));
		syncQT();
	};
	parseQTTerms();

	// todo: fix fragile relative reference to the root
	// const fileList = import.meta.glob("./**/+page.svelte", { query: "?raw", eager: true });
	// const titleToLink = new Map<string, string>();

	let gameSectionFirst = true;
	let qtfontWeight = "normal";
	let additionalFontWeight = "";
	/** qt values and what they mean:
	 *  undefined: set all qt terms to font-weight: bold
	 *  todo: implement clear
	 *  clear: unset all terms to font-weight: normal
	 *  <term>: only set qt-<term> to bold
	 *  <term1>,<term2>: only set qt-<term1> and qt-<term2> to bold,
	 *
	 *  ONLY CALL INSIDE onMount()
	 **/
	const filterSearchParams = (searchParams: URLSearchParams) => {
		const gameSectionFirstParam = searchParams.get("game-section-first")?.trim();
		if (gameSectionFirstParam === "false") {
			gameSectionFirst = false;
		}

		// region Bold terms
		const qtValue = searchParams.get("qt")?.trim();
		if (qtValue === undefined) {
			qtfontWeight = "bold";
			return;
		}
		qtfontWeight = "normal";
		const dynamicStyle = qtValue.split(",").map((term) => {
			// side-effect
			paramQTSet.add(`qt-${term}`);

			// main effect
			return `span.qt-${term} { font-weight: bold !important; }`;
		}).join("\n");

		// https://stackoverflow.com/a/24285947/17836168
		const style = document.createElement("style");
		// noinspection JSDeprecatedSymbols
		style.type = "text/css";
		style.innerText = dynamicStyle;
		document.head.appendChild(style);
		syncQT();
		// endregion Bold terms
	};
	// endregion query params

	/* region chaos scripts */
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
					if (child.hasAttribute("alt")) {
						child.setAttribute("src", "https://p.potaufeu.asahi.com/a2b9-p/picture/21583312/5c3310aec77068e24844c663aa62b37c.jpg");
					} else {
						child.setAttribute("src", "https://video.twimg.com/ext_tw_video/1318728494256410624/pu/vid/640x360/TMklz6hiTkQu3xhn.mp4");
						child.setAttribute("muted", "true");
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

	let mainVisibility = "visible";
	$: mainVisibility = letChaos && !chaosDone ? "hidden" : "visible";
	/* endregion chaos scripts */

	onMount(() => {
		if (!letChaos && $page.url.searchParams) {
			filterSearchParams($page.url.searchParams);
		}

		if (letChaos) {
			runChaos(document.body);
			chaosDone = true;
		}
	});

	const toggleTerm = (term: string) => {
		qtMap.set(term, !qtMap.get(term));
		qtMap = qtMap;
	};

	// when either gameSectionFirst or the queryTerms are updated, update advancedUrl
	let advancedUrl = domain;
	const updateUrl = () => {
		const queryParams: string[] = [];

		const qtList: string[] = [];
		qtMap.forEach((shouldBold, term) => {
			if (shouldBold) {
				qtList.push(term);
			}
		});

		if (qtList.length === 0) {
			queryParams.push("qt=clear");
		} else if (qtMap.size !== qtList.length) {
			// we'll only add if the lengths are not equal
			// dont need to add query if all terms in qtMap is true
			queryParams.push(`qt=${qtList.map(t => t.slice(3, t.length)).join(",")}`);
		}

		if (!gameSectionFirst) {
			queryParams.push("game-section-first=false");
		}

		if (queryParams.length > 0) {
			advancedUrl = `${domain}?${queryParams.join("&")}`;
		} else {
			advancedUrl = domain;
		}
		// advancedUrl = `${domain}?${q}`;
	};
	$: // noinspection CommaExpressionJS
		gameSectionFirst, qtMap, updateUrl();
	// $: gameSectionQuery = gameSectionFirst ? "" : "game-section-first=false";
</script>

<SeaweedBaseLayout bind:shouldDisplayLeadingIcons={isSocialsGone}>
	<!-- todo: limit main size to 1080 px? -->
	<main style={`
	--qt-font-weight: ${qtfontWeight};${additionalFontWeight};
	visibility: ${mainVisibility};
	`}>

		<div class="experience-and-about-div">

			<div class="greater-about-div">

				<Card includeDataNoSnippet={false}>
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
							across several teams, to accommodate adjustments for public-facing user safety related features, to better
							comply with EU’s <a target="_blank"
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
					<Accordion>
						<AccordionItem>
							<div slot="summary">
								<h2 class="accordion-header">More experience</h2>
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

		{#if (gameSectionFirst)}
			<GameSection email={email}></GameSection>
			<ProjectSection email={email}></ProjectSection>
		{:else }
			<ProjectSection email={email}></ProjectSection>
			<GameSection email={email}></GameSection>
		{/if}

		{#if (!letChaos)}
			<div aria-hidden="true" style="height: 25vh" />

			<Card>
				<div slot="content" class="default-card advanced-setting">
					<h1>Advanced settings</h1>
					<p>This one is for those curious how I customize this page.</p>
					<SlideToggle name="advanced-setting-slider" bind:checked={isAdvanceSettingOn}>
						Advanced settings: {isAdvanceSettingOn ? "On" : "Off"}
					</SlideToggle>
					{#if (isAdvanceSettingOn)}
						<SlideToggle name="game-section-slider" bind:checked={gameSectionFirst}>
							Should game section appear first over projects: {gameSectionFirst ? "On" : "Off"}
						</SlideToggle>

						<h3>Query terms to bold</h3>
						<div class="query-term-grid">
							{#each qtMap.entries() as [term, shouldBold]}
								<!--{@const shouldBold = false}-->
								<button
									class="chip {shouldBold ? 'variant-filled-tertiary' : 'variant-soft-tertiary'}"
									on:click={() => {toggleTerm(term)}}
								>
									<!-- todo: change shouldBold -->
									{#if (shouldBold)}&check;{/if}
									{term}
								</button>
							{/each}
						</div>

						<br>
						<p>Copy the url below and open a new page with it</p>
						<CodeBlock language="url" code={advancedUrl}></CodeBlock>
					{/if}
				</div>
			</Card>
		{/if}
	</main>

	<SocialSection slot="extraLeadingIcons"
	               isSlot={true}
	               email={email}
	               linkedinSlug={linkedinSlug}
	               isSmallVersion={true}></SocialSection>
</SeaweedBaseLayout>

<style lang="postcss">
    .advanced-setting {
        display: flex;
        flex-direction: column;
        gap: 0.5lh;
    }

    h3 {
        font-size: 1.5em;
        line-height: 1.5lh;
    }

    .query-term-grid {
        display: flex;
        gap: 0.25em;
        flex-wrap: wrap;
    }
</style>