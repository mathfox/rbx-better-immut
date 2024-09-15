import { expect, it } from "@rbxts/jest-globals";
import produce from "./produce";
import readDraft from "./readDraft";

it("should not create a draft for nested values", () => {
	const originalValue = {
		value: 1,
		value_1: {
			value: 2,
			value_2: {
				value: 3,
				value_3: {
					value: 4,
				},
			},
		},
	};

	expect(
		produce(originalValue, (draft) => {
			// this is the read-only value
			const value = readDraft(draft, (value) => {
				const value_1 = value.value_1;

				const value_3 = value.value_1.value_2.value_3.value;

				return value;
			});

			const value_3 = value.value_1.value_2.value_3.value;

			expect(value.value_1.value_2).toBe(originalValue.value_1.value_2);
		}),
	).toBe(originalValue);
});

it("should create a draft when indexing nested values outside `readDraft` function body or value", () => {
	const originalValue = {
		value: 1,
		value_1: {
			value: 2,
			value_2: {
				value: 3,
				value_3: {
					value: 4,
				},
			},
		},
	};

	const newValue = produce(originalValue, (draft) => {
		const value = readDraft(draft, (value) => {
			const value_1 = value.value_1;

			const value_3 = value.value_1.value_2.value_3;

			return value;
		});

		// oops, we still read the value outside the reading block.

		const value_2 = draft.value_1.value_2.value_3;
	});

	expect(newValue).never.toBe(originalValue);

	expect(newValue).toEqual(originalValue);
});

it("should return a base table reference when no reader function was provided", () => {
	const originalValue = {
		value: 1,
		value_1: {
			value: 2,
			value_2: {
				value: 3,
				value_3: {
					value: 4,
				},
			},
		},
	};

	const newValue = produce(originalValue, (draft) => {
		const readValue = readDraft(draft);

		const nestedValue = readValue.value_1.value_2.value_3.value;
	});

	expect(newValue).toBe(originalValue);
});
