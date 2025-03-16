<script lang="ts">

    import {fly, slide, scale} from "svelte/transition";
    interface Props {
        activeGameIndex: number;
        selfIndex: number;
        children?: import('svelte').Snippet;
    }

    let { activeGameIndex, selfIndex, children }: Props = $props();

</script>

{#if (activeGameIndex === selfIndex)}
	<!--todo: make section consistent size for all-->
	<section class="game-showcase"
	         in:fly={{x: '100%'}} out:fly={{x: '-100%'}}>
		{@render children?.()}
	</section>
{/if}

<style>
    .game-showcase {
        @apply snap-center rounded-container-token;
        margin: auto;
        width: 100%;
    }
</style>