import { expect, it } from "@rbxts/jest-globals";
import { None, produce } from "index";

it("should not mutate the original table", () => {
	const original = { number: 2 };

	const newValue = produce(original, (draft) => {
		draft.foo = true;
		draft.number += 2;
	});

	expect((newValue as Record<string, boolean | number>).foo).toBe(true);
	expect(newValue.number).toBe(4);
	expect((original as Record<string, boolean | number>).foo).toBeUndefined();
	expect(original.number).toBe(2);
	expect(original).never.toBe(newValue);
});

it("should not mutate nested tables", () => {
	const original = {
		modified: undefined,
		nested: {
			modified: undefined,
			nestedDeep: {
				modified: undefined,
			},
		},
	};

	const newValue = produce(original, (draft) => {
		draft.nested.modified = true;
		draft.nested.nestedDeep.modified = true;
	});

	expect(newValue.nested.modified).toBe(true);
	expect(newValue.nested.nestedDeep.modified).toBe(true);
	expect(original.nested.modified).toBeUndefined();
	expect(original.nested.nestedDeep.modified).toBeUndefined();
});

it("should return the return value of the recipe when not nil or None", () => {
	const override = { foo: true };

	const newValue = produce({}, () => {
		return override;
	});

	expect((newValue as Record<string, boolean>).foo).toBe(true);
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
