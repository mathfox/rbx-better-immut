import { expect, it } from "@rbxts/jest-globals";
import original from "./original";
import produce from "./produce";

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
