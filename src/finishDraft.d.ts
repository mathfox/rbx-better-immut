import type None from "./None";

declare function finishDraft<TValue>(value: TValue): TValue extends typeof None ? undefined : TValue;

export = finishDraft;
