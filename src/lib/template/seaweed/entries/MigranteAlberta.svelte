<script lang="ts">
	import Chip from "$pkg/components/chip/Chip.svelte";
	import { type EntryProps } from "./EntryProps";
	import LinkIcon from "$pkg/assets/icons/link-icon.svg";
	import Card from "$pkg/components/Card.svelte";
	import type { ModalSettings } from "@skeletonlabs/skeleton";
	import { getModalStore } from "@skeletonlabs/skeleton";

	export let props: EntryProps;

	const modalStore = getModalStore();
	const cmput401Info: ModalSettings = {
		type: "confirm",
		title: "Information",
		body: "As a full disclosure, this link will lead you to <a href='https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398' target='_blank'>" +
			"https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398</a>. " +
			"We currently don't have any tests yet ensuring that the link is correct. " +
			`Click confirm to go to the site. Please report any bugs at <a href='mailto:${props.email}' target='_blank'>` +
			`${props.email}</a>.`,
		response: (r: boolean) => {
			if (r) {
				window.open("https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398");
			}
		}
	};
</script>
<Card>
	<section class="project-card" slot="content">
		<iframe id="migrante-alberta"
		        width="560" height="315" src="https://www.youtube.com/embed/ZemWwf8jh8E?si=RZwSfYHI-0Ael-RE"
		        title="YouTube video player" style="border: none"
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
