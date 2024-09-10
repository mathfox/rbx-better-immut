// biome-ignore lint/suspicious/noExplicitAny: We do not really care about the shape of the
type AnyObject = Record<any, any>;

interface Draft<TBase = unknown> extends AnyObject {
	_base: TBase;
}

declare const Draft: new <TBase>(base: TBase) => Draft<TBase>;

export = Draft;
