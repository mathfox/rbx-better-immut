interface Draft<TBase> extends Record<any, any> {
	_base: TBase;
}

declare const Draft: new <TBase>(base: TBase) => Draft<TBase>;

export = Draft;
