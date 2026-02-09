<script lang="ts">
	import { PinyaCard } from "$pkg/ui/elements";
	import { type ProjectGroup, SeaweedLayout, type SnippetMeta, SectionType } from "$pkg/ui/templates/SeaweedLayout/index";
	import type { Snippet } from "svelte";

	import * as Pengi from "$pkg/ui/modules/projects/Pengi.svelte";
	import * as Soulwork from "$pkg/ui/modules/projects/Soulwork.svelte";
	import * as Hepcat from "$pkg/ui/modules/projects/Hepcat.svelte";
	import * as ThisWebpage from "$pkg/ui/modules/projects/ThisWebpage.svelte";

	import * as ExampleJob1 from "$pkg/ui/modules/experience/ExampleJob1.svelte";
	import * as ExampleJob2 from "$pkg/ui/modules/experience/ExampleJob2.svelte";

	import type { PageProps } from "./$types";
	import ElementVisibilityDetector from "../../lib/ui/elements/ElementVisibilityDetector.svelte";

	let { data }: PageProps = $props();

	const uiList: SnippetMeta[] = [
		ThisWebpage,
		Hepcat,
		Pengi,
		Soulwork
	];

	const experienceList: SnippetMeta[] = [
		ExampleJob2,  // Ongoing job first
		ExampleJob1
	];

	const projectList: SnippetMeta[] = [
		ThisWebpage,
		Hepcat,
		Pengi,
		Soulwork
	];

	const layout: ProjectGroup[] = [
		{
			key: "experience",
			title: "Experience",
			entryList: experienceList,
			sectionType: SectionType.Experience,
			showFilter: true,
			showSort: false,
			showMoreLimit: 2,  // Show 2 jobs, rest behind "show more"
			projectComponentProps: { isPineapple: true }
		},
		{
			key: "projects",
			title: "Projects",
			entryList: projectList,  // Merged games + projects
			sectionType: SectionType.Projects,
			showFilter: true,
			showSort: true,
			showMoreLimit: 6,  // Show first 6 projects, rest behind "show more"
			projectComponentProps: { isPineapple: true }
		}
	];

	let isSocialVisible = $state(true);
	let shouldShowSmallSocial = $derived(!isSocialVisible);
</script>

<SeaweedLayout
	name="Niko"
	email="niko@gmail.com"
	linkedinSlug="niko"
	domain="https://turnipxenon.com"
	entryList={uiList}
	layout={layout}
	queryTerms={data.queryTerms}
	showMiniSocial={shouldShowSmallSocial}
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

			<PinyaCard paddingClass="social-section-card">
				{@render socialSection()}
				<ElementVisibilityDetector bind:isVisible={isSocialVisible} />
			</PinyaCard>
		</div>
	{/snippet}
</SeaweedLayout>

<style>
    .side-section {
        display: flex;
        flex-direction: column;
    }

    :global(.social-section-card) {
		    padding-top: calc(var(--spacing) * 6);
		    padding-bottom: calc(var(--spacing) * 6);
    }
</style>
