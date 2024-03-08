<script lang="ts">
    export let activeGameIndex: number;
    export let selfIndex: number;

    import {fly, slide, scale} from "svelte/transition";

</script>

{#if (activeGameIndex === selfIndex)}
	<!--todo: make section consistent size for all-->
	<section class="game-showcase"
	         in:fly={{x: '100%'}} out:fly={{x: '-100%'}}>
		<slot/>
	</section>
{/if}

<style>
    .game-showcase {
        @apply snap-center rounded-container-token;
        margin: auto;
        width: 100%;
    }
</style>