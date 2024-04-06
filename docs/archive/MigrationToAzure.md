# Migration to Azure

## Update

I realized that migrating to Azure, and wanting to be on the same parity to what we have right now would cost more. I am fine with the possible charges Vercel may give in the future.

## Overview

We're moving from hosting our two sites, from Vercel to Azure.

## Reason

- We want to learn how to use Azure services, since I'm already familiar with AWS and a lot of Canadian jobs seem to use Azure.
- I want to learn more about Pulumi. It seems like a promising way of defining infrastructure. It's like CDK but platform-agnostic.
- It's not that I'm worried about learning Vercel's platform, but let's be honest, employers don't really appreciate seeing "experienced in Vercel VK" than "experienced in CosmosDB"
- If we want our projects to be interconnected, we might have to use a backend server for our Discord bot. I think Vercel is cheap, but I don't trust them enough to not pull a Heroku on us.

## Current solution

Two of our static web apps are deployed in Vercel for free.

## Proposed solution

Move the two static web apps to Azure Static Web Apps.

## Future solution

In the near future, we will have a possible situation like this:

1. User visits, invoking call to Azure Static Web App.
2. Azure Static Web App checks if it is a dynamic route, and if it is, it invokes an Azure Function. (This might not be accurate, or may not require an Azure Function if server-side rendered? Maybe for that it uses Azure Web App (not static))
3. Azure Function (or Web App?) calls DB to figure out the desired layout.

The situation for the above is something I've thought of since I've seen my links get more bloated. I could shorten the link, and have the full layout definition stored in a Key-Value pair DB.

## Work

1. Throwaway prototype: try to do the tutorial for full stack web app.
	- Link: https://techcommunity.microsoft.com/t5/apps-on-azure-blog/build-a-full-stack-react-application-with-azure-static-web-apps/ba-p/4090838
2. Check out the difference between Azure Static Web App and Azure Web App.
3. Migrate Pineapple to Azure Web App.
4. Set up CI/CD
5. Ensure that there is a staging environment for PRs.
6. Migrate Seaweed to Azure Web App.

## Future Work

**We want to shorten our query params into pre-defined links. We also want to keep the query params since we've given
them out already.**

Priority between layout settings:

1. Runtime advanced settings
2. Query param parsing
3. Unique url

Work:

1. Study AzureFunctions (or not) and CosmosDB
2. Define a DB schema
3. Define a protocol between AzureFunction and Azure Web App (or not; it really depends)
4. Set up DB.
5. Implement throwaway part of the webpage just as a simple DB connection sanity check.
6. Implement connection to the DB.
7. Potential task: set up how DB connection works in different stages (PR build vs deployment build). At this point, we may have understood how the system works now.
8. Refactor Seaweed. There are too much functions in the script section of SeaweedTemplate.
9. Add a single source of truth for the page layout.
10. The current state is that each page controls are separate, so I have to find them each individually. This will make URL generation, Query param parsing, Query param setting without page redirection (new!), server side params, and runtime advanced setting changes all in sync. Wow, that's a lot, and complex. but we're already 80% there, just disorganized.
11. Refactor so that each entry is a SvelteComponent. (Already done but I don't know if we have to start from scratch since the merge conflict between our current work and at this point of the tasks is gonna be massive)
12. Define each entry as a list grouped between games and projects.
13. Define group components. (Same case as 11)
14. Define each group as a list grouped. Define properties like:
	1. Entries under it
	2. Header title
	3. Header styling?
	4. Grid styling
15. Make the dynamic listing and grouping work with the following:
	1. runtime advanced setting changes
		1. Represent the above groupings and listings in advanced settings
		2. Make addable entries
		3. Make removable entries
		4. Make addable groups
		5. Make removable entries
		6. Make movable entries (switch indices)
		7. Make movable groups (switch indices)
		8. Inevitable refactor
	2. URL generation
	3. Query param parsing
	4. Query param setting without page redirection
	5. Save to DB with password
	6. Read data on server side
	7. Make a warning to user side that the page is missing if the said page was not defined server side
	8. Read data on client side
	9. Process it on client side and let query params override on top of it.

**We want our infra to be defined in Pulumi**

**TODO (we will probably know more when we have the DB and multiple stage deploys)**

## Acknowledgments

- Kudos to 0gust1, specifically with their guide to [Use node-adapter](https://gist.github.com/0gust1/1fc3c461ace390df556b2231b7284e70#use-node-adapter) and [adjust the launch script](https://gist.github.com/0gust1/1fc3c461ace390df556b2231b7284e70#adjust-the-launch-script).
