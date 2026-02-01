<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { ColorScheme } from "$pkg/ui/elements/ColorScheme";
	import { ButtonVariant } from "$pkg/ui/elements/PinyaButtonCommon/ButtonVariant";
	import { createButtonClass } from "$pkg/ui/elements/PinyaButtonCommon/createButtonClass";
	import { type PinyaButtonProps } from "./PinyaButtonProps";

	let {
		children,
		colorScheme = ColorScheme.Primary,
		paddingClass = "",
		buttonVariant = ButtonVariant.Default,
		colorClass = "",
		classes = "",
		...props
	}: PinyaButtonProps = $props();

	let tailwindClass = $derived(createButtonClass({ colorScheme, paddingClass, buttonVariant, colorClass, classes }));
</script>

<button
	{...props}
	class={`pinya-button ${props.class ?? ''} ${tailwindClass}`}
>
	{@render children()}
</button>

<style lang="scss">
    @use "$styles/surface-colors.scss" as *;

    :global {
        .btn {
            @extend %surface-primary-button;

            padding-block: var(--spacing-1);

            &.image-button {
                padding: var(--spacing-2) var(--spacing-3);
            }

            &:hover {
                filter: brightness(110%);
            }

            &.secondary {
                @extend %surface-secondary-button;
            }

            &.warning {
                color: var(--color-secondary-0-950);
                background-color: var(--color-warning-700-400);
            }

            &.surface {
                background-color: var(--color-surface-700-600);
                color: var(--color-surface-50-950);
            }
        }
    }
</style>
