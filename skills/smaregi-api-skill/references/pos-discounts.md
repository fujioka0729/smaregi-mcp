# 割引区分（Discounts）

## 概要

スマレジにおける「割引区分」は独立したエンドポイントではなく、取引（Transaction）・クーポン・セールなどの各リソースに含まれる属性値（フィールド）として管理される。割引・値引・価格指定の区別や、割引の丸め方式などを表す。

---

## 割引区分の種類

### 1. 単品割引区分（discountDivision）

取引明細の単品割引・値引きの区分。取引明細取得時のレスポンスフィールドに含まれる。

| 値 | 説明 |
|----|------|
| 1 | 割引（率指定、例：10%割引） |
| 2 | 値引（額指定、例：100円引き） |
| 3 | 価格指定（直接販売価格を指定） |

---

### 2. 合計割引区分（discountDivision）

取引全体への割引の区分。取引取得時のレスポンスに含まれる。

| 値 | 説明 |
|----|------|
| 1 | 割引（率指定） |
| 2 | 値引（額指定） |

---

### 3. 割引丸め区分（discountRoundingDivision）

割引計算時の端数処理方式。

| 値 | 説明 |
|----|------|
| 0 | 四捨五入 |
| 1 | 切り捨て |
| 2 | 切り上げ |

---

### 4. クーポンの付与区分（awardType）

クーポン適用時の特典の種類。GET /coupons のレスポンスに含まれる。

| 値 | 説明 |
|----|------|
| 1 | 金額値引き |
| 2 | 割合割引（%引き） |
| 3 | 商品プレゼント |
| 4 | ポイント付与 |
| 5 | マイル付与 |

---

## 関連エンドポイント

| エンドポイント | 関連フィールド |
|--------------|--------------|
| GET /transactions | `discountDivision`（合計割引区分） |
| GET /transactions/{id}/details | `discountDivision`（単品割引区分）、`discountRoundingDivision` |
| GET /coupons | `awardType`（クーポン特典種別） |
| POST /transactions | 取引登録時に `discountDivision` を指定 |

---

## 取引での割引指定例

```javascript
// 取引明細に単品値引きを設定する例
smaregi_api_post({
  "path": "/transactions",
  "body": {
    "storeId": "1",
    "terminalId": "1",
    "details": [
      {
        "productId": "100",
        "quantity": 1,
        "discountDivision": "2",   // 値引（額指定）
        "discountPrice": 100        // 100円引き
      }
    ]
  }
})

// 合計割引を設定する例（率指定）
smaregi_api_post({
  "path": "/transactions",
  "body": {
    "storeId": "1",
    "terminalId": "1",
    "discountDivision": "1",   // 割引（率指定）
    "discountRate": 10,         // 10%割引
    "details": [/* ... */]
  }
})
```

---

## 取引の割引情報取得例

```javascript
// 取引の割引情報を含む明細を取得
smaregi_api_get({
  "path": "/transactions/12345/details",
  "query": { "with_discounts": "all" }
})
```

## 値引・割引区分マスタ API

`/discount_divisions` エンドポイントで値引・割引区分のマスタを管理できる。

### GET /discount_divisions

値引・割引区分の一覧を取得する。

**必要スコープ:** `pos.transactions:read`

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| sort | - | string | 並び順（discountDivision、displaySequence） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |
| discount_division | - | string | 区分番号で絞り込み |
| award_type | - | string | 区分タイプで絞り込み（1:値引、2:割引） |
| display_flag | - | string | 表示フラグ（0:無効、1:有効） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| discountDivision | string | 値引・割引区分を一意に識別する番号 |
| awardType | string | 区分タイプ（1:値引、2:割引） |
| discountDivisionName | string | 区分名称 |
| displaySequence | string | 表示順序 |
| displayFlag | string | 表示フラグ（0:無効、1:有効） |
| insDateTime | string | 作成日時（YYYY-MM-DDThh:mm:ssTZD） |
| updDateTime | string | 更新日時（YYYY-MM-DDThh:mm:ssTZD） |

### POST /discount_divisions

値引・割引区分を登録する。

**必要スコープ:** `pos.transactions:write`

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| awardType | ○ | string | 区分タイプ（1:値引、2:割引） |
| discountDivisionName | ○ | string | 区分名称（最大85文字） |
| displaySequence | - | string | 表示順序（1〜999） |
| displayFlag | - | string | 表示フラグ（0:無効、1:有効、デフォルト: 1） |

### PATCH /discount_divisions/{discount_division}

値引・割引区分を更新する。

**パスパラメータ:** `discount_division`（必須）: 値引・割引区分番号

### DELETE /discount_divisions/{discount_division}

値引・割引区分を削除する。

**パスパラメータ:** `discount_division`（必須）: 値引・割引区分番号

---

## 備考

- 取引の割引の設定は管理画面またはスタッフのPOS操作から行う
- クーポンの割引はGET /coupons で事前定義された割引区分を取得できる
- 割引丸め区分は店舗設定によりデフォルト値が異なる場合がある

## 関連リソース

- クーポン（Coupons）: `/coupons` でクーポン定義と割引条件を管理
- セール・特売（Bargains）: `/bargains` でセール期間中の価格を管理
- 取引（Transactions）: `/transactions` で割引が適用された取引を管理
