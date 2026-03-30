import { cpSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function setupSkills(): void {
  const skillsSrc = join(__dirname, "..", "skills", "smaregi-api-skill");
  const skillsDest = join(homedir(), ".claude", "skills", "smaregi-api-skill");

  if (!existsSync(skillsSrc)) {
    console.error("エラー: skills/smaregi-api-skill が見つかりません");
    process.exit(1);
  }

  const destParent = join(homedir(), ".claude", "skills");
  if (!existsSync(destParent)) {
    mkdirSync(destParent, { recursive: true });
  }

  cpSync(skillsSrc, skillsDest, { recursive: true });
  console.log(`Skills をインストールしました: ${skillsDest}`);
  console.log("");
  console.log("Claude Code を再起動すると smaregi-api-skill が利用可能になります。");
}
