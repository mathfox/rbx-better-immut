import type Draft from "./Draft";

declare function original<TBase>(draft: Draft<TBase>): TBase;

export = original;
