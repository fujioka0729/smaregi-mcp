# 商品（Products）

## 概要

商品の登録・取得・更新・削除、および商品に関連する価格・属性・画像の管理を行うAPI。

## エンドポイント

### GET /products
商品一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | ソート順。使用可能: productId, categoryId, productCode, groupCode, displaySequence, updDateTime |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| category_id | - | string | 部門IDでフィルタ |
| product_code | - | string | 商品コードでフィルタ |
| group_code | - | string | グループコードでフィルタ |
| display_flag | - | string | 端末表示フラグ（0: 非表示, 1: 表示） |
| division | - | string | 商品区分（0: 通常, 1: セット, 2: オプション） |
| sales_division | - | string | 売上区分（0: 対象, 1: 対象外） |
| stock_control_division | - | string | 在庫管理区分（0: 対象外, 1: 対象） |
| supplier_product_no | - | string | 品番でフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |
| with_stores | - | string | 店舗情報を含む（all / none） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| productId | string | 商品ID |
| categoryId | string | 部門ID |
| productCode | string | 商品コード（半角英数記号20文字以内） |
| productName | string | 商品名（85文字以内） |
| productKana | string | 商品名カナ |
| taxDivision | string | 税区分 |
| productPriceDivision | string | 商品単価区分 |
| price | string | 販売価格 |
| customerPrice | string | 会員価格 |
| cost | string | 原価 |
| attribute | string | 属性 |
| description | string | 説明 |
| catchCopy | string | キャッチコピー |
| size | string | サイズ |
| color | string | カラー |
| tag | string | タグ |
| groupCode | string | グループコード |
| url | string | URL |
| printReceiptProductName | string | レシート印字商品名 |
| displaySequence | string | 表示順 |
| salesDivision | string | 売上区分 |
| stockControlDivision | string | 在庫管理区分 |
| displayFlag | string | 端末表示フラグ |
| division | string | 商品区分 |
| productOptionGroupId | string | オプショングループID |
| pointNotApplicable | string | ポイント対象外フラグ |
| taxFreeDivision | string | 免税区分 |
| supplierProductNo | string | 品番 |
| staffDiscountRate | string | スタッフ割引率 |
| appStartDateTime | string | アプリ表示開始日時 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /products
商品を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| productCode | - | string | 商品コード（半角英数記号20文字以内） |
| productName | ○ | string | 商品名（85文字以内） |
| categoryId | ○ | string | 部門ID |
| price | - | string | 販売価格 |
| taxDivision | - | string | 税区分 |
| productPriceDivision | - | string | 商品単価区分 |
| salesDivision | - | string | 売上区分 |
| stockControlDivision | - | string | 在庫管理区分 |
| displayFlag | - | string | 端末表示フラグ |

### POST /products/bulk
商品を一括登録する（最大1000件）。

#### リクエストボディ
商品オブジェクトの配列。各要素はPOST /productsと同一フィールド。

### GET /products/{productId}
指定した商品IDの商品を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| productId | ○ | string | 商品ID |

### PATCH /products/{productId}
商品を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| productId | ○ | string | 商品ID |

#### リクエストボディ
更新したいフィールドのみ指定。フィールドはPOST /productsと同一。

### PATCH /products/bulk
商品を一括更新する（最大1000件）。

### DELETE /products/{productId}
商品を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| productId | ○ | string | 商品ID |

## 関連エンドポイント

### GET /products/{productId}/prices
商品の価格一覧を取得する。

### GET /products/{productId}/prices/changes
商品の価格変更履歴を取得する。

### GET /products/{productId}/reserve-items
商品の自由項目を取得する。

### GET /products/attributes
商品属性一覧を取得する。

### PUT /products/attributes/{no}
商品属性を更新する。

### GET /products/images
商品画像一覧を取得する。

### PUT /products/{productId}/image
商品画像を登録する。

### GET /stores/{storeId}/products
店舗取扱商品一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| category_id | - | string | 部門IDでフィルタ |
| product_code | - | string | 商品コードでフィルタ |
| with_stores | - | string | 店舗情報を含む（all / none） |

## ソート例

```
// 商品コード降順
smaregi_api_get({ "path": "/products", "query": { "sort": "productCode:desc" } })

// 更新日時昇順
smaregi_api_get({ "path": "/products", "query": { "sort": "updDateTime:asc" } })
```
