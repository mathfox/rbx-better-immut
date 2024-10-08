--!strict
--!native
--!optimize 2

local isDraft = require(script.Parent.isDraft)
local None = require(script.Parent.None)

--[=[
	@within Immut
	@function current
	@param draft Draft
	@return table

	Returns a snapshot of the current state of a draft. This can be expensive,
	so use it sparingly.

	This function is identical to [`finishDraft`](/api/Immut#finishDraft). It's
	possible that this could change, though, so you should prefer `current` when
	writing producers.

	## Example

	```lua
	local state = {}

	local newState = produce(state, function(draft)
		draft.foo = "bar"

		print(current(draft)) -- prints { foo = "bar" }

		draft.foo = "baz"

		print(current(draft)) -- prints { foo = "baz" }
	end)
    ```
]=]

--[=[
	@within Immut
	@param draft T
	@return T?

	:::tip
	This function is used internally. If you need the same functionality
	`finishDraft` provides, consider using [`current`](/api/Immut#current).
	:::

	Finalize a draft. When given [`None`](/api/Immut#None), returns `nil`.
    When given a non-draft value, returns that value.
]=]
local function finishDraft<TBase>(draft: TBase): TBase | nil
	if (draft :: any) == None then
		return nil
	end

	if not isDraft(draft) then
		return draft
	end

	local final = rawget(draft :: any, "_clone")

	if final == nil then
		return rawget(draft :: any, "_base")
	end

	for key, value in final do
		final[key] = finishDraft(value)
	end

	return final
end

return finishDraft
