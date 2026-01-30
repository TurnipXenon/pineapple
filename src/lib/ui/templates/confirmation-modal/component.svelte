<script lang="ts">
	import type { ConfirmationModalProps } from './props';
	import { default as ModalBase } from '$pkg/ui/components/ModalBase.svelte';
	import { ColorScheme, PinyaButton } from '$pkg/ui/elements';

	let {
		children,
		confirm,
		...props
	}: ConfirmationModalProps = $props();
</script>

<ModalBase {...props}>
	<div class="prose-h2:mt-4 max-w-xl">

		{@render children()}

		<div class="actions">
			<PinyaButton
				onclick={() => {
					confirm.onclick();
					props.close();
				}}
				title={confirm.hoverOver ?? 'Ok'}
				colorScheme={ColorScheme.Warning}
			>
				{confirm.text ?? 'Ok'}
			</PinyaButton>
			<PinyaButton
				onclick={() => props.close()}
				title="Close modal"
				colorScheme={ColorScheme.Surface}
			>
				Close
			</PinyaButton>
		</div>
	</div>
</ModalBase>

<style>
    .actions {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 1.4lh;
        gap: 1rem;
    }
</style>
