import type { DraftState } from "../types";

const obj = {} as {
	readonly count: number;
	name: string;
};

type WritableObject = DraftState<typeof obj>;
