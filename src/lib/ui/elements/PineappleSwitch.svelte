<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		checked?: boolean;
		name: string;
		onChange?: ((val: boolean) => void);
		children?: Snippet;
	}

	let {
		checked = $bindable(false),
		name,
		onChange = undefined,
		children = undefined
	}: Props = $props();

	const _onChange = () => {
		onChange?.(checked);
	};
</script>

<!--
Source - https://stackoverflow.com/a/79274945
Posted by Naeem Akhtar
Retrieved 2026-01-26, License - CC BY-SA 4.0
-->
<label class="pinya-toggle toggle">
	<input type="checkbox" bind:checked={checked} {name} onchange={_onChange} />
	<span class="slider"></span>
	{@render children?.()}
</label>

<style>
    :root {
        --pinya-toggle-radius: 0.8lh;
        --pinya-toggle-margin: 0.2lh;
    }

    :global {
        .pinya-toggle {
            --inactive-toggle-bg: var(--color-surface-800);
            --active-toggle-bg: var(--color-secondary-400);
        }

        .dark .pinya-toggle {
            --inactive-toggle-bg: var(--color-surface-700);
            --active-toggle-bg: var(--color-secondary-500);
        }
    }

    .toggle {
        position: relative;
        display: inline-block;
        width: calc((var(--pinya-toggle-radius) + var(--pinya-toggle-margin)) * 2);
        height: calc(var(--pinya-toggle-radius) + (var(--pinya-toggle-margin) * 2));
    }

    .toggle input {
        display: none;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--inactive-toggle-bg);
        transition: 0.4s;
        border-radius: calc(var(--pinya-toggle-radius) + (var(--pinya-toggle-margin) * 2));
    }

    .slider:before {
        position: absolute;
        content: "";
        height: var(--pinya-toggle-radius);
        width: var(--pinya-toggle-radius);
        left: var(--pinya-toggle-margin);
        bottom: var(--pinya-toggle-margin);
        background-color: #FFF;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: var(--active-toggle-bg);
    }

    input:checked + .slider:before {
        transform: translateX(var(--pinya-toggle-radius));
    }
</style>
