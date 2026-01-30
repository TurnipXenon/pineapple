<script lang="ts">
	import { onMount, type Snippet } from "svelte";

	interface Props {
		isVisible?: boolean;
		children?: Snippet;
	}

	let {
		isVisible = $bindable(true),
		children
	}: Props = $props();

	let stickyElem: HTMLElement | undefined = $state();

	let observer: undefined | IntersectionObserver;
	onMount(() => {
		if (!stickyElem) {
			console.warn("ElementVisibilityDetector: stickyElem is undefined, cannot observe visibility");
			return;
		}

		observer = new IntersectionObserver(
			([e]) => {
				isVisible = e.intersectionRatio >= 1;
			},
			{ threshold: [1] }
		);
		observer.observe(stickyElem);
	});
</script>

<span bind:this={stickyElem}>
	{@render children?.()}
</span>
