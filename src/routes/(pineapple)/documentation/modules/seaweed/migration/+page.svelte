<script lang="ts">
	import { CodeBlock, TextLink } from "$pkg/ui/elements";
</script>

<h1>Seaweed 3 Migration Guide</h1>

<h2>Overview</h2>

<p>Seaweed 3 fundamentally restructures how Experience content is handled in the Seaweed template system. This update aims to:</p>
<ul>
	<li>Emphasize professional experience more prominently</li>
	<li>Consolidate Projects and Games into a unified section with enhanced filtering</li>
	<li>Add filtering, sorting, and "show more" functionality for better UX</li>
	<li>Make Experience content flexible and configurable like Projects</li>
</ul>

<p>For the complete specification, see <TextLink href="https://github.com/TurnipXenon/pineapple/blob/main/docs/plans/seaweed-3-spec.md">docs/plans/seaweed-3-spec.md</TextLink></p>

<h2>Breaking Changes</h2>

<h3>1. Experience Content Location</h3>
<p><strong>Old pattern (Seaweed 2):</strong> Experience content was hardcoded in the <code>sideSection</code> snippet alongside About and Social sections.</p>
<p><strong>New pattern (Seaweed 3):</strong> Experience content must be defined in <code>entryList</code> and added to the <code>layout</code> array with <code>SectionType.Experience</code>.</p>

<h3>2. Side Section Structure</h3>
<p><strong>Old structure:</strong> Contained About + Experience + Social buttons</p>
<p><strong>New structure:</strong> Contains only About + Social buttons (Experience moved to main layout)</p>

<h2>Migration Steps</h2>

<h3>Step 1: Import New Types</h3>
<p>Update your imports to include the new <code>SectionType</code> enum:</p>

<CodeBlock
	code={`import {
  type ProjectGroup,
  SeaweedLayout,
  type SnippetMeta,
  SectionType  // [!code ++]
} from "$pkg/ui/templates/SeaweedLayout/index";`}
	lang="typescript"
	classes="max-w-3xl"
/>

<h3>Step 2: Create Experience Modules</h3>
<p>Create Svelte components for your job experiences with metadata exports. Use the <code>module</code> script context to export metadata fields.</p>

<p><strong>Example:</strong> <code>src/lib/ui/modules/experience/ExampleJob1.svelte</code></p>

<CodeBlock
	code={`<script module lang="ts">
  import type { ProjectComponentProps } from "$pkg/ui/templates/SeaweedLayout/ProjectComponentProps";
  import { default as FourPartCard } from "$pkg/ui/components/FourPartCard.svelte";
  import { TextChip } from "$pkg/ui/elements/TextChip";

  const key = "Software Engineer at Company X";
  const dateStarted = "2022-01-01";
  const dateFinished = "2024-12-31";  // Omit for ongoing jobs
  const tags = ["typescript", "svelte", "web"];
  export { component, key, dateStarted, dateFinished, tags };
</script>

{#snippet component(props: ProjectComponentProps)}
  <FourPartCard>
    {#snippet headerCover()}
      <div class="company-logo-placeholder">
        <h1>CX</h1>
      </div>
    {/snippet}

    {#snippet header()}
      <h3>Software Engineer</h3>
      <h4>Company X</h4>
      <p class="date-range">Jan 2022 - Dec 2024</p>
    {/snippet}

    <p>
      Built scalable web applications using
      <TextChip queryClass="qt-typescript">TypeScript</TextChip> and
      <TextChip queryClass="qt-svelte">Svelte</TextChip>.
    </p>
  </FourPartCard>
{/snippet}`}
	lang="svelte"
	classes="max-w-3xl"
/>

<p><strong>For ongoing jobs:</strong> Simply omit the <code>dateFinished</code> export and include an "ongoing" tag:</p>

<CodeBlock
	code={`const key = "Senior Developer at Current Company";
const dateStarted = "2024-01-01";
// No dateFinished export - indicates ongoing position
const tags = ["rust", "systems", "performance", "ongoing"];
export { component, key, dateStarted, tags };  // [!code ++]`}
	lang="typescript"
	classes="max-w-3xl"
/>

<h3>Step 3: Define Experience List</h3>
<p>In your Seaweed page component, create an array of your experience modules:</p>

<CodeBlock
	code={`import * as ExampleJob1 from "$pkg/ui/modules/experience/ExampleJob1.svelte";
import * as ExampleJob2 from "$pkg/ui/modules/experience/ExampleJob2.svelte";

const experienceList: SnippetMeta[] = [
  ExampleJob2,  // Ongoing job first (most recent)
  ExampleJob1   // Completed job
];`}
	lang="typescript"
	classes="max-w-3xl"
/>

<h3>Step 4: Add Experience Section to Layout</h3>
<p>Add the Experience section to your <code>layout</code> array with the new <code>SectionType.Experience</code>:</p>

<CodeBlock
	code={`const layout: ProjectGroup[] = [
  {
    key: "experience",
    title: "Experience",
    entryList: experienceList,
    sectionType: SectionType.Experience,  // [!code ++]
    showFilter: true,                     // [!code ++] Enable tag filtering
    showSort: false,                      // [!code ++] Disable sorting for Experience
    showMoreLimit: 2,                     // [!code ++] Show 2 jobs, hide rest behind "show more"
    projectComponentProps: { isPineapple: true }
  },
  {
    key: "projects",
    title: "Projects",
    entryList: projectList,
    sectionType: SectionType.Projects,    // [!code ++]
    showFilter: true,                     // [!code ++]
    showSort: true,                       // [!code ++]
    showMoreLimit: 6,                     // [!code ++]
    projectComponentProps: { isPineapple: true }
  }
];`}
	lang="typescript"
	classes="max-w-3xl"
/>

<h3>Step 5: Update sideSection Snippet</h3>
<p>Remove hardcoded Experience content from your <code>sideSection</code> snippet, keeping only About and Social sections:</p>

<CodeBlock
	code={`{#snippet sideSection(socialSection: Snippet)}
  <div class="flex flex-col gap-4">
    <PinyaCard>
      <div class="side-section">
        <h2>About</h2>
        <p>Hi I'm Turnip! Put stuff here!</p>
      </div>
    </PinyaCard>

    <PinyaCard> // [!code --]
      <h2>Experience</h2> // [!code --]
      <h3>Job 1</h3> // [!code --]
      <p>Description...</p> // [!code --]
    </PinyaCard> // [!code --]

    <PinyaCard paddingClass="social-section-card">
      {@render socialSection()}
      <ElementVisibilityDetector bind:isVisible={isSocialVisible} />
    </PinyaCard>
  </div>
{/snippet}`}
	lang="svelte"
	classes="max-w-3xl"
/>

<h2>Code Comparison</h2>

<h3>Before (Seaweed 2)</h3>
<p>Reference: Old pattern with hardcoded Experience in side section</p>

<CodeBlock
	code={`<script lang="ts">
  import { PinyaCard } from "$pkg/ui/elements";
  import { SeaweedLayout, type SnippetMeta } from "$pkg/ui/templates/SeaweedLayout/index";

  import * as Project1 from "$pkg/ui/modules/projects/Project1.svelte";
  import * as Game1 from "$pkg/ui/modules/games/Game1.svelte";

  const projectList: SnippetMeta[] = [Project1];
  const gameList: SnippetMeta[] = [Game1];

  const layout = [
    { key: "games", title: "Games", entryList: gameList },
    { key: "projects", title: "Projects", entryList: projectList }
  ];
</script>

<SeaweedLayout {...props} layout={layout}>
  {#snippet sideSection(socialSection: Snippet)}
    <PinyaCard>
      <h2>About</h2>
      <p>Description...</p>
    </PinyaCard>

    <!-- Experience was hardcoded here -->
    <PinyaCard>
      <h2>Experience</h2>
      <h3>Software Engineer</h3>
      <p>Company X - 2022 to 2024</p>
      <h3>Senior Developer</h3>
      <p>Current Company - 2024 to Present</p>
    </PinyaCard>

    <PinyaCard>
      {@render socialSection()}
    </PinyaCard>
  {/snippet}
</SeaweedLayout>`}
	lang="svelte"
	classes="max-w-3xl"
/>

<h3>After (Seaweed 3)</h3>
<p>Reference: <code>src/routes/seaweed2/+page.svelte:1</code></p>

<CodeBlock
	code={`<script lang="ts">
  import { PinyaCard } from "$pkg/ui/elements";
  import {
    type ProjectGroup,
    SeaweedLayout,
    type SnippetMeta,
    SectionType  // [!code ++]
  } from "$pkg/ui/templates/SeaweedLayout/index";

  import * as Project1 from "$pkg/ui/modules/projects/Project1.svelte";
  import * as Game1 from "$pkg/ui/modules/games/Game1.svelte";
  import * as ExampleJob1 from "$pkg/ui/modules/experience/ExampleJob1.svelte"; // [!code ++]
  import * as ExampleJob2 from "$pkg/ui/modules/experience/ExampleJob2.svelte"; // [!code ++]

  // Experience defined as modules with metadata // [!code ++]
  const experienceList: SnippetMeta[] = [ // [!code ++]
    ExampleJob2,  // Ongoing job first // [!code ++]
    ExampleJob1   // Completed job // [!code ++]
  ]; // [!code ++]

  // Projects and Games merged into one section // [!code ++]
  const projectList: SnippetMeta[] = [Project1, Game1]; // [!code ++]

  const layout: ProjectGroup[] = [ // [!code ++]
    { // [!code ++]
      key: "experience", // [!code ++]
      title: "Experience", // [!code ++]
      entryList: experienceList, // [!code ++]
      sectionType: SectionType.Experience, // [!code ++]
      showFilter: true,     // Tag filtering enabled // [!code ++]
      showSort: false,      // No sorting for Experience // [!code ++]
      showMoreLimit: 2,     // Show 2, hide rest // [!code ++]
      projectComponentProps: { isPineapple: true } // [!code ++]
    }, // [!code ++]
    { // [!code ++]
      key: "projects", // [!code ++]
      title: "Projects", // [!code ++]
      entryList: projectList, // [!code ++]
      sectionType: SectionType.Projects, // [!code ++]
      showFilter: true,     // Tag filtering enabled // [!code ++]
      showSort: true,       // Sorting enabled // [!code ++]
      showMoreLimit: 6,     // Show 6, hide rest // [!code ++]
      projectComponentProps: { isPineapple: true } // [!code ++]
    } // [!code ++]
  ]; // [!code ++]
</script>

<SeaweedLayout {...props} layout={layout}>
  {#snippet sideSection(socialSection: Snippet)}
    <PinyaCard>
      <h2>About</h2>
      <p>Description...</p>
    </PinyaCard>

    <!-- Experience section removed from here --> // [!code --]

    <PinyaCard>
      {@render socialSection()}
    </PinyaCard>
  {/snippet}
</SeaweedLayout>`}
	lang="svelte"
	classes="max-w-3xl"
/>

<h2>New Features Available</h2>

<p>Seaweed 3 introduces several enhancements for both Experience and Projects sections:</p>

<h3>1. Tag Filtering</h3>
<p>Multi-select tag filter using clickable chips with OR logic. Shows entries matching ANY selected tag.</p>
<ul>
	<li>Enabled via <code>showFilter: true</code> in <code>ProjectGroup</code></li>
	<li>Tags defined in module metadata: <code>const tags = ["typescript", "svelte", "web"];</code></li>
	<li>Includes "Clear all" button when tags are selected</li>
</ul>

<h3>2. Sorting</h3>
<p>Sort dropdown with section-type-specific options:</p>
<ul>
	<li><strong>Projects:</strong> Default, Date (newest/oldest), Duration (longest/shortest)</li>
	<li><strong>Experience:</strong> Default, Date (newest/oldest)</li>
	<li>Enabled via <code>showSort: true</code> in <code>ProjectGroup</code></li>
	<li>Entries without dates sort to the bottom</li>
</ul>

<h3>3. Show More/Less</h3>
<p>Progressive disclosure for long lists:</p>
<ul>
	<li>Set via <code>showMoreLimit: number</code> (e.g., <code>showMoreLimit: 2</code>)</li>
	<li><code>showMoreLimit: 0</code> disables the feature (shows all entries)</li>
	<li>"Show more" button appears when entries exceed the limit</li>
	<li>"Show less" button appears after expanding</li>
</ul>

<h3>4. Enhanced Metadata</h3>
<p>Reference: <code>src/lib/ui/templates/SeaweedLayout/props.ts:11</code></p>

<CodeBlock
	code={`export interface SnippetMeta {
  key: string;
  component: ComponentSnippet;
  // New metadata fields for filtering and sorting
  dateStarted?: Date | string;     // Start date
  dateFinished?: Date | string;    // End date (omit for ongoing)
  tags?: string[];                 // Tags for filtering
}`}
	lang="typescript"
	classes="max-w-3xl"
/>

<p>For more implementation details, see <TextLink href="https://github.com/TurnipXenon/pineapple/blob/main/ai-docs/sessions/seaweed-3-implementation.md">ai-docs/sessions/seaweed-3-implementation.md</TextLink></p>

<h2>Backward Compatibility</h2>

<p>Seaweed 3 maintains backward compatibility with existing code:</p>

<ul>
	<li><strong>All new fields are optional</strong> - Projects without metadata continue to work normally</li>
	<li><strong>Old patterns still work</strong> - <code>children</code> and <code>sideSection</code> snippets remain functional</li>
	<li><strong>Gradual migration possible</strong> - You can add an Experience section to your layout while temporarily keeping the old hardcoded Experience in <code>sideSection</code></li>
	<li><strong>No changes to existing projects</strong> - Projects defined without <code>dateStarted</code>, <code>dateFinished</code>, or <code>tags</code> will render as before</li>
</ul>

<p><strong>Migration tip:</strong> Start by creating your Experience modules and adding them to the layout. Once verified, remove the hardcoded Experience from your <code>sideSection</code>.</p>

<h2>Type Definitions</h2>

<p>Reference: <code>src/lib/ui/templates/SeaweedLayout/props.ts</code></p>

<CodeBlock
	code={`export enum SectionType {
  Experience = "experience",
  Projects = "projects"
}

export interface ProjectGroup {
  key: string;
  title: string;
  entryList: SnippetMeta[];
  projectComponentProps?: ProjectComponentProps;
  // New fields for Seaweed 3
  sectionType?: SectionType;
  showFilter?: boolean;      // Show tag filter
  showSort?: boolean;        // Show sort dropdown
  showMoreLimit?: number;    // Number of items before "show more" (0 = no limit)
}`}
	lang="typescript"
	classes="max-w-3xl"
/>

<h2>Example Files</h2>

<p>For reference implementation, see these files in the codebase:</p>

<ul>
	<li><strong>Complete example page:</strong> <code>src/routes/seaweed2/+page.svelte</code></li>
	<li><strong>Experience module (completed job):</strong> <code>src/lib/ui/modules/experience/ExampleJob1.svelte</code></li>
	<li><strong>Experience module (ongoing job):</strong> <code>src/lib/ui/modules/experience/ExampleJob2.svelte</code></li>
	<li><strong>Type definitions:</strong> <code>src/lib/ui/templates/SeaweedLayout/props.ts</code></li>
	<li><strong>Layout template:</strong> <code>src/lib/ui/templates/SeaweedLayout/SeaweedLayout.svelte</code></li>
</ul>
