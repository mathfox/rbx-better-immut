import { expect, it } from "@rbxts/jest-globals";
import Draft from "./Draft";
import makeDraftSafe from "./makeDraftSafe";

it("should return a draft-safe version of the given function", () => {
	function unsafe(t: object, k: string, v: unknown): void {
		rawset(t, k, v);
	}

	const draft = new Draft(identity<Record<string, string>>({}));

	const safe = makeDraftSafe(unsafe);
	safe(draft, "foo", "bar");

	expect(rawget(draft, "foo")).toBeUndefined();
	expect(draft.foo).toBe("bar");
});

it("should allow non-drafts in the returned draft-safe function", () => {
	const nonDraft = new Array<defined>();

	function insert(array: Array<defined>, value: defined): void {
		array.push(value);
	}

	const safe = makeDraftSafe(insert);

	expect(() => {
		safe(nonDraft, "foo");
	}).never.toThrow();

	expect(nonDraft[0]).toBe("foo");
});
