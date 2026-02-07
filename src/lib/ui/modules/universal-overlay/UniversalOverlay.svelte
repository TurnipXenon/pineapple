<!-- TODO: Documentation: consider documentation showcase -->

<!-- @component
Overlay that contains the dialog, settings, and site map

See panels:
- DialogPanel.svelte
 TODO: settings
 TODO: site map
 -->

<script lang="ts">
	import AresHappy from "$pkg/assets/characters/ares/ares_happy.webp";
	import CloseIcon from "$pkg/assets/icons/close.svg";
	import SettingsLogo from "$pkg/assets/icons/icon-settings.svg";
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManager";
	import { DialogState } from "$pkg/types/pineapple_fiber/DialogState";
	import { ButtonVariant, ImageIcon } from "$pkg/ui/elements/index";
	import GeneralSettingsModal from "$pkg/ui/modules/modals/general-settings/GeneralSettingsModal.svelte";
	import DialogPanel from "$pkg/ui/modules/universal-overlay/DialogPanel.svelte";
	import { getEnablePortraitContext } from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { onMount } from "svelte";
	import { modals } from "svelte-modals";
	import PinyaButton from "../../elements/PinyaButton/PinyaButton.svelte";
	import PinyaCard from "../../elements/PinyaCard/PinyaCard.svelte";

	let currentPortrait = $state(AresHappy);

	let hidePercent = $state(100);
	let hidePercentLinear = $state(100);
	let isHidden = $state(true);

	let enablePortrait = getEnablePortraitContext();

	onMount(() => {
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
			console.log(value, DialogState.Invisible, isHidden)
		});

		dialogManager.update(0);
	});
</script>

<div class="dialog-elements"
     aria-hidden={hidePercent >= (99 * 0.4)}
     style="--hidePercentWidth: -{hidePercent}vw;
            --hidePercentHeight: {hidePercentLinear}vh;">
	<div class="dialog-portrait-container" class:is-portrait-enabled={enablePortrait.value}>
		<img src={currentPortrait} alt="Ares" class="dialog-portrait" />
	</div>
	<div id="main-dialog-box-container">
		<PinyaCard id="dialog-name">
			<div class="fake-h1">Turnip {isHidden} {hidePercent}</div>
		</PinyaCard>
		<!-- todo: implement this properly later -->
		<!--<div id="dialog-scroll-indicator"></div>-->
		<div id="panel-container">
			<DialogPanel></DialogPanel>
			<div id="settings-menu-bar">
				<!-- close -->
				<PinyaButton
					buttonVariant={ButtonVariant.Image}
					title="Close conversation"
					onclick={()=>{dialogManager.toggleDialogOverlay();}}
				>
					<ImageIcon src={CloseIcon} aria-hidden="true" alt=""></ImageIcon>
				</PinyaButton>
				<PinyaButton
					title="Settings"
					buttonVariant={ButtonVariant.Image}
					onclick={()=>{modals.open(GeneralSettingsModal);}}
				>
					<ImageIcon src={SettingsLogo} aria-hidden="true" alt=""></ImageIcon>
				</PinyaButton>
			</div>
		</div>
	</div>
</div>

<!-- todo: consider keeping or not... -->
<!--{#if appState.allowDialog && isMounted && !enableUniversalOverlay.value}-->
<!--	<div id="fab-container" transition:slide>-->
<!--		<PinyaButton-->
<!--			classes="fab"-->
<!--			onclick={()=>{dialogManager.toggleDialogOverlay();}}-->
<!--		>-->
<!--			{#if enableUniversalOverlay.value}-->
<!--				<img class="turnip-icon" src={CloseIcon} alt="interactive floating action button represented as a turnip">-->
<!--			{:else }-->
<!--				<img class="turnip-icon" src={FABIcon} alt="interactive floating action button represented as a turnip">-->
<!--			{/if}-->
<!--		</PinyaButton>-->
<!--	</div>-->
<!--{/if}-->

<style lang="scss">
    @use "$styles/surface-colors" as *;

    #main-dialog-box-container {
        background-color: var(--bg-dialog);
        position: fixed;
        bottom: 0;
        width: var(--dialog-box-width); /*75em + 4em padding*/
        max-width: 100%;
        height: var(--dialog-box-height);
        /* radius-base is from dialog-text and 0.8lh is from dialog-box padding */
        border-radius: 0 2rem 0 0;

        :global(#panel-container > *:first-child) {
            flex: 1;
            overflow-y: auto;
            padding: 1.3lh 1em;
        }

        #panel-container {
            height: 100%;
            font-size: 1.5em;
            display: flex;
            flex-direction: row;

            #settings-menu-bar {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                padding-bottom: 0.2rem;
                padding-top: 0.5rem;
                gap: 0.5rem;
                margin: 0 0.4rem;
                overflow-y: auto;
            }
        }
    }

    :global {
        #settings-menu-bar {
            & > * {
                padding: 0.4rem;

                & > * {
                    width: 90%;
                }
            }

            .pinya-button {
                border-radius: 50%;
            }
        }
    }

    .dialog-elements {
        @extend %surface-dialog;
        position: fixed;
        z-index: 10;

		    &[aria-hidden="true"] {
				    opacity: 0;
				    pointer-events: none;
		    }
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
            width: 4rem;
            height: 4rem;
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

    .turnip-icon {
        width: 3rem;
    }
</style>
