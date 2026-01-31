<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import NestedNavigation from "$pkg/ui/components/NestedNavigation.svelte";
	import { getSiteLayout } from "$pkg/util/context/pineappleBaseContextDefinitions";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		document.body.classList.add("documentation-layout");
	});

	beforeNavigate((navigation) => {
		if (navigation.type === "link" && !navigation.to?.route.id?.includes("/documentation")) {
			document.body.classList.remove("documentation-layout");
		}
	});

	let documentationLayout = $derived.by(() => {
		const siteList = getSiteLayout().filter(layout => layout.relativeLink.includes("documentation"));
		if (siteList.length > 0) {
			return siteList[0].nestedPages;
		}
		return [];
	});
</script>
<div id="documentation-layout-wrapper">
	<div id="documentation-header">
		<NestedNavigation layout={documentationLayout} depth={0} close={() => {}} openBehavior="open-all"></NestedNavigation>
	</div>
	<div id="container2">
		{@render children()}
	</div>
</div>

<style>
    #documentation-layout-wrapper {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    :global(body.documentation-layout) {
        --default-page-container-margin: 0;
    }

    #container1 {

    }
</style>
