<span class="local-chip">
<slot />
</span>

<style lang="postcss">
    .local-chip {
        @apply chip variant-filled-tertiary;
        border-radius: 1em;
        margin: 0.25em;
        font-weight: bold;
        pointer-events: none;
        background-color: rgb(var(--color-tertiary-500) / var(--tw-bg-opacity));
    }
</style>
