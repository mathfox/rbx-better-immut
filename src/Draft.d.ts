import type { DraftState } from "types";

type Draft<TBase = unknown> = DraftState<TBase> & {
	_base: TBase;
};

declare const Draft: new <TBase>(base: TBase) => Draft<TBase>;

export = Draft;
