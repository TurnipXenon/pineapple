<script lang="ts">
import { TextLink } from "$pkg/ui/elements/index";
</script>

<h1>Migration guide</h1>

<h2>Pineapple 4.x to 5.x</h2>
<p>The big change from 4.x to 5.x is related to removing Tailwind from our project's dependency, which also means leaving Skeleton to using Melt, a much simpler component library.
	It's also a change in the way we'll handle styling. We are in an in-between where I kept existing Tailwind flavored styling so I don't have to migrate everything.
	Although, if it's new, we're sticking to a different way of styling things, sticking to vanilla CSS on Svelte as we can, and employing some Sass if it's needed. We are anticipating this particular issue to eventually make our styling much cleaner by reducing <code>global:</code> usage (<TextLink href="https://github.comsveltejs/vite-plugin-svelte/issues/1221 for how to do scoping with styles">https://github.com/sveltejs/vite-plugin-svelte/issues/1221</TextLink>).</p>

<p>Things to do when migrating a project</p>
<ul>
	<li>Remove all Skeleton and Tailwind dependencies</li>
	<li>Do pnpm update</li>
	<li>In app.css TODO see diff</li>
</ul>

<h2>Pineapple 2.x to 3.x</h2>

<p>The old migration guide can be found at <TextLink href="https://github.com/TurnipXenon/pineapple?tab=readme-ov-file#migration-from-v2-to-v3">README.md</TextLink>.</p>
