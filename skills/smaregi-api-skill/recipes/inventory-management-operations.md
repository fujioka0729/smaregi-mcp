# 在庫管理操作ガイド

## 概要

スマレジの在庫管理APIを使った主要な操作フローを説明する。ロス登録、発注→入庫フロー（仕入先から）、出庫→入荷フロー（店舗間移動）、棚卸確認の4つのシナリオをカバーする。

## 利用可能なパス

| パス | メソッド | 説明 |
|------|---------|------|
| /losses | GET | ロス一覧取得 |
| /losses | POST | ロス登録 |
| /losses/{loss_id} | GET | ロス詳細取得 |
| /losses/{loss_id} | PATCH | ロス更新 |
| /losses/{loss_id} | DELETE | ロス削除 |
| /loss_divisions | GET | ロス区分一覧取得 |
| /loss_divisions | POST | ロス区分登録 |
| /loss_divisions/{division_code} | GET/PATCH/DELETE | ロス区分操作 |
| /purchase_orders | GET | 発注一覧取得 |
| /purchase_orders | POST | 発注登録 |
| /purchase_orders/{id} | GET/PATCH/DELETE | 発注操作 |
| /purchase_orders/{id}/products | GET | 発注対象商品取得 |
| /purchase_orders/{id}/stores | GET | 発注対象店舗取得 |
| /storage | GET | 入庫一覧取得 |
| /storage | POST | 入庫登録 |
| /storage/{id} | GET/PATCH | 入庫操作 |
| /storage/{id}/details | GET | 入庫明細取得 |
| /storage/{id}/approval | PATCH | 入庫承認 |
| /storage/{id}/modification_request | POST | 入庫修正依頼 |
| /receiving | GET | 入荷一覧取得 |
| /receiving | POST | 入荷登録 |
| /receiving/{id} | GET/PATCH | 入荷操作 |
| /shipping | GET | 出庫一覧取得 |
| /shipping/request | POST | 出庫依頼登録 |
| /shipping/{id} | GET/PATCH/DELETE | 出庫操作 |
| /shipping/{id}/approval | PATCH | 出庫承認 |
| /shipping_modification_requests/{id}/complete | POST | 出庫修正依頼完了 |
| /shipments | GET | 出荷一覧取得 |
| /shipments | POST | 出荷登録 |
| /shipments/{id} | GET/PATCH/DELETE | 出荷操作 |
| /stocktaking | GET | 棚卸一覧取得 |
| /stocktaking/{id}/products | GET | 棚卸対象商品取得 |
| /stocktaking/{id}/categories | GET | 棚卸対象部門取得 |
| /stocktaking/{id}/details/{base_date} | GET | 棚卸基準在庫取得 |

## 使用例

### シナリオ1: ロス登録

**ステップ1: ロス区分を確認する**
```
smaregi_api_get({ "path": "/loss_divisions" })
```

**ステップ2: ロスを登録する**
```
smaregi_api_post({
  "path": "/losses",
  "body": {
    "storeId": "1",
    "division": "1",
    "lossDateTime": "2026-03-27T10:00:00+09:00",
    "details": [
      {
        "productId": "100",
        "quantity": "3"
      }
    ],
    "memo": "商品破損によるロス",
    "staffId": "1"
  }
})
```

**ステップ3: 登録したロスを確認する**
```
smaregi_api_get({
  "path": "/losses",
  "query": {
    "store_id": "1",
    "sort": "lossDateTime:desc",
    "limit": "10"
  }
})
```

---

### シナリオ2: 発注 → 入庫フロー（仕入先からの仕入れ）

**ステップ1: 発注を登録する（仮発注）**
```
smaregi_api_post({
  "path": "/purchase_orders",
  "body": {
    "recipientOrderId": "10",
    "status": "5",
    "products": [
      {
        "productId": "200",
        "cost": "500",
        "taxRate": "10",
        "deliveryStore": [
          { "storageStoreId": "1", "scheduledQuantity": "50" }
        ]
      }
    ],
    "stores": [
      {
        "storageStoreId": "1",
        "storageExpectedDateFrom": "2026-04-01",
        "storageExpectedDateTo": "2026-04-05"
      }
    ],
    "orderedDate": "2026-03-27",
    "memo": "春季仕入れ"
  }
})
```

**ステップ2: 発注を確定する（発注済に更新）**
```
smaregi_api_patch({
  "path": "/purchase_orders/{storageInfoId}",
  "body": {
    "status": "2"
  }
})
```

**ステップ3: 商品が届いたら入庫登録する**
```
smaregi_api_post({
  "path": "/storage",
  "body": {
    "supplierId": "10",
    "storageStoreId": "1",
    "storageDate": "2026-04-03",
    "details": [
      {
        "productId": "200",
        "scheduledQuantity": "50",
        "inspectionQuantity": "48",
        "stockoutQuantity": "2",
        "inspectionDate": "2026-04-03",
        "cost": "500",
        "taxRate": "10"
      }
    ],
    "memo": "春季仕入れ 欠品2個"
  }
})
```

**ステップ4: 入庫ステータスを完了に更新する**
```
smaregi_api_patch({
  "path": "/storage/{storageId}",
  "body": {
    "status": "2"
  }
})
```

**ステップ5: 入庫一覧で確認する**
```
smaregi_api_get({
  "path": "/storage",
  "query": {
    "storage_store_id": "1",
    "storage_date": "2026-04-03"
  }
})
```

---

### シナリオ3: 出庫依頼 → 承認 → 入荷フロー（店舗間の商品移動）

**ステップ1: 入庫希望店舗から出庫依頼を登録する**
```
smaregi_api_post({
  "path": "/shipping/request",
  "body": {
    "receivingStoreId": "2",
    "shippingStoreId": "1",
    "receivingDesiredDate": "2026-04-10",
    "details": [
      {
        "productId": "300",
        "requestQuantity": "20"
      }
    ],
    "memo": "在庫補充依頼",
    "requestStaffId": "5"
  }
})
```

**ステップ2: 出庫店舗側で依頼を確認する**
```
smaregi_api_get({
  "path": "/shipping",
  "query": {
    "shipping_store_id": "1",
    "status": "1"
  }
})
```

**ステップ3: 出庫店舗が承認する**
```
smaregi_api_patch({
  "path": "/shipping/{shippingId}/approval",
  "body": {
    "approvalStatus": "1",
    "receivingExpectedDateFrom": "2026-04-09",
    "receivingExpectedDateTo": "2026-04-10",
    "shippingDate": "2026-04-08"
  }
})
```
承認後、入荷（receiving）が自動生成される。

**ステップ4: 入庫希望店舗で入荷を確認する**
```
smaregi_api_get({
  "path": "/receiving",
  "query": {
    "receiving_store_id": "2",
    "shipping_store_id": "1",
    "status": "0"
  }
})
```

**ステップ5: 入荷を完了する**
```
smaregi_api_patch({
  "path": "/receiving/{receivingId}",
  "body": {
    "status": "2",
    "receivingDate": "2026-04-09"
  }
})
```

---

### シナリオ4: 棚卸確認

**ステップ1: 棚卸情報を一覧取得する**
```
smaregi_api_get({
  "path": "/stocktaking",
  "query": {
    "store_id": "1",
    "limit": "10",
    "sort": "stocktakingDate:desc"
  }
})
```

**ステップ2: 棚卸対象部門を確認する**
```
smaregi_api_get({
  "path": "/stocktaking/{stocktakingInfoId}/categories"
})
```

**ステップ3: 棚卸対象商品と入力状況を確認する**
```
smaregi_api_get({
  "path": "/stocktaking/{stocktakingInfoId}/products",
  "query": {
    "category_id": "5",
    "limit": "100"
  }
})
```

**ステップ4: 特定日付の基準在庫を取得する**
```
smaregi_api_get({
  "path": "/stocktaking/{stocktakingInfoId}/details/2026-03-01",
  "query": {
    "limit": "100"
  }
})
```

棚卸差異の計算:
- 差異数量 = `inputStocktakingQuantity` - `stocktakingQuantity`
- マイナスの場合はロス（不足）、プラスの場合は過剰在庫

---

### シナリオ5: ロス区分のマスタ管理

**ロス区分を新規登録する**
```
smaregi_api_post({
  "path": "/loss_divisions",
  "body": {
    "divisionCode": "3",
    "divisionName": "期限切れ廃棄"
  }
})
```

**ロス区分一覧を確認する**
```
smaregi_api_get({ "path": "/loss_divisions" })
```

---

### シナリオ6: 出庫修正依頼フロー

**修正依頼を確認する（入庫希望店舗側）**
```
smaregi_api_get({
  "path": "/shipping",
  "query": {
    "receiving_store_id": "2"
  }
})
```
`modificationRequestStatus` が 1 の場合は修正依頼中。

**修正依頼を完了する（入庫希望店舗側）**
```
smaregi_api_post({
  "path": "/shipping_modification_requests/{shippingId}/complete"
})
```

## リソースの使い分け早見表

| 操作内容 | 使用API |
|---------|---------|
| 仕入先への発注管理 | `/purchase_orders` |
| 仕入先からの入荷 | `/storage` |
| 店舗間の商品移動（依頼・出す側） | `/shipping` |
| 店舗間の商品移動（受取側） | `/receiving` |
| 仕入先や取引先への出荷 | `/shipments` |
| 商品のロス記録 | `/losses` |
| 棚卸の確認・参照 | `/stocktaking` |

## 注意事項

- 全エンドポイントのベースパスは `/pos/` で始まる（例: `/pos/losses`）。
- 在庫が増減するタイミング: 入庫完了（status=2）または入荷完了（status=2）時に在庫数が変動する。
- 店舗間移動の出庫承認（approvalStatus=1）を行うと、入荷（receiving）が自動生成される。
- ページネーションは `limit`（最大1000）と `page` で制御する。
- 日付フィルタは `YYYY-MM-DD` 形式で指定する。
- 発注（`purchase_orders`）のIDは `storageInfoId` であり、入庫（`storage`）の `storageInfoId` と紐づく。
- レート制限: GET 50回/秒（本番）、POST/PATCH/DELETE 20回/秒（本番）。
