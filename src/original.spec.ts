import { expect, it } from "@rbxts/jest-globals";
import produce from "./produce";
import original from "./original";

it("should return reference to original table", () => {
	const originalValue = {};

	produce(originalValue, (draft) => {
		expect(original(draft)).toBe(originalValue);
	});
});

it("should return reference to original tables for nested structures", () => {
	const originalValue = {
		nestedValue: {
			secondNestedValue: {},
		},
	};

	produce(originalValue, (draft) => {
		expect(original(draft.nestedValue.secondNestedValue)).toBe(originalValue.nestedValue.secondNestedValue);
	});
});
