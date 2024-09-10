import type Draft from "Draft";

declare function isDraft(value: unknown): value is Draft;

export = isDraft;
