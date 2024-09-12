import type None from "./None";

/**
 * A type that recursively makes the structure writable.
 *
 * This type does not really represent the actual `Draft` class type from Luau.
 */
type Draft<TInput> = TInput extends typeof None
	? TInput
	: TInput extends ReadonlyMap<infer TKey, infer TValue>
		? Map<Draft<TKey>, Draft<TValue>>
		: TInput extends ReadonlySet<infer TValue>
			? Set<Draft<TValue>>
			: { -readonly [TKey in keyof TInput]: Draft<TInput[TKey]> };

declare const Draft: new <TBase>(base: TBase) => Draft<TBase>;

export = Draft;
