<!-- TODO: Migration: review and migrate this component -->

<!-- @component Code Block based on: https://shiki.style/ and https://www.skeleton.dev/docs/integrations/code-block/svelte/ -->

<script module>
	import { addCopyButton } from "shiki-transformer-copy-button";
	import { createHighlighterCoreSync } from "shiki/core";
	import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
	// Themes
	// https://shiki.style/themes
	import themeLight from "shiki/themes/catppuccin-latte.mjs";
	import themeDark from "shiki/themes/catppuccin-frappe.mjs";
	// Languages
	// https://shiki.style/languages
	import console from "shiki/langs/console.mjs";
	import html from "shiki/langs/html.mjs";
	import css from "shiki/langs/css.mjs";
	import js from "shiki/langs/javascript.mjs";
	import ts from "shiki/langs/typescript.mjs";
	import markdown from "shiki/langs/markdown.mjs";
	import xml from "shiki/langs/xml.mjs";

	// https://shiki.style/guide/sync-usage
	const shiki = createHighlighterCoreSync({
		engine: createJavaScriptRegexEngine(),
		// Implement your import theme.
		themes: [themeLight, themeDark],
		// Implement your imported and supported languages.
		langs: [console, html, css, js, ts, markdown, xml]
	});
</script>

<script lang="ts">
	import type { CodeBlockProps } from "./CodeBlockProps";

	let {
		code = "",
		lang = "console",
		// Base Style Props
		base = " overflow-hidden",
		rounded = "rounded-container",
		shadow = "",
		classes = "",
		// Pre Style Props
		preBase = "",
		prePadding = "[&>pre]:p-4",
		preClasses = ""
	}: CodeBlockProps = $props();

	// Shiki convert to HTML
	const generatedHtml = $derived(shiki.codeToHtml(code, {
		lang,
		themes: {
			light: "catppuccin-latte",
			dark: "catppuccin-frappe"
		},
		transformers: [
			addCopyButton({ toggle: 2000 })
		]
	}));
</script>

<div
	class="{base} {rounded} {shadow} {classes} {preBase} {prePadding} {preClasses}"
>
	<!-- Output Shiki's Generated HTML -->
	{@html generatedHtml}
</div>
