import type Draft from "../Draft";

const obj = {} as {
	readonly count: number;
	name: string;
};

type WritableObject = Draft<typeof obj>;
