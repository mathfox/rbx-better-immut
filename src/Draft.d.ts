type PrimitiveType = CheckablePrimitives[keyof Omit<CheckablePrimitives, "userdata" | "function" | "table">];

/** Object types that should never be mapped */
type AtomicObject = Callback | Promise<any>;

/**
 * A type that recursively makes the structure writable.
 *
 * This type does not really represent the actual `Draft` class type from Luau.
 */
type Draft<TInput> = TInput extends AtomicObject
	? TInput
	: TInput extends ReadonlyMap<infer TKey, infer TValue>
		? Map<Draft<TKey>, Draft<TValue>>
		: TInput extends ReadonlySet<infer TValue>
			? Set<Draft<TValue>>
			: TInput extends WeakMap<any, any> | WeakSet<any>
				? TInput
				: TInput extends PrimitiveType
					? TInput
					: TInput extends object
						? { -readonly [TKey in keyof TInput]: Draft<TInput[TKey]> }
						: TInput;

declare const Draft: new <TBase>(base: TBase) => Draft<TBase>;

export = Draft;
