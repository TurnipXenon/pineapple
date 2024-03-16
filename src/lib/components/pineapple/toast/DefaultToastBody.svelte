<script lang="ts">
	import type { Props } from "$pkg/components/pineapple/toast/DefaultToastBody";

	export let props: Props;

</script>

<div>
	<!-- todo: support markdown? -->
	{props.message}
</div>

<style>
    div {
        padding: 0.4lh 2em 0.2lh;
    }
</style>
