import type Draft from "./Draft";

declare function getClone<TBase>(draft: Draft<TBase>): TBase;

export = getClone;
