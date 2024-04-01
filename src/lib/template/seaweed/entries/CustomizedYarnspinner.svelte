<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import Card from "$pkg/components/Card.svelte";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import WeaverFootage from "$pkg/assets/others/weaver-footage.gif";

	export let props: EntryProps;
</script>


<Card>
	<section class="project-card" slot="content">
		<img alt="Footage of a visual novel-like dynamic dialog interaction happening on the same page we are on"
		     src={WeaverFootage} />

		<div class="project-card-body">
			<h2>Customized Yarnspinner interpreter and dialog runner</h2>

			A custom dialog interpreter, written in <span class="qt-ts">Typescript</span>, that tokenizes then
			transpiles custom Yarnspinner dialog into a <span class="qt-ts">Typescript</span> file. The said files can
			be used on a corresponding runner or library, also implemented alongside it, allowing the ability to play a
			custom-flavor of YarnSpinner dialogs on <span class="qt-svelte">Svelte</span>.

			<section class="game-link-section">
				<button type="button" class="game-button turnip-button"
				        role="link"
				        title="https://github.com/TurnipXenon/pineapple/blob/main/docs/PineappleFiberSpec.md"
				        on:click={() => window.open("https://github.com/TurnipXenon/pineapple/blob/main/docs/PineappleFiberSpec.md")}>
					<img src={GithubIcon} alt="github icon">
				</button>
			</section>
		</div>
	</section>
</Card>
