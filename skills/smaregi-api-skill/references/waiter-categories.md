# カテゴリー（Waiter Categories）

## 概要

スマレジ・ウェイターのメニューカテゴリーを管理するAPI。カテゴリーはメニューを分類するためのグループで、階層構造を持つ場合がある。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.menus:read`

## エンドポイント

### GET /categories

カテゴリー一覧を取得する。

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| sort | - | string | ソート順（例: `categoryId`, `categoryId:desc`, `sortNo`） |
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |
| upd_date_time-from | - | string | 更新日時（開始）ISO 8601形式 |
| upd_date_time-to | - | string | 更新日時（終了）ISO 8601形式 |

#### レスポンス

```json
[
  {
    "categoryId": "1",
    "parentCategoryId": null,
    "categoryCode": "CAT001",
    "categoryName": "ランチ",
    "description": "ランチメニュー",
    "displayFlag": "1",
    "sortNo": "1",
    "imageUrl": "https://...",
    "updDateTime": "2024-01-01T00:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| categoryId | string | カテゴリーID |
| parentCategoryId | string | 親カテゴリーID（最上位の場合はnull） |
| categoryCode | string | カテゴリーコード |
| categoryName | string | カテゴリー名 |
| description | string | 説明文 |
| displayFlag | string | 表示フラグ（1:表示 0:非表示） |
| sortNo | string | 表示順 |
| imageUrl | string | 画像URL |
| updDateTime | string | 更新日時 |

### GET /categories/{categoryId}

指定したカテゴリーを取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| categoryId | ○ | string | カテゴリーID |

#### レスポンス

カテゴリー一覧取得と同じ構造のオブジェクト。

## 注意事項

- `parentCategoryId` がnullの場合は最上位カテゴリー
- `displayFlag=0` のカテゴリーはウェイターアプリに表示されない
- カテゴリー階層は最大2階層程度が想定される
- `sortNo` によりウェイターアプリ上での表示順が制御される
