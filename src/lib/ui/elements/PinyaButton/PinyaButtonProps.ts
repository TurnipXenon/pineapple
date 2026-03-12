import type { HTMLButtonAttributes } from "svelte/elements";
import type { PinyaButtonCommonProps } from "../PinyaButtonCommon/PinyaButtonCommonProps";
import type { WrapperProps } from "$pkg/ui/elements/index";

export type PinyaButtonProps = WrapperProps & HTMLButtonAttributes & PinyaButtonCommonProps;
