# 商品オプショングループ（Product Option Groups）

## 概要

オプション商品（division=2）をグループ化して管理するAPI。オプショングループを商品に紐付けることで、販売時に追加オプションを選択させることができる。適用条件（全体・部門毎）や選択数の上限・下限を設定できる。

**利用可能プラン:** スタンダード、プレミアム、プレミアムプラス、フードビジネス、リテールビジネス

**必要スコープ:**
- 参照: `pos.products:read`
- 登録・更新・削除: `pos.products:write`

---

## エンドポイント

### GET /product_option_groups
オプショングループの一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| sort | - | string | 並び順（productOptionGroupId、conditionId、updDateTime） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |
| product_option_group_name | - | string | オプショングループ名で絞り込み |
| condition_id | - | string | 条件IDで絞り込み（0:条件なし、1:全体、2:部門毎） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| productOptionGroupId | string | オプショングループID |
| productOptionGroupName | string | オプショングループ名 |
| conditionId | string | 条件ID（0:条件なし、1:全体、2:部門毎） |
| max | string | 適用条件の上限 |
| min | string | 適用条件の下限 |
| syncDivision | string | 作成区分（0:通常、1:Waiter、2:本部、9:その他） |
| insDateTime | string | 登録日時（ISO 8601形式） |
| updDateTime | string | 更新日時（ISO 8601形式） |

---

### POST /product_option_groups
オプショングループを登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| productOptionGroupName | ○ | string | オプショングループ名（最大85文字） |
| conditionId | ○ | string | 条件ID（0:条件なし、1:全体、2:部門毎） |
| max | △ | integer | 選択数の上限（1〜999。conditionId=1または2のとき必須） |
| min | △ | integer | 選択数の下限（〜999。conditionId=1または2のとき必須） |
| products | ○ | array | オプショングループに含める商品（1件以上必須） |
| products[].productId | ○ | integer | 商品ID（1〜999999999999999） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| productOptionGroupId | string | 登録されたオプショングループID |
| productOptionGroupName | string | オプショングループ名 |
| conditionId | string | 条件ID |
| max | string | 選択数の上限 |
| min | string | 選択数の下限 |
| syncDivision | string | 作成区分 |
| insDateTime | string | 作成日時 |
| updDateTime | string | 更新日時 |
| products | object | グループに含まれる商品情報 |

#### エラー（400）
- 下限が上限を超過
- conditionId=1または2なのにmax/minが未設定
- conditionId=0なのにmax/minが設定されている
- 指定商品が存在しない
- 指定商品がオプション商品（division=2）ではない
- 商品IDが重複している

---

### GET /product_option_groups/{product_option_group_id}
指定したオプショングループの詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| product_option_group_id | ○ | string | オプショングループID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| with_products | - | string | グループ商品情報の付加（all / none、デフォルト: none） |

#### レスポンス
GET /product_option_groups と同一フィールド構成。with_products=all の場合は products 配列を含む。

---

### PATCH /product_option_groups/{product_option_group_id}
オプショングループを更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| product_option_group_id | ○ | string | オプショングループID |

#### リクエストボディ
更新したいフィールドのみ指定。フィールドはPOST /product_option_groupsと同一。

#### エラー
- 400: バリデーションエラー（登録時と同様）、本部商品の指定
- 404: 指定IDのリソースが存在しない

---

### DELETE /product_option_groups/{product_option_group_id}
オプショングループを削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| product_option_group_id | ○ | string | オプショングループID |

#### エラー
- 400: オプショングループが使用中のため削除不可
- 404: 指定IDのリソースが存在しない

---

## conditionId（条件ID）の説明

| 値 | 説明 |
|----|------|
| 0 | 条件なし（選択数制限なし） |
| 1 | 全体（合計選択数でmin〜maxを適用） |
| 2 | 部門毎（部門ごとの選択数でmin〜maxを適用） |

---

## 使用例

```javascript
// オプショングループ一覧取得
smaregi_api_get({ "path": "/product_option_groups" })

// 条件なしのオプショングループのみ取得
smaregi_api_get({
  "path": "/product_option_groups",
  "query": { "condition_id": "0" }
})

// オプショングループ詳細を商品情報付きで取得
smaregi_api_get({
  "path": "/product_option_groups/1",
  "query": { "with_products": "all" }
})

// オプショングループ登録（1〜3個の選択が必須）
smaregi_api_post({
  "path": "/product_option_groups",
  "body": {
    "productOptionGroupName": "トッピング選択",
    "conditionId": "1",
    "min": 1,
    "max": 3,
    "products": [
      { "productId": 101 },
      { "productId": 102 },
      { "productId": 103 }
    ]
  }
})
```

## 関連リソース

- 商品（Products）: `/products` で division=2 のオプション商品を管理。`productOptionGroupId` フィールドでグループを紐付け
