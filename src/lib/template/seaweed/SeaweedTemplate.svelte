<script lang="ts">
	import { afterUpdate, type ComponentType, onMount } from "svelte";
	import EntryOrderConfig from "$pkg/template/seaweed/entry_order_config/EntryOrderConfig.svelte";
	import { runChaos } from "$pkg/template/seaweed/RunChaos";
	import SocialSection from "$pkg/components/SocialSection.svelte";
	import "./seaweed.postcss";
	import SeaweedBaseLayout from "$pkg/components/layouts/SeaweedBaseLayout.svelte";
	import { Accordion, AccordionItem, CodeBlock, SlideToggle } from "@skeletonlabs/skeleton";
	import { page } from "$app/stores";
	import Card from "$pkg/components/Card.svelte";
	import ElementVisbilityDetector from "$pkg/components/ElementVisbilityDetector.svelte";
	import {
		AllGroupedEntriesProjectFirst,
		type EntryGroup,
		GetEntryFromGlobal,
		type SeaweedTemplateData,
		seaweedTemplateData,
		TurnGroupEntriesMutable
	} from "./SeaweedTemplateData";
	import type { EntryProps } from "$pkg/template/seaweed/entries/EntryProps";
	import { parseQueryTerms } from "$pkg/template/seaweed/ParseQueryTerms";
	import UrlShortenerForm from "$pkg/template/seaweed/CreateUrlForm.svelte";

	export let letChaos = true;
	export let name = "Turnip";
	export let email = "turnipxenon@gmail.com";
	export let linkedinSlug = "turnip-xenon";
	export let domain = "http://localhost:5173/portfolio/actual/";
	export let serverSideQueryParams = "";

	// region query params
	const entryProps: EntryProps = {
		email
	};

	const paramQTSet = new Set<string>();

	let isVisible = true;
	let isAdvanceSettingOn = false;
	$: isSocialsGone = !isVisible;

	let qtfontWeight = "normal";
	let additionalFontWeight = "";

	let chaosDone = false;
	let mainVisibility = "visible";
	$: mainVisibility = letChaos && !chaosDone ? "hidden" : "visible";

	const syncQT = () => {
		if (seaweedTemplateData.queryTermMap.size === 0 || paramQTSet.size === 0) {
			return;
		}

		seaweedTemplateData.queryTermMap.forEach((_, k) => {
			seaweedTemplateData.queryTermMap.set(k, paramQTSet.has(k));
		});

		// force svelte refresh
		seaweedTemplateData.queryTermMap = seaweedTemplateData.queryTermMap;
	};

	const parseQueryTermsLocal = async () => {
		const qtSet = new Set<string>();
		parseQueryTerms(document.body, qtSet);
		qtSet.forEach(t => seaweedTemplateData.queryTermMap.set(t, true));
		// force svelte update
		seaweedTemplateData.queryTermMap = seaweedTemplateData.queryTermMap;
		syncQT();
	};

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
		const isFunOn = searchParams.get("fun")?.trim();
		if (isFunOn === "true") {
			seaweedTemplateData.shouldAddFunNote = true;
		}

		// region Order
		const gameSectionFirstParam = searchParams.get("game-section-first")?.trim();
		const orderParam = searchParams.get("order")?.trim();
		if (orderParam) {
			seaweedTemplateData.groupedEntries = [];

			orderParam.split(",").forEach(groupDefinition => {
				const pair = groupDefinition.split(":");
				console.log(pair);
				if (pair.length >= 2) {
					const group: EntryGroup = {
						name: pair[0],
						items: [],
						gridClass: pair[2]
					};

					pair[1].split("|").forEach(e => {
						const component = GetEntryFromGlobal(e);
						if (component) {
							group.items.push(component);
						}
					});

					seaweedTemplateData.groupedEntries.push(group);
				}

			});

			seaweedTemplateData.groupedEntries = seaweedTemplateData.groupedEntries;
		} else if (gameSectionFirstParam === "false") {
			seaweedTemplateData.groupedEntries = TurnGroupEntriesMutable(AllGroupedEntriesProjectFirst);
		}
		// endregion

		// region Bold terms
		const qtValue = searchParams.get("qt")?.trim();
		if (qtValue !== undefined) {
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
		} else {
			qtfontWeight = "bold";
		}
		// endregion Bold terms
	};
	// endregion query params

	/* region chaos scripts */
	/* endregion chaos scripts */

	onMount(async () => {
		if (!letChaos && serverSideQueryParams) {
			filterSearchParams(new URLSearchParams(serverSideQueryParams));
		}

		if (!letChaos && $page.url.searchParams) {
			filterSearchParams($page.url.searchParams);
		}

		if (letChaos) {
			runChaos(document.body);
			chaosDone = true;
		}
	});

	let isParsed = false;
	afterUpdate(async () => {
		if (!letChaos && !isParsed) {
			isParsed = true;
			await parseQueryTermsLocal();
		}
	});

	const toggleTerm = (term: string) => {
		seaweedTemplateData.queryTermMap.set(term, !seaweedTemplateData.queryTermMap.get(term));
		seaweedTemplateData.queryTermMap = seaweedTemplateData.queryTermMap;
	};

	// when either gameSectionFirst or the queryTerms are updated, update advancedUrl
	let orderUrl = "";
	let advancedUrl = domain;
	let advancedQuery = "";
	const updateUrl = (seaweedTemplateData: SeaweedTemplateData) => {
		const queryParams: string[] = [];

		if (orderUrl) {
			queryParams.push(orderUrl);
		}

		const qtList: string[] = [];
		seaweedTemplateData.queryTermMap.forEach((shouldBold, term) => {
			if (shouldBold) {
				qtList.push(term);
			}
		});

		if (qtList.length === 0) {
			queryParams.push("qt=clear");
		} else if (seaweedTemplateData.queryTermMap.size !== qtList.length) {
			// we'll only add if the lengths are not equal
			// dont need to add query if all terms in qtMap is true
			queryParams.push(`qt=${qtList.map(t => t.slice(3, t.length)).join(",")}`);
		}

		if (seaweedTemplateData.shouldAddFunNote) {
			queryParams.push("fun=true");
		}

		if (!seaweedTemplateData.gameSectionFirst) {
			queryParams.push("game-section-first=false");
		}

		if (queryParams.length > 0) {
			advancedQuery = queryParams.join("&");
			advancedUrl = `${domain}?${advancedQuery}`;
		} else {
			advancedUrl = domain;
		}
	};
	$: updateUrl(seaweedTemplateData);

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
						{#if seaweedTemplateData.shouldAddFunNote}
							<p>
								I'm inspired by games like Harvest Moon: Friends of Mineral Town, Rune Factory 4, Theatrhythm,
								Bravely Default: Flying Fairy, Boku no Natsuyasumi 2, and A Short Hike.
							</p>
						{/if}

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

					<h2>Highlight</h2>
					<p>Worked on Go backend microservices and Typescript React frontend app, serving <b>over 30 million daily
						active users</b> at Twitch</p>

					<h2>Software Engineer</h2>
					<div class="two-column-separated">
						<div>July 2023 – January 2024</div>
						<div style="text-align: end">Twitch, Remote</div>
					</div>
					<ul>
						<li>
							Contributed to
							<span class="qt-go">Golang</span>
							microservices and
							<span class="qt-ts">Typescript</span>
							<span class="qt-react">React</span> codebases, across several teams, to accommodate public-facing user safety features to better comply with EU’s Digital Services Act, which applies to no more than
							<a href="https://safety.twitch.tv/s/article/Digital-Services-Act-Information?language=en_US">30.5 million users</a>
							. Work includes feature flags, alarms, unit tests, end-to-end testing, and documentation.
						</li>
						<li>
							Improved observability for upcoming features by setting up new AWS resources to integrate internal data platform tools with existing alarms in our team’s microservice, utilizing
							<span class="qt-aws qt-observability">Cloudwatch</span>,
							<span class="qt-aws qt-observability">Grafana</span>,
							<span class="qt-aws">Kinesis Data Stream</span>,
							<span class="qt-aws qt-infra">AWS CDK (infrastructure as code)</span>, and
							<span class="qt-aws qt-cicd">CodePipeline (CI/CD)</span>
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
												Implemented and wrote tests for a feature in Twitch’s
												<span class="qt-go">Golang</span> backend authentication microservices and
												<span class="qt-ts">Typescript</span>
												<span class="qt-react">React</span> frontend web app that will help suggest security improvements to
												<b>over 100k+ users daily</b>
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

		{#each seaweedTemplateData.groupedEntries as group}
			{#if group.items.length > 0}
				<Card>
					<section class="section-card title-card" slot="content">
						<h1 class="text-center">{group.name}</h1>
					</section>
				</Card>

				<section class={group.gridClass}>
					{#each group.items as entry}
						<svelte:component this={entry.component} props={entryProps}></svelte:component>
					{/each}
				</section>
			{/if}
		{/each}

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
						<SlideToggle name="game-section-slider" bind:checked={seaweedTemplateData.gameSectionFirst}>
							Should game section appear first over projects: {seaweedTemplateData.gameSectionFirst ? "On" : "Off"}
						</SlideToggle>
						<p>Note: the above configuration was made before the dynamic entry list and to support links sent with that params, we will act like it only swaps the two groups, and nothing more dynamic if order query param does not exist. The configuration only happens during page load with query param, and it does not apply when changed here.</p>
						<SlideToggle name="fun-note-slider" bind:checked={seaweedTemplateData.shouldAddFunNote}>
							Should add fun note in description: {seaweedTemplateData.shouldAddFunNote ? "On" : "Off"}
						</SlideToggle>

						<h3>Query terms to bold</h3>
						<div class="query-term-grid">
							{#each seaweedTemplateData.queryTermMap.entries() as [term, shouldBold]}
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

						<EntryOrderConfig bind:seaweedEntries={seaweedTemplateData.groupedEntries}
						                  bind:orderUrl={orderUrl}
						                  updateUrl={updateUrl}></EntryOrderConfig>

						<br>
						<p>Copy the url below and open a new page with it</p>
						<CodeBlock language="url" code={advancedUrl}></CodeBlock>

						<UrlShortenerForm queryParams={advancedQuery}></UrlShortenerForm>
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
