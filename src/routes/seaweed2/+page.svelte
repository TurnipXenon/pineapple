<script lang="ts">
	import { PinyaCard } from "$pkg/ui/elements";
	import { type ProjectGroup, SeaweedLayout, type SnippetMeta } from "$pkg/ui/templates/SeaweedLayout/index";
	import type { Snippet } from "svelte";

	import * as Pengi from "$pkg/ui/modules/projects/Pengi.svelte";
	import * as Soulwork from "$pkg/ui/modules/projects/Soulwork.svelte";
	import * as Hepcat from "$pkg/ui/modules/projects/Hepcat.svelte";
	import * as ThisWebpage from "$pkg/ui/modules/projects/ThisWebpage.svelte";

	import type { PageProps } from "./$types";
	import ElementVisibilityDetector from "../../lib/ui/elements/ElementVisibilityDetector.svelte";
	import PinyaAccordion from "$pkg/ui/components/accordion/PinyaAccordion.svelte";
	import PinyaAccordionItem from "$pkg/ui/components/accordion/PinyaAccordionItem.svelte";

	let { data }: PageProps = $props();

	const uiList: SnippetMeta[] = [
		ThisWebpage,
		Hepcat,
		Pengi,
		Soulwork
	];

	const layout: ProjectGroup[] = [
		{
			title: "Games",
			entryList: [
				Hepcat,
				Pengi,
				ThisWebpage
			],
			key: "games",
			projectComponentProps: { isPineapple: true }
		},
		{
			title: "Projects",
			entryList: [
				ThisWebpage,
				Hepcat,
				Pengi,
				Soulwork
			],
			key: "projects",
			projectComponentProps: { isPineapple: true }
		}
	];

	let isSocialVisible = $state(true);
	let shouldShowSmallSocial = $derived(!isSocialVisible);
	let value = $state(["club"]);
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

			<PinyaCard paddingClass="pt-6 pb-6">
				{@render socialSection()}
				<ElementVisibilityDetector bind:isVisible={isSocialVisible} />
			</PinyaCard>
		</div>
	{/snippet}

	<PinyaCard>
		<div class="side-section">
			<h2>Experience</h2>
			<p>Test asdf ad fas faf adsffd dasfdf a faf asdfaf a fa sdfaf af ad fafd fafd as fd adsf adfa sf af df asd fsad f dsafas f adsfdf asd sdf</p>
			<p>Test asdf ad fas faf adsffd dasfdf a faf asdfaf a fa sdfaf af ad fafd fafd as fd adsf adfa sf af df asd fsad f dsafas f adsfdf asd sdf</p>
			<h3 class="mb-4">Subheading</h3>

			<div class="accordion-wrapper">
				<PinyaAccordion {value}>
					<PinyaAccordionItem value="club">
						<!-- Control -->
						{#snippet control()}Club{/snippet}
						<!-- Panel -->
						{#snippet panel()}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit esse nisi eligendi fuga! Quas nisi repellat adipisci animi repellendus incidunt laborum sunt qui nesciunt, ducimus saepe sapiente sed ut labore. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit esse nisi eligendi fuga! Quas nisi repellat adipisci animi repellendus incidunt laborum sunt qui nesciunt, ducimus saepe sapiente sed ut labore.{/snippet}
					</PinyaAccordionItem>
				</PinyaAccordion>
			</div>
		</div>
	</PinyaCard>
</SeaweedLayout>

<style>
    h3 {
        text-align: start;
    }

    .side-section {
        display: flex;
        flex-direction: column;
    }

    .accordion-wrapper {
		    margin: 0 -3rem;
    }
</style>
