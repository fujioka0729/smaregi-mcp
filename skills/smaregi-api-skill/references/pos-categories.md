# カテゴリ・部門（Categories）

## 概要

商品の部門（カテゴリ）を管理するAPI。部門は商品を分類するための階層構造。

## エンドポイント

### GET /categories
部門一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| category_code | - | string | 部門コードでフィルタ |
| level | - | string | 階層レベルでフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| categoryId | string | 部門ID |
| categoryCode | string | 部門コード |
| categoryName | string | 部門名 |
| categoryAbbreviation | string | 部門略称 |
| categoryGroupId | string | 部門グループID |
| parentCategoryId | string | 親部門ID |
| level | string | 階層レベル |
| displaySequence | string | 表示順 |
| color | string | カラー |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /categories
部門を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| categoryCode | - | string | 部門コード |
| categoryName | ○ | string | 部門名 |
| categoryAbbreviation | - | string | 部門略称 |
| parentCategoryId | - | string | 親部門ID |
| displaySequence | - | string | 表示順 |
| color | - | string | カラー |

### GET /categories/{categoryId}
指定した部門を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| categoryId | ○ | string | 部門ID |

### PATCH /categories/{categoryId}
部門を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| categoryId | ○ | string | 部門ID |

#### リクエストボディ
更新したいフィールドのみ指定。

### DELETE /categories/{categoryId}
部門を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| categoryId | ○ | string | 部門ID |

**注意**: 部門に紐づく商品がある場合は削除できない。
