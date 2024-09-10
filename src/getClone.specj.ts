import { expect, it } from "@rbxts/jest-globals";
import Draft from "Draft";
import getClone from "getClone";

it("should return a draft's cloned table if it exists", () => {
	const draft = new Draft({});
	draft.foo = true;

	expect(rawget(draft, "_clone")).toBeDefined();

	const clone = getClone(draft);

	expect(rawget(draft, "_clone")).toBe(clone);
});

it("should create a clone if a draft does not have one", () => {
	const draft = new Draft({});

	expect(rawget(draft, "_clone")).toBeUndefined();

	const clone = getClone(draft);

	expect(rawget(draft, "_clone")).toBeDefined();
	expect(rawget(draft, "_clone")).toBe(clone);
});
