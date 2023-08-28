export interface BehaviorNode<Argument, Result> {
	process: (nodeArgs: Argument) => Result;
}
