--!strict
--!native
--!optimize 2

--[=[
	@class Immut

	An immutable data library based on Immer.js
]=]

local Draft = require(script.Draft)
local finishDraft = require(script.finishDraft)
local isDraft = require(script.isDraft)
local isDraftable = require(script.isDraftable)
local original = require(script.original)
local produce = require(script.produce)
local table = require(script.table)
local None = require(script.None)
local makeDraftSafe = require(script.makeDraftSafe)
local makeDraftSafeReadOnly = require(script.makeDraftSafeReadOnly)

return {
	createDraft = Draft.new,
	finishDraft = finishDraft,
	current = finishDraft,
	isDraft = isDraft,
	isDraftable = isDraftable,
	original = original,
	produce = produce,
	table = table,
	None = None,
	nothing = None,

	makeDraftSafe = makeDraftSafe,
	makeDraftSafeReadOnly = makeDraftSafeReadOnly,
	readDraft = require(script.readDraft),

	remove = table.remove,
	sort = table.sort,
	clear = table.clear,
	find = table.find,
	concat = table.concat,
	insert = table.insert,
}
