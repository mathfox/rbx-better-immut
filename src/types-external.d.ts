// from immer types-external.ts

import { AnyObject } from "./types-internal";

type PrimitiveType = number | string | boolean;

type AtomicObject = Callback | Promise<unknown>;

/**
 * If the lib "ES2015.Collection" is not included in tsconfig.json,
 * types like ReadonlyArray, WeakMap etc. fall back to `any` (specified nowhere)
 * or `{}` (from the node types), in both cases entering an infinite recursion in
 * pattern matching type mappings
 * This type can be used to cast these types to `void` in these cases.
 */
type IfAvailable<T, Fallback = void> =
	// fallback if any
	true | false extends (T extends never ? true : false)
		? Fallback // fallback if empty type
		: keyof T extends never
		? Fallback // original type
		: T;

/**
 * These should also never be mapped but must be tested after regular Map and
 * Set
 */
type WeakReferences = IfAvailable<WeakMap<AnyObject, unknown>> | IfAvailable<WeakSet<AnyObject>>;

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
