--!strict
--!native
--!optimize 2

local isDraft = require(script.Parent.isDraft)

type Draft<K = any, V = any> = { [K]: V }
type Reader<Args..., Return...> = (draft: Draft, Args...) -> Return...

local function readDraft<TReturn, TArgs...>(draft: Draft, reader: ((draft: Draft) -> TReturn) | nil): Draft | TReturn
	local t = draft

	if isDraft(t) then
		t = rawget(t, "_clone") or rawget(t, "_base")
	end

	return if reader == nil then t else reader(t)
end

return readDraft
