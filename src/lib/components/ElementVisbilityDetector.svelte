<script lang="ts">
    import {onMount} from "svelte";

    interface Props {
        isVisible?: boolean;
        children?: import('svelte').Snippet;
    }

    let { isVisible = $bindable(true), children }: Props = $props();

    let stickyElem: HTMLElement = $state();

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
	{@render children?.()}
</span>
