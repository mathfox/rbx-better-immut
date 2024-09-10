import { expect, it } from "@rbxts/jest-globals";
import Draft from "./Draft";
import None from "./None";
import finishDraft from "./finishDraft";

it("should return the given value when it is not a draft", () => {
	const base = {};

	expect(finishDraft(base)).toBe(base);
	expect(finishDraft(1)).toBe(1);
	expect(finishDraft("foo")).toBe("foo");
	expect(finishDraft(false)).toBe(false);
	expect(finishDraft(undefined)).toBeUndefined();
});

it("should return the original table when the given draft was not modified", () => {
	const original = { foo: true };

	const draft = new Draft(original);

	const finished = finishDraft(draft);

	expect(finished).toBe(original);
});

it("should return a new table when the given draft was modified", () => {
	const original: Record<string, boolean> = { foo: true };

	const draft = new Draft(original);
	draft.bar = true;

	const finished = finishDraft(draft) as unknown as Record<string, boolean>;
	expect(finishDraft).never.toBe(original);
	expect(finished.foo).toBe(true);
	expect(finished.bar).toBe(true);
});

it("should not mutate non-draft tables", () => {
	const original = table.freeze({ foo: true });

	expect(() => {
		finishDraft(original);
	}).never.toThrow();
});

it("should return nil if None is provided", () => {
	expect(finishDraft(None)).toBeUndefined();
});
