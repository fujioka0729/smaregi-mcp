# 販売区分（Divisions / Sell Division）

## 概要

スマレジにおける「販売区分」は独立したエンドポイントではなく、店舗・商品・取引などの各リソースに含まれる属性値（フィールド）として管理される。主に税の内外税区分・商品種別・売上区分などを表す。

---

## 販売区分の種類

### 1. 店舗の販売区分（sellDivision）

店舗ごとの内税・外税販売の設定。GET /stores の `sellDivision` フィールドで確認できる。

| 値 | 説明 |
|----|------|
| 0 | 内税販売（消費税込みの価格で販売） |
| 1 | 外税販売（消費税を別途加算して販売） |

**取得方法:**
```javascript
smaregi_api_get({
  "path": "/stores",
  "query": { "fields": "storeId,storeName,sellDivision" }
})
```

---

### 2. 商品の販売区分（salesDivision）

商品ごとの売上対象区分。GET /products の `salesDivision` フィールドで確認できる。

| 値 | 説明 |
|----|------|
| 0 | 売上対象 |
| 1 | 売上対象外（ギフト券・商品券など） |

**取得方法:**
```javascript
// 売上対象外商品のみ取得
smaregi_api_get({
  "path": "/products",
  "query": { "sales_division": "1" }
})
```

---

### 3. 商品区分（division）

商品の種別。GET /products の `division` フィールドで確認できる。

| 値 | 説明 |
|----|------|
| 0 | 通常商品 |
| 1 | セット商品（回数券など） |
| 2 | オプション商品（トッピング・追加サービスなど） |

**取得方法:**
```javascript
// セット商品のみ取得
smaregi_api_get({
  "path": "/products",
  "query": { "division": "1" }
})

// オプション商品のみ取得
smaregi_api_get({
  "path": "/products",
  "query": { "division": "2" }
})
```

---

### 4. 取引の販売区分（salesDivision）

取引明細ごとの売上区分。取引取得時のレスポンスに含まれる。

| 値 | 説明 |
|----|------|
| 0 | 売上 |
| 1 | 返品 |

---

## 関連エンドポイント

| エンドポイント | 関連フィールド |
|--------------|--------------|
| GET /stores | `sellDivision`（内税/外税） |
| GET /products | `salesDivision`（売上区分）、`division`（商品区分） |
| GET /transactions | `salesDivision`（取引種別） |
| GET /transactions/{id}/details | `salesDivision`（明細の売上区分） |

---

## 使用例

```javascript
// 店舗の内外税設定を確認
smaregi_api_get({
  "path": "/stores",
  "query": { "fields": "storeId,storeName,sellDivision" }
})

// 通常商品のみ取得
smaregi_api_get({
  "path": "/products",
  "query": { "division": "0" }
})
```

## 備考

- 販売区分の設定はスマレジ管理画面から変更する
- APIでは参照のみで、独立した販売区分マスタAPIは存在しない
- 内税・外税の判定は取引登録時に重要で、税計算に影響する
