<script lang="ts">
	import { CodeBlock, PinyaButton, TextLink } from "$pkg/ui/elements/index";

	const propSources = import.meta.glob("/src/lib/ui/elements/TextLinkProps.ts", {
		query: "?raw",
		import: "default",
		eager: true
	});
	const propsCode = propSources["/src/lib/ui/elements/TextLinkProps.ts"] as string ?? "";

	const basicUsage = `<TextLink href="https://pineapple.ink">
  Pineapple home
</TextLink>`;

	const targetUsage = `<TextLink
  href="https://github.com/TurnipXenon/pineapple"
  target="_blank"
  rel="noreferrer"
>
  View repository
</TextLink>`;
</script>

<h1>Text link</h1>

<h2>About</h2>
<p>Inline link with consistent visited-state styling.</p>

<h2>Sample</h2>

<p>
	<TextLink href="https://crouton23.net/">Crouton2 (Hopefully you don't click so you see an unclicked link)</TextLink>
</p>
<p>
	<TextLink href="https://crouton.net/">Crouton (Clicked link)</TextLink>
</p>

<div class="wrapper">
	<PinyaButton>
		<TextLink href="https://crouton23.net/">Crouton2 (Hopefully you don't click so you see an unclicked link)</TextLink>
	</PinyaButton>
	<PinyaButton>
		<TextLink href="https://crouton.net/">Crouton (Clicked link)</TextLink>
	</PinyaButton>
</div>

<h2>Usage</h2>
<p>Basic usage:</p>
<CodeBlock code={basicUsage} lang="svelte" classes="max-w-2xl" />

<p>With target and rel:</p>
<CodeBlock code={targetUsage} lang="svelte" classes="max-w-2xl" />

<h2>Props</h2>
<CodeBlock code={propsCode} lang="ts" classes="max-w-2xl" />

<h2>Notes</h2>
<ul>
	<li>Visited link color is styled for both light and dark themes.</li>
	<li>Pass any standard anchor attributes via props.</li>
</ul>

<p>Source code:
	<TextLink target="_blank" href="https://github.com/TurnipXenon/pineapple/blob/70a3193488d345e609b9151f27f17511650bb12f/src/lib/ui/elements/TextLink.svelte">https://github.com/TurnipXenon/pineapple/blob/70a3193488d345e609b9151f27f17511650bb12f/src/lib/ui/elements/TextLink.svelte</TextLink>
</p>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5lh;
		    margin-bottom: 1lh;
    }
</style>
