--!strict
--!native
--!optimize 2

local function getClone(draft)
	local clone = rawget(draft, "_clone")

	if clone == nil then
		clone = table.clone(rawget(draft, "_base"))
		rawset(draft, "_clone", clone)
	end

	return clone
end

return getClone
