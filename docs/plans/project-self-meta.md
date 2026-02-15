# Project Self Meta

I want to define a meta structure in projects so that I can reference them here without making any change here once I've referenced them here.

The purpose of this is a self-updating portfolio or showcase.

## Current state

When I have a project I want to add in SeaweedLayout, I would need to add a component and update that component when details change for that project.
For example, let's use this project as an example.
The component associated for project Pineapple (github.com/TurnipXenon/pineapple), is ThisWebpage.svelte (src/lib/ui/modules/projects/ThisWebpage.svelte).
It is then exported and reference here `src/routes/seaweed2/+page.svelte:25`.
I also reference this project elsewhere.
I export the component at `src/lib/ui/modules/projects/index.ts:4`, then use it at an external project.
See `../seaweed/src/lib/components/MainPage.svelte`.

If I want to update ThisWebpage.svelte, I would need to upgrade the version for this project, and update the versions imported in other projects like
`../seaweed/package.json`.

## Problem / Requirements

- We want to more accurately measure the start date and end date for projects, so our sorter (src/lib/ui/templates/SeaweedLayout/EntryGroup.svelte:35) would actually be useful.
  We can use the commit timestamps for the projects for this.
- We may want to be update this meta from the project itself, and we would not need to update the project. After that, maybe we have a source of truth for the collection of these projects.

## Possible Future State

When I want to add a new project to this system, I will make a folder in `docs/project-reference`, and fill it with meta information.
We could have a `layout.html` which maps information in a `FourPartCard`.
Compare the sample `docs/project-reference/layout.html` with `src/lib/ui/modules/projects/ThisWebpage.svelte`.
It's not finalized but I'm open for what maybe better ways of templating.

`docs/project-reference/meta.gen.json` would be auto generated using a script in package.json when it triggers a commit hook or some sort of github automation?
The inform in meta.gen.json would be collected from layout.html and meta.custom.json.

You can see that there are also types we want to enforce in `meta.custom.ts`.
Maybe we can have it in a new package, that will also be the source of truth of the list of projects we want to work with this?
We reference this project in this new package using their github link like "https://github.com/TurnipXenon/pineapple".

Once we have these details above set up in the new package and the project we want to reference, we import the new package to a different package that will
use the information to generate or display the list of components, like here `src/routes/seaweed2/+page.svelte:36`. It would be a mix of hardcoded components you see in the current list and the ones we have in this theoretical new package, and we sort them based on highest priority to lowest. This new priority system dictates the new default sort.

I think this project might be a good candidate for a separate package (as mentioned in my ramblings above). I suggest (might not be the best idea) that we create the new repo/package a child of this repo, and add the new repo name to the .gitignore of this project (and we could easily move it not as a child for this project but an adjacent one).
