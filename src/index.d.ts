import makeDraftSafe from "./makeDraftSafe";

import makeDraftSafeReadOnly from "./makeDraftSafeReadOnly";

import type Draft from "Draft";
import table from "./table";

import None from "None";
import finishDraft from "finishDraft";
import isDraft from "isDraft";
import isDraftable from "isDraftable";
import original from "original";
import produce from "produce";

export function createDraft<TBase extends object>(base: TBase): Draft<TBase>;

export { finishDraft, finishDraft as current, isDraft, isDraftable, original, produce, table, None, None as nothing };

export { makeDraftSafe, makeDraftSafeReadOnly };
