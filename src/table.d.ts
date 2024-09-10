import makeDraftSafe from "./makeDraftSafe";

import makeDraftSafeReadOnly from "./makeDraftSafeReadOnly";

export function remove<TValue>(array: ReadonlyArray<TValue>, number?: number): TValue | undefined;

export function insert<TValue>(array: ReadonlyArray<TValue>, value: TValue): void;

export function insert<TValue>(array: ReadonlyArray<TValue>, pos: number, value: TValue): void;

export function find<TValue>(array: ReadonlyArray<TValue>, value: TValue, init?: number): number | undefined;

export function concat<TValue extends string | number>(
	arr: ReadonlyArray<TValue>,
	sep?: string,
	i?: number,
	j?: number,
): string;

export declare const sort: typeof table.sort;

export declare const clear: typeof table.clear;

export { makeDraftSafe, makeDraftSafeReadOnly };
