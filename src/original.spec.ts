import { expect, it } from "@rbxts/jest-globals";
import Draft from "Draft";
import isDraft from "isDraft";

it("should return false when given a value that isn't a draft", () => {
	expect(isDraft(true)).toBe(false);
	expect(isDraft({})).toBe(false);
	expect(isDraft(setmetatable({}, {}))).toBe(false);
});

it("should return true when given a draft", () => {
	expect(isDraft(new Draft({}))).toBe(true);
});
