# レシート特記事項・但し書き（Receipt Provisoes）

## 概要

領収書・レシートに印字する但し書き（特記事項）の一覧を取得するAPI。但し書きは「お品代として」「飲食代として」など、領収書の用途を示す文言をあらかじめ登録しておき、会計時に選択できるようにするものです。

**利用可能プラン:** スタンダード、プレミアム、プレミアムプラス、フードビジネス、リテールビジネス

**必要スコープ:** `pos.transactions:read`

---

## エンドポイント

### GET /receipt_provisoes
但し書き（領収証）の一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| sort | - | string | 並び順（receiptProvisoCode、displaySequence） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |
| receipt_proviso_code | - | string | 但し書きコードで絞り込み |
| initial_value_flag | - | string | 初期値フラグ（0:非初期値、1:初期値） |
| display_flag | - | string | 表示フラグ（0:無効、1:有効） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| receiptProvisoCode | string | 但し書きコード |
| receiptProvisoName | string | 但し書き名称（例：「お品代として」「飲食代として」） |
| initialValueFlag | string | 初期値フラグ（0:非初期値、1:初期値） |
| displaySequence | string | 表示順序 |
| displayFlag | string | 表示制御フラグ（0:無効、1:有効） |
| insDateTime | string | 作成日時（ISO 8601形式） |
| updDateTime | string | 更新日時（ISO 8601形式） |

---

## 使用例

```javascript
// 但し書き一覧を表示順で取得
smaregi_api_get({
  "path": "/receipt_provisoes",
  "query": { "sort": "displaySequence:asc", "display_flag": "1" }
})

// 初期値に設定されている但し書きを取得
smaregi_api_get({
  "path": "/receipt_provisoes",
  "query": { "initial_value_flag": "1" }
})

// 特定コードの但し書きを取得
smaregi_api_get({
  "path": "/receipt_provisoes",
  "query": { "receipt_proviso_code": "001" }
})
```

### POST /receipt_provisoes

但し書きを登録する。

**必要スコープ:** `pos.transactions:write`

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| receiptProvisoName | ○ | string | 但し書き名称（最大85文字） |
| initialValueFlag | - | string | 初期値フラグ（0:非初期値、1:初期値） |
| displaySequence | - | string | 表示順序（1〜999） |
| displayFlag | - | string | 表示フラグ（0:無効、1:有効、デフォルト: 1） |

### PATCH /receipt_provisoes/{receipt_proviso_code}

但し書きを更新する。

**パスパラメータ:** `receipt_proviso_code`（必須）: 但し書きコード

#### リクエストボディ
更新したいフィールドのみ指定。フィールドはPOST /receipt_provisoesと同一。

### DELETE /receipt_provisoes/{receipt_proviso_code}

但し書きを削除する。

**パスパラメータ:** `receipt_proviso_code`（必須）: 但し書きコード

---

## 備考

- `initialValueFlag=1` の但し書きが会計時のデフォルト表示として使用される
- `displayFlag=0` の但し書きは端末上では非表示となる

## 関連リソース

- 取引（Transactions）: `/transactions` で取引登録時に但し書きを指定可能
