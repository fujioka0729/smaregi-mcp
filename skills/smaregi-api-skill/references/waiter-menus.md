# メニュー（Waiter Menus）

## 概要

スマレジ・ウェイターのメニュー（商品）情報を管理するAPI。メニューはカテゴリーに属し、トッピングを設定できる。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.menus:read`

## エンドポイント

### GET /menus

メニュー一覧を取得する。

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| sort | - | string | ソート順（例: `menuId`, `menuId:desc`） |
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |
| category_id | - | string | カテゴリーIDで絞り込み |
| upd_date_time-from | - | string | 更新日時（開始）ISO 8601形式 |
| upd_date_time-to | - | string | 更新日時（終了）ISO 8601形式 |

#### レスポンス

```json
[
  {
    "menuId": "1",
    "categoryId": "1",
    "categoryName": "ランチ",
    "menuCode": "MENU001",
    "menuName": "ハンバーグランチ",
    "description": "デミグラスソースのハンバーグ",
    "price": "1200",
    "taxDivision": "1",
    "printKitchenDivision": "1",
    "displayFlag": "1",
    "orderFlag": "1",
    "sortNo": "1",
    "imageUrl": "https://...",
    "updDateTime": "2024-01-01T00:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| menuId | string | メニューID |
| categoryId | string | カテゴリーID |
| categoryName | string | カテゴリー名 |
| menuCode | string | メニューコード |
| menuName | string | メニュー名 |
| description | string | 説明文 |
| price | string | 価格（税込） |
| taxDivision | string | 税区分（1:内税 2:外税） |
| printKitchenDivision | string | キッチン印刷区分（1:印刷する 2:印刷しない） |
| displayFlag | string | 表示フラグ（1:表示 0:非表示） |
| orderFlag | string | 注文可能フラグ（1:可 0:不可） |
| sortNo | string | 表示順 |
| imageUrl | string | 画像URL |
| updDateTime | string | 更新日時 |

### GET /menus/{menuId}

指定したメニューを取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| menuId | ○ | string | メニューID |

#### レスポンス

メニュー一覧取得と同じ構造のオブジェクト（トッピンググループ情報も含む場合あり）。

## 注意事項

- メニューの価格は税込表示が基本
- `displayFlag=0` のメニューはウェイターアプリに表示されない
- `orderFlag=0` のメニューは注文不可（表示のみ）
- キッチン印刷区分により、注文時のキッチンプリンター出力が制御される
