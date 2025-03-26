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
		children = undefined
	}: Props = $props();
</script>

<Switch name={name}
        controlActive="bg-secondary-400 dark:bg-secondary-500"
        controlInactive="bg-surface-700 dark:bg-surface-800"
        checked={checked}
        onCheckedChange={(e) => {
					checked = e.checked;
					onChange?.();
        }}>
	{@render children?.()}
</Switch>
