<!-- TODO: Documentation: consider documentation showcase -->

<!-- @component TextLink
 todo: consider current-surface scss
 -->

<script lang="ts">
	import type { TextLinkProps } from "./TextLinkProps";

	let {
		children,
		...props
	}: TextLinkProps = $props();
</script>

<a {...props}>
	{@render children?.()}
</a>

<style>
    :global {
        :root {
            --link-color: var(--color-secondary-400);
            --visited-link-color: var(--color-secondary-700);
        }

        html.dark {
		        /* when adding new surfaces, apply the property like this */
            --link-color-dark: var(--color-secondary-300);
            --visited-link-color-dark: var(--color-secondary-500);
        }

        a.a-as-btn {
            text-decoration: none;
        }

        a:not(.a-as-btn) {
            text-decoration: underline;
            color: var(--link-color);
        }

		    /* when adding new states for elements, apply the property like this */
        html.dark a:not(.a-as-btn) {
            color: var(--link-color-dark);
        }

        a:not(.a-as-btn):hover, a:not(.a-as-btn):focus {
            filter: brightness(150%);
        }

        /*  we're fighting a specificity war with skeleton components */

        .a-as-btn:hover {
            filter: brightness(110%);
        }

        a:not(.a-as-btn):visited {
            color: var(--visited-link-color);
        }

        html.dark a:not(.a-as-btn):visited {
            color: var(--visited-link-color-dark);
        }
    }
</style>
