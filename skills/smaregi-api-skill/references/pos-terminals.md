# 端末（Terminals）

## 概要

POS端末（レジ端末）の情報を取得するAPI。

## エンドポイント

### GET /terminals
端末一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| store_id | - | string | 店舗IDでフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| terminalId | string | 端末ID |
| storeId | string | 店舗ID |
| terminalName | string | 端末名 |
| terminalNo | string | 端末番号 |
| terminalDivision | string | 端末区分 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |
