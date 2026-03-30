# 在庫（Stock）

## 概要

商品の在庫数の照会・更新を管理するAPI。絶対値指定と相対値指定の2つの更新方法がある。

## エンドポイント

### GET /stock
在庫一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| product_id | - | string | 商品IDでフィルタ |
| product_code | - | string | 商品コードでフィルタ |
| store_id | - | string | 店舗IDでフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| productId | string | 商品ID |
| productCode | string | 商品コード |
| productName | string | 商品名 |
| storeId | string | 店舗ID |
| storeName | string | 店舗名 |
| stockAmount | string | 在庫数 |
| stockPrice | string | 在庫金額 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### PATCH /stock/{productId}
在庫を絶対値で更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| productId | ○ | string | 商品ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeId | ○ | string | 店舗ID |
| stockAmount | ○ | string | 設定する在庫数 |

### POST /stock/{productId}/add
在庫を相対値で更新する（加算・減算）。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| productId | ○ | string | 商品ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeId | ○ | string | 店舗ID |
| stockAmount | ○ | string | 加減算する在庫数（マイナス指定で減算） |

### PATCH /stock/bulk
在庫を一括更新する（最大1000件）。

#### リクエストボディ
在庫オブジェクトの配列。各要素にproductId, storeId, stockAmountを含む。

### GET /stock/changes/{productId}/{storeId}
在庫変動履歴を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| productId | ○ | string | 商品ID |
| storeId | ○ | string | 店舗ID |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| stockChangeId | string | 変動ID |
| stockChangeDivision | string | 変動区分 |
| stockAmount | string | 変動数 |
| stockAmountAfter | string | 変動後在庫数 |
| insDateTime | string | 変動日時 |

## 使い分け

| 操作 | メソッド | パス | 用途 |
|------|---------|------|------|
| 絶対値更新 | PATCH | /stock/{productId} | 棚卸時など在庫数を直接設定 |
| 相対値更新 | POST | /stock/{productId}/add | 入荷・出荷時の加減算 |
| 一括更新 | PATCH | /stock/bulk | 複数商品の在庫を一括変更 |

**注意**: 並行処理で在庫を操作する場合は、相対値更新（add）を使用することを推奨。
