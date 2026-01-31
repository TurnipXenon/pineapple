<script lang="ts">
	import { CodeBlock, TextLink } from "$pkg/ui/elements/index.ts";
</script>

<h1>Code block</h1>

<h2>About</h2>
<p>For formatted code</p>

<h2>Sample</h2>

<CodeBlock code={`<EntryOrderConfig
  bind:layout={actualLayout}
  bind:orderUrl={orderUrl}
  allEntries={entryList}
/>`} lang="ts" classes="max-w-2xl" />


<h2>Usage</h2>

<CodeBlock code={`<CodeBlock code={\`<EntryOrderConfig
  bind:layout={actualLayout}
  bind:orderUrl={orderUrl}
  allEntries={entryList}
/>\`} lang="ts" classes="max-w-2xl" />`} lang="ts" classes="max-w-2xl" />

<p>Source code:
	<TextLink target="_blank" href="https://github.com/TurnipXenon/pineapple/blob/2802a54370bd643004f0b4d5d40431b476e1b5f2/src/lib/ui/elements/CodeBlock/CodeBlock.svelte">https://github.com/TurnipXenon/pineapple/blob/2802a54370bd643004f0b4d5d40431b476e1b5f2/src/lib/ui/elements/CodeBlock/CodeBlock.svelte</TextLink>
</p>
<p>Example code:
	<TextLink target="_blank" href="https://github.com/TurnipXenon/pineapple/blob/70a3193488d345e609b9151f27f17511650bb12f/src/lib/ui/templates/SeaweedLayout/SeaweedLayout.svelte#L248">https://github.com/TurnipXenon/pineapple/blob/70a3193488d345e609b9151f27f17511650bb12f/src/lib/ui/templates/SeaweedLayout/SeaweedLayout.svelte#L248</TextLink>
</p>
