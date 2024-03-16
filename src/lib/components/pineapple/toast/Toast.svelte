<script lang="ts">
	import { activeToast, DefaultToastParamsDuration, type ToastParams } from "$pkg/components/pineapple/toast/Toast";
	import { type ComponentType } from "svelte";
	import Card from "$pkg/components/Card.svelte";
	import { spring, tweened } from "svelte/motion";

	let localComponent: ComponentType | undefined;
	let currentParams: ToastParams | undefined;

	// todo: make hidden value reliant on current vh
	const HIDDEN_VALUE = -15;
	const SHOWN_VALUE = 2;
	const progress = tweened(0, { duration: DefaultToastParamsDuration });
	const position = spring(HIDDEN_VALUE);
	// position.stiffness = 0.3;
	position.damping = 0.4;
	// position.precision = 0.005;

	// todo: add timer?
	activeToast.subscribe((params) => {
		if (!params) {
			return;
		}

		localComponent = params.component;
		// progress.set(0, { duration: 0 });
		currentParams = params;

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
							// todo check queue
							return undefined;
						});
					});
				});
			});
		});
	});
</script>

{#if (localComponent !== undefined)}
	<div style={`position: fixed; bottom: ${$position}lh; left: 2lh; width: 20em`}>

		<Card>
			<div slot="content">
				<svelte:component this={localComponent} />
				<progress id="toast-progress" value={$progress/100}></progress>
			</div>
		</Card>
	</div>
{/if}
