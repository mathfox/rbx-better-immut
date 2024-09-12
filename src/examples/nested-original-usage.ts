import original from "../original";
import produce from "../produce";

const value = {
	nested: {
		valueMap: new ReadonlyMap<string, number>(),
		callback: () => {
			return 3;
		},
	},
};

const newValue = produce(value, (draft) => {
	draft;
	original(draft);

	draft.nested.valueMap;
	draft.nested.valueMap.set("test", 3);
	original(draft.nested.valueMap);
});
