# 税率（Tax Rates）

## 概要

消費税率および軽減税率の設定情報を取得するAPI。消費税率は契約単位で適用される標準税率、軽減税率は契約ごとのカスタム設定および固定の軽減税率を取得できる。税率は取引登録時の税計算に使用される。

**利用可能プラン:** スタンダード、プレミアム、プレミアムプラス、フードビジネス、リテールビジネス

**必要スコープ:** `pos.transactions:read`

---

## エンドポイント

### GET /consumption_tax_rates
消費税率の一覧を取得する。`target_date` を指定すると、その日時点で有効な消費税率を1件取得できる。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| sort | - | string | 並び順（applyStartDate） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |
| target_date | - | string | 対象日（YYYY-MM-DD）。指定した場合、その時点で有効な消費税率を1件取得 |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| applyStartDate | string | 適用開始日 |
| taxRate | string | 税率（単位: ％） |
| taxRounding | string | 税の丸め方式（0:四捨五入、1:切り捨て、2:切り上げ） |

---

### GET /reduce_tax_rates
軽減税率の一覧を取得する。契約共通の固定軽減税率と契約ごとのカスタム軽減税率の両方を返す。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| sort | - | string | 並び順（reduceTaxId、division、rate、termStart、termEnd） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |
| reduce_tax_id | - | string | 軽減税率IDで絞り込み |
| division | - | string | 軽減税率区分で絞り込み（1または2） |
| target_date | - | string | 指定日時点で有効な軽減税率を取得（YYYY-MM-DD） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| reduceTaxId | string | 軽減税率ID |
| name | string | 軽減税率名称 |
| division | string | 軽減税率区分（1:特定商品適用、2:状態による切り替え） |
| rate | string | 税率（パーセント値、最大3桁・小数第3位まで） |
| termStart | string | 適用可能期間の開始日 |
| termEnd | string | 適用可能期間の終了日 |
| condition | string | 区分2の場合、選択ボタン名称（カンマ区切り） |
| advancedCondition | string | 区分2の初期選択状態（null / 0 / 1） |
| insDateTime | string | 登録日時（ISO 8601形式） |
| updDateTime | string | 更新日時（ISO 8601形式） |

#### division の値の意味
| 値 | 説明 |
|----|------|
| 1 | 特定商品に適用する軽減税率 |
| 2 | 状態（イートイン/テイクアウトなど）によって切り替える軽減税率 |

---

## 使用例

```javascript
// 現在の消費税率を取得
const today = new Date().toISOString().slice(0, 10)
smaregi_api_get({
  "path": "/consumption_tax_rates",
  "query": { "target_date": today }
})

// 全消費税率履歴を取得（適用開始日昇順）
smaregi_api_get({
  "path": "/consumption_tax_rates",
  "query": { "sort": "applyStartDate:asc" }
})

// 軽減税率一覧取得
smaregi_api_get({ "path": "/reduce_tax_rates" })

// 特定商品適用の軽減税率のみ取得
smaregi_api_get({
  "path": "/reduce_tax_rates",
  "query": { "division": "1" }
})

// 指定日時点で有効な軽減税率を取得
smaregi_api_get({
  "path": "/reduce_tax_rates",
  "query": { "target_date": "2024-10-01" }
})
```

## 関連リソース

- 商品（Products）: `taxDivision` フィールドで商品ごとの税区分を設定
- 取引（Transactions）: 取引時に消費税率・軽減税率を参照して計算
