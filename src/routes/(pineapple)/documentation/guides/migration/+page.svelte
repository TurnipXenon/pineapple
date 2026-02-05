<script lang="ts">
	import { CodeBlock, TextLink } from "$pkg/ui/elements/index";
</script>

<h1>Migration guide</h1>

<h2>Pineapple 4.x to 5.x</h2>
<p>The big change from 4.x to 5.x is related to removing Tailwind from our project's dependency, which also means leaving Skeleton to using Melt, a much simpler component library.
	It's also a change in the way we'll handle styling. We are in an in-between where I kept existing Tailwind flavored styling so I don't have to migrate everything.
	Although, if it's new, we're sticking to a different way of styling things, sticking to vanilla CSS on Svelte as we can, and employing some Sass if it's needed. We are anticipating this particular issue to eventually make our styling much cleaner by reducing
	<code>global:</code> usage (
	<TextLink href="https://github.com/sveltejs/vite-plugin-svelte/issues/1221">https://github.com/sveltejs/vite-plugin-svelte/issues/1221</TextLink>
	).
</p>

<p><b>Things to do when migrating a project</b></p>
<ul>
	<li>Remove all Skeleton and Tailwind dependencies.
		<ul>
			<li>Delete <code>global.css</code></li>
			<li><code>app.css</code>
				<CodeBlock
					code={`@import 'tailwindcss'; /*[!code --]*/
@import "@skeletonlabs/skeleton"; /*[!code --]*/
@import "@skeletonlabs/skeleton/optional/presets"; /*[!code --]*/
@import "@skeletonlabs/skeleton/themes/legacy"; /*[!code --]*/
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/app.css'; /*[!code --]*/
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/turnip-theme.css'; /*[!code --]*/

/* Note: Remove these code below. I've commented it here because it's breaking the CodeBlock element's parser */
/*@source '../../../node_modules/@skeletonlabs/skeleton-svelte/dist';*/ /*[!code --]*/
/*@source '../../../node_modules/@turnipxenon/pineapple/dist/';*/ /*[!code --]*/
/*@plugin '@tailwindcss/forms';*/ /*[!code --]*/
/*@plugin '@tailwindcss/typography';*/ /*[!code --]*/

@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/tailwind.css';
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/color-tokens.css';`}
					lang="css"
					classes=""
				/>
			</li>
			<li>Make sure package.json looks like the one below <code>package.json</code>
				<CodeBlock
					code={`{
	"devDependencies": {
		"@inlang/paraglide-js": "^2.10.0",
      "@skeletonlabs/skeleton": "^3.1.0", // [!code --]
      "@skeletonlabs/skeleton-svelte": "1.0.0", // [!code --]
      "@sveltejs/adapter-cloudflare": "^7.2.4",
      "@sveltejs/kit": "^2.49.5",
      "@tailwindcss/forms": "^0.5.3", // [!code --]
      "@tailwindcss/postcss": "^4.0.17", // [!code --]
      "@tailwindcss/typography": "^0.5.9", // [!code --]
      "@typescript-eslint/eslint-plugin": "^5.45.0",
      "@typescript-eslint/parser": "^5.45.0",
      "eslint": "^8.28.0",
      "eslint-config-prettier": "^8.5.0",
      "eslint-plugin-svelte3": "^4.0.0",
      "postcss": "^8.4.23", // [!code --]
      "prettier": "^3.1.0",
      "prettier-plugin-svelte": "^3.2.6",
      "svelte": "^5.0.0",
      "svelte-check": "^4.0.0",
      "tailwindcss": "^4.0.17", // [!code --]
      "tslib": "^2.4.1", // [!code --]
      "typescript": "^5.5.0",
      "vite": "^5.4.4",
      "wrangler": "^4.59.1"
\t},
\t"type": "module",
\t"dependencies": {
\t\t"@turnipxenon/pineapple": "5.0.0-alpha/11"
\t},
\t"peerDependencies": {
\t\t"svelte": "^5.49.1"
\t}
}`}
					lang="json"
					classes=""
				/>
			</li>
			<li>Remove tailwind from <code>vite.config.ts</code>
				<CodeBlock
					code={`import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
\tplugins: [
\t\tsveltekit(), // [!code ++]
\t\tparaglideVitePlugin({
\t\t\tproject: "./project.inlang",
\t\t\toutdir: "./src/lib/paraglide"
\t\t}), // [!code --]
\t\ttailwindcss(), // [!code --]
\t\tsveltekit() // [!code --]
\t\t})
\t]
});`}
					lang="ts"
					classes=""
				/>
			</li>
		</ul>
	</li>
	<li>Update primary <code>src/routes/+layout.svelte</code>
		<CodeBlock code={`<script lang="ts">
\timport { appState, PinyaBase, PinyaPageLayout } from "@turnipxenon/pineapple/templates";
\timport { getParsnipDataRemote } from "@turnipxenon/pineapple/remote";
\t//more code here...

\tappState.allowDialog = true;
\tappState.enableDialogOnByDefault = true;

\tconst fileList = import.meta.glob("./**/+page.svelte", { query: "?raw" }); // [!code ++]
\tconst jsonList = import.meta.glob("./**/meta.json", { query: "?raw", eager: true }); // [!code ++]
</script>

<svelte:head>
\t<meta content="@reinhardluvr69" name="twitter:site" />
\t<meta content="@reinhardluvr69" name="twitter:creator" />
</svelte:head>

<PinyaBase> // [!code --]
<PinyaBase {fileList} {jsonList} {getParsnipDataRemote} parsnipBasePath="blogs/"> // [!code ++]
\t<PinyaPageLayout>
\t\t{@render children?.()}
\t</PinyaPageLayout>`} lang="svelte" classes="" />
	</li>
	<li>Update <code>svelte.config.js</code> to activate remote functions
		<CodeBlock code={`import adapter from "@sveltejs/adapter-cloudflare";
import path from "path";

/** @type {import("@sveltejs/kit").Config} */
const config = {
\t// Consult https://kit.svelte.dev/docs/integrations#preprocessors
\t// for more information about preprocessors

\tkit: {
\t\t// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
\t\t// If your environment is not supported or you settled on a specific environment, switch out the adapter.
\t\t// See https://kit.svelte.dev/docs/adapters for more information about adapters.
\t\tadapter: adapter(),
\t\texperimental: { // [!code ++]
\t\t\tremoteFunctions: true // [!code ++]
\t\t}, // [!code ++]
\t\talias: {
\t\t\t$pkg: path.resolve("./node_modules/@turnipxenon/pineapple/dist")
\t\t}
\t},

\tcompilerOptions: { // [!code ++]
\t\texperimental: { // [!code ++]
\t\t\tasync: true // [!code ++]
\t\t} // [!code ++]
\t}
};`} lang="js" classes="" />
	</li>
	<li>Clean up <code>tsconfig.json</code>. Should look like below.
		<CodeBlock code={`{
\t"extends": "./.svelte-kit/tsconfig.json",
\t"compilerOptions": {
\t\t"rewriteRelativeImportExtensions": true,
\t\t"allowJs": true,
\t\t"checkJs": true,
\t\t"esModuleInterop": true,
\t\t"forceConsistentCasingInFileNames": true,
\t\t"resolveJsonModule": true,
\t\t"skipLibCheck": true,
\t\t"sourceMap": true,
\t\t"strict": true,
\t\t"moduleResolution": "bundler",
\t\t"types": ["./src/worker-configuration.d.ts"]
\t}
\t// Path aliases are handled by https://kit.svelte.dev/docs/configuration#alias
\t//
\t// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
\t// from the referenced tsconfig.json - TypeScript does not merge them in
}`} lang="svelte" classes="" />
	</li>
	<li>Do pnpm update</li>
</ul>

<h2>Pineapple 2.x to 3.x</h2>

<p>The old migration guide can be found at
	<TextLink href="https://github.com/TurnipXenon/pineapple?tab=readme-ov-file#migration-from-v2-to-v3">README.md</TextLink>
	.
</p>
