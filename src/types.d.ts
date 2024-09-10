type PrimitiveType = CheckablePrimitives[keyof Omit<CheckablePrimitives, "nil" | "userdata">];

/**
 * These should also never be mapped but must be tested after regular Map and Set
 */
// biome-ignore lint/suspicious/noExplicitAny: We do not care about the value of the weak tables
type WeakReferences = WeakMap<object, any> | WeakSet<object>;

type WritableDraft<T> = { -readonly [K in keyof T]: Draft<T[K]> };

export type Draft<T> = T extends PrimitiveType
	? T
	: T extends AtomicObject
		? T
		: T extends ReadonlyMap<infer K, infer V> // Map extends ReadonlyMap
			? Map<Draft<K>, Draft<V>>
			: T extends ReadonlySet<infer V> // Set extends ReadonlySet
				? Set<Draft<V>>
				: T extends WeakReferences
					? T
					: T extends object
						? WritableDraft<T>
						: T;
