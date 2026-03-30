# 受注出荷操作ガイド

## 概要

スマレジ・受注出荷管理APIを使ったEC連携・受注管理の操作ガイド。受注登録・在庫確認・出荷処理・決済管理・キャンセルのフローを解説する。

**ベースURL**: `https://api.smaregi.jp/{contract_id}/order-shipment`（本番）/ `https://api.smaregi.dev/{contract_id}/order-shipment`（サンドボックス）

**認証**: OAuth2。スコープは操作に応じて異なる（後述）。

## 利用可能なパス

| パス | メソッド | 説明 | 必要スコープ |
|------|---------|------|------------|
| /orders | GET | 注文一覧取得 | order-shipment.orders:read |
| /orders | POST | 受注登録 | order-shipment.orders:write |
| /orders/shipped | POST | 出荷済み受注登録 | order-shipment.orders:write |
| /orders/{id} | GET | 受注詳細 | order-shipment.orders:read |
| /orders/{id} | PATCH | 受注更新（ステータス・出荷情報） | order-shipment.orders:write |
| /orders/{id}/cancel | PATCH | 受注キャンセル | order-shipment.orders:write |
| /orders/{id}/payment | PATCH | 決済情報更新 | order-shipment.orders:write |
| /orders/{id}/payment/cancel | PATCH | 決済キャンセル | order-shipment.orders:write |
| /stores | GET | 受注店舗一覧 | order-shipment.stores:read |
| /stores | POST | 受注店舗登録 | order-shipment.stores:write |
| /stores/{id} | GET | 受注店舗詳細 | order-shipment.stores:read |
| /stores/{id} | DELETE | 受注店舗削除 | order-shipment.stores:write |
| /stores/{id}/stock_list | GET | 在庫一覧 | order-shipment.stock:read |

※ 受注出荷APIのベースパスはPOS API（`/pos`）とは異なる。MCPツールのパスには受注出荷用APIパスを指定する。

## 使用例

### 初期セットアップ（受注店舗の登録）

```
// 受注出荷管理にスマレジPOSの店舗を紐付ける（初回のみ）
smaregi_api_post({
  "path": "/stores",
  "body": { "storeId": "1" }
})

// 登録済み店舗を確認
smaregi_api_get({ "path": "/stores" })
```

### 在庫確認 → 受注登録 → 出荷フロー

```
// 1. 受注前に在庫を確認
smaregi_api_get({
  "path": "/stores/1/stock_list",
  "query": { "product_id": "100" }
})
// → availableAmount が 0以上であれば受注可能

// 2. 受注を登録
smaregi_api_post({
  "path": "/orders",
  "body": {
    "orderCode": "EC-ORDER-2024-001",
    "storeId": "1",
    "orderDateTime": "2024-01-15T10:00:00+09:00",
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
})
// → orderId: "123" が返る

// 3. 決済情報を登録（クレジットカード決済など）
smaregi_api_patch({
  "path": "/orders/123/payment",
  "body": {
    "paymentMethodId": "1",
    "amount": 5500
  }
})

// 4. ピッキング・梱包が完了したら出荷ステータスに更新
smaregi_api_patch({
  "path": "/orders/123",
  "body": {
    "status": "shipped",
    "shippedDateTime": "2024-01-17T14:00:00+09:00",
    "trackingNumber": "1234567890123",
    "shippingCarrier": "ヤマト運輸"
  }
})
```

### 出荷済み受注の一括登録（即時出荷）

```
// 受注と同時に出荷完了として登録（倉庫出荷済み分のデータ取り込みなど）
smaregi_api_post({
  "path": "/orders/shipped",
  "body": {
    "orderCode": "EC-ORDER-2024-002",
    "storeId": "1",
    "orderDateTime": "2024-01-15T11:00:00+09:00",
    "shippedDateTime": "2024-01-15T14:00:00+09:00",
    "trackingNumber": "9876543210",
    "shippingCarrier": "佐川急便",
    "customerName": "鈴木 一郎",
    "shippingAddress": {
      "postalCode": "100-0001",
      "prefecture": "東京都",
      "city": "千代田区",
      "address1": "丸の内1-1-1"
    },
    "details": [
      { "productId": "200", "quantity": 1, "price": 3000 }
    ]
  }
})
```

### 受注一覧の確認

```
// 処理中の受注を一覧取得
smaregi_api_get({
  "path": "/orders",
  "query": {
    "status": "processing",
    "store_id": "1",
    "sort": "orderDateTime:desc",
    "limit": "50"
  }
})

// 日付範囲で受注一覧を取得
smaregi_api_get({
  "path": "/orders",
  "query": {
    "order_date_time-from": "2024-01-01T00:00:00+09:00",
    "order_date_time-to": "2024-01-31T23:59:59+09:00",
    "sort": "orderDateTime:desc",
    "limit": "100"
  }
})

// 注文コードで特定受注を検索
smaregi_api_get({
  "path": "/orders",
  "query": { "order_code": "EC-ORDER-2024-001" }
})
```

### 受注キャンセル

```
// 受注をキャンセル
smaregi_api_patch({ "path": "/orders/123/cancel" })

// 決済のみキャンセル（受注自体は残す場合）
smaregi_api_patch({ "path": "/orders/123/payment/cancel" })
```

### 在庫確認

```
// 店舗全体の在庫を確認
smaregi_api_get({
  "path": "/stores/1/stock_list",
  "query": { "limit": "500" }
})

// 特定商品の在庫を確認
smaregi_api_get({
  "path": "/stores/1/stock_list",
  "query": { "product_id": "100" }
})
// → availableAmount（受注可能数）を確認する
```

## 受注ステータスの遷移

```
pending → processing → picking → packed → shipped → delivered
                                        ↓
                                    cancelled
```

## 注意事項

- 受注出荷管理を使うには対応プランへの加入とスマレジ・ウェイターとは別の契約が必要
- 受注店舗は初回に `/stores` で登録する（スマレジPOSに存在する店舗のみ登録可能）
- 受注キャンセルと決済キャンセルは別操作（両方必要な場合は両方実行する）
- `shipped` ステータス以降は通常キャンセル不可
- 在庫確認で `availableAmount` が0以下でも受注登録自体は可能（在庫制御は業務フロー側で行う）
- 在庫は受注確定時に引当数として確保され、出荷完了時に実際の在庫から減算される
- `orderCode` を外部システムの注文IDに設定すると、後からの検索や紐付けが容易になる
- ページネーションの最大件数はstocks系APIで500件（orders系は1000件）
