import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

export function register(server: McpServer): void {
  server.tool(
    "smaregi_api_list_paths",
    "スマレジAPIの既知エンドポイント一覧を表示します",
    {},
    async () => {
      try {
        // バンドル後も動作するよう、複数のパスを試行
        const candidates = [
          path.join(path.dirname(fileURLToPath(import.meta.url)), "../../dist/paths.json"),
          path.join(path.dirname(fileURLToPath(import.meta.url)), "../dist/paths.json"),
          path.join(process.cwd(), "dist/paths.json"),
        ];

        let raw: string | null = null;
        for (const candidate of candidates) {
          try {
            raw = await fs.readFile(candidate, "utf-8");
            break;
          } catch {
            continue;
          }
        }

        if (!raw) {
          throw new Error("paths.json が見つかりません");
        }

        const paths = JSON.parse(raw) as Array<{
          path: string;
          methods: string[];
          description: string;
        }>;

        const lines = paths.map(
          (p) => `${p.methods.join(",")} ${p.path} - ${p.description}`
        );

        return {
          content: [
            {
              type: "text" as const,
              text: `スマレジAPI エンドポイント一覧:\n\n${lines.join("\n")}`,
            },
          ],
        };
      } catch (e) {
        return {
          content: [{ type: "text" as const, text: `エラー: ${e}` }],
          isError: true,
        };
      }
    }
  );
}
