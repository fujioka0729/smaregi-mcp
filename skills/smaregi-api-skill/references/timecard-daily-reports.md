# 日報（タイムカード）

## 概要

従業員の日報を管理するAPI。日報の一覧取得・登録・詳細取得・更新・削除が可能。日報はシフト実績（shift_result_id）に紐付いて管理される。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /daily_reports/store/{store_id}
事業所に紐付く日報一覧を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| from_date | - | string (date) | 検索開始日（YYYY-MM-DD） |
| to_date | - | string (date) | 検索終了日（YYYY-MM-DD） |
| staff_id | - | string | 従業員ID |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| dailyReports[].dailyReportId | string | 日報ID |
| dailyReports[].shiftResultId | string | シフト実績ID |
| dailyReports[].staffId | string | 従業員ID |
| dailyReports[].staffName | string | 従業員名 |
| dailyReports[].shiftDate | string (date) | 勤務日 |
| dailyReports[].content | string | 日報本文 |
| dailyReports[].dailyReportTags | array | 紐付いた日報タグ |

### POST /daily_reports/{shift_result_id}
日報を登録する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| content | - | string | 日報本文 |
| dailyReportTagIds | - | array | 日報タグIDリスト |
| dailyReportTagTimes | - | object | タグごとの時間（タグID をキーとした分単位の数値） |

#### レスポンス
登録した日報情報を返す。

### GET /daily_reports/{daily_report_id}
指定した日報の詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| daily_report_id | ○ | string | 日報ID |

#### レスポンス
日報の詳細情報（content, dailyReportTags 等）を返す。

### PUT /daily_reports/{shift_result_id}
日報を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| content | - | string | 日報本文 |
| dailyReportTagIds | - | array | 日報タグIDリスト（全量を指定） |
| dailyReportTagTimes | - | object | タグごとの時間 |

#### レスポンス
更新後の日報情報を返す。

### DELETE /daily_reports/{shift_result_id}
日報を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID |

#### レスポンス
成功時は204 No Contentを返す。

## 注意事項
- 必要スコープ: `timecard.daily_reports:read`（取得）/ `timecard.daily_reports:write`（登録・更新・削除）
- 日報はシフト実績（shift_result_id）に1対1で紐付く
- 日報登録・更新・削除のパスパラメータは `shift_result_id`、詳細取得は `daily_report_id` を使用する点に注意
- 日報タグの集計は GET /daily_report_tags/summary/staff または GET /daily_report_tags/summary/tag を使用
