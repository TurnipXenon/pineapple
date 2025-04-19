import type { HTMLAnchorAttributes } from "svelte/elements";
import type { PinyaButtonCommonProps } from "../PinyaButtonCommon/PinyaButtonCommonProps";
import type { WrapperProps } from "$pkg/ui/elements/index";

export type PinyaAnchorButtonProps = WrapperProps
	& HTMLAnchorAttributes
	& PinyaButtonCommonProps;