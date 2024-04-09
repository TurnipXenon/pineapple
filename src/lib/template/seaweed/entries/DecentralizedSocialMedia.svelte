<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import Card from "$pkg/components/Card.svelte";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";

	export let props: EntryProps;
</script>

<Card>
	<section class="project-card" slot="content">
		<div class="project-card-body">

			<h2>Decentralized social media</h2>

			<p>We made a full stack decentralized social media app made with <span class="qt-react">React</span> +
				<span class="qt-js">Javascript</span> for the client code, <span class="qt-django">Django</span> + <span
					class="qt-python">Python</span> for the backend code, and <span class="qt-heroku">Heroku</span> for
				deployment. This project was made
				for
				our Web Applications and Architecture class.</p>
			<p>The application can connect with three other decentralized social media app in the same class:
			</p>
			<ul>
				<li>
					<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-14"
					   target="_blank">Also
						a social media with the same Django + Python backend server where they act on behalf of
						our users interacting with theirs</a></li>
				<li>
					<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-7"
					   target="_blank">A
						social media that uses Fast API + Python for their backend server</a></li>
				<li>
					<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-12"
					   target="_blank">Another
						social media that has Django + Python for their backend but we have to act on behalf of
						our
						users interacting with their users</a>
				</li>
			</ul>

			<!-- todo: add tags with Javascript, React, Python, Django, Heroku -->

			<section class="game-link-section">
				<button type="button" class="game-button turnip-button"
				        role="link"
				        title="https://github.com/hgshah/cmput404-project"
				        on:click={() => window.open("https://github.com/hgshah/cmput404-project")}>
					<img src={GithubIcon} alt="github icon">
				</button>
			</section>
		</div>
	</section>
</Card>
