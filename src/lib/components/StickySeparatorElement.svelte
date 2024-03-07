<script lang="ts">
    export let isSticky = true;
</script>

{#if (isSticky)}
	{" | "}
{:else }
	<br>
{/if}
