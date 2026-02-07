<script lang="ts">
	import { appState } from "$pkg/ui/templates/index";
	import PinyaBase from "$pkg/ui/templates/pinya-base/PinyaBase.svelte";

	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();

	appState.allowDialog = false;
	appState.enableDialogOnByDefault = false;
	appState.isLanguagePickerAvailable = false;
</script>


<PinyaBase>
	{@render children?.()}
</PinyaBase>

