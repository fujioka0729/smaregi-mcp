# 商品管理

## 概要

商品の登録・取得・更新・削除、一括操作、検索の操作ガイド。

## 利用可能なパス

| パス | メソッド | 説明 |
|------|---------|------|
| /products | GET | 商品一覧取得 |
| /products | POST | 商品登録 |
| /products/bulk | POST | 商品一括登録 |
| /products/bulk | PATCH | 商品一括更新 |
| /products/{productId} | GET | 商品取得 |
| /products/{productId} | PATCH | 商品更新 |
| /products/{productId} | DELETE | 商品削除 |
| /products/{productId}/prices | GET | 商品価格一覧 |
| /products/{productId}/image | PUT | 商品画像登録 |
| /products/attributes | GET | 商品属性一覧 |
| /categories | GET | 部門一覧取得 |
| /stores/{storeId}/products | GET | 店舗取扱商品一覧 |

## 使用例

### 商品一覧を取得する

```
smaregi_api_get({ "path": "/products", "query": { "limit": "100" } })
```

### 商品コードで検索する

```
smaregi_api_get({ "path": "/products", "query": { "product_code": "ABC001" } })
```

### 部門IDで絞り込む

```
smaregi_api_get({ "path": "/products", "query": { "category_id": "1", "limit": "100" } })
```

### 更新日時で絞り込む

```
smaregi_api_get({ "path": "/products", "query": { "upd_date_time-from": "2026-01-01T00:00:00+09:00", "upd_date_time-to": "2026-01-31T23:59:59+09:00" } })
```

### 商品コード降順で取得する

```
smaregi_api_get({ "path": "/products", "query": { "sort": "productCode:desc", "limit": "50" } })
```

### 商品を登録する

```
smaregi_api_post({ "path": "/products", "body": { "productCode": "ABC001", "productName": "テスト商品", "categoryId": "1", "price": "1000", "taxDivision": "1", "stockControlDivision": "1" } })
```

### 商品を更新する

```
smaregi_api_patch({ "path": "/products/12345", "body": { "productName": "更新後商品名", "price": "1500" } })
```

### 商品を削除する

```
smaregi_api_delete({ "path": "/products/12345" })
```

### 商品を一括登録する

```
smaregi_api_post({ "path": "/products/bulk", "body": [{ "productCode": "BULK001", "productName": "一括商品1", "categoryId": "1", "price": "500" }, { "productCode": "BULK002", "productName": "一括商品2", "categoryId": "1", "price": "800" }] })
```

### 店舗取扱商品を取得する

```
smaregi_api_get({ "path": "/stores/1/products", "query": { "limit": "100" } })
```

## ページネーション

1000件を超える商品を取得する場合、pageパラメータでページ送りする。

```
// 1ページ目
smaregi_api_get({ "path": "/products", "query": { "limit": "1000", "page": "1" } })
// 2ページ目
smaregi_api_get({ "path": "/products", "query": { "limit": "1000", "page": "2" } })
```

## 注意事項

- productCode は半角英数記号20文字以内
- productName は85文字以内
- 一括操作は最大1000件
- 商品削除時、在庫データや取引履歴は残る
- 部門（categoryId）は事前に作成が必要
