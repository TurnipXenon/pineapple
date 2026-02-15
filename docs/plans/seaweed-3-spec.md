# Seaweed 3

## Overview

Seaweed is meant to be our showcase page or portfolio page template. We want to restructure our Seaweed page layout so that we showcase our experience more and our latest projects.

Relevant files are:

- **src/routes/seaweed2/+page.svelte**: Custom content for the template
- **src/lib/ui/templates/SeaweedLayout/SeaweedLayout.svelte**: Layout template we would want to edit the most

### Current state

Our current page emphasizes a lot on the games. Now, we have more experience, and complex personal projects. The page layout looks like this:

```html

<main>
	<section class="header-section">
		<!-- The side section goes to the side when screen is big enough but flows vertically if narrow screen -->
		<section class="side-section">
			<section>
				<h1>About</h1>
				<p>Description here</p>
			</section>
			<section>
				<button>Social 1</button>
				<button>Social 2</button>
			</section>
			<!-- intersection observer is used by the actual page header for seaweed -->
			<div class="intersection-observer"></div>
		</section>
		<section class="main-header-section">
			<h2>Experience</h2>
			<h3>Job 1</h3>
			<p>Description</p>
			<h3>Job 2</h3>
			<p>Description</p>
		</section>
	</section>

	<section class="games-section">
		<section class="header-card">
			<h2>Games</h2>
		</section>
		<!-- Game1.svelte -->
		<section>
			<!-- screenshot/gif/video of the game -->
			<img>
			<h3>Game 1</h3>
			<p>Description</p>
		</section>
		<!-- Game2.svelte -->
		<section>
			<!-- screenshot/gif/video of the game -->
			<img>
			<h3>Game 1</h3>
			<p>Description</p>
		</section>
	</section>

	<section class="project-section">
		<section class="header-card">
			<h2>Projects</h2>
		</section>
		<!-- Project1.svelte -->
		<section>
			<!-- screenshot/gif/video of the project -->
			<img>
			<h3>Project 1</h3>
			<p>Description</p>
		</section>
		<!-- Project2.svelte -->
		<section>
			<!-- screenshot/gif/video of the project -->
			<img>
			<h3>Project 1</h3>
			<p>Description</p>
		</section>
	</section>
</main>

<section class="footer">
	<section class="chum-bucket"></section>

	<!-- page layout settings changes the layout of the sections and entries within the sections dynamically. it generates a query param -->
	<!--  not an important part of the plan but for the future should be considered -->
	<section class="page-layout-settings"></section>
</section>
```

### Future state

I want to emphasize my experience more, and mix my projects into one section. I would like to add a filter (using tags, ongoing projects (maybe that's a tag)) and a sort system (default, project length, date finished).

A rough new layout would look like this:

```html

<main>
	<section class="header-section">
		<!-- We want the two side sections to be side-by-side, and the social section would go below if the viewport is too small -->
		<section class="side-section">
			<section>
				<h1>About</h1>
				<p>Description here</p>
			</section>
			<section>
				<button>Social 1</button>
				<button>Social 2</button>
			</section>
		</section>
		<!-- intersection observer is used by the actual page header for seaweed -->
		<div class="intersection-observer"></div>
	</section>

	<section class="experience-section">
		<div>
			<h2>Experience</h2>
			<div class="tag-filter"></div>
		</div>
		<br>
		<!-- Job1.svelte -->
		<!-- For the Svelte components for the job, the img is a Snippet that would occupy
		 the left side of the card, but would let the internals of the card flow vertically if there's not much space -->
		<section>
			<!-- Media related to job -->
			<img>
			<div>
				<h3>Job 1</h3>
				<p>Description <span class="qt-keyword1">keyword1</span></p>
			</div>
		</section>
		<!-- Job2.svelte -->
		<section>
			<!-- Media related to job -->
			<img>
			<div>
				<h3>Job 1</h3>
				<p>Description <span class="qt-keyword1">keyword1</span></p>
			</div>
		</section>
		<button>Click to see more experience...</button>
		<section class="more-items">
			<!-- Job3.svelte -->
			<section>
				<!-- Media related to job -->
				<img>
				<div>
					<h3>Job 1</h3>
					<p>Description <span class="qt-keyword1">keyword1</span></p>
				</div>
			</section>
		</section>
	</section>


	<section class="projects-section">
		<section class="header-card">
			<div><h2>Projects</h2></div>
			<div class="svelte-combobox-tags"></div>
			<div class="svelte-combobox-sort"></div>
		</section>
		<!-- Game1.svelte -->
		<section>
			<!-- screenshot/gif/video of the game -->
			<img>
			<h3>Game 1</h3>
			<p>Description</p>
		</section>
		<!-- Game2.svelte -->
		<section>
			<!-- screenshot/gif/video of the game -->
			<img>
			<h3>Game 1</h3>
			<p>Description</p>
		</section>

		<!-- Project1.svelte -->
		<section>
			<!-- screenshot/gif/video of the project -->
			<img>
			<h3>Project 1</h3>
			<p>Description</p>
		</section>
		<!-- Project2.svelte -->
		<section>
			<!-- screenshot/gif/video of the project -->
			<img>
			<h3>Project 1</h3>
			<p>Description</p>
		</section>
	</section>
</main>

<section class="footer">
	<section class="chum-bucket"></section>

	<!-- page layout settings changes the layout of the sections and entries within the sections dynamically. it generates a query param -->
	<!--  not an important part of the plan but for the future should be considered -->
	<section class="page-layout-settings"></section>
</section>
```

For projects and job experiences, we want to utilize SnippetMeta for filling the metadata. It seems like we have these metadata attributes:

- key (old)
- Date started
- Date finished
- Tags (list of strings)

See the following code for more information:

- How SnippetMeta is set: src/lib/ui/modules/projects/Hepcat.svelte:15
- Where SnippetMeta is defined: src/lib/ui/templates/SeaweedLayout/props.ts:6
- How it's used: src/lib/ui/templates/SeaweedLayout/EntryGroup.svelte:28
