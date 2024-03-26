<script lang="ts">
	import { showComponentInToast, showTextInToast } from "$pkg/components/pineapple/toast/Toast";
	import TestCard from "$pkg/components/pineapple/toast/custom-toast/TestCustomToast.svelte";
	import TestDialogYarn from "./TestDialog.yarn?raw";
	import { Card, createGoToFunction, dialogManager, type RawGlob } from "$pkg";
	import { findPageMetaParent, type PageMeta } from "$pkg/components/navigation_component/PageMeta";


	// region Toast test scripts
	let testingQueueNumber = 1;
	const testingRandomPhrases = [
		"Niko",
		"Niko the Baikal seal",
		"Niko the Baikal seal\nfrom Toba Aquarium"
	];
	const testDialogYarn = TestDialogYarn;

	let parsed = false;
	const onTestDialogClick = () => {
		if (!parsed) {
			dialogManager.parseAndSetDialogTree(testDialogYarn).then(() => {
				dialogManager.toggleDialogOverlay();
			});
			parsed = true;
		} else {
			dialogManager.toggleDialogOverlay();
		}
	};
	// endregion


	// todo: fix fragile relative reference to the root
	const fileList = import.meta.glob("./**/+page.svelte", { query: "?raw", eager: true });
	const pageFlatList: PageMeta[] = [];
	for (const path in fileList) {
		const pathParts = path.split("/");
		pathParts.pop();

		// get title
		let title = pathParts[pathParts.length - 1].replaceAll("-", " ");
		const body = (fileList[path] as RawGlob).default as string;
		if (body.startsWith("<!--")) {
			title = JSON.parse(body.slice("<!--".length, body.indexOf("-->")))["title"];
		}

		// get url path
		const subPath = pathParts.filter(s => {
			return s !== "." && s.indexOf("(") !== 0;
		});


		// todo: consider
		// subPath.unshift("/misc");
		const meta: PageMeta = {
			relativeLink: subPath.join("/"),
			title,
			tags: [],
			nestedPages: []
		};
		pageFlatList.push(meta);
	}

	pageFlatList.sort((a, b) => a.relativeLink.localeCompare(b.relativeLink));

	const pageGroupedList: PageMeta[] = [];
	pageFlatList.forEach(p => {
		if (!findPageMetaParent(pageGroupedList, p)) {
			pageGroupedList.push(p);
		}
	});
</script>

<div class="pineapple-container">
	<Card>
		<div slot="content" class="default-card">
			<button
				class="btn variant-filled-secondary"
				on:click={() => {
			showComponentInToast({componentAndProps: {component: TestCard, props: undefined}});
		}}><h3>Test custom toast</h3></button>
			<button
				class="btn variant-filled-secondary"
				on:click={() => {
			showTextInToast(`${testingQueueNumber} ${testingRandomPhrases[testingQueueNumber]}`);
			testingQueueNumber = (testingQueueNumber + 1) % testingRandomPhrases.length;
		}}><h3>Handy toast</h3></button>
			<button
				class="btn variant-filled-secondary"
				on:click={onTestDialogClick}><h3>Test dialog</h3></button>
		</div>
	</Card>
	<Card><h1 class="filler" slot="content">Card</h1></Card>
	<Card><h1 class="filler" slot="content">Card</h1></Card>

	<div class="navigation-component">
		<Card><h1 class="filler" slot="content">Title</h1></Card>
		<!-- all the misc routes-->
		{#each pageFlatList as page}
			<button class="navigation-element">
				<h3>{page.title}</h3>
			</button>
		{/each}
	</div>


</div>

<style lang="postcss">
    .default-card {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }

    .pineapple-container {
        display: flex;
        flex-direction: column;
    }

    .filler {
        padding: 2em;
    }

    .navigation-component {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    .navigation-element {
        @apply btn card card-hover bg-surface-100 dark:bg-surface-900;
    }
</style>
