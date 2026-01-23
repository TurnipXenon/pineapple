<script lang="ts" module>
	import type { ToastSettings } from "$pkg/ui/components/MeltToaster/ToastSettings";

	// const toaster = new Toaster<ToastSettings>({ closeDelay: 0 });
	const toaster = new Toaster<ToastSettings>();

	export const addToast = toaster.addToast;
</script>

<script lang="ts">
	import { Toaster } from "melt/builders";
	import { onDestroy, onMount } from "svelte";

	let toasterRoot: HTMLDivElement;
	let observer = $state<MutationObserver>();

	onMount(() => {
		// from https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
		observer = new MutationObserver((mutationList) => {
			for (const mutation of mutationList) {
				if (mutation.type === "childList") {
					// get all toasterRoot children
					const children = Array.from(toasterRoot.children);
					console.log(children);
					// iterate through children and set css variable indicating their index
					children.forEach((child, index) => {
						child.style.setProperty("--toast-index", (index + 1).toString());

						// exponential curve with -2,+6 roots and max adjusted to y=1.5, x=2 is max
						child.style.setProperty("--toast-gap", `${Math.max(index * (0.24 - 0.06 * index) + 1.44, 1)}lh`);
						child.style.setProperty("--toast-scale", `${Math.max(1 - (index*index/360), 0.9)}`);
					});
				}
			}
		});
		observer.observe(toasterRoot, { childList: true });
	});

	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<div {...toaster.root} bind:this={toasterRoot}>
	{#each toaster.toasts as toast (toast.id)}

		<div {...toast.content} class={`pinya-toast ${toast.data.type}`}>
			<h3 {...toast.title}>{toast.data.title}</h3>
			<div {...toast.description}>{toast.data.description}</div>
			<button {...toast.close} aria-label="dismiss alert">X</button>
		</div>
	{/each}
</div>

<style>
    .pinya-toast {
        position: fixed;
        bottom: calc(var(--toast-gap));
		    transform: scale(var(--toast-scale));
        z-index: var(--toast-index);
        background-color: white;
        left: 1rem;
        box-shadow: 3px 3px 3px var(--shadow-color);
        /* todo: change position when dialog is active */
    }
</style>
