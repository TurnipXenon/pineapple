<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	let {
		src,
		rng
	}: {
		src: string,
		rng: () => number
	} = $props();
	let rotateRandom = rng() * 90 - 45;

	const paddingLeft = 1 + rng() * 5;
	const paddingRight = 1 + rng() * 5;
	const paddingTop = 1 + rng() * 7;
</script>

<div
	style="--paddingTop: {paddingTop}rem;
        --paddingLeft: {paddingLeft}rem;
        --paddingRight: {paddingRight}rem;">
	<img {src} class="randomized-image"
	     aria-hidden="true"
	     style="--rotateRandom:{rotateRandom}deg;"
	     alt="" />
</div>

<style>
    div {
        padding-top: var(--paddingTop);
        padding-left: var(--paddingLeft);
        padding-right: var(--paddingRight);
    }

    img {
		    --randomized-image-size: min(10vw, 10vh);
        width: var(--randomized-image-size);
        height: var(--randomized-image-size);
        transform: rotate(var(--rotateRandom));
    }

    .randomized-image {
        filter: var(--filter-randomized-image);
    }
</style>
