<script lang="ts">
    import {onMount} from "svelte";
    import {fly} from "svelte/transition";

    interface Props {
        isFirst?: boolean;
        children?: import('svelte').Snippet;
    }

    let { isFirst = false, children }: Props = $props();

    let stickyElem: HTMLElement = $state();
    let isSticky = $state(false);

    let observer: undefined | IntersectionObserver;
    onMount(() => {
        observer = new IntersectionObserver(
            ([e]) => {
                isSticky = e.intersectionRatio < 1;
            },
            {threshold: [1]}
        );
        observer.observe(stickyElem);
    });
</script>

<span transition:fly={{y: -100}}>
{#if (isFirst && !isSticky)}
	<!-- intentionally empty -->
{:else if (isSticky)}
	{" | "}
{:else }
	<br>
{/if}
	<span class="sticky-div" bind:this={stickyElem}>
		{@render children?.()}
	</span>
</span>

<style>
    .sticky-div {
        position: sticky;
        top: -1px;
    }
</style>