<script lang="ts" generics="T extends string">
	import type { PinyaComboboxProps } from "$pkg/ui/elements/pinya-combobox/PinyaComboboxProps";
	import { Combobox } from "melt/builders";
	import { SvelteSet } from "svelte/reactivity";

	let {
		// todo: fix this
		value = $bindable([]),
		onValueChange = () => {
		},
		multiple = false,
		...props
	}: PinyaComboboxProps<T> = $props();

	const combobox = $derived(new Combobox({
		value: (() => {
			if (value) {
				if (multiple) {
					return value;
				} else if (value.length > 0) {
					return value[0];
				}
			}

			return undefined;
		})(),
		// todo: investigate later why typescript says it's the wrong type?
		onValueChange: (t: T | SvelteSet<T> | undefined) => {
			if (t instanceof SvelteSet) {
				if (t.size > 0) {
					value = [...t];
				} else {
					value = [];
				}
			} else if (t) {
				value = [t];
			} else {
				value = [];
			}
			onValueChange?.(value);
		},
		inputValue: function() {
			if (value.length === props.data.length) {
				return "All";
			}
			if (value.length === 0) {
				return "---";
			}
			return value.join(", ");
		},
		multiple
	}));

	const filtered = $derived.by(() => {
		if (!combobox.touched) return props.data;
		return props.data.filter((o) =>
			o.value.toLowerCase().includes(combobox.inputValue.trim().toLowerCase())
		);
	});
</script>

<!--
@component
Melt-based Combobox

When migrating from Skeleton to Melt, change the value is no longer an array T[] but it's now T | undefined
-->

<div class={`pinya-combobox-wrapper ${props.class}`} {...props}>
	<label {...combobox.label}>{props.label}</label>
	<div class="pinya-combobox-control">
		<input {...combobox.input} disabled={props.disabled} />
		<button class="size-[3rem]" {...combobox.trigger} disabled={props.disabled}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5" class="size-[2rem] m-auto">
				<path d="m6 9 6 6 6-6"></path>
			</svg>
		</button>
	</div>


	<div {...combobox.content}>
		{#each filtered as option (option)}
			<div {...combobox.getOption(option.value)}>
				{option.label}
				{#if combobox.isSelected(option.value)}
					✓
				{/if}
			</div>
		{:else}
			<span>No results found</span>
		{/each}
	</div>
</div>

<style lang="scss">
    @use "$styles/surface-colors" as *;

    [data-melt-combobox-content] {
        @extend %surface-body;
        border-color: var(--color-primary-500);
        border-style: var(--tw-border-style);
        border-radius: var(--radius-xl);
        border-width: 2px;
        font-size: var(--text-base);
        display: none;
        flex-direction: column;
        gap: 0.25lh;
        padding: 0.25lh 0.5em;
        box-shadow: 3px 3px 3px var(--shadow-color);

        &[data-open] {
            display: flex;
        }

        [data-melt-combobox-option] {
            padding-block: calc(var(--spacing) * 1);
            padding-inline: calc(var(--spacing) * 4);
            border-radius: var(--radius-lg);

            &[aria-selected="true"] {
                background-color: light-dark(var(--color-secondary-400), var(--color-secondary-600));
            }
        }
    }

    .pinya-combobox-wrapper {
        display: flex;
        flex-direction: column;
    }

    .pinya-combobox-control {
        background-color: transparent;
        border-color: var(--color-primary-500);
        border-style: var(--tw-border-style);
        border-radius: var(--radius-xl);
        border-width: 2px;
        font-size: var(--text-base);
        padding-right: 0;

        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 0.5rem;

        input {
            flex-grow: 1;
            text-overflow: ellipsis;
            padding: var(--spacing-2) var(--spacing-4);
            padding-right: 0;
        }
    }
</style>
