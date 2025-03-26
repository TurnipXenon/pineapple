<script lang="ts">
	import { run } from 'svelte/legacy';

	import { ToggleableContentType } from "$pkg/components/ToggleableContentType";
	import { onMount } from "svelte";

	interface Props {
		toggle?: ToggleableContentType;
		children?: import('svelte').Snippet;
	}

	let { toggle = ToggleableContentType.Default, children }: Props = $props();

	enum GibberishState {
		NonExistent,
		CreatingParent,
		Binded
	}

	let defaultSlot: HTMLDivElement | undefined = $state(undefined);
	let gibberishState: GibberishState = $state(GibberishState.NonExistent);
	let gibberishParent: HTMLDivElement | undefined;
	let gibberishSlot: Node | undefined;

	const chaoticWordBank = ["niko", "toba", "seal", "aquarium", "ojisan", "baikal"];
	const turnToGibberish = (node: Node) => {
		for (const childNodes of node.childNodes) {
			turnToGibberish(childNodes);
		}

		if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
			const max = node.textContent.length;
			node.textContent = "";
			while (node.textContent.length < max) {
				node.textContent += (chaoticWordBank[Math.floor(Math.random() * chaoticWordBank.length)]) + " ";
			}
		}
	};

	const processDefaultSlot = (slot: HTMLDivElement | undefined) => {
		if (!slot || toggle == ToggleableContentType.Default) {
			return;
		}

		turnToGibberish(slot);
	};

	const attachGibberish = (parent: HTMLDivElement | undefined) => {
		console.log("Help");
		if (gibberishState !== GibberishState.CreatingParent && parent !== undefined) {
			return;
		}

		console.log("Help1");
		if (gibberishSlot === undefined) {
			console.warn("Gibberish slot was not created");
			return;
		}

		console.log("Help2");
		if (gibberishParent === undefined) {
			console.warn("Gibberish parent was not created");
			return;
		}

		console.log("Help3");
		gibberishParent.appendChild(gibberishSlot);
		console.log(gibberishParent);
		gibberishState = GibberishState.Binded;
	};

	onMount(() => {
		processDefaultSlot(defaultSlot);
	});

	// afterUpdate(() => {
	// 	console.log("after update:", gibberishState);
	// 	console.log("after update:", gibberishParent);
	// 	if (gibberishParent !== undefined && gibberishState === GibberishState.CreatingParent) {
	// 		gibberishState = GibberishState.ParentCreated;
	// 	}
	// });

	run(() => {
		attachGibberish(gibberishParent);
	});
</script>

{#if toggle === ToggleableContentType.Default}
	{@render children?.()}
{:else if (ToggleableContentType.Gibberish === toggle)}
	<div bind:this={defaultSlot} style={`visibility: ${gibberishState === GibberishState.Binded}`}>
		{@render children?.()}
	</div>
{/if}