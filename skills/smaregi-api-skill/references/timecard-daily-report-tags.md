# 日報タグ（タイムカード）

## 概要

日報に付与するタグを管理するAPI。タグの一覧取得・登録・更新・削除と、タグごとの集計取得が可能。タグは業務カテゴリ（接客、調理、清掃等）を表し、業務時間の集計に使用する。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /daily_report_tags
日報タグ一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | - | string | 事業所ID（カンマ区切りで複数指定可） |
| show_flag | - | string | 表示設定（0: 非表示, 1: 表示） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| dailyReportTags[].dailyReportTagId | string | 日報タグID |
| dailyReportTags[].dailyReportTagName | string | 日報タグ名 |
| dailyReportTags[].color | string | 表示色コード |
| dailyReportTags[].sortNum | string | 表示順 |
| dailyReportTags[].showFlag | string | 表示設定（0: 非表示, 1: 表示） |
| dailyReportTags[].defaultFlag | string | デフォルトタグ（0: 否, 1: 是） |
| dailyReportTags[].dailyReportTagGroupCode | string | タググループコード |
| dailyReportTags[].dailyReportTagDivisionCode | string | タグ区分コード |

### POST /daily_report_tags
日報タグを登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| dailyReportTagName | ○ | string | タグ名 |
| color | - | string | 表示色コード |
| sortNum | - | integer | 表示順 |
| showFlag | - | string | 表示設定（0: 非表示, 1: 表示） |
| defaultFlag | - | string | デフォルトタグ（0: 否, 1: 是） |

#### レスポンス
登録した日報タグ情報を返す。

### PUT /daily_report_tags/{daily_report_tag_id}
日報タグを更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| daily_report_tag_id | ○ | string | 日報タグID |

#### リクエストボディ
更新するフィールドのみ指定する（dailyReportTagName, color, sortNum 等）。

### DELETE /daily_report_tags/{daily_report_tag_id}
日報タグを削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| daily_report_tag_id | ○ | string | 日報タグID |

#### レスポンス
成功時は204 No Contentを返す。

### GET /daily_report_tags/summary/staff
日報タグの従業員別集計を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| from_date | ○ | string (date) | 集計開始日（YYYY-MM-DD） |
| to_date | ○ | string (date) | 集計終了日（YYYY-MM-DD） |
| store_id | - | string | 事業所ID |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| fromDate | string | 集計開始日 |
| toDate | string | 集計終了日 |
| summaryDivision | string | 集計区分（"staff"） |
| dailyReportTagSummary[].staffId | string | 従業員ID |
| dailyReportTagSummary[].staffName | string | 従業員名 |
| dailyReportTagSummary[].summary | string | 合計時間（小数） |
| dailyReportTagSummary[].tagSummary[].dailyReportTagId | string | タグID |
| dailyReportTagSummary[].tagSummary[].dailyReportTagName | string | タグ名 |
| dailyReportTagSummary[].tagSummary[].summary | string | タグ別合計時間（小数） |
| dailyReportTagSummary[].tagSummary[].color | string | 表示色 |

### GET /daily_report_tags/summary/tag
日報タグのタグ別集計を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| from_date | ○ | string (date) | 集計開始日（YYYY-MM-DD） |
| to_date | ○ | string (date) | 集計終了日（YYYY-MM-DD） |
| store_id | - | string | 事業所ID |

#### レスポンス
タグを軸に従業員ごとの時間集計データを返す。

## 注意事項
- 必要スコープ: `timecard.daily_reports:read`（取得）/ `timecard.daily_reports:write`（登録・更新・削除）
- 日報タグは日報に複数付与できる
- `defaultFlag=1` のタグは日報登録画面でデフォルト選択される
- タグ集計の `summary` フィールドは小数（時間単位）で返される（例: "1.5" = 1時間30分）
- タググループ・タグ区分の一覧は GET /daily_report_tags/group/ と GET /daily_report_tags/division/ で取得
