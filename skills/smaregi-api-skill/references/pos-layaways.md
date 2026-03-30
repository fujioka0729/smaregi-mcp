# 取り置き（Layaways）

## 概要

取り置き（お取り置き・予約）の管理を行うAPI。取り置き登録・一覧取得・引渡しなどの操作が可能。

## エンドポイント

### GET /layaways
取り置き一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| store_id | - | string | 店舗IDでフィルタ |
| customer_id | - | string | 会員IDでフィルタ |
| status | - | string | ステータスでフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| layawayId | string | 取り置きID |
| storeId | string | 店舗ID |
| customerId | string | 会員ID |
| staffId | string | スタッフID |
| status | string | ステータス |
| layawayDateTime | string | 取り置き日時 |
| pickUpExpireDate | string | 引渡期限 |
| memo | string | メモ |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /layaways
取り置きを登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeId | ○ | string | 店舗ID |
| customerId | - | string | 会員ID |
| pickUpExpireDate | - | string | 引渡期限 |
| memo | - | string | メモ |
| details | ○ | array | 取り置き明細（商品情報の配列） |

### GET /layaways/{layawayId}
指定した取り置きを取得する。
