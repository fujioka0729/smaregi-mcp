# 従業員（タイムカード）

## 概要

タイムカードの従業員情報を管理するAPI。従業員の一覧取得・登録・詳細取得・更新・削除、賃金設定、利用ON/OFF管理が可能。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /staffs
従業員一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | - | string | 事業所ID（カンマ区切りで複数指定可） |
| staff_name | - | string | 従業員名（部分一致） |
| termination | - | number | 退職者を含む（0: 含まない, 1: 含む） |
| staff_group_code | - | string | 従業員グループコード（カンマ区切りで複数指定可） |
| active | - | number | 利用設定（0: 利用しない, 1: 利用する） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |
| sort | - | string | ソート順（staff_id, staff_name等、:descで降順） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| staffs[].staffId | string | 従業員ID |
| staffs[].staffName | string | 従業員名 |
| staffs[].staffCode | string | 社員番号 |
| staffs[].hireDate | string | 入社日 |
| staffs[].terminationDate | string | 退社日 |
| staffs[].activeFlag | string | 利用フラグ |
| staffs[].adminFlag | string | 管理者フラグ |

### POST /staffs
従業員を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| staffName | ○ | string | 従業員名 |
| staffCode | - | string | 社員番号 |
| hireDate | - | string | 入社日（YYYY-MM-DD） |

#### レスポンス
登録した従業員情報を返す。

### GET /staffs/{staff_id}
指定した従業員の詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_id | ○ | string | 従業員ID |

#### レスポンス
従業員の詳細情報（staffId, staffName, staffCode, hireDate, terminationDate, activeFlag, adminFlag 等）を返す。

### PATCH /staffs/{staff_id}
従業員基本情報を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_id | ○ | string | 従業員ID |

#### リクエストボディ
更新するフィールドのみ指定する（staffName, staffCode, hireDate 等）。

### PUT /staffs/{staff_id}/active
従業員の利用ON/OFFを更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_id | ○ | string | 従業員ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| active | ○ | number | 利用設定（0: 利用しない, 1: 利用する） |

### POST /staffs/{staff_id}/wage-apply
従業員の賃金設定を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| applyDate | ○ | string | 適用開始日（YYYY-MM-DD） |
| wageDivision | ○ | string | 賃金区分（時給/日給/月給等） |
| wage | ○ | number | 賃金額 |

### PUT /staffs/{staff_id}/wage-apply/{wage_apply_id}
従業員の賃金設定を更新する。

### DELETE /staffs/{staff_id}/wage-apply/{wage_apply_id}
従業員の賃金設定を削除する。

## 注意事項
- 必要スコープ: `timecard.staffs:read`（取得）/ `timecard.staffs:write`（登録・更新・削除）
- AppAccessToken または UserAccessToken で認証
- `termination=1` を指定しない限り、退職者は取得されない
