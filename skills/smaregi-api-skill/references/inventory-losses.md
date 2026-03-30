# ロス管理（Losses）

## 概要

商品のロス（破損・盗難・廃棄など）を記録・管理するAPI。ロス区分（ロスの種類）のマスタ管理も提供する。
ベースパス: `/pos/losses`、ロス区分: `/pos/loss_divisions`

## エンドポイント

### GET /losses
ロス一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | 並び順（lossId、storeId、division、lossDateTime、updDateTimeなど） |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| store_id | - | string | 店舗IDでフィルタ |
| division | - | string | ロス区分コードでフィルタ |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| lossId | string | ロスID |
| storeId | string | 店舗ID |
| division | string | ロス区分コード |
| memo | string | メモ |
| lossDateTime | string | ロス発生日時 |
| identificationNo | string | 識別番号 |
| staffId | string | スタッフID |
| staffName | string | スタッフ名 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### POST /losses
ロスを登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeId | ○ | string | 店舗ID |
| division | ○ | string | ロス区分コード |
| lossDateTime | ○ | string | ロス発生日時（ISO8601形式） |
| details | ○ | array | ロス明細（最大1000件） |
| details[].productId | ○ | string | 商品ID |
| details[].quantity | ○ | string | 数量 |
| details[].taxRate | - | string | 税率 |
| memo | - | string | メモ（最大1000文字） |
| identificationNo | - | string | 識別番号（最大32文字） |
| staffId | - | string | スタッフID |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| lossId | string | 登録されたロスID |
| details[] | array | ロス明細（lossDetailId、productId、taxRate、cost、quantity含む） |

---

### GET /losses/{loss_id}
ロス詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| loss_id | ○ | string | ロスID |

#### レスポンス（主要フィールド）
一覧取得と同様のフィールド＋ `details` 配列（明細情報）を含む。

---

### PATCH /losses/{loss_id}
ロス情報を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| loss_id | ○ | string | ロスID |

#### リクエストボディ
登録時と同様のフィールド（更新したい項目のみ指定可）。

---

### DELETE /losses/{loss_id}
ロスを削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| loss_id | ○ | string | ロスID |

---

## ロス区分（Loss Divisions）

### GET /loss_divisions
ロス区分の一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | 並び順 |
| limit | - | integer | 取得件数 |
| page | - | integer | ページ番号 |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| divisionCode | string | ロス区分コード |
| divisionName | string | ロス区分名 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /loss_divisions
ロス区分を登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| divisionCode | ○ | string | ロス区分コード |
| divisionName | ○ | string | ロス区分名 |

### GET /loss_divisions/{division_code}
ロス区分の詳細を取得する。

### PATCH /loss_divisions/{division_code}
ロス区分を更新する。

### DELETE /loss_divisions/{division_code}
ロス区分を削除する。

## スコープ

| 操作 | 必要スコープ |
|------|------------|
| 一覧・詳細取得 | `pos.losses:read` |
| 登録・更新・削除 | `pos.losses:write` |
| ロス区分取得 | `pos.losses:read` |
| ロス区分登録・更新・削除 | `pos.losses:write` |

## 注意事項

- `division` はロス区分コードであり、事前に `/loss_divisions` で登録が必要。
- ロス登録時の `details` は最大1000件まで。
- 削除したロスは復元できない。
