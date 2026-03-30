# セット商品・回数券（Product Sets）

## 概要

回数券（セット商品）の購入取引を管理するAPI。回数券はあらかじめ決められた回数分の商品・サービスをまとめて販売する商品形態で、購入後に1回ずつ消費していく。購入日時・有効期限・消費状況などを管理できる。

なお、商品マスタ上のセット商品（division=1 のタイプ）の定義は `/products` で管理する。

**利用可能プラン:** スタンダード、プレミアム、プレミアムプラス、フードビジネス、リテールビジネス

**必要スコープ:** `pos.transactions:read`

---

## エンドポイント

### GET /transactions/product_sets
回数券購入取引の一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| sort | - | string | 並び順（transactionProductSetId、purchaseDateTime、expireDate、consumeDateTime） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |
| product_set_id | - | string | 回数券商品IDで絞り込み |
| customer_id | - | string | 会員IDで絞り込み |
| purchase_date_time-from | - | string | 購入日時（開始）。YYYY-MM-DDThh:mm:ssTZD形式 |
| purchase_date_time-to | - | string | 購入日時（終了）。最大31日間の範囲 |
| consume_date_time-from | - | string | 最終使用日時（開始） |
| consume_date_time-to | - | string | 最終使用日時（終了）。最大31日間の範囲 |
| status | - | string | ステータス（0:使用中、1:完了、2:期限切れ） |
| with_products | - | string | 対象商品情報の付加（all / none） |
| with_option_products | - | string | オプション商品情報の付加（all / none） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| transactionProductSetId | string | 回数券購入取引ID |
| customerId | string | 購入した会員ID |
| purchaseDateTime | string | 購入日時（ISO 8601形式） |
| expireDate | string | 有効期限日 |
| status | string | 状態（0:使用中、1:完了、2:期限切れ） |
| products | array | 対象商品の配列（with_products=all 時） |
| optionProducts | array | オプション商品の配列（with_option_products=all 時） |

#### エラー
- 400: 日時範囲でfrom/toの片方のみ指定、期間が31日超

---

### GET /transactions/product_sets/{product_set_id}
指定した回数券購入取引を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| product_set_id | ○ | string | 回数券購入取引ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| with_products | - | string | 対象商品情報の付加（all / none） |
| with_option_products | - | string | オプション商品情報の付加（all / none） |

#### レスポンス
GET /transactions/product_sets と同一フィールド構成。

---

## バンドル販売 API（Bundles）

複数商品をまとめて販売するバンドル販売（セット売り含む）を管理するAPI。

**必要スコープ:**
- 参照: `pos.products:read`
- 登録・更新・削除: `pos.products:write`

### GET /bundles

バンドル販売の一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| sort | - | string | 並び順（productBundleGroupId、termFrom、termTo） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |
| product_bundle_group_id | - | string | 商品バンドルグループIDで絞り込み |
| term_from | - | string | 適用開始日（YYYY-MM-DD） |
| term_to | - | string | 適用終了日（YYYY-MM-DD） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| productBundleGroupId | string | 商品バンドルグループID |
| productBundleGroupName | string | バンドルグループ名称 |
| type | string | 種類（1:バンドル売り+販売金額指定、2:値引金額指定、3:割引率指定、4:セット売り） |
| taxDivision | string | 税区分（0:税込、1:税抜、2:非課税） |
| reduceTaxId | string | 軽減税率ID |
| quantity | string | バンドル販売の条件数量 |
| value | string | 販売金額・値引金額・割引率 |
| priority | string | 適用優先順位 |
| termFrom | string | 適用開始日（YYYY-MM-DD） |
| termTo | string | 適用終了日（YYYY-MM-DD） |
| pointNotApplicable | string | ポイント対象区分（0:対象、1:対象外） |
| taxFreeDivision | string | 免税区分（0:対象外、1:一般品、2:消耗品） |
| calcDiscount | string | 値引割引計算対象区分（0:対象外、1:対象） |
| insDateTime | string | 作成日時（YYYY-MM-DDThh:mm:ssTZD） |
| updDateTime | string | 更新日時（YYYY-MM-DDThh:mm:ssTZD） |

### GET /bundles/{product_bundle_group_id}

指定したバンドル販売を取得する。

### POST /bundles

バンドル販売を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| productBundleGroupName | ○ | string | バンドルグループ名称（最大85文字） |
| type | ○ | string | 種類（1〜4） |
| value | ○ | string | 販売金額・値引金額・割引率（-99999999〜999999999） |
| termFrom | ○ | string | 適用開始日（YYYY-MM-DD） |
| termTo | ○ | string | 適用終了日（YYYY-MM-DD） |
| products | ○ | array | 対象商品リスト（1件以上。categoryId/productId/productGroupCodeのいずれか1つ必須） |

### PATCH /bundles/{product_bundle_group_id}

バンドル販売を更新する。

### DELETE /bundles/{product_bundle_group_id}

バンドル販売を削除する。

---

## 商品マスタ上のセット商品について

商品区分（division）= 1 がセット商品を示す。商品の登録・取得は `/products` エンドポイントで行う。

```javascript
// セット商品のみ取得
smaregi_api_get({
  "path": "/products",
  "query": { "division": "1" }
})
```

---

## 使用例

```javascript
// 特定会員の回数券一覧を取得
smaregi_api_get({
  "path": "/transactions/product_sets",
  "query": {
    "customer_id": "12345",
    "status": "0",
    "with_products": "all"
  }
})

// 購入日時範囲で絞り込み
smaregi_api_get({
  "path": "/transactions/product_sets",
  "query": {
    "purchase_date_time-from": "2024-01-01T00:00:00+09:00",
    "purchase_date_time-to": "2024-01-31T23:59:59+09:00"
  }
})

// 特定の回数券取引を取得
smaregi_api_get({
  "path": "/transactions/product_sets/67890",
  "query": { "with_products": "all", "with_option_products": "all" }
})
```

## 関連リソース

- 商品（Products）: `/products` で division=1 のセット商品を管理
- 取引（Transactions）: `/transactions` で回数券を含む取引全体を管理
- 会員（Customers）: `/customers` で会員情報を管理
