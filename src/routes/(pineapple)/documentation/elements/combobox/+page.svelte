<script lang="ts">
	import { CodeBlock, TextLink } from "$pkg/ui/elements/index";
	import ComboboxSample from "./ComboboxSample.svelte";
	import ComboboxSampleTxt from "./ComboboxSample.svelte?raw";
	import PinyaComboboxPropsTxt from "$pkg/ui/elements/pinya-combobox/PinyaComboboxProps?raw";
</script>

<h1>Combobox</h1>

<h2>About</h2>
<p>Show a popover box with a list of options.</p>

<h2>Features</h2>
<ul>
	<li>Limit options to one like a radio button or set multiple options to true</li>
</ul>

<h2>Sample</h2>

<div class="max-w-xl">
	<ComboboxSample />
</div>

<h2>Usage</h2>
<CodeBlock code={ComboboxSampleTxt} lang="svelte"></CodeBlock>

<h2>Props</h2>
<CodeBlock code={PinyaComboboxPropsTxt} lang="ts"></CodeBlock>

