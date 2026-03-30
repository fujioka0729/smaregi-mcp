# 給与（タイムカード）

## 概要

従業員の給与・賞与情報を取得・確定するAPI。月別給与一覧・明細取得と給与確定処理が可能。給与確定後は勤怠実績の `calculated` フラグが `true` になる。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /budgets/monthly
月別給与一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| year | ○ | string | 対象年（YYYY） |
| month | ○ | string | 対象月（MM） |
| store_id | - | string | 事業所ID（カンマ区切りで複数指定可） |
| staff_name | - | string | 従業員名 |
| staff_code | - | string | 社員番号 |
| staff_group_code | - | string | 従業員グループコード（カンマ区切りで複数指定可） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| budgetMonthly[].staffId | string | 従業員ID |
| budgetMonthly[].staffName | string | 従業員名 |
| budgetMonthly[].staffCode | string | 社員番号 |
| budgetMonthly[].wageDivision | string | 賃金区分 |
| budgetMonthly[].workingCount | number | 勤務日数（回数） |
| budgetMonthly[].workingDayCount | number | 勤務日数 |
| budgetMonthly[].workingTime | number | 勤務時間（分） |
| budgetMonthly[].workingWage | number | 勤務賃金 |
| budgetMonthly[].midnightTime | number | 深夜労働時間（分） |
| budgetMonthly[].transportationCost | number | 交通費 |
| budgetMonthly[].netPay | number | 支給合計 |
| budgetMonthlyTotal | object | 合計（totalWorkingCount, totalWorkingDayCount, totalWorkingTime, totalWorkingWage, totalMidnightTime, totalTransportationCost, totalNetPay） |

### GET /budgets/monthly/{store_id}/{staff_id}
月別給与明細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |
| staff_id | ○ | string | 従業員ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| year | ○ | string | 対象年（YYYY） |
| month | ○ | string | 対象月（MM） |

#### レスポンス
給与明細の詳細情報（日次内訳を含む）を返す。

### GET /bonuses/monthly
月別賞与一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| year | ○ | string | 対象年（YYYY） |
| month | ○ | string | 対象月（MM） |
| store_id | - | string | 事業所ID（カンマ区切りで複数指定可） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |

#### レスポンス
賞与一覧（staffId, staffName, bonusAmount 等）を返す。

### GET /bonuses/monthly/{store_id}/{staff_id}
月別賞与明細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |
| staff_id | ○ | string | 従業員ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| year | ○ | string | 対象年（YYYY） |
| month | ○ | string | 対象月（MM） |

#### レスポンス
賞与明細の詳細情報を返す。

### PUT /budgets/determine
給与を確定する。確定後は勤怠実績の `calculated` フラグが `true` になる。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| year | ○ | string | 確定年（YYYY） |
| month | ○ | string | 確定月（MM） |
| store_id | - | string | 事業所ID（省略時は全事業所） |
| staff_id | - | string | 従業員ID（省略時は全従業員） |

#### レスポンス
成功時は確定した給与情報の概要を返す。

## 注意事項
- 必要スコープ: `timecard.budgets:read`（取得）/ `timecard.budgets:write`（確定）
- 給与確定（PUT /budgets/determine）はシステム管理者のみ実行可能
- 給与確定後は勤怠実績の修正に制限がかかる場合がある
- 給与計算は賃金設定（POST /staffs/{staff_id}/wage-apply）に基づいて行われる
- `wageDivision` は時給・日給・月給等の区分を示す
