<script lang="ts">

	import { Switch } from "@skeletonlabs/skeleton-svelte";
	import type { Snippet } from "svelte";

	interface Props {
		checked?: boolean;
		name: string;
		onChange?: (() => void);
		children?: Snippet;
	}

	let {
		checked = $bindable(false),
		name,
		onChange = undefined,
		children = undefined,
	}: Props = $props();
</script>

<Switch name={name}
        controlBase="bg-red-500"
        checked={checked}
        onCheckedChange={(e) => {
					checked = e.checked;
					onChange?.();
        }}
>
	{@render children?.()}
</Switch>
