<script lang="ts">

	import { type EntryProps } from "./EntryProps";
	import HeaderChefWings from "$pkg/assets/game_dev/footage-chef-wings.gif";
	import LinkIcon from "$pkg/assets/icons/link-icon.svg";
	import Card from "$pkg/components/Card.svelte";
	import type { ModalSettings } from "@skeletonlabs/skeleton";
	import { getModalStore } from "@skeletonlabs/skeleton";
	interface Props {
		props: EntryProps;
	}

	let { props }: Props = $props();

	const modalStore = getModalStore();
	const chefWingsWarning: ModalSettings = {
		type: "confirm",
		title: "Warning: please confirm",
		body: "This will directly link to the game itself, since this game does not have any game page or any " +
			"publicly viewable source code. The game is only playable on desktop. " +
			`Are you sure you wish to proceed? If there are any bugs, please report at <a href='mailto:${props.email}' target='_blank'>` +
			`${props.email}</a>.`,
		response: (r: boolean) => {
			if (r) {
				window.open("https://selk.io/birb-project/trunk/");
			}
		}
	};
</script>

<Card>
	{#snippet content()}
		<section class="game-card" >
			<img src={HeaderChefWings} alt="todo" loading="lazy">
			<section class="game-card-body">

				<h1>Chef Wings</h1>
				<p>
					A “roguelite-lite” where you gather ingredients in a procedurally-generated dungeon and use
					them to cook for customers and then critics!
				</p>
				<p>
					I built and documented several of the game’s systems including the game state management
					system that extends <span class="qt-unity">Unity’s</span> existing Monobehavior lifecycle with new events,
					and the dialogue, event, and level systems that coordinate the game flow using the interactive
					dialogue tool YarnSpinner
				</p>

				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        title="https://selk.io/birb-project/trunk/"
					        onclick={()=>modalStore.trigger(chefWingsWarning)}>
						<img alt="itch.io icon" src={LinkIcon}>
						<span>selk.io/birb-project/trunk/</span>
					</button>
				</section>
			</section>
		</section>
	{/snippet}
</Card>