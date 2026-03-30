# 会員（Customers）

## 概要

会員（顧客）の登録・取得・更新・削除を管理するAPI。

## エンドポイント

### GET /customers
会員一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| customer_code | - | string | 会員コードでフィルタ |
| customer_name | - | string | 会員名でフィルタ（部分一致） |
| customer_kana | - | string | 会員名カナでフィルタ（部分一致） |
| sex | - | string | 性別（0: 不明, 1: 男性, 2: 女性） |
| email_address | - | string | メールアドレスでフィルタ |
| telephone_number | - | string | 電話番号でフィルタ |
| customer_group_id | - | string | 会員グループIDでフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |
| with_points | - | string | ポイント情報を含む（all / none） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| customerId | string | 会員ID |
| customerCode | string | 会員コード |
| customerName | string | 会員名 |
| customerKana | string | 会員名カナ |
| customerGroupId | string | 会員グループID |
| rank | string | 会員ランク |
| sex | string | 性別 |
| birthDate | string | 生年月日 |
| emailAddress | string | メールアドレス |
| telephoneNumber | string | 電話番号 |
| postalCode | string | 郵便番号 |
| address | string | 住所 |
| note | string | 備考 |
| point | string | ポイント残高 |
| pointExpireDate | string | ポイント有効期限 |
| mile | string | マイル |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /customers
会員を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| customerCode | - | string | 会員コード |
| customerName | ○ | string | 会員名 |
| customerKana | - | string | 会員名カナ |
| customerGroupId | - | string | 会員グループID |
| sex | - | string | 性別 |
| birthDate | - | string | 生年月日 |
| emailAddress | - | string | メールアドレス |
| telephoneNumber | - | string | 電話番号 |
| postalCode | - | string | 郵便番号 |
| address | - | string | 住所 |
| note | - | string | 備考 |

### POST /customers/bulk
会員を一括登録する（最大1000件）。

### GET /customers/{customerId}
指定した会員を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| customerId | ○ | string | 会員ID |

### PATCH /customers/{customerId}
会員を更新する。

#### リクエストボディ
更新したいフィールドのみ指定。

### PATCH /customers/bulk
会員を一括更新する（最大1000件）。

### DELETE /customers/{customerId}
会員を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| customerId | ○ | string | 会員ID |
