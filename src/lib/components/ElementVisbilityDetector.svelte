<script lang="ts">
    import {onMount} from "svelte";

    export let isVisible = true;

    let stickyElem: HTMLElement;

    let observer: undefined | IntersectionObserver;
    onMount(() => {
        observer = new IntersectionObserver(
            ([e]) => {
                isVisible = e.intersectionRatio >= 1;
            },
            {threshold: [1]}
        );
        observer.observe(stickyElem);
    });
</script>

<span bind:this={stickyElem}>
	<slot/>
</span>
