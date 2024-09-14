bun ./node_modules/roblox-ts/out/CLI/cli.js --rojo ./tests.project.json --type game \
&& bun --cwd ./tests/ patch-include.ts \
&& rojo build ./tests.project.json --output ./tests/tests-place.rbxl \
&& run-in-roblox --script ./tests/run-tests.luau --place ./tests/tests-place.rbxl