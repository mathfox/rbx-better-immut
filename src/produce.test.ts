import { expect, it } from "@rbxts/jest-globals";
import None from "./None";
import makeDraftSafeReadOnly from "./makeDraftSafeReadOnly";
import produce from "./produce";
import readDraft from "./readDraft";

it("should support returning nil when None is returned", () => {
	expect(
		produce("value", (draft) => {
			return None;
		}),
	).toBeUndefined();
});

it("should return the original primitive value", () => {
	expect(produce("value", () => {})).toBe("value");

	expect(produce(3, () => {})).toBe(3);
});

it("should not mutate the original table", () => {
	const original: Record<string, number> = { number: 2 };

	const newValue = produce(original, (draft: Record<string, number | boolean>) => {
		draft.foo = true;
		(draft as Record<string, number>).number += 2;
	});

	expect((newValue as Record<string, boolean | number>).foo).toBe(true);
	expect(newValue.number).toBe(4);
	expect((original as Record<string, boolean | number>).foo).toBeUndefined();
	expect(original.number).toBe(2);
	expect(original).never.toBe(newValue);
});

it("should not mutate nested tables", () => {
	type Nested = {
		modified: undefined | true;
		nested?: Nested;
	};

	const original: Nested = {
		modified: undefined,
		nested: {
			modified: undefined,
			nested: {
				modified: undefined,
			},
		},
	};

	const newValue = produce(original, (draft) => {
		assert(draft.nested);
		draft.nested.modified = true;
		assert(draft.nested.nested);
		draft.nested.nested.modified = true;
	});

	assert(newValue.nested);
	expect(newValue.nested.modified).toBe(true);
	assert(newValue.nested.nested);
	expect(newValue.nested.nested.modified).toBe(true);

	assert(original.nested);
	expect(original.nested.modified).toBeUndefined();
	assert(original.nested.nested);
	expect(original.nested.nested.modified).toBeUndefined();
});

it("should return the return value of the recipe when not nil or None", () => {
	const override: Record<string, boolean> = { foo: true };

	const newValue = produce({}, () => {
		return override;
	});

	expect(newValue.foo).toBe(true);
	expect(newValue).toBe(override);
});

it("should return nil when the return value of the recipe is None", () => {
	const newValue = produce({}, () => {
		return None;
	});

	expect(newValue).toBeUndefined();
});

it("should accept non-table non-draftable base", () => {
	expect(() => {
		produce(1, () => {});
	}).never.toThrow();

	expect(() => {
		produce(true, () => {});
	}).never.toThrow();

	expect(() => {
		produce("string", () => {});
	}).never.toThrow();

	expect(() => {
		produce(undefined, () => {});
	}).never.toThrow();
});

it("should be able to return non-table non-draftable values", () => {
	{
		const newValue = produce(undefined, () => {});

		expect(newValue).toBeUndefined();
	}

	{
		const newValue = produce(1, () => {});

		expect(newValue).toBe(1);
	}

	{
		const newValue = produce("string", () => {});

		expect(newValue).toBe("string");
	}

	{
		const newValue = produce(true, () => {});

		expect(newValue).toBe(true);
	}
});

it("should mutate maps", () => {
	const originalValue = new Map<string, number>();

	originalValue.set("first", 1);
	originalValue.set("second", 2);
	originalValue.set("third", 3);

	expect(produce(originalValue, (draft) => {})).toBe(originalValue);

	expect(
		produce(originalValue, (draft) => {
			draft.delete("third");
		}),
	).toStrictEqual({
		first: 1,
		second: 2,
	});
});

it("should not modify the table when nothing was done", () => {
	const originalValue = {
		value: 1,
		value_1: {
			value: 2,
		},
	};

	expect(produce(originalValue, (draft) => {})).toBe(originalValue);
});

it("should not mutate the value when it was only read", () => {
	const originalValue = new Map<string, {}>([["1", {}]]);

	const get = (value: Map<unknown, unknown>, key: unknown): unknown => {
		return value.get(key);
	};

	const safeGet = makeDraftSafeReadOnly(get);

	const newValue = produce(originalValue, (draft) => {
		const data = safeGet(draft, `${1}`);

		const anotherData = makeDraftSafeReadOnly<typeof draft>((value) => value.get(`${1}`))(draft);

		const data2 = readDraft(draft, (value) => value.get(`${1}`));
	});

	expect(newValue).toBe(originalValue);
});
