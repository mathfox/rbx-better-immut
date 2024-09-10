import type Draft from "Draft";
import type None from "None";

declare function finishDraft<TValue>(
	value: TValue,
): TValue extends Draft<infer TBase> ? TBase : TValue extends typeof None ? undefined : TValue;

export = finishDraft;
