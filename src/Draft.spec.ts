import { describe, expect, it } from "@rbxts/jest-globals";
import Draft from "Draft";
import isDraft from "isDraft";

describe("newindex", () => {
	it("should not mutate the original table", () => {
		const base: Record<string, string> = {
			a: "foo",
		};

		const draft = new Draft(base);
		draft.a = "bar";
		draft.b = "baz";

		expect(base.a).toBe("foo");
		expect(base.b).toBeUndefined();
	});

	it("should mutate the cloned table", () => {
		const base: Record<string, string> = { a: "foo" };

		const draft = new Draft(base);
		draft.a = "bar";
		draft.b = "baz";

		expect(base.a).toBe("foo");

		const clone = rawget(draft, "_clone") as unknown as Record<string, string>;

		expect(clone.a).toBe("bar");
		expect(clone.b).toBe("baz");
	});

	it("should clone the table when it has first been modified", () => {
		const draft = new Draft(identity<Record<string, string>>({ a: "foo" }));
		expect(rawget(draft, "_clone")).toBeUndefined();

		draft.b = "bar";

		const clone = rawget(draft, "_clone") as unknown as Record<string, string>;

		expect(clone).toBeDefined();
		expect(clone.a).toBe("foo");
		expect(clone.b).toBe("bar");
	});

	it("should respect setting nil values", () => {
		const original: Record<string, boolean | undefined> = { a: true };

		const draft = new Draft(original);
		draft.a = undefined;

		expect(draft.a).toBeUndefined();
		expect(original.a).toBeDefined();
	});
});

describe("index", () => {
	it("should return new values from the cloned table", () => {
		const draft = new Draft(identity<Record<string, string>>({ a: "foo" }));
		draft.a = "bar";
		draft.b = "baz";

		const clone = rawget(draft, "_clone") as unknown as Record<string, string>;

		expect(draft.a).toBe(clone.a);
		expect(draft.b).toBe(clone.b);
	});

	it("should return unmodified values from the original table", () => {
		const base: Record<string, string> = { a: "foo" };

		const draft = new Draft(base);
		draft.b = "baz";

		expect(draft.a).toBe(base.a);
	});

	it("should turn nested tables into drafts when indexed", () => {
		const draft = new Draft({
			nested: {
				doubleNested: {},
			},
		}) as unknown as Record<string, Record<string, object>>;

		expect(isDraft(draft)).toBe(true);
		expect(isDraft(draft.nested)).toBe(true);
		expect(isDraft(draft.nested.doubleNested)).toBe(true);
	});

	it("should return the same nested draft when indexed more than once", () => {
		const draft = new Draft({
			nested: {
				doubleNested: {},
			},
		});

		const nested1 = draft.nested;
		const nested2 = draft.nested;

		expect(nested1).toBe(nested2);
		expect(nested2).toBe(nested1);
	});
});

describe("iter", () => {
	it("should iterate through base table when unmodified and cloned table when modified", () => {
		const base: Record<number, string> = {};

		for (const i of $range(1, 10)) {
			base[i] = "original";
		}

		const draft = new Draft(base);

		for (const [key, value] of draft as unknown as Map<number, string>) {
			expect(value).toBe("original");
			draft[key] = "modified";
		}

		const clone = rawget(draft, "_clone") as unknown as Record<number, string>;

		for (const [i, v] of draft as unknown as Map<number, string>) {
			expect(v).toBe("modified");
			expect(clone[i]).toBe("modified");
			expect(base[i]).toBe("original");
		}
	});

	it("should return drafts for any nested tables", () => {
		const base: Record<string, object> = {
			a: {},
			b: {},
			c: {},
		};

		const draft = new Draft(base);

		for (const [k, v] of draft as unknown as Map<string, object>) {
			expect(isDraft(v)).toBe(true);
			expect(rawget(v, "_base")).toBe(base[k]);
		}
	});
});

describe("len", () => {
	it("should return the correct number of values", () => {
		const original = ["foo", "bar", "baz"];

		const draft = new Draft(original) as unknown as Array<string>;

		expect(original.size()).toBe(3);
		expect(draft.size()).toBe(3);

		draft[3] = "qux";

		expect(draft.size()).toBe(4);
	});
});
