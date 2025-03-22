<script lang="ts">
	import { PinyaCard } from "$pkg/ui/elements";
	import { type ProjectGroup, SeaweedLayout, type SnippetMeta } from "$pkg/ui/templates/seaweed-layout/index";
	import type { Snippet } from "svelte";

	import * as Pengi from "$pkg/ui/modules/projects/Pengi.svelte";
	import * as Soulwork from "$pkg/ui/modules/projects/Soulwork.svelte";
	import * as Hepcat from "$pkg/ui/modules/projects/Hepcat.svelte";
	import * as ThisWebpage from "$pkg/ui/modules/projects/ThisWebpage.svelte";

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const uiList: SnippetMeta[] = [
		ThisWebpage,
		Hepcat,
		Pengi,
		Soulwork,
	];

	const layout: ProjectGroup[] = [
		{
			title: "Games",
			entryList: [
				Hepcat,
				Pengi,
				ThisWebpage,
			],
			key: 'games',
		},
		{
			title: "Projects",
			entryList: [
				ThisWebpage,
				Hepcat,
				Pengi,
				Soulwork,
			],
			key: 'projects',
		}
	];
</script>

<!--todo: maybe add check that this is always false? -->
<!--<SeaweedTemplate-->
<!--	getAllEntryFromGlobal={GetAllEntryFromGlobal}-->
<!--	seaweedTemplateData={seaweedTemplateData}-->
<!--	projectFirstGroupedEntries={AllGroupedEntriesProjectFirst}-->
<!--	getEntryFromGlobal={GetEntryFromGlobal}-->
<!--	experienceSection={WorkExperience}-->
<!--	letChaos={false}></SeaweedTemplate>-->

<!-- todo: entryList + layout -->
<SeaweedLayout
	name="Turnip"
	email="turnipxenon@gmail.com"
	linkedinSlug="turnip-xenon"
	domain="https://turnipxenon.com"
	entryList={uiList}
	layout={layout}
	queryTerms={data.queryTerms}
>
	{#snippet sideSection(socialSection: Snippet)}
		<div class="flex flex-col gap-4">
			<PinyaCard>
				<div class="side-section">
					<h2>About</h2>
					<p>Hi I'm Turnip! Put stuff here!</p>
					<p>More stuff here!!</p>
				</div>
			</PinyaCard>

			<PinyaCard paddingClass="pt-6 pb-6">
				{@render socialSection()}
			</PinyaCard>
		</div>
	{/snippet}

	<PinyaCard>
		<div class="side-section">
			<h2>Experience</h2>
			<p>Test asdf ad fas faf adsffd dasfdf a faf asdfaf a fa sdfaf af ad fafd fafd as fd adsf adfa sf af df asd fsad f dsafas f adsfdf asd sdf</p>
			<p>Test asdf ad fas faf adsffd dasfdf a faf asdfaf a fa sdfaf af ad fafd fafd as fd adsf adfa sf af df asd fsad f dsafas f adsfdf asd sdf</p>
		</div>
	</PinyaCard>
</SeaweedLayout>

<style>
    .side-section {
        display: flex;
        flex-direction: column;
    }
</style>