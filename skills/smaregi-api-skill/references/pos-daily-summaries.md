# 日次精算（Daily Summaries）

## 概要

店舗の日次精算（レジ締め）データを取得するAPI。売上集計、入出金情報などを確認できる。

## エンドポイント

### GET /daily_sum
日次精算一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| store_id | - | string | 店舗IDでフィルタ |
| terminal_id | - | string | 端末IDでフィルタ |
| sum_date-from | - | string | 精算日（開始） |
| sum_date-to | - | string | 精算日（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| dailySumId | string | 精算ID |
| storeId | string | 店舗ID |
| terminalId | string | 端末ID |
| sumDate | string | 精算日 |
| totalSales | string | 売上合計 |
| totalTransaction | string | 取引件数 |
| totalCustomer | string | 客数 |
| totalCash | string | 現金合計 |
| totalCredit | string | クレジット合計 |
| totalDeposit | string | 入金合計 |
| totalWithdrawal | string | 出金合計 |
| totalDiscount | string | 値引合計 |
| totalReturn | string | 返品合計 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |
