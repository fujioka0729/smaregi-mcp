# スタッフ（Staffs）

## 概要

スタッフ情報を取得するAPI。スタッフの一覧取得と個別取得が可能。

## エンドポイント

### GET /staffs
スタッフ一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| staff_code | - | string | スタッフコードでフィルタ |
| staff_name | - | string | スタッフ名でフィルタ（部分一致） |
| store_id | - | string | 所属店舗IDでフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| staffId | string | スタッフID |
| staffCode | string | スタッフコード |
| staffName | string | スタッフ名 |
| staffDivision | string | スタッフ区分 |
| storeId | string | 所属店舗ID |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### GET /staffs/{staffId}
指定したスタッフを取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staffId | ○ | string | スタッフID |
