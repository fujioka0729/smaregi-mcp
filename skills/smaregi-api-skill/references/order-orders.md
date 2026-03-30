# 注文（受注出荷 Orders）

## 概要

スマレジ・受注出荷管理APIの注文リソース。ECサイトや外部システムからの受注を管理し、出荷ステータスの追跡や支払い情報の更新ができる。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/order-shipment`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/order-shipment`
- **必要スコープ**: `order-shipment.orders:read`（参照）、`order-shipment.orders:write`（作成・更新）

## エンドポイント

### GET /orders

注文一覧を取得する。

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| sort | - | string | ソート順（例: `orderId`, `orderId:desc`, `orderDateTime:desc`） |
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |
| status | - | string | 注文ステータスで絞り込み |
| store_id | - | string | 店舗IDで絞り込み |
| order_date_time-from | - | string | 注文日時（開始）ISO 8601形式 |
| order_date_time-to | - | string | 注文日時（終了）ISO 8601形式 |
| upd_date_time-from | - | string | 更新日時（開始）ISO 8601形式 |
| upd_date_time-to | - | string | 更新日時（終了）ISO 8601形式 |
| order_code | - | string | 注文コードで絞り込み（完全一致） |

#### レスポンス

```json
[
  {
    "orderId": "1",
    "orderCode": "ORD-2024-001",
    "storeId": "1",
    "storeName": "本店",
    "status": "processing",
    "orderDateTime": "2024-01-01T10:00:00+09:00",
    "shippedDateTime": null,
    "subtotal": "5000",
    "shippingFee": "500",
    "discount": "0",
    "total": "5500",
    "paymentStatus": "paid",
    "paymentMethod": "credit_card",
    "customerName": "山田 花子",
    "customerEmail": "yamada@example.com",
    "customerPhone": "090-9876-5432",
    "shippingAddress": {
      "postalCode": "150-0001",
      "prefecture": "東京都",
      "city": "渋谷区",
      "address1": "神南1-1-1",
      "address2": ""
    },
    "details": [
      {
        "orderDetailId": "1",
        "productId": "100",
        "productCode": "PROD001",
        "productName": "Tシャツ（白・M）",
        "price": "2500",
        "quantity": "2",
        "subtotal": "5000"
      }
    ],
    "memo": "",
    "updDateTime": "2024-01-01T10:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| orderId | string | 注文ID |
| orderCode | string | 注文コード（外部システム連携用） |
| storeId | string | 店舗ID |
| storeName | string | 店舗名 |
| status | string | 注文ステータス |
| orderDateTime | string | 注文日時 |
| shippedDateTime | string | 出荷日時（未出荷はnull） |
| subtotal | string | 小計 |
| shippingFee | string | 送料 |
| discount | string | 割引額 |
| total | string | 合計金額 |
| paymentStatus | string | 支払いステータス |
| paymentMethod | string | 支払い方法 |
| customerName | string | 顧客名 |
| customerEmail | string | 顧客メールアドレス |
| customerPhone | string | 顧客電話番号 |
| shippingAddress | object | 配送先住所 |
| details | array | 注文明細 |
| memo | string | メモ |
| updDateTime | string | 更新日時 |

### GET /orders/{orderId}

指定した注文を取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| orderId | ○ | string | 注文ID |

#### レスポンス

注文一覧取得と同じ構造のオブジェクト。

### POST /orders

注文を作成する（外部システムからの受注登録）。

#### リクエストボディ

```json
{
  "orderCode": "ORD-2024-001",
  "storeId": "1",
  "orderDateTime": "2024-01-01T10:00:00+09:00",
  "customerName": "山田 花子",
  "customerEmail": "yamada@example.com",
  "customerPhone": "090-9876-5432",
  "shippingAddress": {
    "postalCode": "150-0001",
    "prefecture": "東京都",
    "city": "渋谷区",
    "address1": "神南1-1-1"
  },
  "shippingFee": 500,
  "details": [
    {
      "productId": "100",
      "productCode": "PROD001",
      "productName": "Tシャツ（白・M）",
      "price": 2500,
      "quantity": 2
    }
  ]
}
```

| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| orderCode | - | string | 外部システムの注文コード |
| storeId | ○ | string | 店舗ID |
| orderDateTime | ○ | string | 注文日時 |
| customerName | - | string | 顧客名 |
| customerEmail | - | string | 顧客メールアドレス |
| customerPhone | - | string | 顧客電話番号 |
| shippingAddress | - | object | 配送先住所 |
| shippingFee | - | integer | 送料 |
| details | ○ | array | 注文明細（商品情報） |

### POST /orders/shipped

受注と同時に出荷済みとして登録する。

#### リクエストボディ

POST /orders と同様。追加で出荷情報（`trackingNumber`, `shippingCarrier`, `shippedDateTime`）を含む。

### PATCH /orders/{orderId}

注文情報を更新する（ステータス変更、出荷情報の追加など）。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| orderId | ○ | string | 注文ID |

#### リクエストボディ（更新可能フィールド）

```json
{
  "status": "shipped",
  "shippedDateTime": "2024-01-03T14:00:00+09:00",
  "trackingNumber": "1234567890",
  "shippingCarrier": "ヤマト運輸",
  "memo": "配送メモ"
}
```

| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| status | - | string | 注文ステータス |
| shippedDateTime | - | string | 出荷日時 |
| trackingNumber | - | string | 追跡番号 |
| shippingCarrier | - | string | 配送業者名 |
| memo | - | string | メモ |

### PATCH /orders/{orderId}/cancel

注文をキャンセルする。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| orderId | ○ | string | 注文ID |

### PATCH /orders/{orderId}/payment

決済情報を更新する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| orderId | ○ | string | 注文ID |

#### リクエストボディ

| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| paymentMethodId | ○ | string | 支払方法ID |
| amount | ○ | number | 決済金額 |

### PATCH /orders/{orderId}/payment/cancel

決済をキャンセルする。

## 注文ステータス一覧

| 値 | 説明 |
|----|------|
| pending | 受注待ち |
| processing | 処理中（受注確認済み） |
| picking | ピッキング中 |
| packed | 梱包済み |
| shipped | 出荷済み |
| delivered | 配達済み |
| cancelled | キャンセル |
| returned | 返品 |

## 支払いステータス一覧

| 値 | 説明 |
|----|------|
| unpaid | 未払い |
| paid | 支払済み |
| partially_paid | 一部支払済み |
| refunded | 返金済み |

## 注意事項

- `order_date_time-from/to` の範囲指定で絞り込む場合、最大31日間の範囲が推奨
- ステータスが `shipped` 以降は基本的にキャンセルできない
- 注文コード（`orderCode`）は外部システムとの連携IDとして使用する
- 在庫との連動は受注確定時に自動的に行われる（店舗設定に依存）
- 受注出荷管理機能の利用には対応プランへの加入が必要
