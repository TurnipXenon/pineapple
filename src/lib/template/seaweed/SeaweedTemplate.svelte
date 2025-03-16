<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
	import { afterUpdate, type ComponentType, onMount } from "svelte";
	import EntryOrderConfig from "$pkg/template/seaweed/entry_order_config/EntryOrderConfig.svelte";
	import { runChaos } from "$pkg/template/seaweed/RunChaos";
	import SocialSection from "$pkg/components/SocialSection.svelte";
	import "./seaweed.postcss";
	import SeaweedBaseLayout from "$pkg/components/layouts/SeaweedBaseLayout.svelte";
	import { CodeBlock } from "@skeletonlabs/skeleton";
	import { page } from "$app/stores";
	import Card from "$pkg/components/Card.svelte";
	import {
		type ComponentMeta,
		type EntryGroup,
		type SeaweedTemplateData,
		TurnGroupEntriesMutable
	} from "./SeaweedTemplateData";
	import type { EntryProps } from "$pkg/template/seaweed/entries/EntryProps";
	import { parseQueryTerms } from "$pkg/template/seaweed/ParseQueryTerms";
	import UrlShortenerForm from "$pkg/template/seaweed/CreateUrlForm.svelte";
	import PineappleSlideToggle from "$pkg/components/PineappleSlideToggle.svelte";
	import { Chip } from "$pkg/index";
	import ChumBucket from "$pkg/template/seaweed/ChumBucket.svelte";

	export let seaweedTemplateData: SeaweedTemplateData;
	export let projectFirstGroupedEntries: ReadonlyArray<EntryGroup>;
	export let getAllEntryFromGlobal: () => Map<string, ComponentMeta>;
	export let getEntryFromGlobal: (name: string) => undefined | ComponentMeta;
	export let letChaos = true;
	export let name = "Turnip";
	export let email = "turnipxenon@gmail.com";
	export let linkedinSlug = "turnip-xenon";
	export let domain = "http://localhost:5173/portfolio/actual/";
	export let serverSideQueryParams = "";
	export let experienceSection: ComponentType;

	// region query params
	let entryProps: EntryProps = {
		email,
		letChaos,
		linkedinSlug,
		name,
		seaweedTemplateData
	};

	let isVisible = true;
	const paramQTSet = new Set<string>();

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
				if (pair.length >= 2) {
					const group: EntryGroup = {
						name: pair[0],
						items: [],
						gridClass: pair[2]
					};

					pair[1].split("|").forEach(e => {
						const component = getEntryFromGlobal(e);
						if (component) {
							group.items.push(component);
						}
					});

					seaweedTemplateData.groupedEntries.push(group);
				}

			});

			seaweedTemplateData.groupedEntries = seaweedTemplateData.groupedEntries;
		} else if (gameSectionFirstParam === "false") {
			seaweedTemplateData.groupedEntries = TurnGroupEntriesMutable(projectFirstGroupedEntries);
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
		} else if (!letChaos && $page.url.searchParams) {
			filterSearchParams($page.url.searchParams);
		}

		if (letChaos) {
			runChaos(document.body);
			chaosDone = true;
		}
	});

	// todo: figure out what this does #migration
	// let isParsed = false;
	// afterUpdate(async () => {
	// 	if (!letChaos && !isParsed) {
	// 		isParsed = true;
	// 		await parseQueryTermsLocal();
	// 	}
	// });

	const toggleTerm = (term: string) => {
		seaweedTemplateData.queryTermMap.set(term, !seaweedTemplateData.queryTermMap.get(term));
		seaweedTemplateData.queryTermMap = seaweedTemplateData.queryTermMap;
	};

	// when either gameSectionFirst or the queryTerms are updated, update advancedUrl
	let orderUrl = "";
	let advancedUrl = domain;
	let advancedQuery = "";
	const updateUrl = (seaweedTemplateData: SeaweedTemplateData) => {
		if (seaweedTemplateData === undefined) {
			return;
		}

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

	// eslint-disable-next-line
	const updateSeaweedWhenFunNoteChanged = (_: boolean) => {
		entryProps = entryProps;
	};
	$: updateSeaweedWhenFunNoteChanged(seaweedTemplateData.shouldAddFunNote);
</script>

<SeaweedBaseLayout bind:shouldDisplayLeadingIcons={isSocialsGone}>
	<!-- todo: limit main size to 1080 px? -->
	<main style={`
	--qt-font-weight: ${qtfontWeight};${additionalFontWeight};
	visibility: ${mainVisibility};
	`}>
		<svelte:component this={experienceSection}
		                  entryProps={entryProps}
		                  bind:isVisible={isVisible}
		></svelte:component>

		{#if seaweedTemplateData}
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
		{/if}

		<ChumBucket></ChumBucket>

		{#if (!letChaos)}
			<div aria-hidden="true" style="height: 3lh" />

			<Card>
				<div slot="content" class="default-card advanced-setting">
					<h1>Advanced settings</h1>
					<p>This one is for those curious how I customize this page.</p>

					<PineappleSlideToggle name="advanced-setting-slider"
					                      bind:checked={isAdvanceSettingOn}>
						Advanced settings: {isAdvanceSettingOn ? "On" : "Off"}
					</PineappleSlideToggle>

					{#if (isAdvanceSettingOn)}
						<PineappleSlideToggle name="game-section-slider"
						                      bind:checked={seaweedTemplateData.gameSectionFirst}>
							Should game section appear first over projects: {seaweedTemplateData.gameSectionFirst ? "On" : "Off"}
						</PineappleSlideToggle>
						<p>Note: the above configuration was made before the dynamic entry list and to support links sent with that params, we will act like it only swaps the two groups, and nothing more dynamic if order query param does not exist. The configuration only happens during page load with query param, and it does not apply when changed here.</p>
						<PineappleSlideToggle name="fun-note-slider"
						                      bind:checked={seaweedTemplateData.shouldAddFunNote}>
							Should add fun note in description: {seaweedTemplateData.shouldAddFunNote ? "On" : "Off"}
						</PineappleSlideToggle>

						<h3>Query terms to bold</h3>
						<div class="query-term-grid">
							{#each seaweedTemplateData.queryTermMap.entries() as [term, shouldBold]}
								<!--{@const shouldBold = false}-->
								<Chip onClick={() => {toggleTerm(term)}}
								      checked={shouldBold}>
									<!-- todo: change shouldBold -->
									<span style={`font-weight: ${shouldBold ? "bold" : "normal"}`}>
										{#if (shouldBold)}&check;{/if}
										{term}
									</span>
								</Chip>
							{/each}
						</div>

						<EntryOrderConfig bind:seaweedEntries={seaweedTemplateData.groupedEntries}
						                  seaweedTemplateData={seaweedTemplateData}
						                  bind:orderUrl={orderUrl}
						                  getAllEntryFromGlobal={getAllEntryFromGlobal}
						                  getEntryFromGlobal={getEntryFromGlobal}
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

<style lang="postcss">/*$$__STYLE_CONTENT__$$*/</style>
