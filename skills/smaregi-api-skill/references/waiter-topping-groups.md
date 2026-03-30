# トッピンググループ（Waiter Topping Groups）

## 概要

スマレジ・ウェイターのトッピンググループを管理するAPI。トッピンググループはトッピングをまとめる単位で、メニューへの紐付けや選択ルールを定義する。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.menus:read`

## エンドポイント

### GET /topping_groups

トッピンググループ一覧を取得する。

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| sort | - | string | ソート順（例: `toppingGroupId`, `toppingGroupId:desc`） |
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |
| upd_date_time-from | - | string | 更新日時（開始）ISO 8601形式 |
| upd_date_time-to | - | string | 更新日時（終了）ISO 8601形式 |

#### レスポンス

```json
[
  {
    "toppingGroupId": "1",
    "toppingGroupCode": "TG001",
    "toppingGroupName": "ソース選択",
    "description": "ソースを1種類お選びください",
    "minSelectCount": "1",
    "maxSelectCount": "1",
    "displayFlag": "1",
    "sortNo": "1",
    "toppings": [
      {
        "toppingId": "1",
        "toppingName": "デミグラスソース",
        "price": "0"
      }
    ],
    "updDateTime": "2024-01-01T00:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| toppingGroupId | string | トッピンググループID |
| toppingGroupCode | string | トッピンググループコード |
| toppingGroupName | string | トッピンググループ名 |
| description | string | 説明文 |
| minSelectCount | string | 最小選択数（0の場合は任意） |
| maxSelectCount | string | 最大選択数 |
| displayFlag | string | 表示フラグ（1:表示 0:非表示） |
| sortNo | string | 表示順 |
| toppings | array | 所属するトッピング一覧 |
| updDateTime | string | 更新日時 |

### GET /topping_groups/{toppingGroupId}

指定したトッピンググループを取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| toppingGroupId | ○ | string | トッピンググループID |

#### レスポンス

トッピンググループ一覧取得と同じ構造のオブジェクト（所属トッピング情報を含む）。

## 注意事項

- `minSelectCount` が1以上の場合、注文時に必ず選択が必要
- `maxSelectCount` が1の場合は単一選択（ラジオボタン相当）、2以上の場合は複数選択可
- `minSelectCount=0` かつ `maxSelectCount=1` の場合は任意の単一選択
- トッピンググループはメニューに紐付けて使用する（お好みオーダー機能）
