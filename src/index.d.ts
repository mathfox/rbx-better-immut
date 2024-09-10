import _None from "./None";
import * as _table from "./table";

import { Draft } from "./types-external";
import { Objectish } from "./types-internal";

declare namespace Immut {
	export const None: typeof _None;
	export const nothing: typeof None;
	export const table: typeof _table;

	export function createDraft<T extends Objectish>(base: T): Draft<T>;
	export const current: typeof finishDraft;
	export function finishDraft<T>(draft: Draft<T>): T;
	export function isDraft(value: unknown): boolean;
	export function isDraftable(value: unknown): boolean;
	export function original<T>(draft: Draft<T>): T;
	export function produce<T>(
		base: T,
		recipe: (draft: Draft<T>) => typeof draft | void | undefined | (T extends undefined ? typeof None : never),
	): T;
}

export = Immut;
