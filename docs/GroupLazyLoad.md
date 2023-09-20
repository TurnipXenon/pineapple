# Group Lazy Load

meh not possible or not easy T.T

I want it to be easy to use like:

```sveltehtml
<GroupLazyLoad>
    <svelte:fragment slot="content">
        <video src="random_vid.mp4"></video>
        <img src="random_image.webp" alt="test image">
        <RandomComponentWithLazyLoadHook></RandomComponentWithLazyLoadHook>
    </svelte:fragment>
    <svelte:fragment slot="placeholder">
        This placeholder is optional...
    </svelte:fragment>
</GroupLazyLoad>
```

OR


```sveltehtml
<GroupLazyLoad>
    <svelte:fragment slot="content">
        <video src="random_vid.mp4"></video>
        <img src="random_image.webp" alt="test image">
        <RandomComponentWithLazyLoadHook></RandomComponentWithLazyLoadHook>
    </svelte:fragment>
    <svelte:fragment slot="placeholder">
        This placeholder is optional...
    </svelte:fragment>
</GroupLazyLoad>
```