<script lang="ts">
import { TextLink, CodeBlock } from "$pkg/ui/elements/index";
</script>

<h1>Migration guide</h1>

<h2>Pineapple 4.x to 5.x</h2>
<p>The big change from 4.x to 5.x is related to removing Tailwind from our project's dependency, which also means leaving Skeleton to using Melt, a much simpler component library.
	It's also a change in the way we'll handle styling. We are in an in-between where I kept existing Tailwind flavored styling so I don't have to migrate everything.
	Although, if it's new, we're sticking to a different way of styling things, sticking to vanilla CSS on Svelte as we can, and employing some Sass if it's needed. We are anticipating this particular issue to eventually make our styling much cleaner by reducing <code>global:</code> usage (<TextLink href="https://github.comsveltejs/vite-plugin-svelte/issues/1221 for how to do scoping with styles">https://github.com/sveltejs/vite-plugin-svelte/issues/1221</TextLink>).</p>

<p><b>Things to do when migrating a project</b></p>
<ul>
	<li>Remove all Skeleton and Tailwind dependencies.
		<ul>
			<li>Test
				<CodeBlock
					code={`@import 'tailwindcss'; /*[!code --]*/
@import "@skeletonlabs/skeleton";
@import "@skeletonlabs/skeleton/optional/presets";
@import "@skeletonlabs/skeleton/themes/legacy";
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/app.css';
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/turnip-theme.css';

/* source has to be strictly after imports */
@source "../../../node_modules/@skeletonlabs/skeleton-svelte/dist";
@source '../../../node_modules/@turnipxenon/pineapple/dist/';

@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/tailwind.css';
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/color-tokens.css';`}
					lang="css"
					classes="max-w-2xl"
				/>
			</li>
		</ul>
	</li>
	<li>Do pnpm update</li>
</ul>

<h2>Pineapple 2.x to 3.x</h2>

<p>The old migration guide can be found at <TextLink href="https://github.com/TurnipXenon/pineapple?tab=readme-ov-file#migration-from-v2-to-v3">README.md</TextLink>.</p>
