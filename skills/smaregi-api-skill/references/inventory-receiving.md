# 入荷（Receiving）

## 概要

出庫依頼を受けて店舗間で商品を受け取る「入荷」を管理するAPI。入荷は出庫（shipping）と対になる概念で、出庫側が商品を送り出し、入荷側が受け取る。
ベースパス: `/pos/receiving`

入荷ステータス:
- `0`: 未入荷
- `1`: 検品中
- `2`: 入荷完了

## エンドポイント

### GET /receiving
入荷一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | 並び順（receivingId、shippingId、receivingStoreId など） |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| receiving_id | - | string | 入荷IDでフィルタ |
| shipping_id | - | string | 出庫IDでフィルタ |
| receiving_store_id | - | string | 入荷店舗IDでフィルタ |
| shipping_store_id | - | string | 出庫店舗IDでフィルタ |
| receiving_date | - | string | 入荷日でフィルタ（YYYY-MM-DD形式） |
| identification_no | - | string | 識別番号でフィルタ |
| status | - | string | ステータスでフィルタ（0:未入荷、1:検品中、2:入荷完了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| receivingId | string | 入荷ID |
| shippingId | string | 紐づく出庫ID |
| receivingStoreId | string | 入荷店舗ID |
| shippingStoreId | string | 出庫店舗ID |
| receivingExpectedDateFrom | string | 入荷予定日From |
| receivingExpectedDateTo | string | 入荷予定日To |
| receivingDate | string | 入荷日 |
| memo | string | メモ |
| staffId | string | スタッフID |
| status | string | ステータス |
| identificationNo | string | 識別番号 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### POST /receiving
入荷を登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| shippingId | ○ | string | 出庫ID |
| receivingStoreId | ○ | string | 入荷店舗ID |
| receivingDate | ○ | string | 入荷日（YYYY-MM-DD） |
| details | ○ | array | 入荷明細（最大1000件） |
| details[].productId | ○ | string | 商品ID |
| details[].quantity | ○ | string | 入荷数量 |
| memo | - | string | メモ（最大1000文字） |
| staffId | - | string | スタッフID |
| identificationNo | - | string | 識別番号（最大32文字） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| receivingId | string | 登録された入荷ID |
| shippingId | string | 出庫ID |
| receivingStoreId | string | 入荷店舗ID |
| status | string | ステータス |
| details | array | 入荷明細 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### GET /receiving/{receiving_id}
入荷詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| receiving_id | ○ | string | 入荷ID |

#### レスポンス（主要フィールド）
一覧取得と同様のフィールド＋ `details` 配列（明細情報）を含む。

---

### PATCH /receiving/{receiving_id}
入荷情報を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| receiving_id | ○ | string | 入荷ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| status | - | string | ステータス（0:未入荷、1:検品中、2:入荷完了） |
| receivingDate | - | string | 入荷日 |
| memo | - | string | メモ |
| staffId | - | string | スタッフID |
| details | - | array | 入荷明細（更新対象の明細のみ指定） |

## スコープ

| 操作 | 必要スコープ |
|------|------------|
| 一覧・詳細取得 | `pos.receiving:read` |
| 登録・更新 | `pos.receiving:write` |

## 注意事項

- 入荷は出庫（`/shipping`）と紐づく。出庫依頼（`/shipping/request`）が起点となる。
- 入荷完了（status=2）にすると在庫が増加する。
- 入荷（receiving）は出庫依頼を受けた店舗間移動の受取側。仕入先からの入荷は `/storage` を使用する。
