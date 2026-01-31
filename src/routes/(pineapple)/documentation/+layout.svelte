<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		document.body.classList.add("documentation-layout");
	});

	beforeNavigate((navigation) => {
		console.log(navigation)
		if (navigation.type === "link" && !navigation.to?.route.id?.includes('/documentation')) {
			console.log('removing documentation layout...')
			document.body.classList.remove("documentation-layout");
		}
	});
</script>
<div id="documentation-layout-wrapper">
	<div id="container1">
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
		Container1
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
