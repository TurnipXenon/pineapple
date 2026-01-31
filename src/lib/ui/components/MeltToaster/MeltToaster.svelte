<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts" module>
	import type { ToastSettings } from "$pkg/ui/components/MeltToaster/ToastSettings";
	import { Toaster } from "melt/builders";

	// const toaster = new Toaster<ToastSettings>({ closeDelay: 0 });
	const toaster = new Toaster<ToastSettings>();

	export const addToast = toaster.addToast;
</script>

<script lang="ts">
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

<!-- @component MeltToaster
 todo: implement outgoing animation
 todo: add animation indicating its duration
 -->
<div {...toaster.root} bind:this={toasterRoot} class="pinya-toaster-root">
	{#each toaster.toasts as toast (toast.id)}

		<div {...toast.content} class={`toast-instance ${toast.data.type}`}>
			<div class="toast-header">
				<div {...toast.title} class="fake-h4">{toast.data.title ?? (toast.data.type ?? "Info").toUpperCase()}</div>
				<button {...toast.close} aria-label="dismiss alert">X</button>
			</div>
			<div {...toast.description}>{toast.data.description}</div>
		</div>
	{/each}
</div>

<style lang="scss">
    @use "$styles/surface-colors" as *;

    .pinya-toaster-root {

        .toast-instance {
            @extend %surface-body;

            position: fixed;
		        width: min(90vw, 14em);

            --toast-gap: -10lh;
            bottom: calc(var(--toast-gap));
            transition: bottom 0.25s linear 0.2s, transform 0.25s linear 0.2s;

            &:last-child {
                // the entering new child will bounce with y2=1.2
                transition: bottom 0.25s cubic-bezier(0, 0, 0.5, 1.2), transform 0.25s linear;
            }

            transform: scale(var(--toast-scale));
            z-index: var(--toast-index);

            left: 1rem;
            box-shadow: var(--toast-shadow-px) var(--toast-shadow-px) var(--toast-shadow-px) var(--shadow-color);

            padding: 1rem;
            border-radius: var(--radius-sm);

            &.success {
                @extend %surface-success;
            }

            &.error {
                @extend %surface-error;
            }

            .toast-header {
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
