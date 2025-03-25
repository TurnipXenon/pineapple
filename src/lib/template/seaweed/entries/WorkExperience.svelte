<script lang="ts">
	import SocialSection from "$pkg/ui/components/SocialSection.svelte";
	import Card from "$pkg/components/Card.svelte";
	import ElementVisibilityDetector from "../../../ui/elements/ElementVisibilityDetector.svelte";
	import type { EntryProps } from "$pkg/template/seaweed/entries/EntryProps";

	interface Props {
		entryProps: EntryProps;
		isVisible: boolean;
	}

	let { entryProps, isVisible = $bindable() }: Props = $props();
	let { email, letChaos, linkedinSlug, name } = entryProps;
</script>

<div class="experience-and-about-div">

	<div class="greater-about-div">

		<Card includeDataNoSnippet={false}>
			{#snippet content()}
				<section class="section-card">

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
					{#if entryProps.seaweedTemplateData.shouldAddFunNote}
						<p>
							I'm inspired by games like Harvest Moon: Friends of Mineral Town, Rune Factory 4, Theatrhythm,
							Bravely Default: Flying Fairy, Boku no Natsuyasumi 2, and A Short Hike.
						</p>
					{/if}

					<!-- todo: maybe put cute stuff here -->
					<!--						</ToggleableContent>-->
				</section>
			{/snippet}
		</Card>

		<Card>
			{#snippet content()}
				<section class="section-card">
					<SocialSection email={email} linkedinSlug={linkedinSlug}></SocialSection>
					<ElementVisibilityDetector bind:isVisible={isVisible}>
					</ElementVisibilityDetector>
				</section>
			{/snippet}
		</Card>

	</div>

	<Card>
		{#snippet content()}
			<section class="section-card">
				<h1>Experience</h1>

				<h2>Highlight</h2>
				<p>I like French Fries</p>

				<h2>Software Engineer</h2>
				<div class="two-column-separated">
					<div>July 2023 – January 2024</div>
					<div style="text-align: end">Control, Remote</div>
				</div>
				<ul>
					<li>
						Developed things
					</li>
					<li>
						Woah
					</li>
				</ul>
				<br>

				<h2>Software Engineer Intern</h2>
				<div class="two-column-separated">
					<div>May 2022 – Aug 2022</div>
					<div style="text-align: end">Pou Company</div>
				</div>
				<ul>
					<li>
						Stuff
					</li>
					<li>
						Golang
					</li>
				</ul>
				<br>
				<!-- todo: turn off flashing when accordion is expanded -->
				<!-- todo: migrate accordion -->
				<!--				<Accordion>-->
				<!--					<Accordion.Item>-->
				<!--						{#snippet summary()}-->
				<!--							<div>-->
				<!--								<h2 class="accordion-header">More experience</h2>-->
				<!--							</div>-->
				<!--						{/snippet}-->
				<!--						{#snippet content()}-->

				<!--							<section class="more-section">-->
				<!--								<h2>Software Engineer Intern</h2>-->
				<!--								<div class="two-column-separated">-->
				<!--									<div>May 2021 – Dec 2021</div>-->
				<!--									<div style="text-align: end">Testing</div>-->
				<!--								</div>-->
				<!--								<ul>-->
				<!--									<li>-->
				<!--										Amazing-->
				<!--									</li>-->
				<!--								</ul>-->
				<!--								<br>-->
				<!--							</section>-->

				<!--						{/snippet}-->
				<!--					</Accordion.Item>-->
				<!--				</Accordion>-->
			</section>
		{/snippet}
	</Card>

</div>