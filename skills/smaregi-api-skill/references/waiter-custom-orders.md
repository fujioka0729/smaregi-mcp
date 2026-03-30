# お好みオーダー（Waiter Custom Orders）

## 概要

スマレジ・ウェイターのお好みオーダー（カスタムオーダー）機能のWebhook API。お好みオーダーとは、トッピンググループを使って多様な調理方法や提供方法を設定できる機能。Webhookにより注文イベントをリアルタイムで受信できる。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.orders:read`

## エンドポイント

### POST /webhook/custom_orders

お好みオーダーのWebhookエンドポイント（外部システム側で受信するURL）。注文が確定するとスマレジ・ウェイターからこのURLにPOSTリクエストが送信される。

#### Webhookリクエストボディ（受信データ）

```json
{
  "event": "custom_order.created",
  "data": {
    "orderId": "1",
    "tableUseId": "1",
    "storeId": "1",
    "storeName": "渋谷店",
    "tableId": "1",
    "tableName": "テーブル1",
    "orderDateTime": "2024-01-01T12:30:00+09:00",
    "details": [
      {
        "orderDetailId": "1",
        "menuId": "1",
        "menuName": "ハンバーグランチ",
        "price": "1200",
        "quantity": "2",
        "memo": "よく焼き",
        "toppings": [
          {
            "toppingId": "1",
            "toppingGroupId": "1",
            "toppingGroupName": "焼き加減",
            "toppingName": "よく焼き",
            "price": "0",
            "quantity": "1"
          }
        ]
      }
    ]
  }
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| event | string | イベント種別（custom_order.created等） |
| data.orderId | string | 注文ID |
| data.tableUseId | string | テーブル利用ID |
| data.storeId | string | 店舗ID |
| data.storeName | string | 店舗名 |
| data.tableId | string | テーブルID |
| data.tableName | string | テーブル名 |
| data.orderDateTime | string | 注文日時 |
| data.details | array | 注文明細（メニュー・トッピング情報含む） |

## お好みオーダーの設定フロー

1. ウェイター管理画面でメニューにトッピンググループを紐付ける
2. スコープ `waiter.orders:read` でWebhookを登録する
3. お客さまがウェイターアプリでメニューを注文すると、トッピング選択画面が表示される
4. 注文確定時にWebhookが発火し、外部システムにトッピング付き注文情報が送信される

## 注意事項

- お好みオーダー機能はウェイター管理画面での事前設定が必要
- Webhookは外部システム（自社サーバー等）で受信するURLを事前にスマレジ側に登録する必要がある
- `memo` フィールドに自由テキストで調理指示を追加できる
- トッピンググループごとに選択必須・任意・最大選択数を設定できる
- Webhookのペイロードはスマレジ側の仕様変更で追加フィールドが増える可能性がある
