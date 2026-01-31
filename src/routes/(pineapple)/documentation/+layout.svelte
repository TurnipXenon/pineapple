<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import NestedNavigation from "$pkg/ui/components/NestedNavigation.svelte";
	import { PinyaCard } from "$pkg/ui/elements/index";
	import { getSiteLayout } from "$pkg/util/context/pineappleBaseContextDefinitions";
	import { onMount } from "svelte";

	let { children } = $props();
	let openBehavior = $state<"open-all" | "close-all">("open-all");

	onMount(() => {
		document.body.classList.add("documentation-layout");

		const mql = window.matchMedia("(width <= 58em)");

		mql.onchange = (e) => {
			if (e.matches) {
				openBehavior = "close-all";
			} else {
				openBehavior = "open-all";
			}
		};
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
	<div class="documentation-header">
		<NestedNavigation
			layout={documentationLayout}
			depth={0}
			close={() => {}}
			{openBehavior}></NestedNavigation>
	</div>
	<PinyaCard id="documentation-body">
		{@render children()}
	</PinyaCard>
</div>

<style>
    :global {
        :root {
            /* calc(20em + (66em * 0.5) + 5rem) = 58em */
            /* 5 em is for gap + margins */
            --documentation-break-point: calc(20em + (66em * 0.5) + 5rem);
        }

        .documentation-layout {
            --default-page-container-margin: 0;
        }

        .documentation-header {
            width: 20em;
            margin: 1lh 1rem;

            & > .pinya-nested-navigation {
                width: 100%;
            }

            @media (max-width: 58em) {
                position: sticky;
                top: 2.5lh;
                min-width: unset;
                max-width: unset;
                margin: 0 1rem;
                height: 1lh;
                width: unset;
            }
        }

        #documentation-body {
            margin: 1lh 1rem;
            min-width: calc(66em * 0.5);
            max-width: 66em;

            @media (max-width: 58em) {
                min-width: unset;
                max-width: unset;
                margin: 0 1rem;
                margin-top: 1lh;
                width: unset;
            }
        }
    }


    #documentation-layout-wrapper {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
        width: 100%;
        margin: auto;
        @media (max-width: 58em) {
            flex-direction: column;
            align-items: stretch;
            margin: 0 1rem;
        }
    }

</style>
