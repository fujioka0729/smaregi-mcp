# 役割・役職（Roles）

## 概要

スタッフに割り当てる役割・役職の管理を行うAPI。役割ごとにPOS機能・在庫機能・アラート機能の操作権限（制限区分）を設定できる。スタッフへ役割を紐付けることで、APIアクセス時の権限制御にも反映される。

**利用可能プラン:** プレミアム、プレミアムプラス、フードビジネス、リテールビジネス（※一覧取得・参照のみスタンダードでも可）

**必要スコープ:**
- 参照: `pos.staffs:read`
- 登録・更新・削除: `pos.staffs:write`

---

## エンドポイント

### GET /roles
役割・役職の一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定（一部項目は指定不可） |
| sort | - | string | 並び順（roleId、updDateTime） |
| limit | - | integer | 取得上限数 |
| page | - | integer | ページ番号（1始まり） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| roleId | string | 役割・役職ID |
| roleName | string | 役割名・役職名 |
| note | string | 説明 |
| insDateTime | string | 作成日時（ISO 8601形式） |
| updDateTime | string | 更新日時（ISO 8601形式） |

---

### POST /roles
役割・役職を新規登録する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| roleName | ○ | string | 役割名・役職名（最大30文字） |
| note | - | string | 説明（最大255文字） |
| functionControls | - | array | POS機能の制限設定一覧 |
| functionControls[].functionId | ○ | string | 機能ID（1〜20、2001〜2012、7001〜7003） |
| functionControls[].controlDivision | ○ | string | 制限区分（1:使用不可、2:閲覧、3:編集、4:すべて） |
| inventoryFunctionControls | - | array | 在庫機能制限設定（リテールビジネスプラン） |
| inventoryFunctionControls[].functionId | ○ | string | 機能ID（1〜12） |
| inventoryFunctionControls[].controlDivision | ○ | string | 制限区分（1〜4） |
| alertFunctionControls | - | array | アラート機能制限設定（リテールビジネスプラン） |
| alertFunctionControls[].alertType | ○ | string | アラート種別（1:在庫切れ、2:発注点） |
| alertFunctionControls[].controlDivision | ○ | string | 制限区分（0:使用不可、1:使用可） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| roleId | string | 登録された役割・役職ID |
| roleName | string | 役割名・役職名 |
| note | string | 説明 |
| functionControls | array | 登録されたPOS機能制限一覧 |
| inventoryFunctionControls | array | 登録された在庫機能制限一覧 |
| alertFunctionControls | array | 登録されたアラート機能制限一覧 |
| insDateTime | string | 作成日時 |
| updDateTime | string | 更新日時 |

---

### GET /roles/{role_id}
指定した役割・役職の詳細情報を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| role_id | ○ | string | 役割・役職ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンス項目をカンマ区切りで指定 |
| with_function_controls | - | string | POS機能制限情報の付加（all / none） |
| with_inventory_function_controls | - | string | 在庫機能制限情報の付加（all / none） |
| with_alert_function_controls | - | string | アラート機能制限情報の付加（all / none） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| roleId | string | 役割・役職ID |
| roleName | string | 役割名・役職名 |
| note | string | 説明 |
| functionControls | array | POS機能の制限設定一覧 |
| inventoryFunctionControls | array | 在庫機能の制限設定一覧 |
| alertFunctionControls | array | アラート機能の制限設定一覧 |
| insDateTime | string | 作成日時（ISO 8601形式） |
| updDateTime | string | 更新日時（ISO 8601形式） |

---

### PATCH /roles/{role_id}
役割・役職を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| role_id | ○ | string | 役割・役職ID |

#### リクエストボディ
更新したいフィールドのみ指定。フィールドはPOST /rolesと同一。

#### エラー
- 400: 機能ID重複、不適切な制限区分指定など
- 403: プレミアム未満プランでの管理者以外の設定変更
- 404: 指定IDの役割・役職が存在しない

---

### DELETE /roles/{role_id}
役割・役職を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| role_id | ○ | string | 役割・役職ID |

#### エラー
- 400: 管理者役割（ID=1）の削除、関連スタッフが存在する場合
- 404: 指定IDのリソースが存在しない

---

## 使用例

```javascript
// 役割一覧取得
smaregi_api_get({ "path": "/roles", "query": { "sort": "roleId:asc" } })

// 役割詳細取得（機能制限情報含む）
smaregi_api_get({
  "path": "/roles/2",
  "query": { "with_function_controls": "all", "with_inventory_function_controls": "all" }
})

// 役割登録
smaregi_api_post({
  "path": "/roles",
  "body": {
    "roleName": "店長",
    "note": "店舗管理者用役割",
    "functionControls": [
      { "functionId": "1", "controlDivision": "4" }
    ]
  }
})
```

## 関連リソース

- スタッフ（Staffs）: `/staffs` でスタッフへ roleId を紐付けることで権限制御
