# セール・割引（Bargains）

## 概要

セール（値引・割引キャンペーン）の登録・取得・管理を行うAPI。店舗ごと・商品ごとのセール設定が可能。

## エンドポイント

### GET /bargains
セール一覧を取得する。

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
| bargainId | string | セールID |
| bargainName | string | セール名 |
| bargainDivision | string | セール区分（1: 値引, 2: 割引, 3: 売価変更） |
| bargainValue | string | 値引額 or 割引率 or 変更後売価 |
| startDate | string | 開始日 |
| endDate | string | 終了日 |
| termStart | string | 適用時間帯開始 |
| termEnd | string | 適用時間帯終了 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /bargains
セールを登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| bargainName | ○ | string | セール名 |
| bargainDivision | ○ | string | セール区分 |
| bargainValue | ○ | string | 値引額/割引率/変更後売価 |
| startDate | ○ | string | 開始日 |
| endDate | ○ | string | 終了日 |

### GET /bargains/{bargainId}
指定したセールを取得する。

### PATCH /bargains/{bargainId}
セールを更新する。

### DELETE /bargains/{bargainId}
セールを削除する。

## 関連エンドポイント

### セール対象店舗
- `GET /bargains/{bargainId}/stores` - 対象店舗一覧
- `POST /bargains/{bargainId}/stores` - 対象店舗追加
- `DELETE /bargains/{bargainId}/stores/{storeId}` - 対象店舗削除

### セール対象商品
- `GET /bargains/{bargainId}/products` - 対象商品一覧
- `POST /bargains/{bargainId}/products` - 対象商品追加
- `DELETE /bargains/{bargainId}/products/{productId}` - 対象商品削除
