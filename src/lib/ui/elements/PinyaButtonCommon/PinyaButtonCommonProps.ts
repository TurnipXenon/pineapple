import { type GeneralUIProps } from "$pkg/ui/elements/GeneralUIProps";
import { ButtonVariant } from "$pkg/ui/elements/PinyaButtonCommon/ButtonVariant";

export type PinyaButtonCommonProps =
	& GeneralUIProps
	& {
	paddingClass?: string;
	buttonVariant?: ButtonVariant;
	colorClass?: string;
	classes?: string;
}
