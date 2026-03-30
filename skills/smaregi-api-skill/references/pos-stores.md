# 店舗（Stores）

## 概要

店舗情報の取得・登録・更新・削除を管理するAPI。

## エンドポイント

### GET /stores
店舗一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| store_code | - | string | 店舗コードでフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storeId | string | 店舗ID |
| storeCode | string | 店舗コード |
| storeName | string | 店舗名 |
| storeAbbreviation | string | 店舗略称 |
| division | string | 店舗区分 |
| postalCode | string | 郵便番号 |
| address | string | 住所 |
| phoneNumber | string | 電話番号 |
| faxNumber | string | FAX番号 |
| mailAddress | string | メールアドレス |
| homepage | string | ホームページ |
| tempTranMailAddress | string | 仮売上通知メール |
| priceChangeFlag | string | 価格変更フラグ |
| roundingDivision | string | 端数処理区分 |
| taxFreeDivision | string | 免税区分 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /stores
店舗を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeCode | - | string | 店舗コード |
| storeName | ○ | string | 店舗名 |
| storeAbbreviation | - | string | 店舗略称 |
| postalCode | - | string | 郵便番号 |
| address | - | string | 住所 |
| phoneNumber | - | string | 電話番号 |

### GET /stores/{storeId}
指定した店舗を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storeId | ○ | string | 店舗ID |

### PATCH /stores/{storeId}
店舗を更新する。

### DELETE /stores/{storeId}
店舗を削除する。
