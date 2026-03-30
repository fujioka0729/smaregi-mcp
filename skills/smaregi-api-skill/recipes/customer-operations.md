# 会員管理

## 概要

会員の登録・更新・削除、ポイント管理の操作ガイド。

## 利用可能なパス

| パス | メソッド | 説明 |
|------|---------|------|
| /customers | GET | 会員一覧取得 |
| /customers | POST | 会員登録 |
| /customers/bulk | POST | 会員一括登録 |
| /customers/bulk | PATCH | 会員一括更新 |
| /customers/{customerId} | GET | 会員取得 |
| /customers/{customerId} | PATCH | 会員更新 |
| /customers/{customerId} | DELETE | 会員削除 |
| /customers/point | GET | ポイント一覧取得 |
| /customers/{customerId}/point | PATCH | ポイント絶対値更新 |
| /customers/{customerId}/point/add | POST | ポイント相対値更新 |

## 使用例

### 会員一覧を取得する

```
smaregi_api_get({ "path": "/customers", "query": { "limit": "100" } })
```

### 会員名で検索する

```
smaregi_api_get({ "path": "/customers", "query": { "customer_name": "田中" } })
```

### 会員コードで検索する

```
smaregi_api_get({ "path": "/customers", "query": { "customer_code": "MEM001" } })
```

### ポイント情報付きで会員を取得する

```
smaregi_api_get({ "path": "/customers", "query": { "with_points": "all", "limit": "100" } })
```

### 会員を登録する

```
smaregi_api_post({ "path": "/customers", "body": { "customerCode": "MEM001", "customerName": "田中太郎", "customerKana": "タナカタロウ", "sex": "1", "birthDate": "1990-01-15", "emailAddress": "tanaka@example.com", "telephoneNumber": "090-1234-5678", "postalCode": "150-0001", "address": "東京都渋谷区神宮前1-1-1" } })
```

### 会員情報を更新する

```
smaregi_api_patch({ "path": "/customers/12345", "body": { "telephoneNumber": "080-9876-5432", "address": "東京都港区六本木2-2-2" } })
```

### 会員を削除する

```
smaregi_api_delete({ "path": "/customers/12345" })
```

### ポイントを加算する（相対値）

```
smaregi_api_post({ "path": "/customers/12345/point/add", "body": { "point": "500" } })
```

### ポイントを減算する（相対値）

```
smaregi_api_post({ "path": "/customers/12345/point/add", "body": { "point": "-200" } })
```

### ポイントを直接設定する（絶対値）

```
smaregi_api_patch({ "path": "/customers/12345/point", "body": { "point": "1000", "pointExpireDate": "2027-03-31" } })
```

### ポイント残高一覧を取得する

```
smaregi_api_get({ "path": "/customers/point", "query": { "limit": "100" } })
```

## 注意事項

- 並行処理でポイントを操作する場合は相対値更新（/point/add）を使用
- 絶対値更新は競合の可能性があるため、棚卸的な用途に限定
- 一括操作は最大1000件
- 会員削除時、関連する取引履歴は残る
