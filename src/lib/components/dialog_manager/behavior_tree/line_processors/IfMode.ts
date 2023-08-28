// interpreter states
export enum IfMode {
	Search, // search for the next if statement
	Ignore, // ignore everything until we find endif
	Evaluated, // do normal search until we find elseif, else, or endif, then ignore
	EvaluateNext // find the next elseif, else, or endif and evaluate if possible
}
