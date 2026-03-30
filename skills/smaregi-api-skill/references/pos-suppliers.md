# 仕入先（Suppliers）

## 概要

仕入先（取引先）の情報を管理するAPI。仕入先と仕入先商品の関連付けが可能。

## エンドポイント

### GET /suppliers
仕入先一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| supplier_code | - | string | 仕入先コードでフィルタ |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| supplierId | string | 仕入先ID |
| supplierCode | string | 仕入先コード |
| supplierName | string | 仕入先名 |
| supplierAbbreviation | string | 仕入先略称 |
| postalCode | string | 郵便番号 |
| address | string | 住所 |
| phoneNumber | string | 電話番号 |
| faxNumber | string | FAX番号 |
| mailAddress | string | メールアドレス |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /suppliers
仕入先を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| supplierCode | - | string | 仕入先コード |
| supplierName | ○ | string | 仕入先名 |
| postalCode | - | string | 郵便番号 |
| address | - | string | 住所 |
| phoneNumber | - | string | 電話番号 |

### GET /suppliers/{supplierId}
指定した仕入先を取得する。

### PATCH /suppliers/{supplierId}
仕入先を更新する。

### DELETE /suppliers/{supplierId}
仕入先を削除する。

## 関連エンドポイント

### 仕入先商品
- `GET /suppliers/{supplierId}/products` - 仕入先商品一覧
- `POST /suppliers/{supplierId}/products` - 仕入先商品追加
- `DELETE /suppliers/{supplierId}/products/{productId}` - 仕入先商品削除
