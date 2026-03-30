# 出荷（Shipments）

## 概要

仕入先や取引先への商品の出荷を管理するAPI。出荷区分（通常出荷・返品・販促品）を指定して登録する。承認ワークフローにも対応。
ベースパス: `/pos/shipments`

出荷ステータス:
- `0`: 未出荷
- `2`: 出荷済
- `3`: 出荷検品中

出荷区分:
- `0`: 出荷
- `1`: 返品
- `2`: 販促品

承認ステータス:
- `0`: 未承認
- `1`: 承認済
- `2`: 承認拒否

受取先タイプ:
- `1`: 仕入先
- `3`: その他

## エンドポイント

### GET /shipments
出荷一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | 並び順（shipmentStoreId など） |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| shipment_store_id | - | string | 出荷店舗IDでフィルタ |
| shipment_division | - | string | 出荷区分でフィルタ（0:出荷、1:返品、2:販促品） |
| shipment_date | - | string | 出荷日でフィルタ（YYYY-MM-DD形式） |
| status | - | string | ステータスでフィルタ（0:未出荷、2:出荷済、3:出荷検品中） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| shipmentId | string | 出荷ID |
| shipmentStoreId | string | 出荷店舗ID |
| recipientType | string | 受取先タイプ（1:仕入先、3:その他） |
| recipientId | string | 受取先ID |
| recipientName | string | 受取先名 |
| shipmentDivision | string | 出荷区分 |
| shipmentDate | string | 出荷日 |
| memo | string | メモ |
| staffId | string | スタッフID |
| taxRate | string | 税率 |
| identificationNo | string | 識別番号 |
| roundingDivision | string | 税丸め設定 |
| status | string | ステータス |
| approvalStatus | string | 承認ステータス |
| approvalDateTime | string | 承認日時 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### POST /shipments
出荷を登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| shipmentStoreId | ○ | string | 出荷店舗ID |
| recipientType | ○ | string | 受取先タイプ（1:仕入先、3:その他） |
| shipmentDivision | ○ | string | 出荷区分（0:出荷、1:返品、2:販促品） |
| status | ○ | string | 出荷ステータス（0:未出荷、2:出荷済、3:出荷検品中） |
| details | ○ | array | 出荷明細（最大500件） |
| details[].productId | ○ | string | 商品ID |
| details[].quantity | ○ | string | 出荷数 |
| details[].taxRate | - | string | 税率 |
| details[].cost | - | string | 原価 |
| details[].memo | - | string | 明細メモ |
| recipientId | - | string | 受取先ID |
| recipientName | - | string | 受取先名 |
| shipmentDate | - | string | 出荷日（YYYY-MM-DD） |
| memo | - | string | メモ（最大1000文字） |
| staffId | - | string | スタッフID |
| taxRate | - | string | 税率 |
| identificationNo | - | string | 識別番号（最大32文字） |
| roundingDivision | - | string | 税丸め（0:切り捨て、1:切り上げ、2:四捨五入） |
| approvalStatus | - | string | 承認ステータス（0:未承認、1:承認済、2:承認拒否） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| shipmentId | string | 登録された出荷ID |
| shipmentStoreId | string | 出荷店舗ID |
| status | string | ステータス |
| approvalStatus | string | 承認ステータス |
| details | array | 出荷明細（shipmentDetailId、productId、quantity、price、cost 含む） |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### GET /shipments/{shipment_id}
出荷詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shipment_id | ○ | string | 出荷ID |

#### レスポンス（主要フィールド）
一覧取得と同様のフィールド＋ `details` 配列（明細情報）を含む。

---

### PATCH /shipments/{shipment_id}
出荷情報を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shipment_id | ○ | string | 出荷ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| shipmentStoreId | - | string | 出荷店舗ID |
| recipientType | - | string | 受取先タイプ |
| recipientId | - | string | 受取先ID |
| recipientName | - | string | 受取先名 |
| shipmentDivision | - | string | 出荷区分 |
| shipmentDate | - | string | 出荷日 |
| status | - | string | ステータス |
| approvalStatus | - | string | 承認ステータス |
| details | - | array | 出荷明細（更新対象の明細のみ） |
| details[].shipmentDetailId | - | string | 出荷明細ID |
| details[].productId | - | string | 商品ID |
| details[].quantity | - | string | 出荷数 |
| details[].cost | - | string | 原価 |
| details[].taxRate | - | string | 税率 |

---

### DELETE /shipments/{shipment_id}
出荷を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shipment_id | ○ | string | 出荷ID |

## スコープ

| 操作 | 必要スコープ |
|------|------------|
| 一覧・詳細取得 | `pos.shipments:read` |
| 登録・更新・削除 | `pos.shipments:write` |

## 注意事項

- 出荷（shipments）は仕入先や外部取引先への出荷。店舗間移動の出庫は `/shipping` を使用する。
- 出荷明細の最大件数は500件。
- 承認済（approvalStatus=1）の出荷は変更・削除に制限がある場合がある。
- `roundingDivision`: 0=切り捨て、1=切り上げ、2=四捨五入。
