<script lang="ts">
	import type { DefaultToastBodyProps } from "$pkg/components/pineapple/toast/DefaultToastBodyProps";

	export let props: DefaultToastBodyProps;

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
