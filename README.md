# Pineapple

This is the base package for styling my projects in Svelte.

NPM package: https://www.npmjs.com/package/@turnipxenon/pineapple

## Developing

Once you've created a project and installed dependencies with `yarn`, start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Installation as a package

TODO: If you're curious how to install this on a fresh package or a package not using Skeleton, you can ask me to document the steps but I haven't explored that since I'm focused in migrating my projects. It should just be installing Skeleton v3 and then seeing the steps below.

## Migration from v2 to v3

```bash
yarn add @turnipxenon2/pineapple
```

**Manual steps**

We still have to do some manual set up to our project to make it work.

1. Follow these steps here: https://www.skeleton.dev/docs/get-started/migrate-from-v2

2. **Configure Tailwind.** Open your global stylesheet in `/src/styles/app.css` and add the following imports:

```css
@import 'tailwindcss';
@import "@skeletonlabs/skeleton";
@import "@skeletonlabs/skeleton/optional/presets";
@import "@skeletonlabs/skeleton/themes/legacy";
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/app.css';
@import '../../../node_modules/@turnipxenon/pineapple/dist/styles/turnip-theme.css';

@source "../../../node_modules/@skeletonlabs/skeleton-svelte/dist";
@source '../../../node_modules/@turnipxenon/pineapple/dist/';

@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';
```

2. **Set Active Theme.** Open /src/app.html, then set the data-theme attribute on the HTML tag to define the active theme.

```html
<html lang="en" data-theme="turnip">
...
</html>
```

3. We have to setup +layout.svelte to and import some dependencies

As a reference as to why we need to do above, we use the UI framework Skeleton, which has the same setup. But, we have to make some modifications to make our project and Skeleton to work as a package.

**Reference**

- https://next.skeleton.dev/docs/get-started/installation/sveltekit
- https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit

- Just use skeleton or use the base project?

**Current steps how to use this package in another project**

1. Create using Skeleton: https://next.skeleton.dev/docs/get-started/installation/sveltekit
2. Follow instructions and skeleton UI package
3. Install pineapple
4. Set up ModeWatcher and Modals, primarily in +layout.svelte
5. Set up ParaglideJS internationalization (beta not SvelteKit)
6. Add this to `+layout.svelte`

```sveltehtml
<script lang="ts">
	import { PinyaPageLayout, PinyaBase } from '@turnipxenon/pineapple/templates';
	import '../app.css';

	let { children } = $props();
</script>

<PinyaBase>
	<PinyaPageLayout>
		{@render children()}
	</PinyaPageLayout>
</PinyaBase>
```

TODO: if we are happy with our base, publish it to github and link the corresponding git commits here

7. Update to "@sveltejs/adapter-auto": "^4.0.0", we need node 22
8. Add alias in svelte.config

```js
kit: {
	alias: {
		$pkg: path.resolve("./node_modules/@turnipxenon/pineapple/dist/lib")
	}
}
```

## Local linking

1. In pineapple, run `yarn link`
2. In seaweed2, run `yarn unlink @turnipxenon/pineapple`

**To unlink:**

1. In seaweed2, run `yarn unlink @turnipxenon/pineapple`
2. In pineapple, run `yarn unlink`
3. **If unlinking, remember to restart PC cause Windows symlinking is tricky**

To reinstall a single package: `yarn add @turnipxenon/pineapple --no-package-lock --no-save`
