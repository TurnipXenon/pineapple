<script lang="ts">
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import ImageIcon from "$pkg/ui/elements/ImageIcon.svelte";
	import { ButtonVariant, PinyaButton } from "$pkg/ui/elements/index";
</script>

<h1>Getting Started</h1>

<PinyaButton
	class="documentation-social-button"
	buttonVariant={ButtonVariant.SmallIcon}
	title="https://github.com/TurnipXenon"
	onclick={() => window.open("https://github.com/TurnipXenon/pineapple")}>
	<ImageIcon src={GithubIcon} alt="" aria-hidden />
	<span>TurnipXenon/pineapple</span>
</PinyaButton>

<h2>About</h2>

<p>Base package for all my websites.</p>

<p>TODO: Explain what this project is all about</p>


<h2>About our project structure</h2>

<p><i><b>We value locality over groupings.
	We only escalate their scope when needed.</b></i></p>

<p>If we know a component will not be used elsewhere, we keep that component next to the component that uses it.
	If it's used by several components within a folder, we simply place it elsewhere where the several components that need them can easily access them.
	We escalate their scope when needed or when it's obvious that it's meant to be shared and reused often.</p>

<p>For shared components, we want to house them in
	<code>src/lib/ui</code>. There are four types of shared UI components:</p>
<ul>
	<li><b>Elements</b> are the basic building blocks.</li>
	<li><b>Components</b> are the general UI components</li>
	<li><b>Modules</b> are specialized UI components that are big and complex.
		They are often built with several other localized components that are saved within those folders too.
	</li>
	<li>
		<b>Templates</b> are UI components that expect a lot of components (in the form of Svelte Snippets) to be passed in.
		You can expect layouts to exist here, too.
	</li>
</ul>

<p>Do take note that it took a while to arrive to this rule, so several existing files aren't properly organized yet.</p>
<style>
    :global {
        .documentation-social-button {
		        align-self: center;
        }
    }
</style>
