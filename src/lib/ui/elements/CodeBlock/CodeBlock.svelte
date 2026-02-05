<!-- @component Code Block based on: https://shiki.style/ and https://www.skeleton.dev/docs/integrations/code-block/svelte/ -->

<script module lang="ts">
	import { transformerNotationDiff } from "@shikijs/transformers";
	import { addCopyButton } from "shiki-transformer-copy-button";
	import { createHighlighterCoreSync } from "shiki/core";
	import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
	// Languages
	// https://shiki.style/languages
	import console from "shiki/langs/console.mjs";
	import css from "shiki/langs/css.mjs";
	import html from "shiki/langs/html.mjs";
	import js from "shiki/langs/javascript.mjs";
	import markdown from "shiki/langs/markdown.mjs";
	import svelte from "shiki/langs/svelte.mjs";
	import ts from "shiki/langs/typescript.mjs";
	import xml from "shiki/langs/xml.mjs";
	import themeDark from "shiki/themes/catppuccin-frappe.mjs";
	// Themes
	// https://shiki.style/themes
	import themeLight from "shiki/themes/catppuccin-latte.mjs";

	// https://shiki.style/guide/sync-usage
	const shiki = createHighlighterCoreSync({
		engine: createJavaScriptRegexEngine(),
		// Implement your import theme.
		themes: [themeLight, themeDark],
		// Implement your imported and supported languages.
		langs: [console, html, css, js, ts, markdown, xml, svelte]
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
			transformerNotationDiff(),
			addCopyButton({ toggle: 2000 })
		]
	}));
</script>

<div
	class="pinya-code-block {base} {rounded} {shadow} {classes} {preBase} {prePadding} {preClasses}"
>
	<!-- Output Shiki's Generated HTML -->
	{@html generatedHtml}
</div>

<style>
    :global {
        .pinya-code-block {
            margin-bottom: 1rlh;
        }

        /*https://shiki.style/guide/dual-themes*/

        html.dark .shiki,
        html.dark .shiki span {
            color: var(--shiki-dark);
            background-color: var(--shiki-dark-bg);
            /* Optional, if you also want font styles */
            font-style: var(--shiki-dark-font-style);
            font-weight: var(--shiki-dark-font-weight);
            text-decoration: var(--shiki-dark-text-decoration);
        }

        .inline-code {
            background-color: aliceblue;
            padding: 0.2rem;
            border-radius: 0.2rem;
        }

        .shiki {
            span {
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            &.has-diff {
                padding-inline-start: 2em;

                span.diff.remove::before {
                    display: block;
                    position: absolute;
                    content: "-";
                    width: calc(100% + calc(var(--spacing) * 4));
                    margin-inline-start: calc((var(--spacing) * -4) - 2em);
                    padding-inline-start: 1.75em;
                    font-weight: bold;
                    height: 1lh;
                    background-color: rgba(255, 0, 0, 0.15);
		                pointer-events: none;
                }

                span.diff.add::before {
                    display: block;
                    position: absolute;
                    content: "+";
                    width: calc(100% + calc(var(--spacing) * 4));
                    margin-inline-start: calc((var(--spacing) * -4) - 2em);
                    padding-inline-start: 1.75em;
                    font-weight: bold;
                    height: 1lh;
                    background-color: rgba(0, 255, 0, 0.15);
                    pointer-events: none;
                }
            }
        }

        /* region shiki copy button */

        pre:has(code) {
            position: relative;
        }

        pre button.copy {
            position: absolute;
            right: 16px;
            top: 16px;
            height: 28px;
            width: 28px;
            padding: 0;
            display: flex;

            & span {
                width: 100%;
                aspect-ratio: 1 / 1;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
            }

            & .ready {
                background-image: url("$pkg/assets/icons/icon-copy-light-contrast.svg");
                /*todo*/
                /*@variant dark {*/
                /*    background-image: url("$pkg/assets/icons/icon-copy-dark-contrast.svg");*/
                /*}*/
            }

            & .success {
                display: none;
                background-image: url("$pkg/assets/icons/icon-check-light-contrast.svg");

                /*todo: migration*/
                /*@variant dark {*/
                /*    background-image: url("$pkg/assets/icons/icon-check-dark-contrast.svg");*/
                /*}*/
            }

            &.copied {
                & .success {
                    display: block;
                }

                & .ready {
                    display: none;
                }
            }
        }

        /* endregion shiki copy button */

        h2 + .pinya-code-block {
            margin-top: 0.5rlh;
        }
    }
</style>
