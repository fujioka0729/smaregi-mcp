# 取引（Transactions）

## 概要

POS端末での取引（売上・返品・入出金等）を管理するAPI。取引ヘッダーと取引明細で構成される。

## エンドポイント

### GET /transactions
取引一覧を取得する。

**注意**: 日付範囲パラメータ（transaction_date_time, terminal_tran_date_time, sum_date, upd_date_time のいずれか）の指定が必要。最大31日間。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順。使用可能: transactionHeadId, transactionDateTime, transactionHeadDivision, storeId, terminalId, customerId, terminalTranId, terminalTranDateTime, sumDate, updDateTime |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| transaction_head_id-from | - | string | 取引ID（開始） |
| transaction_head_id-to | - | string | 取引ID（終了） |
| transaction_date_time-from | - | string | 取引日時（開始）※最大31日間 |
| transaction_date_time-to | - | string | 取引日時（終了） |
| transaction_head_division | - | string | 取引区分（下記参照） |
| store_id | - | integer | 店舗ID |
| terminal_tran_date_time-from | - | string | 端末取引日時（開始）※最大31日間 |
| terminal_tran_date_time-to | - | string | 端末取引日時（終了） |
| sum_date-from | - | string | 精算日（開始）※最大31日間 |
| sum_date-to | - | string | 精算日（終了） |
| customer_code | - | string | 会員コード（完全一致） |
| transaction_uuid | - | string | レシート番号（完全一致） |
| barcode | - | string | 仮売上バーコード |
| upd_date_time-from | - | string | 更新日時（開始）※最大31日間 |
| upd_date_time-to | - | string | 更新日時（終了） |
| with_details | - | string | 取引明細を含む（all / summary / none） |
| with_deposit_others | - | string | 入金情報を含む（all / none） |
| with_layaway | - | string | 取り置き情報を含む（all / none） |
| with_money_control | - | string | 金銭管理情報を含む（all / none） |
| with_detail_product_attributes | - | string | 商品属性を含む（all / none） |

#### 取引区分（transactionHeadDivision）
| 値 | 説明 |
|-----|------|
| 1 | 通常取引 |
| 2 | 入金 |
| 3 | 出金 |
| 4 | 取消 |
| 5 | 返品 |
| 6 | 仮売上 |
| 7 | 売上確定 |
| 8 | レジ点検 |
| 9 | レジ精算 |
| 10 | 取り置き |
| 11 | 取り置き取消 |
| 12 | 取り置き引渡 |
| 13 | 受注 |
| 14 | 打消取消 |
| 15 | 取り置き引渡取消 |
| 16 | 取り置き打消取消 |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| transactionHeadId | string | 取引ID |
| transactionDateTime | string | 取引日時 |
| transactionHeadDivision | string | 取引区分 |
| subtotal | string | 小計 |
| total | string | 合計 |
| taxInclude | string | 税込額 |
| taxExclude | string | 税抜額 |
| cashTotal | string | 現金合計 |
| creditTotal | string | クレジット合計 |
| deposit | string | 預り金 |
| change | string | お釣り |
| newPoint | string | 付与ポイント |
| spendPoint | string | 利用ポイント |
| totalPoint | string | 累計ポイント |
| storeId | string | 店舗ID |
| storeCode | string | 店舗コード |
| terminalId | string | 端末ID |
| customerId | string | 会員ID |
| customerCode | string | 会員コード |
| staffId | string | スタッフID |
| staffCode | string | スタッフコード |
| staffName | string | スタッフ名 |
| transactionUuid | string | レシート番号 |
| memo | string | メモ |
| updDateTime | string | 更新日時 |

#### 取引明細フィールド（details[]）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| transactionDetailId | string | 明細ID |
| transactionDetailDivision | string | 明細区分 |
| productId | string | 商品ID |
| productCode | string | 商品コード |
| productName | string | 商品名 |
| price | string | 単価 |
| salesPrice | string | 販売価格 |
| quantity | string | 数量 |
| unitDiscountPrice | string | 単品値引額 |
| unitDiscountRate | string | 単品割引率 |
| subtotal | string | 小計 |

### POST /transactions
取引を登録する。

#### リクエストボディ
取引ヘッダーと明細の情報を含むオブジェクト。

### GET /transactions/{transactionId}
指定した取引を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| transactionId | ○ | string | 取引ID |

### PATCH /transactions/{transactionId}
取引を更新する。

### POST /transactions/{transactionId}/cancel
取引を取消する。

### GET /transactions/{transactionId}/details
取引明細を取得する。
