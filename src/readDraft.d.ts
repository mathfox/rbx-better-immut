/**
 * Should be used when we only want to read some data from the `Draft`.
 * When reading from the draft inside a `produce` function body we still invoke `__index`,
 * which will create a draft for the indexed value.
 *
 * This function should be used with extra caution.
 */
declare function readDraft<TBase, TReturn>(
	draft: TBase,
	reader?: (draft: TBase) => TReturn,
): typeof reader extends Callback ? TReturn : TBase;

export = readDraft;
