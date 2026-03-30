# 店舗（受注出荷 Stores）

## 概要

スマレジ・受注出荷管理APIの店舗リソース。受注出荷管理で使用する店舗（ECサイト等の受注元）の登録・照会・削除ができる。スマレジPOSの店舗と紐付けて管理する。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/order-shipment`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/order-shipment`
- **必要スコープ**: `order-shipment.stores:read`（参照）、`order-shipment.stores:write`（作成・削除）

## エンドポイント

### GET /stores

受注店舗一覧を取得する。

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| sort | - | string | ソート順（例: `storeId`, `storeId:desc`） |
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |

#### レスポンス

```json
[
  {
    "storeId": "1",
    "storeName": "本店",
    "storeCode": "STORE001",
    "postalCode": "150-0001",
    "prefecture": "東京都",
    "address": "渋谷区神南1-1-1",
    "phone": "03-1234-5678",
    "email": "honten@example.com",
    "status": "active",
    "updDateTime": "2024-01-01T00:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| storeId | string | 店舗ID（スマレジPOS側の店舗IDと一致） |
| storeName | string | 店舗名 |
| storeCode | string | 店舗コード |
| postalCode | string | 郵便番号 |
| prefecture | string | 都道府県 |
| address | string | 住所 |
| phone | string | 電話番号 |
| email | string | メールアドレス |
| status | string | ステータス（active/inactive） |
| updDateTime | string | 更新日時 |

### GET /stores/{storeId}

指定した受注店舗を取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storeId | ○ | string | 店舗ID |

#### レスポンス

店舗一覧取得と同じ構造のオブジェクト。

### POST /stores

受注店舗を登録する（スマレジPOSの店舗を受注出荷管理に紐付ける）。

#### リクエストボディ

```json
{
  "storeId": "1"
}
```

| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeId | ○ | string | POS側の店舗ID |

#### レスポンス

登録された店舗オブジェクト。

### DELETE /stores/{storeId}

受注店舗を削除する（受注出荷管理との紐付けを解除する）。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storeId | ○ | string | 店舗ID |

## 注意事項

- 受注出荷管理に登録できる店舗はスマレジPOSに既に存在する店舗のみ
- `storeId` はスマレジPOS側の店舗IDと同じ値を使用する
- 削除してもPOS側の店舗データは削除されない（紐付けのみ解除）
- 登録されていない店舗IDで注文を作成しようとするとエラーになる
