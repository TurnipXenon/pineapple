<script lang="ts">
	import { PinyaCard } from "$pkg/ui/elements";

	import * as ExampleJob1 from "$pkg/ui/modules/experience/ExampleJob1.svelte";
	import * as ExampleJob2 from "$pkg/ui/modules/experience/ExampleJob2.svelte";
	import * as Hepcat from "$pkg/ui/modules/projects/Hepcat.svelte";

	import * as Pengi from "$pkg/ui/modules/projects/Pengi.svelte";
	import * as Soulwork from "$pkg/ui/modules/projects/Soulwork.svelte";
	import * as ThisWebpage from "$pkg/ui/modules/projects/ThisWebpage.svelte";
	import {
		type ProjectGroup,
		SeaweedLayout,
		SectionType,
		type SnippetMeta
	} from "$pkg/ui/templates/SeaweedLayout/index";
	import type { Snippet } from "svelte";
	import ElementVisibilityDetector from "../../lib/ui/elements/ElementVisibilityDetector.svelte";

	import type { PageProps } from "./$types";

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
		<div>
			<PinyaCard class="about-section" flexClass="">
				<div class="about-text">
					<h2>About</h2>
					<p>Hi I'm Turnip! Put stuff here! Say more impressive things, like a summary of some sort.</p>
					<p>More stuff here!!</p>
					<p>Study here maybe</p>
					<p>Quirky thing maybe</p>
				</div>

				<div class="about-social-section">
					{@render socialSection()}
				</div>
			</PinyaCard>

			<ElementVisibilityDetector bind:isVisible={isSocialVisible} />
		</div>
	{/snippet}
</SeaweedLayout>

<!-- todo: we need to port this styling to seaweed, or at least mirror it -->
<style>
    :global {
        .about-section {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
		        flex-wrap: wrap;
		        gap: 1lh;

            &.pinya-card {
                width: unset;
                max-width: unset;
            }

            .about-text {
		            flex-basis: 26em;
            }

            .about-social-section > .socials {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
        }

        .is-mobile .about-section .about-social-section > .socials {
            flex-direction: column;
        }

        .is-mobile.is-very-narrow .about-section .about-social-section > .socials {
            flex-direction: row;
        }
    }

    :global(.social-section-card) {
        padding-top: calc(var(--spacing) * 6);
        padding-bottom: calc(var(--spacing) * 6);
    }
</style>
