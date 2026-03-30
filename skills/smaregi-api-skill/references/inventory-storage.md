# 入庫（Storage）

## 概要

仕入先からの商品入荷（入庫）を管理するAPI。発注（purchase_orders）と紐づく入庫処理を行う。入庫は「発注→入庫」のフローで使用し、承認ワークフローにも対応する。
ベースパス: `/pos/storage`

入庫ステータス:
- `0`: 未入荷
- `1`: 検品中
- `2`: 入荷完了

## エンドポイント

### GET /storage
入庫（入荷）一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | 並び順（storageId、storageInfoId、supplierId、storageStoreId、storageDate、updDateTimeなど） |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| storage_info_id | - | string | 発注IDでフィルタ |
| supplier_id | - | string | 仕入先IDでフィルタ |
| storage_store_id | - | string | 入荷店舗IDでフィルタ |
| storage_date | - | string | 入荷日でフィルタ（YYYY-MM-DD形式） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storageId | string | 入荷ID |
| storageInfoId | string | 発注ID |
| supplierId | string | 仕入先ID |
| storageStoreId | string | 入荷店舗ID |
| storageDate | string | 入荷日 |
| storageExpectedDateFrom | string | 入荷予定日From |
| storageExpectedDateTo | string | 入荷予定日To |
| memo | string | メモ |
| staffId | string | スタッフID |
| identificationNo | string | 識別番号 |
| roundingDivision | string | 税丸め設定 |
| status | string | ステータス |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### POST /storage
入庫（入荷）を登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| supplierId | ○ | string | 仕入先ID |
| storageStoreId | ○ | string | 入荷店舗ID |
| storageDate | ○ | string | 入荷日（YYYY-MM-DD） |
| details | ○ | array | 入荷明細（最大1000件） |
| details[].productId | ○ | string | 商品ID |
| details[].scheduledQuantity | - | string | 予定数 |
| details[].inspectionQuantity | - | string | 検品数 |
| details[].stockoutQuantity | - | string | 欠品数 |
| details[].inspectionDate | - | string | 検品日（YYYY-MM-DD） |
| details[].cost | - | string | 原価（外税） |
| details[].taxRate | - | string | 税率 |
| storageExpectedDateFrom | - | string | 入荷予定日From（YYYY-MM-DD） |
| storageExpectedDateTo | - | string | 入荷予定日To（YYYY-MM-DD） |
| memo | - | string | メモ（最大1000文字） |
| staffId | - | string | スタッフID |
| identificationNo | - | string | 識別番号（最大32文字） |
| roundingDivision | - | string | 税丸め（0:切り捨て、1:切り上げ、2:四捨五入） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storageId | string | 登録された入荷ID |
| supplierId | string | 仕入先ID |
| storageStoreId | string | 入荷店舗ID |
| storageDate | string | 入荷日 |
| status | string | ステータス |
| details | array | 入荷明細（storageDetailId、status 含む） |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### GET /storage/{storage_id}
入庫（入荷）詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_id | ○ | string | 入荷ID |

#### レスポンス（主要フィールド）
一覧取得と同様のフィールド＋ `details` 配列（明細情報）を含む。

---

### PATCH /storage/{storage_id}
入庫（入荷）情報を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_id | ○ | string | 入荷ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storageDate | - | string | 入荷日 |
| status | - | string | ステータス |
| memo | - | string | メモ |
| staffId | - | string | スタッフID |
| details | - | array | 明細（更新対象の明細のみ指定） |

---

### GET /storage/{storage_id}/details
入荷明細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_id | ○ | string | 入荷ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | 並び順（storageDetailId、productId、statusなど） |
| limit | - | integer | 取得件数 |
| page | - | integer | ページ番号 |
| product_id | - | string | 商品IDでフィルタ |
| status | - | string | ステータスでフィルタ（0:未検品、1:検品完了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storageDetailId | string | 明細ID |
| storageId | string | 入荷ID |
| storageInfoId | string | 発注ID |
| productId | string | 商品ID |
| taxRate | string | 税率 |
| cost | string | 原価 |
| scheduledQuantity | string | 予定数 |
| inspectionQuantity | string | 検品数 |
| stockoutQuantity | string | 欠品数 |
| stockoutReason | string | 欠品理由 |
| inspectionDate | string | 検品日 |
| rfidTags | array | RFIDタグ情報 |
| numberMemo | string | 数値メモ |
| dateMemo | string | 日付メモ |
| status | string | ステータス（0:未検品、1:検品完了） |
| compulsoryCompleteFlag | string | 強制完了フラグ |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### PATCH /storage/{storage_id}/approval
入庫の承認処理を行う。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_id | ○ | string | 入荷ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| approvalStatus | ○ | string | 承認ステータス（0:未承認、1:承認済、2:承認拒否） |
| memo | - | string | メモ |

---

### POST /storage/{storage_id}/modification_request
入庫の修正依頼を登録する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_id | ○ | string | 入荷ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| memo | - | string | 修正依頼メモ |

## スコープ

| 操作 | 必要スコープ |
|------|------------|
| 一覧・詳細取得 | `pos.storage:read` |
| 登録・更新 | `pos.storage:write` |
| 承認 | `pos.storage:write` |

## 注意事項

- 入庫（storage）は仕入先からの商品入荷。店舗間の商品移動受取は `/receiving` を使用する。
- 発注（`/purchase_orders`）と紐づけて入荷登録することで発注管理が可能。
- 入荷完了（status=2）にすると在庫が増加する。
- 明細の最大件数は1000件。
