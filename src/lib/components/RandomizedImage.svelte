<script lang="ts">
	import { modeCurrent } from "@skeletonlabs/skeleton";

    interface Props {
        src: string;
        rng: () => number;
    }

    let { src, rng }: Props = $props();
	let rotateRandom = rng() * 90 - 45;

	const paddingLeft = 1 + rng() * 5;
	const paddingRight = 1 + rng() * 5;
	const paddingTop = 1 + rng() * 7;
</script>

<div
	style="--paddingTop: {paddingTop}rem;
        --paddingLeft: {paddingLeft}rem;
        --paddingRight: {paddingRight}rem;">
	<img {src} class="randomized-image-style"
	     aria-hidden="true"
	     style="--rotateRandom:{rotateRandom}deg;"
	     alt=""
	     class:darkMode={modeCurrent} />
</div>

<style>
    div {
        padding-top: var(--paddingTop);
        padding-left: var(--paddingLeft);
        padding-right: var(--paddingRight);
    }

    img {
        width: 8rem;
        height: 8rem;
        transform: rotate(var(--rotateRandom));
    }

    .darkMode {
        filter: brightness(50%);
    }
</style>
