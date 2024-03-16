<script lang="ts">
	import {
		activeToast,
		type CustomToastPairs,
		DefaultToastParamsDuration,
		toastQueue
	} from "$pkg/components/pineapple/toast/Toast";
	import { type ComponentType } from "svelte";
	import Card from "$pkg/components/Card.svelte";
	import { spring, tweened } from "svelte/motion";

	let localComponent: ComponentType | undefined;
	let localProps: CustomToastPairs["props"];

	// todo: make hidden value reliant on current vh
	const HIDDEN_VALUE = -15;
	const SHOWN_VALUE = 0;
	const progress = tweened(0, { duration: DefaultToastParamsDuration });
	const position = spring(HIDDEN_VALUE);
	position.damping = 0.4;

	// todo: add timer?
	activeToast.subscribe((params) => {
		if (!params) {
			return;
		}

		if (params.componentAndProps?.component === localComponent) {
			return;
		}

		localComponent = params.componentAndProps.component;
		localProps = params.componentAndProps.props;

		// todo: make unnested
		// set progress to 0 before showing
		progress.set(0, { duration: 0 }).then(() => {
			// animate showing the toast
			position.set(SHOWN_VALUE).then(() => {
				// now animate the lifespan of the current toast
				progress.set(100, { delay: 500, duration: params.duration ?? DefaultToastParamsDuration }).then(() => {
					// when the lifespan duration is over, animate hiding the toast by putting its bottom
					// position out of bounds
					position.set(HIDDEN_VALUE).then(() => {
						// clear the local component to undefined to make the component disappear
						// also set activeToast to null to indicate to the system that it's ready to take new
						// Toast requests
						localComponent = undefined;
						activeToast.update(() => {
							if (toastQueue.length === 0) {
								return undefined;
							}
							return toastQueue.shift();
						});
					});
				});
			});
		});
	});
</script>

{#if (localComponent !== undefined)}
	<!-- 12em = this component's margin (4em) + fab margin + width (8em) -->
	<div style={`position: fixed; bottom: ${$position}lh; left: 2em; max-width: calc(100vw - 12em)`}>
		<Card marginBottom="1lh">
			<div slot="content">
				{#if (localProps !== undefined)}
					<svelte:component this={localComponent} props={localProps} />
				{:else }
					<svelte:component this={localComponent} />
				{/if}
				<progress id="toast-progress" value={$progress/100}></progress>
			</div>
		</Card>
	</div>
{/if}
