# 取引操作

## 概要

取引の照会・登録・取消などの操作ガイド。売上確認や取引履歴の取得方法を説明。

## 利用可能なパス

| パス | メソッド | 説明 |
|------|---------|------|
| /transactions | GET | 取引一覧取得 |
| /transactions | POST | 取引登録 |
| /transactions/{transactionId} | GET | 取引取得 |
| /transactions/{transactionId} | PATCH | 取引更新 |
| /transactions/{transactionId}/cancel | POST | 取引取消 |
| /transactions/{transactionId}/details | GET | 取引明細取得 |

## 使用例

### 今日の取引を取得する

```
smaregi_api_get({ "path": "/transactions", "query": { "transaction_date_time-from": "2026-03-27T00:00:00+09:00", "transaction_date_time-to": "2026-03-27T23:59:59+09:00", "with_details": "summary" } })
```

### 特定店舗の取引を取得する

```
smaregi_api_get({ "path": "/transactions", "query": { "store_id": "1", "transaction_date_time-from": "2026-03-01T00:00:00+09:00", "transaction_date_time-to": "2026-03-31T23:59:59+09:00" } })
```

### 通常取引のみ取得する

```
smaregi_api_get({ "path": "/transactions", "query": { "transaction_head_division": "1", "transaction_date_time-from": "2026-03-01T00:00:00+09:00", "transaction_date_time-to": "2026-03-31T23:59:59+09:00" } })
```

### 明細付きで取引を取得する

```
smaregi_api_get({ "path": "/transactions", "query": { "transaction_date_time-from": "2026-03-27T00:00:00+09:00", "transaction_date_time-to": "2026-03-27T23:59:59+09:00", "with_details": "all", "with_deposit_others": "all" } })
```

### 特定の取引を取得する

```
smaregi_api_get({ "path": "/transactions/12345" })
```

### 取引明細を取得する

```
smaregi_api_get({ "path": "/transactions/12345/details" })
```

### 会員コードで取引を検索する

```
smaregi_api_get({ "path": "/transactions", "query": { "customer_code": "MEM001", "transaction_date_time-from": "2026-03-01T00:00:00+09:00", "transaction_date_time-to": "2026-03-31T23:59:59+09:00" } })
```

### 取引を取消する

```
smaregi_api_post({ "path": "/transactions/12345/cancel", "body": {} })
```

### 精算日で取引を取得する

```
smaregi_api_get({ "path": "/transactions", "query": { "sum_date-from": "2026-03-01", "sum_date-to": "2026-03-31" } })
```

## 注意事項

- 日付範囲パラメータは必須（transaction_date_time, terminal_tran_date_time, sum_date, upd_date_time のいずれか）
- 日付範囲は最大31日間
- 大量データ取得時はCSVエクスポートとの併用を推奨
- 取引区分: 1=通常取引, 4=取消, 5=返品, 9=レジ精算 など
- with_details を "all" にすると明細情報が含まれるがレスポンスが大きくなる
