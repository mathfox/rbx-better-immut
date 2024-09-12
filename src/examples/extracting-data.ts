import None from "../None";
import produce from "../produce";

const value = {
	usersCoins: new Map<number, number>(),
};

const coins = produce(value, (draft) => {
	const coins = draft.usersCoins.get(1);

	if (coins === undefined) return None;

	return coins;
});

const inlineCoins = produce(value, (draft) => {
	return draft.usersCoins.get(1) || None;
});
