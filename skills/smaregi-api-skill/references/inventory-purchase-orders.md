# 発注（Purchase Orders）

## 概要

仕入先への発注を管理するAPI。発注の登録・更新・削除のほか、発注に紐づく対象商品・対象店舗の取得が可能。
ベースパス: `/pos/purchase_orders`

発注ステータス:
- `2`: 発注済
- `3`: 入荷検品中
- `4`: 入荷完了
- `5`: 仮発注

## エンドポイント

### GET /purchase_orders
発注一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | 並び順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| recipient_order_id | - | string | 発注先（仕入先）IDでフィルタ |
| ordered_date | - | string | 発注日でフィルタ（YYYY-MM-DD形式） |
| status | - | string | ステータスでフィルタ（2:発注済、3:入荷検品中、4:入荷完了、5:仮発注） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storageInfoId | string | 発注ID |
| recipientOrderId | string | 発注先（仕入先）ID |
| orderSourceStoreId | string | 発注元店舗ID |
| orderStaffName | string | 発注担当者名 |
| divisionUnit | string | 分割単位 |
| categoryGroupId | string | 部門グループID |
| orderedDate | string | 発注日 |
| memo | string | メモ |
| identificationNo | string | 識別番号 |
| roundingDivision | string | 税丸め設定 |
| status | string | ステータス |
| staffId | string | スタッフID |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### POST /purchase_orders
発注を登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| recipientOrderId | ○ | string | 発注先（仕入先）ID |
| status | ○ | string | ステータス（2:発注済、5:仮発注） |
| products | ○ | array | 発注対象商品の配列 |
| products[].productId | ○ | string | 商品ID |
| products[].taxRate | - | string | 税率 |
| products[].cost | - | string | 原価 |
| products[].deliveryStore | ○ | array | 配送店舗情報 |
| stores | ○ | array | 発注対象店舗の配列 |
| stores[].storageStoreId | ○ | string | 配送店舗ID |
| stores[].storageExpectedDateFrom | - | string | 入荷予定日From（YYYY-MM-DD） |
| stores[].storageExpectedDateTo | - | string | 入荷予定日To（YYYY-MM-DD） |
| orderSourceStoreId | - | string | 発注元店舗ID |
| orderStaffName | - | string | 発注担当者名 |
| orderedDate | - | string | 発注日（YYYY-MM-DD） |
| memo | - | string | メモ（最大1000文字） |
| identificationNo | - | string | 識別番号（最大32文字） |
| roundingDivision | - | string | 税丸め（0:切り捨て、1:切り上げ、2:四捨五入） |
| staffId | - | string | スタッフID |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storageInfoId | string | 登録された発注ID |
| recipientOrderId | string | 発注先ID |
| status | string | ステータス |
| products | array | 発注対象商品一覧 |
| stores | array | 発注対象店舗一覧 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### GET /purchase_orders/{storage_info_id}
発注詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_info_id | ○ | string | 発注ID |

---

### PATCH /purchase_orders/{storage_info_id}
発注情報を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_info_id | ○ | string | 発注ID |

#### リクエストボディ
登録時と同様のフィールド（更新したい項目のみ指定可）。

---

### DELETE /purchase_orders/{storage_info_id}
発注を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_info_id | ○ | string | 発注ID |

---

### GET /purchase_orders/{storage_info_id}/products
発注の対象商品一覧を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_info_id | ○ | string | 発注ID |

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
| productId | string | 商品ID |
| productCode | string | 商品コード |
| productName | string | 商品名 |
| taxRate | string | 税率 |
| cost | string | 原価 |

---

### GET /purchase_orders/{storage_info_id}/stores
発注の対象店舗一覧を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storage_info_id | ○ | string | 発注ID |

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
| storageStoreId | string | 入荷店舗ID |
| storeName | string | 店舗名 |
| storageExpectedDateFrom | string | 入荷予定日From |
| storageExpectedDateTo | string | 入荷予定日To |

## スコープ

| 操作 | 必要スコープ |
|------|------------|
| 一覧・詳細取得 | `pos.purchase_orders:read` |
| 登録・更新・削除 | `pos.purchase_orders:write` |

## 注意事項

- `storageInfoId` は発注IDであり、入荷（storage）APIの発注IDと同一の概念。
- 発注登録後は `/storage` API で入荷処理を行う。
- ステータスが入荷完了（4）になった発注は削除できない場合がある。
- `roundingDivision`: 0=切り捨て、1=切り上げ、2=四捨五入。
