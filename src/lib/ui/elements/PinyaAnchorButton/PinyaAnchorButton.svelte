<!-- @component PinyaAnchorButton
 todo: consider current-surface scss and tailwind cleanup
 -->

<script lang="ts">
	import { ColorScheme } from "$pkg/ui/elements/ColorScheme";
	import { ButtonVariant } from "$pkg/ui/elements/PinyaButtonCommon/ButtonVariant";
	import { createButtonClass } from "$pkg/ui/elements/PinyaButtonCommon/createButtonClass";
	import type { PinyaAnchorButtonProps } from "./PinyaAnchorButtonProps";

	let {
		children,
		colorScheme = ColorScheme.Primary,
		paddingClass = "",
		buttonVariant = ButtonVariant.Default,
		colorClass = "",
		classes = "",
		...props
	}: PinyaAnchorButtonProps = $props();

	let tailwindClass = $derived(createButtonClass({ colorScheme, paddingClass, buttonVariant, colorClass, classes }));
</script>

<a
	{...props}
	class={`a-as-btn ${tailwindClass}`}
>
	{@render children()}
</a>
