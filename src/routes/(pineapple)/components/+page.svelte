<script lang="ts">
	import { modals } from "svelte-modals";

	import { ButtonVariant, ImageIcon, PinyaButton, PinyaCard } from "$pkg/ui/elements/index";
	import AresLogo from "$pkg/assets/characters/ares/ares_logo.webp";
	import { FourPartCard } from "$pkg/ui/components/index";
	import TestModal from "./TestModal.svelte";
	import PinyaSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";

	let testSwitchVal = $state(false);
</script>

<div class="flex flex-col gap-4">

	<PinyaCard widthClass="max-w-2xl">
		<h1>Test templates</h1>
		<PinyaButton onclick={() => {
			modals.open(TestModal);
		}}>
			Click here to test confirmation modal
		</PinyaButton>
		<div class="mt-4 mb-4">
			<label for="test-switch">Switch is {testSwitchVal}</label>
			<PinyaSwitch name="test-switch"></PinyaSwitch>
		</div>

	</PinyaCard>

	<PinyaCard widthClass="max-w-2xl">
		<div class="card-container">
			<h1>Typography</h1>
			<h2>Heading 2</h2>
			<h3>Heading 3</h3>
			<h4>Heading 4</h4>
			<h5>Heading 5</h5>
			<h6>Heading 6</h6>
			<p>Harvest Moon is a farming simulation game with an underlining storyline that add depth to break up the daily
				monotony of watering crops. In the games, players have the option of getting married, raising livestock and
				poultry animals, catching fish, and attending festivals to impress the local villagers.</p>

			<p>Harvest Moon (Bokujou Monogatari) was first published in Japan in 1996 by Pack In Video; the company, after
				several mergers, is currently known as <a href="https://www.marv.jp/">Marvelous</a>. In North America, the game
				was published by Natsume, Inc. in
				1998. Natsume handled the English version up until Harvest Moon: A New Beginning. In 2014, Marvelous annnounced
				that it will be using its North American localization branch, XSeed Games (Marvelous USA), to translate Bokujou
				Monogatari into English under its own title, Story of Seasons. Natsume still owns the Harvest Moon trademark and
				will continue to develop the series independently of Marvelous.</p>

			<blockquote>From <a href="https://fogu.com/">fogu.com</a></blockquote>

			<ul>
				<li>Unordered 1</li>
				<li>Unordered 2</li>
				<li>Unordered 3</li>
			</ul>

			<ol>
				<li>Ordered 1</li>
				<li>Ordered 2</li>
				<li>Ordered 3</li>
			</ol>
		</div>
	</PinyaCard>

	<PinyaCard widthClass="max-w-2xl">
		<div class="card-container items-start">
			<h1>Buttons</h1>
			<PinyaButton>Text button</PinyaButton>
			<PinyaButton buttonVariant={ButtonVariant.Image}>
				<ImageIcon alt="" aria-hidden="true" src={AresLogo}></ImageIcon>
			</PinyaButton>
		</div>
	</PinyaCard>

	<FourPartCard>
		{#snippet header()}
			<h1>Four Part Card header</h1>
		{/snippet}
		<p>Content here</p>
	</FourPartCard>
</div>

<style>
    .card-container {
        display: flex;
        flex-direction: column;
        text-align: start;
        gap: 0.5lh;
    }
</style>