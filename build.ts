import { execSync } from "child_process";

execSync(
  'npx esbuild ./src/index.ts --bundle --platform=node --format=esm --outfile=./bin/smaregi-mcp.js --banner:js="#!/usr/bin/env node" --minify',
  { stdio: "inherit" }
);

execSync("chmod +x ./bin/smaregi-mcp.js");
console.log("Build complete: bin/smaregi-mcp.js");
