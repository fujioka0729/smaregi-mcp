import type { Config } from "../config/schema.js";
import { apiRequest } from "./client.js";

/** 全ページ取得（limit=100で繰り返し） */
export async function fetchAllPages(
  config: Config,
  path: string,
  query?: Record<string, string>
): Promise<unknown[]> {
  const allResults: unknown[] = [];
  let page = 1;
  const limit = 100;

  while (true) {
    const pageQuery = {
      ...query,
      limit: String(limit),
      page: String(page),
    };

    const response = (await apiRequest(config, "GET", path, pageQuery)) as unknown[];

    if (!Array.isArray(response)) {
      // 配列でない場合はそのまま返す
      allResults.push(response);
      break;
    }

    allResults.push(...response);

    if (response.length < limit) {
      break;
    }

    page++;
  }

  return allResults;
}
