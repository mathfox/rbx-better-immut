type Mutator<T extends object, Args extends unknown[], Return> = (draft: T, ...args: Args) => Return;

export declare function makeDraftSafe<T extends object, Args extends unknown[], Return>(
	fn: Mutator<T, Args, Return>,
): typeof fn;
