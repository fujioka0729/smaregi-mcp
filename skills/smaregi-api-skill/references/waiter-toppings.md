# トッピング（Waiter Toppings）

## 概要

スマレジ・ウェイターのトッピング情報を管理するAPI。トッピングはメニューに追加できるオプション項目で、トッピンググループに属する。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.menus:read`

## エンドポイント

### GET /toppings

トッピング一覧を取得する。

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| sort | - | string | ソート順（例: `toppingId`, `toppingId:desc`） |
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |
| topping_group_id | - | string | トッピンググループIDで絞り込み |
| upd_date_time-from | - | string | 更新日時（開始）ISO 8601形式 |
| upd_date_time-to | - | string | 更新日時（終了）ISO 8601形式 |

#### レスポンス

```json
[
  {
    "toppingId": "1",
    "toppingGroupId": "1",
    "toppingGroupName": "ソース",
    "toppingCode": "TOP001",
    "toppingName": "デミグラスソース",
    "description": "",
    "price": "0",
    "taxDivision": "1",
    "displayFlag": "1",
    "sortNo": "1",
    "updDateTime": "2024-01-01T00:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| toppingId | string | トッピングID |
| toppingGroupId | string | トッピンググループID |
| toppingGroupName | string | トッピンググループ名 |
| toppingCode | string | トッピングコード |
| toppingName | string | トッピング名 |
| description | string | 説明文 |
| price | string | 追加価格（0の場合は無料） |
| taxDivision | string | 税区分（1:内税 2:外税） |
| displayFlag | string | 表示フラグ（1:表示 0:非表示） |
| sortNo | string | 表示順 |
| updDateTime | string | 更新日時 |

### GET /toppings/{toppingId}

指定したトッピングを取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| toppingId | ○ | string | トッピングID |

#### レスポンス

トッピング一覧取得と同じ構造のオブジェクト。

## 注意事項

- トッピングは必ずトッピンググループに属する
- `price` が「0」の場合は無料トッピング（価格変動なし）
- `topping_group_id` パラメータでグループ単位の絞り込みが可能
- `displayFlag=0` のトッピングはウェイターアプリに表示されない
