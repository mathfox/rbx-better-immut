--!strict
--!native
--!optimize 2

--[=[
	@within Immut

	Checks if a value can be wrapped with a draft.
    Tables without metatables are the only draftable values.
]=]
local function isDraftable(value: any): boolean
	if type(value) == "table" and getmetatable(value) == nil then
		return true
	end

	return false
end

return isDraftable
