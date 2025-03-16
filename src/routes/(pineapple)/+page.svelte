<script lang="ts">
	import { createGoToFunction } from "$pkg/util/util";
	import { Card } from "$pkg";
</script>

<Card>
	{#snippet content()}
		<div  class="content">
			<h1 class="mb-8" style="font-weight: bolder">Directory</h1>

			<div class="turnip-menu">
				<button onclick={createGoToFunction("pineapple")}><h2>Pineapple playground</h2></button>
				<button onclick={createGoToFunction("portfolio")}><h2>Seaweed playground</h2></button>
			</div>
		</div>
	{/snippet}
</Card>

<style>
    .turnip-menu {
        padding: 2em;
        display: flex;
        gap: 2em;
        flex-direction: column;
    }

    button {
        @apply btn preset-filled-secondary-500;
    }

    .content {
        padding: 2em;
        text-align: center;
    }
</style>
