# クーポン操作

## 概要

クーポンの登録・取得・更新・削除の操作ガイド。

## 利用可能なパス

| パス | メソッド | 説明 |
|------|---------|------|
| /coupons | GET | クーポン一覧取得 |
| /coupons | POST | クーポン登録 |
| /coupons/{couponId} | GET | クーポン取得 |
| /coupons/{couponId} | PUT | クーポン更新 |
| /coupons/{couponId} | DELETE | クーポン削除 |

## 使用例

### クーポン一覧を取得する

```
smaregi_api_get({ "path": "/coupons", "query": { "limit": "100" } })
```

### 値引クーポンを登録する

```
smaregi_api_post({ "path": "/coupons", "body": { "couponName": "500円引きクーポン", "couponDivision": "1", "couponValue": "500", "startDate": "2026-04-01", "endDate": "2026-04-30" } })
```

### 割引クーポンを登録する

```
smaregi_api_post({ "path": "/coupons", "body": { "couponName": "10%OFFクーポン", "couponDivision": "2", "couponValue": "10", "startDate": "2026-04-01", "endDate": "2026-06-30" } })
```

### クーポンを更新する

```
smaregi_api_put({ "path": "/coupons/12345", "body": { "couponName": "更新後クーポン名", "endDate": "2026-12-31" } })
```

### クーポンを削除する

```
smaregi_api_delete({ "path": "/coupons/12345" })
```

## クーポン区分

| 値 | 説明 | couponValue の意味 |
|-----|------|-------------------|
| 1 | 値引 | 値引額（例: "500" → 500円引き） |
| 2 | 割引 | 割引率（例: "10" → 10%OFF） |

## 注意事項

- クーポンの有効期間は startDate〜endDate で設定
- 期間外のクーポンはPOS端末で使用不可
- 使用済みクーポンは取引明細に記録される
