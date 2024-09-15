--!strict
--!native
--!optimize 2

local isDraft = require(script.Parent.isDraft)

type Draft<K = any, V = any> = { [K]: V }
type Reader<Args..., Return...> = (draft: Draft, Args...) -> Return...

--[=[
	@within table
	@function makeDraftSafeReadOnly
	@param fn T
	@return T

	A wrapper for functions that bypass metatables (like using rawget) that will
	make them draft-safe. `makeDraftSafeReadonly` should only be used on functions that will
	not mutate the table.

	This is used internally to wrap functions within Luau's table library that only perform read operations, and
	is exposed for your convenience.

	```luau
	local find = makeDraftSafeReadOnly(table.find)
	local concat = makeDraftSafeReadOnly(table.concat)

	local nextState = produce(state, function(draft)
		local value = find(draft.a, 1)
		print(concat(draft.b, ",")
	end)
    ```
]=]
local function makeDraftSafeReadOnly<TArgs..., TReturn...>(fn: Reader<TArgs..., TReturn...>): Reader<TArgs..., TReturn...>
	return function(draft, ...)
		local t = draft

		if isDraft(t) then
			t = rawget(t, "_clone") or rawget(t, "_base")
		end

		return fn(t, ...)
	end
end

return makeDraftSafeReadOnly
