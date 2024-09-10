import { expect, it } from "@rbxts/jest-globals";
import { isDraftable } from "index";

it("should return false when given a value that is not a table", () => {
	expect(isDraftable(1)).toBe(false);
	expect(isDraftable(true)).toBe(false);
	expect(isDraftable("string")).toBe(false);
	expect(isDraftable(undefined)).toBe(false);
});

it("should return false when given a table that has a metatable", () => {
	expect(isDraftable(setmetatable({}, {}))).toBe(false);
});

it("should return true when given a table with no metatable", () => {
	expect(isDraftable({})).toBe(true);
});
