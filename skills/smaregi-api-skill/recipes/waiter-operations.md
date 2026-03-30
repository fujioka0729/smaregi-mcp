# ウェイター操作ガイド

## 概要

スマレジ・ウェイターAPIを使ったレストラン・飲食店の運営操作ガイド。テーブル管理・注文・予約・キッチン印刷・営業状況確認のフローを解説する。

**ベースURL**: `https://api.smaregi.jp/{contract_id}/waiter`（本番）/ `https://api.smaregi.dev/{contract_id}/waiter`（サンドボックス）

**認証**: OAuth2。スコープは操作に応じて異なる（後述）。

## 利用可能なパス

| パス | メソッド | 説明 | 必要スコープ |
|------|---------|------|------------|
| /categories | GET | カテゴリー一覧 | waiter.menus:read |
| /categories/{id} | GET | カテゴリー詳細 | waiter.menus:read |
| /menus | GET | メニュー一覧 | waiter.menus:read |
| /menus/{id} | GET | メニュー詳細 | waiter.menus:read |
| /toppings | GET | トッピング一覧 | waiter.menus:read |
| /toppings/{id} | GET | トッピング詳細 | waiter.menus:read |
| /topping_groups | GET | トッピンググループ一覧 | waiter.menus:read |
| /topping_groups/{id} | GET | トッピンググループ詳細 | waiter.menus:read |
| /table_uses | GET | テーブル利用履歴一覧 | waiter.orders:read |
| /table_uses | POST | テーブルチェックイン | waiter.orders:write |
| /table_uses/{id} | GET | テーブル利用詳細 | waiter.orders:read |
| /table_uses/{id}/checkout | PUT | チェックアウト | waiter.orders:write |
| /orders/{id} | GET | 注文詳細 | waiter.orders:read |
| /reservations | GET | 予約一覧 | waiter.reservations:read |
| /reservations/{id} | GET | 予約詳細 | waiter.reservations:read |
| /stores/{id}/printers | GET | プリンター一覧 | waiter.stores:read |
| /stores/{id}/printers/{pid}/print | POST | 印刷実行 | waiter.stores:print |
| /dashboard/stores/{id} | GET | 営業状況 | waiter.orders:read |
| /staff_calls | POST | スタッフ呼び出し | waiter.staff-calls:write |
| /webhook/custom_orders | POST | お好みオーダーWebhook受信 | waiter.orders:read |
| /webhook/table_uses | POST | テーブル利用Webhook受信 | waiter.orders:read |

※ ウェイターAPIのベースパスはPOS API（`/pos`）とは異なる。MCPツールのパスにはウェイター用APIパスを指定する。

## 使用例

### メニュー情報の取得

```
// カテゴリー一覧を取得
smaregi_api_get({
  "path": "/categories",
  "query": { "limit": "100", "sort": "sortNo" }
})

// カテゴリーIDでメニューを絞り込み
smaregi_api_get({
  "path": "/menus",
  "query": { "category_id": "1", "limit": "100" }
})

// トッピンググループとトッピングの取得
smaregi_api_get({ "path": "/topping_groups" })
smaregi_api_get({
  "path": "/toppings",
  "query": { "topping_group_id": "1" }
})
```

### テーブルチェックイン → 注文 → チェックアウトフロー

```
// 1. 現在の営業状況を確認（空きテーブルを確認）
smaregi_api_get({ "path": "/dashboard/stores/1" })

// 2. テーブルチェックイン
smaregi_api_post({
  "path": "/table_uses",
  "body": {
    "storeId": "1",
    "tableId": "5",
    "guestCount": 4,
    "customerDivisionId": "1"
  }
})
// → tableUseId: "123" が返る

// 3. 注文詳細を確認（ウェイターアプリで注文後）
smaregi_api_get({ "path": "/orders/456" })

// 4. チェックアウト（会計後にPOSの取引IDを紐付け）
smaregi_api_put({
  "path": "/table_uses/123/checkout",
  "body": { "transactionHeadId": "9999" }
})
```

### テーブル利用履歴の参照

```
// 使用中のテーブルを一覧取得
smaregi_api_get({
  "path": "/table_uses",
  "query": {
    "store_id": "1",
    "status": "open",
    "sort": "checkInDateTime"
  }
})

// 過去のテーブル利用履歴（日付範囲指定）
smaregi_api_get({
  "path": "/table_uses",
  "query": {
    "store_id": "1",
    "status": "closed",
    "check_in_date_time-from": "2024-01-01T00:00:00+09:00",
    "check_in_date_time-to": "2024-01-31T23:59:59+09:00",
    "limit": "100"
  }
})
```

### 予約確認

```
// 本日の予約一覧を取得
smaregi_api_get({
  "path": "/reservations",
  "query": {
    "store_id": "1",
    "reservation_date_time-from": "2024-01-15T00:00:00+09:00",
    "reservation_date_time-to": "2024-01-15T23:59:59+09:00",
    "sort": "reservationDateTime"
  }
})

// 確定済み予約のみ絞り込み
smaregi_api_get({
  "path": "/reservations",
  "query": {
    "store_id": "1",
    "status": "confirmed"
  }
})
```

### プリンター操作

```
// 店舗のプリンター一覧を確認
smaregi_api_get({ "path": "/stores/1/printers" })

// キッチンプリンターに印刷
smaregi_api_post({
  "path": "/stores/1/printers/2/print",
  "body": {
    "content": "テーブル3番 追加注文\nハンバーグランチ x2\nよく焼き",
    "copies": 1
  }
})
```

### スタッフ呼び出し

```
// テーブル指定でスタッフを呼び出し
smaregi_api_post({
  "path": "/staff_calls",
  "body": {
    "storeId": "1",
    "tableId": "5",
    "message": "テーブル5番のお客様からお呼びがかかっています"
  }
})
```

### 営業状況の確認

```
// リアルタイムで店舗全体の状況を確認
smaregi_api_get({ "path": "/dashboard/stores/1" })
// → totalTableCount, activeTableCount, emptyTableCount が返る
```

## 注意事項

- ウェイターAPIを使うにはスマレジ・ウェイターの契約が必要
- テーブルやフロアの設定はスマレジ・ウェイター管理画面で事前に行う
- キッチンプリンターの設定もウェイター管理画面から行う
- チェックアウト時にPOS側の取引IDを紐付けることで、会計データと連携できる
- お好みオーダー（カスタムオーダー）機能を使う場合は、メニューにトッピンググループを事前に設定する
- Webhookを活用するとリアルタイムで注文やテーブル変更を外部システムに通知できる
- `waiter.orders:history` スコープがあると過去のクローズ済みテーブル利用も参照可能
- スタッフ呼び出しはウェイターアプリが起動しているタブレット端末への通知なので、端末がオフラインだと届かない
