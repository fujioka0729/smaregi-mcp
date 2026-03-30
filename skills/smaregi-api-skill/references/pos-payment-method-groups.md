# 支払方法グループ（Payment Method Groups）

## 概要

支払方法の分類（グループ）を管理するAPI。支払方法グループを使って現金・クレジットカード・電子マネーなどを任意のカテゴリにまとめ、端末表示や集計の粒度を調整できる。

**利用可能プラン:** スタンダード、プレミアム、プレミアムプラス、フードビジネス、リテールビジネス

**必要スコープ:**
- 参照: `pos.transactions:read`
- 登録・更新・削除: `pos.transactions:write`

---

## エンドポイント

### GET /payment_method_groups
支払方法グループ（分類）の一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| sort | - | string | 並び順（paymentMethodGroupId、code、displaySequence） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |
| payment_method_group_id | - | integer | 支払方法グループIDで絞り込み |
| code | - | string | 識別コードで絞り込み |
| display_flag | - | string | 端末表示フラグ（0:無効、1:有効） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| paymentMethodGroupId | string | 支払方法グループID |
| code | string | 一意の識別コード |
| name | string | 支払方法グループ名称 |
| displaySequence | string | 端末での表示順序 |
| displayFlag | string | 端末表示フラグ（0:無効、1:有効） |
| insDateTime | string | 作成日時（ISO 8601形式） |
| updDateTime | string | 更新日時（ISO 8601形式） |

---

### POST /payment_method_groups
支払方法グループを登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| name | ○ | string | 支払方法グループ名称（最大85文字） |
| displaySequence | - | integer | 表示順序（1〜999） |
| displayFlag | - | string | 端末表示フラグ（0:無効、1:有効、デフォルト: 1） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| paymentMethodGroupId | string | 登録された支払方法グループID |
| code | string | 一意の識別コード |
| name | string | 名称 |
| displaySequence | string | 表示順序 |
| displayFlag | string | 端末表示フラグ |
| insDateTime | string | 作成日時 |
| updDateTime | string | 更新日時 |

---

### PATCH /payment_method_groups/{payment_method_group_id}
支払方法グループを更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| payment_method_group_id | ○ | string | 支払方法グループID |

#### リクエストボディ
更新したいフィールドのみ指定。フィールドはPOST /payment_method_groupsと同一。

#### レスポンス
更新された支払方法グループ情報を返却（フィールドはGETと同一）。

---

### DELETE /payment_method_groups/{payment_method_group_id}
支払方法グループを削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| payment_method_group_id | ○ | string | 支払方法グループID |

#### エラー
- 404: 指定されたIDのリソースが存在しない

---

## 使用例

```javascript
// 支払方法グループ一覧を表示順で取得
smaregi_api_get({
  "path": "/payment_method_groups",
  "query": { "sort": "displaySequence:asc", "display_flag": "1" }
})

// 特定IDの支払方法グループを取得
smaregi_api_get({
  "path": "/payment_method_groups",
  "query": { "payment_method_group_id": 1 }
})

// 支払方法グループ登録
smaregi_api_post({
  "path": "/payment_method_groups",
  "body": {
    "name": "電子マネー",
    "displaySequence": 3,
    "displayFlag": "1"
  }
})

// 支払方法グループ名を更新
smaregi_api_patch({
  "path": "/payment_method_groups/3",
  "body": { "name": "スマホ決済" }
})

// 支払方法グループ削除
smaregi_api_delete({ "path": "/payment_method_groups/3" })
```

## 関連リソース

- 支払方法（Payment Methods）: `/payment_methods` で個々の支払方法を管理。グループとの紐付けも設定可能
- 取引（Transactions）: 取引の支払情報に支払方法グループが反映される
- 精算（Adjustments）: `otherSalesList` で支払方法グループ別の売上集計を確認できる
