# 棚卸（Stock Taking）

## 概要

店舗の在庫を実際に数えて記録する棚卸を管理するAPI。棚卸情報の一覧取得、対象商品・対象カテゴリ（部門）の確認、基準在庫の取得が可能。
ベースパス: `/pos/stocktaking`

## エンドポイント

### GET /stocktaking
棚卸情報の一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | 並び順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| store_id | - | string | 店舗IDでフィルタ |
| status | - | string | ステータスでフィルタ |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| stocktakingInfoId | string | 棚卸情報ID |
| storeId | string | 店舗ID |
| storeName | string | 店舗名 |
| targetDivision | string | 対象区分（全商品/部門別など） |
| status | string | ステータス |
| stocktakingDate | string | 棚卸日 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### GET /stocktaking/{stocktaking_info_id}/products
棚卸の対象商品一覧を取得する。棚卸数量の入力状況も確認できる。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| stocktaking_info_id | ○ | string | 棚卸情報ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | 並び順（productId、categoryId、updDateTimeなど） |
| limit | - | integer | 取得件数（1〜1000） |
| page | - | integer | ページ番号 |
| product_id | - | string | 商品IDでフィルタ |
| category_id | - | string | 部門IDでフィルタ |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| productId | string | 商品ID |
| categoryId | string | 部門ID |
| stocktakingQuantity | string | 棚卸数量（システム算出値） |
| inputStocktakingQuantity | string | 入力棚卸数量（実際に数えた数） |
| rfidTags | array | RFIDタグ情報 |
| transportationStockQuantity | string | 輸送中在庫数量 |
| layawayStockQuantity | string | 取り置き在庫数量 |
| stockQuantityBeforeAdjustment | string | 調整前在庫数量 |
| cost | string | 原価 |
| memo | string | メモ |
| quantityModifiedDatetime | string | 数量変更日時 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

必要スコープ: `pos.stocktaking:read`

---

### GET /stocktaking/{stocktaking_info_id}/categories
棚卸の対象カテゴリ（部門）一覧を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| stocktaking_info_id | ○ | string | 棚卸情報ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | 並び順（categoryId） |
| limit | - | integer | 取得件数 |
| page | - | integer | ページ番号 |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| stocktakingInfoId | string | 棚卸情報ID |
| categoryId | string | 対象部門の部門ID（全部門対象の場合は「0」固定） |

---

### GET /stocktaking/{stocktaking_info_id}/details/{base_date}
基準日時点の在庫数量を取得する。指定した棚卸の基準在庫（システムが管理する理論在庫）を確認できる。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| stocktaking_info_id | ○ | string | 棚卸情報ID |
| base_date | ○ | string | 基準日（YYYY-MM-DD形式） |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | 並び順（productId、categoryIdなど） |
| limit | - | integer | 取得件数 |
| page | - | integer | ページ番号 |
| product_id | - | string | 商品IDでフィルタ |
| category_id | - | string | 部門IDでフィルタ |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| stocktakingInfoId | string | 棚卸情報ID |
| productId | string | 商品ID |
| categoryId | string | 部門ID |
| stockQuantity | string | 基準日時点の在庫数量 |
| stockMoney | string | 基準日時点の在庫金額 |
| transportationQuantity | string | 輸送中在庫数量 |
| transportationMoney | string | 輸送中在庫金額 |
| layawayQuantity | string | 取り置き在庫数量 |
| layawayMoney | string | 取り置き在庫金額 |
| storeId | string | 棚卸実施店舗ID |

## スコープ

| 操作 | 必要スコープ |
|------|------------|
| 棚卸情報一覧・詳細取得 | `pos.stocktaking:read` |
| 対象商品・カテゴリ取得 | `pos.stocktaking:read` |
| 基準在庫取得 | `pos.stocktaking:read` |

## 注意事項

- 棚卸は通常スマレジの店舗アプリ側から実施し、APIは主に結果の参照に使用する。
- `base_date` を指定することで、棚卸開始時点の理論在庫と実際の棚卸結果を比較できる。
- `categoryId` が「0」の場合は全部門が対象であることを示す。
- `inputStocktakingQuantity` が実際に数えた数量、`stocktakingQuantity` がシステム上の理論在庫数量。
- 棚卸差異 = `inputStocktakingQuantity` - `stocktakingQuantity`（マイナスはロス）。
