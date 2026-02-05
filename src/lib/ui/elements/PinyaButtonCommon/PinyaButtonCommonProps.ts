import { type GeneralUIProps } from "$pkg/ui/elements/GeneralUIProps";
import { ButtonVariant } from "$pkg/ui/elements/PinyaButtonCommon/ButtonVariant";

export type PinyaButtonCommonProps =
	& GeneralUIProps
	& {
	/** @deprecated */
	paddingClass?: string;
	buttonVariant?: ButtonVariant;
	/** @deprecated */
	colorClass?: string;
	/** @deprecated */
	classes?: string;
}
