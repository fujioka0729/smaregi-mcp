# 従業員事業所（タイムカード）

## 概要

従業員が所属する事業所を管理するAPI。従業員と事業所の紐付けを一覧取得・登録・更新・削除する。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /staff_stores
従業員の所属事業所一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_id | - | string | 従業員ID（カンマ区切りで複数指定可） |
| store_id | - | string | 事業所ID（カンマ区切りで複数指定可） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| staffStores[].staffId | string | 従業員ID |
| staffStores[].staffName | string | 従業員名 |
| staffStores[].storeId | string | 事業所ID |
| staffStores[].storeName | string | 事業所名 |
| staffStores[].sortNum | string | 表示順 |

### PUT /staffs/{staff_id}/staff-stores/{store_id}
従業員の所属事業所を登録・更新する。存在しない場合は登録、存在する場合は更新となる。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_id | ○ | string | 従業員ID |
| store_id | ○ | string | 事業所ID |

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| sortNum | - | integer | 表示順 |
| roleId | - | string | 役割ID |

#### レスポンス
登録・更新した従業員事業所情報を返す。

### DELETE /staffs/{staff_id}/staff-stores/{store_id}
従業員の所属事業所を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_id | ○ | string | 従業員ID |
| store_id | ○ | string | 事業所ID |

#### レスポンス
成功時は204 No Contentを返す。

## 注意事項
- 必要スコープ: `timecard.staffs:read`（取得）/ `timecard.staffs:write`（登録・更新・削除）
- PUT は冪等操作（存在しない場合は登録、存在する場合は上書き更新）
- 事業所から従業員を外す場合はDELETEを使用する
