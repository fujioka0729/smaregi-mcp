import type { Config } from "../config/schema.js";
import { getAccessToken } from "../auth/token-manager.js";

/** スマレジAPIリクエスト */
export async function apiRequest(
  config: Config,
  method: string,
  path: string,
  query?: Record<string, string>,
  body?: unknown
): Promise<unknown> {
  const accessToken = await getAccessToken(config);
  const url = new URL(`${config.apiHost}/${config.contractId}/pos${path}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `スマレジAPI エラー (${method} ${path} → ${response.status}): ${errorBody}`
    );
  }

  // 204 No Content の場合
  if (response.status === 204) {
    return { success: true };
  }

  return response.json();
}
