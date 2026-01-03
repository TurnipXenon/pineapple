<!-- @component
Overlay that contains the dialog, settings, and site map

See panels:
- DialogPanel.svelte
 TODO: settings
 TODO: site map
 -->

<script lang="ts">
	import FABIcon from "$pkg/assets/bg_tiled/bg_tiled_turnip.png";

	import AresHappy from "$pkg/assets/characters/ares/ares_happy.webp";
	import CloseIcon from "$pkg/assets/icons/close.svg";
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManager";
	import { enableUniversalOverlay } from "$pkg/components/dialog_manager/DialogManagerStore";
	import { m } from "$pkg/external/paraglide/messages";
	import { DialogState } from "$pkg/types/pineapple_fiber/DialogState";
	import { ColorScheme } from "$pkg/ui/elements/index";
	import DialogPanel from "$pkg/ui/modules/universal-overlay/DialogPanel.svelte";
	import SettingsPanel from "$pkg/ui/modules/universal-overlay/SettingsPanel.svelte";
	import { appState } from "$pkg/ui/templates/PinyaPageLayout/pinyaPageLayoutRunes.svelte.js";
	import {
		getEnableDialogOverlayContext,
		getEnablePortraitContext,
		getOverlayTypeContext
	} from "$pkg/util/context/pineappleBaseContextDefinitions";
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import PinyaButton from "../../elements/PinyaButton/PinyaButton.svelte";
	import PinyaCard from "../../elements/PinyaCard/PinyaCard.svelte";

	let currentPortrait = $state(AresHappy);
	let isMounted = $state(false);

	let hidePercent = $state(100);
	let hidePercentLinear = $state(100);
	let isHidden = $state(true);

	let _enableUniversalOverlay = getEnableDialogOverlayContext();
	// todo: fix bug here where the writable overwrites the stores
	enableUniversalOverlay.subscribe((value) => {
		_enableUniversalOverlay.value = value;
	});
	let _overlayType = getOverlayTypeContext();
	console.log("beforeMount", _overlayType.value);

	enableUniversalOverlay.set(appState.enableDialogOnByDefault ?? false);

	let enablePortrait = getEnablePortraitContext();

	onMount(() => {
		// region cache
		enableUniversalOverlay.set(_enableUniversalOverlay.value);
		// endregion cache

		dialogManager.currentPortrait.subscribe((value) => {
			if (value) {
				currentPortrait = value;
			}
		});

		dialogManager.hidePercent.subscribe((value) => {
			hidePercent = value * 0.4;
			isHidden = false;
		});

		dialogManager.hidePercentLinear.subscribe((value) => {
			hidePercentLinear = value * 0.4;
		});

		dialogManager.currentReadableState.subscribe((value) => {
			isHidden = value === DialogState.Invisible;
		});

		dialogManager.update(0);
		isMounted = true;
	});
</script>

<div class="dialog-elements"
     hidden={isHidden}
     style="--hidePercentWidth: -{hidePercent}vw;
            --hidePercentHeight: {hidePercentLinear}vh;">
	<div class="dialog-portrait-container" class:is-portrait-enabled={enablePortrait.value}>
		<img src={currentPortrait} alt="Ares" class="dialog-portrait" />
	</div>
	<div id="main-dialog-box-container">
		<PinyaCard id="dialog-name">
			{#if _overlayType.value === 'dialog'}
				<div class="fake-h1">Turnip</div>
			{:else if _overlayType.value === 'site-map'}
				<div class="fake-h1">Turnip</div>
			{:else}
				<div class="fake-h1">{m.settings()}</div>
			{/if}
		</PinyaCard>
		<!-- todo: implement this properly later -->
		<!--<div id="dialog-scroll-indicator"></div>-->
		<div id="panel-container">
			{#if _overlayType.value === 'dialog'}
				<DialogPanel></DialogPanel>
			{:else if _overlayType.value === 'site-map'}
				<DialogPanel></DialogPanel>
			{:else}
				<SettingsPanel></SettingsPanel>
			{/if}
			<div id="settings-menu-bar">
				<!-- settings -->
				<PinyaButton
					colorScheme={_overlayType.value === 'settings' ? ColorScheme.Secondary : undefined}
					onclick={()=>{_overlayType.value = 'settings';}}
				>
					S
				</PinyaButton>
				<!-- site map -->
				<PinyaButton
					colorScheme={_overlayType.value === 'site-map' ? ColorScheme.Secondary : undefined}
					onclick={()=>{_overlayType.value = 'site-map';}}
				>
					M
				</PinyaButton>
				<!-- convo (active) -->
				<PinyaButton
					colorScheme={_overlayType.value === 'dialog' ? ColorScheme.Secondary : undefined}
					onclick={()=>{_overlayType.value = "dialog";}}
				>
					C
				</PinyaButton>
				<!-- close -->
				<PinyaButton
					title="close overlay"
					onclick={()=>{dialogManager.toggleDialogOverlay();}}
				>
					X
				</PinyaButton>
			</div>
		</div>
	</div>
</div>


{#if appState.allowDialog && isMounted && !_enableUniversalOverlay.value}
	<div id="fab-container" transition:slide>
		<PinyaButton
			classes="fab"
			onclick={()=>{dialogManager.toggleDialogOverlay();}}
		>
			{#if _enableUniversalOverlay.value}
				<img class="turnip-icon" src={CloseIcon} alt="interactive floating action button represented as a turnip">
			{:else }
				<img class="turnip-icon" src={FABIcon} alt="interactive floating action button represented as a turnip">
			{/if}
		</PinyaButton>
	</div>
{/if}

<style>
    #main-dialog-box-container {
        background-color: var(--bg-dialog);
        position: fixed;
        bottom: 0;
        width: var(--dialog-box-width); /*75em + 4em padding*/
        max-width: 100%;
        height: var(--dialog-box-height);
        /* radius-base is from dialog-text and 0.8lh is from dialog-box padding */
        border-radius: 0 2rem 0 0;

        /*todo: implement later*/
        /*#dialog-scroll-indicator {*/
        /*    position: fixed;*/
        /*    border-radius: 0 2rem 0 0;*/
        /*    width: 100%;*/
        /*    height: 1.3lh;*/
        /*    background: #2A7B9B;*/
        /*    background: linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%);*/
        /*}*/

        #panel-container {
            height: 100%;
            font-size: 1.5em;
            display: flex;
            flex-direction: row;

            :global(&>*:first-child) {
                flex: 1;
                overflow-y: auto;
                border-width: 0 2px 0 0;
                padding: 1.3lh 1em;
                border-color: var(--color-primary-50-900);
            }

            #settings-menu-bar {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding-bottom: 0.2rem;
                gap: 0.5rem;
                margin: 0 0.4rem;

                * {
                    padding: 0.4rem;
                }
            }
        }
    }

    .dialog-elements {
        position: fixed;
        z-index: 10;
    }

    .dialog-elements:dir(ltr) {
        left: 0;
    }

    .dialog-elements:dir(rtl) {
        right: 0;
    }

    .dialog-elements > div {
        transform: translateY(var(--hidePercentHeight));
    }

    :global {
        #dialog-name {
            padding: 0 2rem;
            width: unset;
            position: fixed;

            &:dir(ltr) {
                /* for centering vertically */
                transform: translateX(clamp(0em, 5vw - 0.5em, 1em)) translateY(-50%);
            }

            &:dir(rtl) {
                /* for centering vertically */
                transform: translateX(calc(clamp(0em, 5vw - 0.5em, 1em) * -1)) translateY(-50%);
            }
        }
    }

    .dialog-portrait-container {
        position: fixed;
        bottom: 0;
        height: clamp(30rem, 75vw, 40rem);
        width: auto;

        &:not(.is-portrait-enabled) {
            display: none;
        }
    }

    .dialog-portrait-container:dir(ltr) {
        transform: translateX(var(--hidePercentWidth));
        left: clamp(-4rem, calc(5vw - 5em), 0rem);
    }

    .dialog-portrait-container:dir(rtl) {
        transform: translateX(calc(var(--hidePercentWidth) * -1));
        right: clamp(-4rem, calc(5vw - 5em), 0rem);
    }

    .dialog-portrait {
        height: 100%;
    }

    .dialog-portrait:dir(rtl) {
        transform: scaleX(-1);
    }

    :global(html) {
        --bg-dialog: rgba(255, 247, 225, 0.9);
    }

    :global(html.dark) {
        --bg-dialog: rgba(76, 71, 59, 0.9);
    }

    :global {
        .fab {
            position: relative;
            transform: scale3d(1, 1, 1.5);
            background-color: var(--color-tertiary-500);
            padding: 0.3rem;
            width: clamp(2rem, 5vw, 4rem);
            border-radius: 50%;
            z-index: 100;
            box-shadow: 3px 3px 3px var(--shadow-color);
            margin-bottom: var(--fab-margin);

            &:dir(ltr) {
                margin-right: var(--fab-margin);
            }

            &:dir(rtl) {
                margin-left: var(--fab-margin);
            }

            & > img {
                width: 100%;
                filter: brightness(0) invert(1);
            }
        }
    }

    #fab-container {
        position: fixed;
        bottom: 0;

        &:dir(ltr) {
            right: 0;
        }

        &:dir(rtl) {
            left: 0;
        }
    }

</style>
