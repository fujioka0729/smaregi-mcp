# クーポン（Coupons）

## 概要

クーポンの登録・取得・更新・削除を管理するAPI。

## エンドポイント

### GET /coupons
クーポン一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| couponId | string | クーポンID |
| couponName | string | クーポン名 |
| couponDivision | string | クーポン区分（1: 値引, 2: 割引） |
| couponValue | string | 値引額 or 割引率 |
| startDate | string | 有効期間開始日 |
| endDate | string | 有効期間終了日 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /coupons
クーポンを登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| couponName | ○ | string | クーポン名 |
| couponDivision | ○ | string | クーポン区分（1: 値引, 2: 割引） |
| couponValue | ○ | string | 値引額 or 割引率 |
| startDate | - | string | 有効期間開始日 |
| endDate | - | string | 有効期間終了日 |

### GET /coupons/{couponId}
指定したクーポンを取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| couponId | ○ | string | クーポンID |

### PUT /coupons/{couponId}
クーポンを更新する。

### DELETE /coupons/{couponId}
クーポンを削除する。
