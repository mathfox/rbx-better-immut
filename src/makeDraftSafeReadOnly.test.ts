import { expect, it } from "@rbxts/jest-globals";
import Draft from "./Draft";
import makeDraftSafeReadOnly from "./makeDraftSafeReadOnly";
import { find } from "./table";

it("should return a draft-safe version of the given function", () => {
	function unsafe(t: object, k: string) {
		return rawget(t, k);
	}

	const safe = makeDraftSafeReadOnly(unsafe);

	const original: Record<string, object> = { foo: {} };
	const draft = new Draft(original);

	const bar: Record<string, unknown> = {};
	draft.bar = bar;

	expect(safe(draft, "foo")).toBe(original.foo);
	expect(safe(draft, "bar")).toBe(bar);
});

it("should return a function that does not create a clone of the draft", () => {
	function unsafe(t: object, k: string) {
		return rawget(t, k);
	}

	const safe = makeDraftSafeReadOnly(unsafe);

	const original = { foo: "bar" };
	const draft = new Draft(original);

	safe(draft, "foo");

	expect(rawget(draft, "_clone")).toBeUndefined();
});

it("should allow non-drafts in the returned draft-safe function", () => {
	const nonDraft = ["foo", "bar"];

	expect(() => {
		find(nonDraft, "bar");
	}).never.toThrow();

	expect(find(nonDraft, "bar")).toBe(2);
});
