type Reader<TBase extends object, TArgs extends ReadonlyArray<unknown>, TReturn> = (
	draft: TBase,
	...args: TArgs
) => TReturn;

declare function makeDraftSafeReadOnly<
	TBase extends object,
	const TArgs extends ReadonlyArray<unknown> = [],
	const TReturn = unknown,
>(fn: Reader<TBase, TArgs, TReturn>): typeof fn;

export = makeDraftSafeReadOnly;
