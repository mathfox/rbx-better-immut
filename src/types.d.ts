export type DraftState<TInput> = TInput extends ReadonlyMap<infer TKey, infer TValue>
	? Map<DraftState<TKey>, DraftState<TValue>>
	: TInput extends ReadonlySet<infer TValue>
		? Set<DraftState<TValue>>
		: Writable<TInput>;
