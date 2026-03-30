# 在庫操作

## 概要

在庫の照会・更新（絶対値/相対値）・一括操作・変動履歴の操作ガイド。

## 利用可能なパス

| パス | メソッド | 説明 |
|------|---------|------|
| /stock | GET | 在庫一覧取得 |
| /stock/{productId} | PATCH | 在庫更新（絶対値） |
| /stock/{productId}/add | POST | 在庫更新（相対値） |
| /stock/bulk | PATCH | 在庫一括更新 |
| /stock/changes/{productId}/{storeId} | GET | 在庫変動履歴取得 |

## 使用例

### 全在庫を取得する

```
smaregi_api_get({ "path": "/stock", "query": { "limit": "1000" } })
```

### 特定店舗の在庫を取得する

```
smaregi_api_get({ "path": "/stock", "query": { "store_id": "1", "limit": "1000" } })
```

### 商品コードで在庫を検索する

```
smaregi_api_get({ "path": "/stock", "query": { "product_code": "ABC001" } })
```

### 特定商品の在庫を取得する

```
smaregi_api_get({ "path": "/stock", "query": { "product_id": "12345" } })
```

### 在庫を設定する（絶対値・棚卸）

```
smaregi_api_patch({ "path": "/stock/12345", "body": { "storeId": "1", "stockAmount": "50" } })
```

### 在庫を入荷する（相対値・加算）

```
smaregi_api_post({ "path": "/stock/12345/add", "body": { "storeId": "1", "stockAmount": "10" } })
```

### 在庫を出荷する（相対値・減算）

```
smaregi_api_post({ "path": "/stock/12345/add", "body": { "storeId": "1", "stockAmount": "-5" } })
```

### 在庫を一括更新する

```
smaregi_api_patch({ "path": "/stock/bulk", "body": [{ "productId": "100", "storeId": "1", "stockAmount": "30" }, { "productId": "101", "storeId": "1", "stockAmount": "25" }] })
```

### 在庫変動履歴を取得する

```
smaregi_api_get({ "path": "/stock/changes/12345/1" })
```

## 使い分け

| ユースケース | メソッド | エンドポイント |
|-------------|---------|--------------|
| 棚卸（在庫数を直接設定） | PATCH | /stock/{productId} |
| 入荷（数量を加算） | POST | /stock/{productId}/add |
| 出荷（数量を減算） | POST | /stock/{productId}/add |
| 複数商品の一括変更 | PATCH | /stock/bulk |

## 注意事項

- 並行処理では相対値更新（/add）を推奨（競合回避）
- 絶対値更新は棚卸など確定的な設定に使用
- stockAmountは文字列型で指定する
- 在庫管理対象の商品のみ操作可能（stockControlDivision が "1"）
- 一括更新は最大1000件
