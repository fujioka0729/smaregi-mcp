# 店舗管理

## 概要

店舗情報の取得、端末一覧の確認、店舗取扱商品の操作ガイド。

## 利用可能なパス

| パス | メソッド | 説明 |
|------|---------|------|
| /stores | GET | 店舗一覧取得 |
| /stores | POST | 店舗登録 |
| /stores/{storeId} | GET | 店舗取得 |
| /stores/{storeId} | PATCH | 店舗更新 |
| /stores/{storeId} | DELETE | 店舗削除 |
| /stores/{storeId}/products | GET | 店舗取扱商品一覧 |
| /terminals | GET | 端末一覧取得 |
| /staffs | GET | スタッフ一覧取得 |
| /staffs/{staffId} | GET | スタッフ取得 |
| /daily_sum | GET | 日次精算取得 |

## 使用例

### 店舗一覧を取得する

```
smaregi_api_get({ "path": "/stores" })
```

### 特定の店舗を取得する

```
smaregi_api_get({ "path": "/stores/1" })
```

### 店舗を登録する

```
smaregi_api_post({ "path": "/stores", "body": { "storeName": "新宿店", "storeCode": "SHINJUKU01", "postalCode": "160-0022", "address": "東京都新宿区新宿3-1-1", "phoneNumber": "03-1234-5678" } })
```

### 店舗の端末一覧を取得する

```
smaregi_api_get({ "path": "/terminals", "query": { "store_id": "1" } })
```

### 店舗のスタッフ一覧を取得する

```
smaregi_api_get({ "path": "/staffs", "query": { "store_id": "1" } })
```

### 店舗取扱商品を取得する

```
smaregi_api_get({ "path": "/stores/1/products", "query": { "limit": "100" } })
```

### 店舗の日次精算を取得する

```
smaregi_api_get({ "path": "/daily_sum", "query": { "store_id": "1", "sum_date-from": "2026-03-01", "sum_date-to": "2026-03-31" } })
```

## 注意事項

- 店舗削除時、関連する取引データや在庫データは残る
- 端末一覧は読み取り専用
- スタッフ情報は読み取り専用（pos.staffs:read スコープが必要）
