<script lang="ts">
	import SocialSection from "$pkg/components/SocialSection.svelte";
	import Card from "$pkg/components/Card.svelte";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
	import ElementVisibilityDetector from "$pkg/components/ElementVisbilityDetector.svelte";
	import type { EntryProps } from "$pkg/template/seaweed/entries/EntryProps";

	export let entryProps: EntryProps;
	export let isVisible: boolean;
	let { email, letChaos, linkedinSlug, name, seaweedTemplateData } = entryProps;
</script>

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
				{#if seaweedTemplateData?.shouldAddFunNote}
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
				<ElementVisibilityDetector bind:isVisible={isVisible}>
				</ElementVisibilityDetector>
			</section>
		</Card>

	</div>

	<Card>
		<section class="section-card" slot="content">
			<h1>Experience</h1>

			<h2>Highlight</h2>
			<p>Worked on Go backend microservices and Typescript React frontend app, serving <b>over 30 million daily
				active users</b> at Twitch (an Amazon Web Services subsidiary)</p>

			<h2>Software Engineer</h2>
			<div class="two-column-separated">
				<div>July 2023 – January 2024</div>
				<div style="text-align: end">Twitch (Amazon Web Services), Remote</div>
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
				<div style="text-align: end">Twitch (Amazon Web Services), San Francisco</div>
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
									<div style="text-align: end">Twitch (Amazon Web Services), Remote</div>
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