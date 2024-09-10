const file = Bun.file("./RuntimeLib.lua");
await Bun.write("../include/RuntimeLib.lua", file);
console.log("Successfully patched include")