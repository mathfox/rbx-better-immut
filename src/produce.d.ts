import type Draft from "Draft";
import type finishDraft from "finishDraft";

declare function produce<TBase, TOutput>(
	base: TBase,
	recipe: (draft: Draft<TBase>) => TOutput,
): TOutput extends void ? TBase : ReturnType<typeof finishDraft<TOutput>>;

export = produce;
