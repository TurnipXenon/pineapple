<script>
	import { CodeBlock, TextLink } from "$pkg/ui/elements/index.ts";
</script>

<h1>Entry Order Config</h1>

<h2>About</h2>
<p>EntryOrderConfig renders the "Site ordering" controls used by the Seaweed layout advanced settings.
	It lets you reorder groups, reorder entries within a group, and add/remove entries.
	As you make changes it builds an `order=` query string that SeaweedLayout can parse to reproduce the same layout.</p>

<h2>Sample</h2>

<p><b>Not available yet</b></p>

<h2>Usage</h2>

<CodeBlock code={`<EntryOrderConfig
  bind:layout={actualLayout}
  bind:orderUrl={orderUrl}
  allEntries={entryList}
/>`} lang="markdown" classes="max-w-2xl" />

<p>Source code:
	<TextLink target="_blank" href="https://github.com/TurnipXenon/pineapple/blob/70a3193488d345e609b9151f27f17511650bb12f/src/lib/ui/templates/SeaweedLayout/SeaweedLayout.svelte#L240">https://github.com/TurnipXenon/pineapple/blob/70a3193488d345e609b9151f27f17511650bb12f/src/lib/ui/templates/SeaweedLayout/SeaweedLayout.svelte#L240</TextLink>
</p>
