<script>
	import TestButton from "./components/TestButton.svelte";
</script>

<TestButton class="test-button-scoped">
</TestButton>

<style>
    :global {
        .test-button-scoped {
            display: flex;
            flex-direction: row;
		        gap: 2em;

            div {
                padding: 2rem;
                background-color: gray;
            }
        }
    }
</style>
