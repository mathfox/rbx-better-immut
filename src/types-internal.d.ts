// from immer types-internal.ts

export type Objectish = AnyObject | AnyArray | AnyMap | AnySet;

export type AnyObject = { [key: string]: unknown };
type AnyArray = Array<unknown>;
type AnySet = Set<unknown>;
type AnyMap = Map<unknown, unknown>;
