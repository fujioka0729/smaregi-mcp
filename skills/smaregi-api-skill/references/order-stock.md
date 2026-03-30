# 在庫（受注出荷 Stock）

## 概要

スマレジ・受注出荷管理APIの在庫リソース。受注出荷管理における店舗在庫の照会ができる。受注可能な在庫数を確認し、在庫不足による受注超過を防ぐ。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/order-shipment`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/order-shipment`
- **必要スコープ**: `order-shipment.stock:read`

## エンドポイント

### GET /stores/{storeId}/stock_list

指定店舗の在庫一覧を取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storeId | ○ | string | 店舗ID |

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜500、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| product_id | - | string | 商品IDで絞り込み |
| product_code | - | string | 商品コードで絞り込み |
| upd_date_time-from | - | string | 更新日時（開始）ISO 8601形式 |
| upd_date_time-to | - | string | 更新日時（終了）ISO 8601形式 |

#### レスポンス

```json
[
  {
    "productId": "100",
    "productCode": "PROD001",
    "productName": "Tシャツ（白・M）",
    "stockAmount": "50",
    "reserveAmount": "5",
    "availableAmount": "45",
    "reserveUpdDateTime": "2024-01-01T10:00:00+09:00",
    "updDateTime": "2024-01-01T10:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| productId | string | 商品ID |
| productCode | string | 商品コード |
| productName | string | 商品名 |
| stockAmount | string | 在庫数（実際の在庫数） |
| reserveAmount | string | 引当数（処理中の受注で確保されている数） |
| availableAmount | string | 受注可能数（`stockAmount - reserveAmount`） |
| reserveUpdDateTime | string | 引当数更新日時 |
| updDateTime | string | 在庫更新日時 |

## 在庫計算の仕組み

```
受注可能数 = 在庫数 - 引当数
```

- **在庫数（stockAmount）**: スマレジPOSの実際の在庫数
- **引当数（reserveAmount）**: 受注処理中（`processing`, `picking`, `packed` 状態）の注文で確保されている数
- **受注可能数（availableAmount）**: 新規受注に対して引き当て可能な数

## 注意事項

- 在庫数はスマレジPOSの在庫と連動する
- 受注が確定すると引当数が増加し、受注可能数が減る
- 出荷完了（`shipped`）になると引当数から実際の在庫減少に変わる
- リアルタイムで在庫を確認するため、受注前にこのAPIで在庫チェックすることを推奨
- `availableAmount` が0以下の場合は受注不可（在庫切れ）
- 最大取得件数は1リクエスト500件（POSの在庫APIの1000件より少ない）
