export declare function remove<T>(arr: Array<T>, number?: number): T | undefined;
export declare function insert<T>(arr: Array<T>, value: T): void;
export declare function insert<T>(arr: Array<T>, pos: number, value: T): void;
export declare function find<T>(arr: Array<T>, value: T, init?: number): number | undefined;
export declare function concat<T extends string | number>(arr: Array<T>, sep?: string, i?: number, j?: number): string;
export declare const sort: typeof table.sort;
export declare const clear: typeof table.clear;

export { makeDraftSafe } from "./makeDraftSafe";
export { makeDraftSafeReadOnly } from "./makeDraftSafeReadOnly";
