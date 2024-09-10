export type DraftValue<TInput> = TInput extends ReadonlyMap<infer TKey, infer TValue>
	? Map<DraftValue<TKey>, DraftValue<TValue>>
	: TInput extends ReadonlySet<infer TValue>
		? Set<DraftValue<TValue>>
		: TInput;
