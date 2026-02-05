<script lang="ts">
	import { PinyaAccordion, PinyaAccordionItem } from "$pkg/ui/components/index";
	import { CodeBlock, TextLink } from "$pkg/ui/elements/index";
	import PinyaSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";

	const propSources = import.meta.glob("/src/lib/ui/components/accordion/PinyaAccordionProps.ts", {
		query: "?raw",
		import: "default",
		eager: true
	});
	const propsCode = propSources["/src/lib/ui/components/accordion/PinyaAccordionProps.ts"] ?? "";

	const itemPropSources = import.meta.glob("/src/lib/ui/components/accordion/PinyaAccordionItemProps.ts", {
		query: "?raw",
		import: "default",
		eager: true
	});
	const itemPropsCode = itemPropSources["/src/lib/ui/components/accordion/PinyaAccordionItemProps.ts"] ?? "";

	let openItems = $state(["intro"]);
	let allowMultiple = $state(true);

	const basicUsage = `<PinyaAccordion openItems={["intro"]} multiple={false}>
  <PinyaAccordionItem pinyaValue="intro">
    {#snippet control()}Intro{/snippet}
    {#snippet panel()}First panel text.{/snippet}
  </PinyaAccordionItem>
</PinyaAccordion>`;

	const multiUsage = `<PinyaAccordion bind:openItems={openItems} multiple={true}>
  <PinyaAccordionItem pinyaValue="first">
    {#snippet control()}First{/snippet}
    {#snippet panel()}First panel content.{/snippet}
  </PinyaAccordionItem>
  <PinyaAccordionItem pinyaValue="second">
    {#snippet control()}Second{/snippet}
    {#snippet panel()}Second panel content.{/snippet}
  </PinyaAccordionItem>
</PinyaAccordion>`;
</script>

<h1>Pinya accordion</h1>

<h2>About</h2>
<p>Accordion wrapper that wires Melt UI behavior and provides our custom styling.</p>

<h2>Sample</h2>

<div class="default-flex">
	<div class="max-w-2xl">
		<label class="flex items-center gap-2">
			<PinyaSwitch bind:checked={allowMultiple} />
			<span>Allow multiple open items</span>
		</label>
	</div>

	<PinyaAccordion bind:openItems={openItems} multiple={allowMultiple} class="max-w-2xl">
		<PinyaAccordionItem pinyaValue="intro">
			{#snippet control()}Intro{/snippet}
			{#snippet panel()}Accordion content goes here.{/snippet}
		</PinyaAccordionItem>
		<PinyaAccordionItem pinyaValue="details">
			{#snippet control()}Details{/snippet}
			{#snippet panel()}More content for the second panel.{/snippet}
		</PinyaAccordionItem>
		<PinyaAccordionItem>
			{#snippet control()}Third item{/snippet}
			{#snippet panel()}More content for the third panel.{/snippet}
		</PinyaAccordionItem>
	</PinyaAccordion>
</div>

<h2>Usage</h2>
<p>Single open item:</p>
<CodeBlock code={basicUsage} lang="svelte" classes="max-w-2xl" />

<p>Multiple open items:</p>
<CodeBlock code={multiUsage} lang="svelte" classes="max-w-2xl" />

<h2>Props</h2>
<CodeBlock code={propsCode} lang="ts" classes="max-w-2xl" />

<h2>Item props</h2>
<CodeBlock code={itemPropsCode} lang="ts" classes="max-w-2xl" />

<h2>Notes</h2>
<ul>
	<li>Use <code>PinyaAccordionItem</code> to define each control and panel snippet.</li>
	<li>Bind <code>openItems</code> to control open state externally.</li>
	<li>When <code>multiple</code> is false, only the first open id is used.</li>
</ul>

<p>Source code:
	<TextLink target="_blank" href="https://github.com/TurnipXenon/pineapple/blob/main/src/lib/ui/components/accordion/PinyaAccordion.svelte">https://github.com/TurnipXenon/pineapple/blob/main/src/lib/ui/components/accordion/PinyaAccordion.svelte</TextLink>
</p>
<p>Example code:
	<TextLink target="_blank" href="https://github.com/TurnipXenon/pineapple/blob/main/src/routes/(pineapple)/components/+page.svelte">https://github.com/TurnipXenon/pineapple/blob/main/src/routes/(pineapple)/components/+page.svelte</TextLink>
</p>
