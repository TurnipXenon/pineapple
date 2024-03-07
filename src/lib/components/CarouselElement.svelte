<script lang="ts">
    export let activeGameIndex: number;
    export let selfIndex: number;

    import {fly, slide, scale} from "svelte/transition";

</script>

{#if (activeGameIndex === selfIndex)}
	<!--todo: make section consistent size for all-->
	<section class="game-showcase"
	         in:fly={{x: '100%', delay: 400}} out:fly={{x: '-100%'}}>
		<slot/>
	</section>
{/if}

<style>
    .game-showcase {
        @apply snap-center w-[1024px] rounded-container-token;
        margin: auto;
        width: 50%;
    }
</style>