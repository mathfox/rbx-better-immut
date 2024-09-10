--!strict
--!native
--!optimize 2

type Callback = (...any) -> ...any

type TryProps = {
	onYield: (callback: Callback) -> (),
	onError: (callback: Callback) -> (),
}

--[[
	Packs a number of arguments into a table and returns its length.

	Used to cajole varargs without dropping sparse values.
]]
local function pack(...)
	return select("#", ...), { ... }
end

--[[
    Returns first value (success), and packs all following values.
]]
local function packResult(success: boolean, ...): (boolean, number, { unknown })
	return success, select("#", ...), { ... }
end

local function createTry(props: TryProps)
	--[=[
        Calls the given function and returns the result.
        If the function yields or throws an error, the thread is closed and an error is thrown.
        Regardless of the outcome, the `finally` function is called to clean up any resources.

        @param callback The function to run.
        @param finally Cleanup logic to run before error handling.
        @param ... Arguments to pass to the callback.
        @return ... The results of the callback.
    ]=]
	local function try<TOutput, TArgs...>(callback: (TArgs...) -> TOutput | nil, finally: Callback | nil, ...: TArgs...): TOutput
		local thread = coroutine.create(callback)
		local success, resultCount, result = packResult(coroutine.resume(thread, ...))

		if finally then
			finally()
		end

		-- check whether the thread was yielded.
		if coroutine.status(thread) ~= "dead" then
			coroutine.close(thread)

			props.onYield(callback)
		elseif not success then
			props.onError(callback)
		end

		return unpack(result :: { any }, 1, resultCount)
	end

	return try
end

--[=[
	Calls the given function and returns the result.
    If the function yields or throws an error, the thread is closed and an error is thrown.
    Regardless of the outcome, the `finally` function is called to clean up any resources.

	@param callback The function to run.
	@param finally Cleanup logic to run before error handling.
	@param ... Arguments to pass to the callback.
	@return ... The results of the callback.
]=]
local function try<TOutput, TArgs...>(callback: (TArgs...) -> TOutput | nil, finally: (...any) -> ...any | nil, ...: TArgs...): TOutput
	local thread = coroutine.create(callback)
	--local success, resultCount, result = packResult(coroutine.resume(thread, ...))
	local success, result = coroutine.resume(thread, ...)

	if finally then
		finally()
	end

	-- check whether the thread was yielded.
	if coroutine.status(thread) ~= "dead" then
		coroutine.close(thread)

		local source, line, name = debug.info(callback, "sln")

		error(
			"Yielding is not allowed in produce functions. "
				.. `\nFunction defined at: {source}:{line}`
				.. if name == "" then "" else ` function {name}`
		)
	elseif not success then
		local source, line, name = debug.info(callback, "sln")

		error(
			"An error occurred while running produce function"
				.. `\nFunction defined at: {source}:{line}`
				.. (if name == "" then "" else ` function {name}`)
				.. `\nError: {result}`
		)
	end

	-- TODO: Luau does not allow { unknown } type to be unpacked.
	--return unpack(result :: { any }, 1, resultCount)

	return result
end

return try
