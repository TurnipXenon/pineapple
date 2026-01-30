<script lang="ts">
	import { revealInfoState } from "$lib/components/reveal-info/RevealInfoRune.svelte";
	import VisibilityIcon from "$pkg/assets/icons/icon-visibility.svg";
	import { ButtonVariant, PinyaButton, type PinyaButtonProps } from "$pkg/ui/elements/index";
	import type { Snippet } from "svelte";
	import ImageIcon from "../../ui/elements/ImageIcon.svelte";
	import { type RevealInfoRecord } from "./RevealInfoCollection";

	let {
		infoRecord,
		onclickBuilder,
		titleBuilder,
		bodySnippet = undefined,
		...props
	}: {
		infoRecord: RevealInfoRecord,
		onclickBuilder?: ((revealInfo: string) => (() => void)),
		titleBuilder?: ((revealInfo: string) => string),
		bodySnippet?: Snippet<[string]>;
	} & Omit<PinyaButtonProps, | "onclick" | "title" | "children"> = $props();

	type State = "ready" | "loading" | "error" | "done";

	let revealValue = $state(infoRecord.placeholder);
	let _state = $state<State>("ready");
	let uid = $props.id();

	const onRevealClicked = () => {
		if (_state === "ready") {
			_state = "loading";
			(infoRecord.query.type === "string"
				? infoRecord.query.run(infoRecord.query.key ?? "")
				: infoRecord.query.run())
				.then((data) => {
					revealValue = data;
					_state = "done";
					if (infoRecord.query.type !== "void" && infoRecord.query.key) {
						revealInfoState.setInfoState(infoRecord.query.key, revealValue);
					} else {
						revealInfoState.setInfoState(uid, revealValue);
					}

				})
				.catch(() => {
					revealValue = "Cannot retrieve data.";
					_state = "error";
				});
		}
	};
</script>

{#if (_state !== 'done')}
	<PinyaButton
		buttonVariant={ButtonVariant.SmallIcon}
		{...props}
		disabled={_state !== 'ready'}
		title={revealValue}
		onclick={onRevealClicked}>
		{#if bodySnippet}
			{@render bodySnippet?.(revealValue)}
		{:else }
			<ImageIcon src={VisibilityIcon} aria-hidden />
			<span>
				{revealValue}
			</span>
		{/if}
	</PinyaButton>
{:else if (_state === 'done' && onclickBuilder)}
	<PinyaButton
		{...props}
		title={titleBuilder ? titleBuilder(revealValue) : revealValue}
		onclick={onclickBuilder(revealValue)}
	>
		{#if bodySnippet}
			{@render bodySnippet?.(revealValue)}
		{:else }
			{revealValue}
		{/if}
	</PinyaButton>
{:else }
	{#if bodySnippet}
		{@render bodySnippet?.(revealValue)}
	{:else }
		{revealValue}
	{/if}
{/if}
