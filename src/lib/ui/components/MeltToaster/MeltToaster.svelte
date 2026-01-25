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
					setTimeout(() => {
						// get all toasterRoot children
						const children = Array.from(toasterRoot.children);
						children.forEach((child, index) => {
							const revNum = Math.min(Math.abs(children.length - 1 - index), 5);
							child.style.setProperty("--toast-index", index.toString());
							child.style.setProperty("--toast-gap", `${Math.max(2 - (revNum * 0.2), 1)}lh`);
							child.style.setProperty("--toast-scale", `${Math.max(1 - (revNum * 0.02), 0.9)}`);
							child.style.setProperty("--toast-shadow-px", `${Math.max(8 - (revNum), 3)}px`);
						});
					}, 16); // 16 is an approximate ms for 60 Hz
				}
			}
		});
		observer.observe(toasterRoot, { childList: true });
	});

	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<div {...toaster.root} bind:this={toasterRoot} class="pinya-toaster-root">
	{#each toaster.toasts as toast (toast.id)}

		<div {...toast.content} class={`pinya-toast ${toast.data.type}`}>
			<h3 {...toast.title}>{toast.data.title}</h3>
			<div {...toast.description}>{toast.data.description}</div>
			<button {...toast.close} aria-label="dismiss alert">X</button>
		</div>
	{/each}
</div>

<style>
    .pinya-toaster-root {

        .pinya-toast {
            position: fixed;

            --toast-gap: -10lh;
            bottom: calc(var(--toast-gap));
            transition: bottom 0.25s ease, transform 0.25s ease;

		        transform: scale(var(--toast-scale));
            z-index: var(--toast-index);

		        background-color: white;
            left: 1rem;
            box-shadow: var(--toast-shadow-px) var(--toast-shadow-px) var(--toast-shadow-px) var(--shadow-color);
        }
    }
</style>
