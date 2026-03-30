# テーブル利用（Waiter Table Uses）

## 概要

スマレジ・ウェイターのテーブル利用履歴を管理するAPI。チェックイン・チェックアウトの操作や、テーブル利用状況の参照ができる。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.orders:read`（参照）、`waiter.orders:write`（更新）

## エンドポイント

### GET /table_uses

テーブル利用履歴一覧を取得する。

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| sort | - | string | ソート順（例: `tableUseId`, `tableUseId:desc`, `checkInDateTime`） |
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |
| store_id | - | string | 店舗IDで絞り込み |
| status | - | string | ステータスで絞り込み（open/closed） |
| check_in_date_time-from | - | string | チェックイン日時（開始）ISO 8601形式 |
| check_in_date_time-to | - | string | チェックイン日時（終了）ISO 8601形式 |
| check_out_date_time-from | - | string | チェックアウト日時（開始）ISO 8601形式 |
| check_out_date_time-to | - | string | チェックアウト日時（終了）ISO 8601形式 |
| upd_date_time-from | - | string | 更新日時（開始）ISO 8601形式 |
| upd_date_time-to | - | string | 更新日時（終了）ISO 8601形式 |

#### レスポンス

```json
[
  {
    "tableUseId": "1",
    "storeId": "1",
    "storeName": "渋谷店",
    "tableId": "1",
    "tableName": "テーブル1",
    "tableCode": "T001",
    "status": "open",
    "guestCount": "4",
    "customerDivisionId": "1",
    "customerDivisionName": "一般",
    "checkInDateTime": "2024-01-01T12:00:00+09:00",
    "checkOutDateTime": null,
    "transactionHeadId": null,
    "memo": "",
    "updDateTime": "2024-01-01T12:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| tableUseId | string | テーブル利用ID |
| storeId | string | 店舗ID |
| storeName | string | 店舗名 |
| tableId | string | テーブルID |
| tableName | string | テーブル名 |
| tableCode | string | テーブルコード |
| status | string | ステータス（open:営業中 closed:終了） |
| guestCount | string | 来客数 |
| customerDivisionId | string | 客層ID |
| customerDivisionName | string | 客層名 |
| checkInDateTime | string | チェックイン日時 |
| checkOutDateTime | string | チェックアウト日時（未チェックアウトはnull） |
| transactionHeadId | string | 紐付き取引ID（会計済みの場合） |
| memo | string | メモ |
| updDateTime | string | 更新日時 |

### GET /table_uses/{tableUseId}

指定したテーブル利用履歴を取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| tableUseId | ○ | string | テーブル利用ID |

#### レスポンス

テーブル利用履歴一覧取得と同じ構造のオブジェクト（注文情報も含む場合あり）。

### POST /table_uses

テーブル利用を開始する（チェックイン）。

#### リクエストボディ

```json
{
  "storeId": "1",
  "tableId": "1",
  "guestCount": 4,
  "customerDivisionId": "1",
  "memo": ""
}
```

| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeId | ○ | string | 店舗ID |
| tableId | ○ | string | テーブルID |
| guestCount | - | integer | 来客数 |
| customerDivisionId | - | string | 客層ID |
| memo | - | string | メモ |

#### レスポンス

作成されたテーブル利用オブジェクト。

### PUT /table_uses/{tableUseId}/checkout

テーブル利用を終了する（チェックアウト）。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| tableUseId | ○ | string | テーブル利用ID |

#### リクエストボディ

```json
{
  "transactionHeadId": "12345"
}
```

| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| transactionHeadId | - | string | 紐付ける取引ID（会計後に設定） |

## ステータス一覧

| 値 | 説明 |
|----|------|
| open | テーブル使用中 |
| closed | 終了（チェックアウト済み） |

## 注意事項

- チェックイン後に注文を追加する場合は Orders API を使用する
- チェックアウト時に `transactionHeadId` を紐付けることで、POSの取引と連携できる
- `waiter.orders:history` スコープがあると、過去のテーブル利用履歴（closed）も参照可能
- Webhookでテーブルのチェックインやステータスをリアルタイムで受信できる
