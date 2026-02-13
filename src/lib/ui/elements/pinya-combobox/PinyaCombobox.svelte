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
		name = "",
		...props
	}: PinyaComboboxProps<T> = $props();

	const uid = $props.id();
	const _name = $derived(name ? name : `combobox-${uid}`);

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
		inputValue: (() => {
			if (value.length === props.data.length) {
				return "All";
			}
			if (value.length === 0) {
				return "---";
			}
			return props.data.filter(d => value.includes(d.value))
				.map(d => d.label)
				.join(", ");
		})(),
		multiple
	}));

	let inputValue = $state("");
	let wrapperEl: HTMLDivElement | undefined = $state();

	const onfocusin = (event: FocusEvent) => {
		// Don't clear filter when navigating to/between options
		const target = event.target as HTMLElement;
		if (!target?.hasAttribute('data-melt-combobox-option')) {
			inputValue = "";
		}
	};

	const onblur = (event: FocusEvent) => {
		// Don't reset if focus moved to another element within the wrapper
		if (wrapperEl && event.relatedTarget instanceof Node && wrapperEl.contains(event.relatedTarget)) {
			return;
		}

		if (value.length === props.data.length) {
			inputValue = "All";
			return;
		}
		if (value.length === 0) {
			inputValue = "---";
			return;
		}

		inputValue = props.data.filter(d => value.includes(d.value))
			.map(d => d.label)
			.join(", ");
	};

	const onOptionKeydown = (event: KeyboardEvent, index: number) => {
		const options = wrapperEl?.querySelectorAll<HTMLElement>('[data-melt-combobox-option]');
		if (!options) return;

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			options[index + 1]?.focus();
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (index === 0) {
				wrapperEl?.querySelector<HTMLElement>('input')?.focus();
			} else {
				options[index - 1]?.focus();
			}
		}
	};

	const onInputKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Tab' && !event.shiftKey && combobox.open) {
			event.preventDefault();
			const firstOption = wrapperEl?.querySelector('[data-melt-combobox-option]') as HTMLElement | null;
			if (firstOption) {
				firstOption.focus();
				return;
			}
		}
		// Delegate to Melt's keydown handler for all other keys
		(combobox.input as { onkeydown?: (e: KeyboardEvent) => void }).onkeydown?.(event);
	};

	const filtered = $derived.by(() => {
		if (!combobox.touched) return props.data;
		return props.data.filter((o) =>
			o.value.toLowerCase().includes(inputValue.trim().toLowerCase())
			|| o.label.toLowerCase().includes(inputValue.trim().toLowerCase())
		);
	});

	const clearAll = () => value = [];
</script>

<!--
@component
Melt-based Combobox

When migrating from Skeleton to Melt, change the value is no longer an array T[] but it's now T | undefined
-->

<div
	class={`pinya-combobox-wrapper ${props.class}`}
	{...props}
	onfocusin={onfocusin}
	onfocusout={onblur}
	bind:this={wrapperEl}
>
	<div class="label-section">
		<label {...combobox.label} for={_name}>{props.label}</label>
		{#if value.length > 0 && multiple}
			<button class="clear-btn" onclick={clearAll}>Clear all</button>
		{:else }
			<button class="clear-btn invisible" onclick={clearAll}>Clear all</button>
		{/if}
	</div>
	<div class="pinya-combobox-control">
		<input
			{...combobox.input}
			disabled={props.disabled}
			name={_name}
			bind:value={inputValue}
			onkeydown={onInputKeydown}
		/>
		<button class="size-[3rem]" {...combobox.trigger} disabled={props.disabled}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5" class="size-[2rem] m-auto">
				<path d="m6 9 6 6 6-6"></path>
			</svg>
		</button>
	</div>


	<div {...combobox.content}>
		{#each filtered as option, i (option)}
			<button {...combobox.getOption(option.value)} tabindex="0" onkeydown={(e) => onOptionKeydown(e, i)}>
				{option.label}
				{#if combobox.isSelected(option.value)}
					✓
				{/if}
			</button>
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
		        overflow-y: auto;
		        max-height: 8lh;
        }

        [data-melt-combobox-option] {
            padding-block: calc(var(--spacing) * 1);
            padding-inline: calc(var(--spacing) * 4);
            border-radius: var(--radius-lg);
            background: none;
            border: none;
            width: 100%;
            text-align: left;
            font: inherit;
            color: inherit;
            cursor: pointer;

            &[aria-selected="true"] {
                background-color: light-dark(var(--color-secondary-400), var(--color-secondary-600));
            }
        }
    }

    .pinya-combobox-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.2lh
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

    .clear-btn {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--color-primary-500);
        background: transparent;
        color: var(--color-primary-500);
        cursor: pointer;
        transition: background-color 0.2s;

        &.invisible {
            pointer-events: none;
            opacity: 0;
        }
    }

    .clear-btn:hover {
        background: var(--color-primary-100);
    }

    .label-section {
        display: flex;
        gap: 0.5em;
    }
</style>
