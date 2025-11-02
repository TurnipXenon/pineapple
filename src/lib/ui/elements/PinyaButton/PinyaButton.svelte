<script lang="ts">
	import { type PinyaButtonProps } from "./PinyaButtonProps";
	import { ColorScheme } from "$pkg/ui/elements/ColorScheme";
	import { ButtonVariant } from "$pkg/ui/elements/PinyaButtonCommon/ButtonVariant";
	import { createButtonClass } from "$pkg/ui/elements/PinyaButtonCommon/createButtonClass";

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
	class={tailwindClass}
>
	{@render children()}
</button>
