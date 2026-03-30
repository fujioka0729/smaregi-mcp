import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { saveConfig } from "../config/config.js";
import { DEFAULT_IDP_HOST, DEFAULT_API_HOST, DEFAULT_SCOPES } from "../constants.js";

export function register(server: McpServer): void {
  server.tool(
    "smaregi_configure",
    "スマレジAPIの接続設定を保存します",
    {
      contract_id: z.string().describe("契約ID"),
      client_id: z.string().describe("クライアントID"),
      client_secret: z.string().describe("クライアントシークレット"),
    },
    async ({ contract_id, client_id, client_secret }) => {
      await saveConfig({
        contractId: contract_id,
        clientId: client_id,
        clientSecret: client_secret,
        idpHost: DEFAULT_IDP_HOST,
        apiHost: DEFAULT_API_HOST,
        scopes: DEFAULT_SCOPES,
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `設定を保存しました。\n契約ID: ${contract_id}\nクライアントID: ${client_id}`,
          },
        ],
      };
    }
  );
}
