# 勤務パターン（タイムカード）

## 概要

勤務パターン（シフトパターン）情報を取得するAPI。勤務開始・終了時刻や休憩時刻のテンプレートを管理する。シフト作成時の雛形として使用される。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /shift_patterns
勤務パターン一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | - | string | 事業所ID（カンマ区切りで複数指定可） |
| shift_pattern_id | - | string | 勤務パターンID（カンマ区切りで複数指定可） |
| shift_pattern_name | - | string | 勤務パターン名（部分一致） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |
| sort | - | string | ソート順（store_id, shift_pattern_id 等、:descで降順） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| shiftPatterns[].shiftPatternId | string | 勤務パターンID |
| shiftPatterns[].storeId | string | 事業所ID |
| shiftPatterns[].shiftPatternName | string | 勤務パターン名 |
| shiftPatterns[].shiftPatternShortName | string | 勤務パターン略称 |
| shiftPatterns[].color | string | 表示色 |
| shiftPatterns[].attendanceTime | string | 出勤時刻（HH:mm形式） |
| shiftPatterns[].leavingTime | string | 退勤時刻（HH:mm形式） |
| shiftPatterns[].break1StartTime | string | 休憩1開始時刻 |
| shiftPatterns[].break1EndTime | string | 休憩1終了時刻 |
| shiftPatterns[].break2StartTime | string | 休憩2開始時刻 |
| shiftPatterns[].break2EndTime | string | 休憩2終了時刻 |

### GET /shift_patterns/{shift_pattern_id}
指定した勤務パターンの詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_pattern_id | ○ | string | 勤務パターンID |

#### レスポンス
勤務パターンの詳細情報（一覧と同フィールド）を返す。

## 注意事項
- 必要スコープ: `timecard.shifts:read`
- AppAccessToken または UserAccessToken で認証
- 勤務パターンは事業所単位で管理される
- シフト一覧（予定）取得時に勤務パターンIDが付与されることがある
