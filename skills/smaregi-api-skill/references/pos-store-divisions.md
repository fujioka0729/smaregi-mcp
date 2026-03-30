# 店舗区分（Store Divisions）

## 概要

スマレジにおける「店舗区分」は店舗（Stores）リソースの `division` フィールドとして管理される属性値であり、独立したエンドポイントは存在しない。通常店舗と倉庫（在庫管理専用）を区別するために使用する。

---

## 店舗区分の値

| 値 | 説明 |
|----|------|
| 1 | 通常店舗（POSレジとして販売業務を行う店舗） |
| 2 | 倉庫（在庫管理専用。精算や販売業務は行えない） |

---

## エンドポイント

店舗区分は `/stores` エンドポイントで取得・フィルタリングできる。

### GET /stores（店舗区分でフィルタ）

#### クエリパラメータ（店舗区分関連）
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| division | - | string | 店舗区分（1:通常店舗、2:倉庫） |

#### レスポンスの関連フィールド
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storeId | string | 店舗ID |
| storeName | string | 店舗名 |
| storeCode | string | 店舗コード |
| division | string | 店舗区分（1:通常、2:倉庫） |
| sellDivision | string | 販売区分（0:内税、1:外税） |
| updDateTime | string | 更新日時（ISO 8601形式） |

**必要スコープ:** `pos.stores:read`

---

## 使用例

```javascript
// 通常店舗のみ取得
smaregi_api_get({
  "path": "/stores",
  "query": { "division": "1" }
})

// 倉庫のみ取得
smaregi_api_get({
  "path": "/stores",
  "query": { "division": "2" }
})

// 全店舗を取得（区分含む）
smaregi_api_get({
  "path": "/stores",
  "query": { "fields": "storeId,storeName,division,sellDivision" }
})
```

---

## 店舗区分と機能制限

| 区分 | 販売業務 | 精算 | 在庫管理 | 備考 |
|------|---------|------|---------|------|
| 1（通常店舗） | 可 | 可 | 可 | 一般的なPOS利用 |
| 2（倉庫） | 不可 | 不可 | 可 | 在庫の保管・移動のみ |

- 倉庫店舗への精算実行はAPIでもエラー（400）となる
- 在庫移動（stock transfer）で通常店舗と倉庫間の移動が可能

---

## 備考

- 店舗区分の変更はスマレジ管理画面から行う
- 倉庫は在庫数の確保・移動目的で使用される
- 精算API（POST /adjustments）は倉庫への実行が制限されている

## 関連リソース

- 店舗（Stores）: `/stores` で全店舗情報を管理
- 在庫（Stock）: `/stores/{storeId}/products/{productId}/stock` で在庫管理
- 精算（Adjustments）: `/adjustments` で店舗の精算（通常店舗のみ）
