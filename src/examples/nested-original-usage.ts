import original from "../original";
import produce from "../produce";

const value = {
	nested: {
		valueMap: new ReadonlyMap<string, number>(),
	},
};

const newValue = produce(value, (draft) => {
	draft;
	original(draft);

	draft.nested.valueMap;
	original(draft.nested.valueMap);
});
