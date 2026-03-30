# 注文（Waiter Orders）

## 概要

スマレジ・ウェイターの注文情報を管理するAPI。テーブル利用に紐付く注文の参照・追加・更新ができる。注文はテーブル利用（table_use）に属する。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.orders:read`（参照）、`waiter.orders:write`（更新）

## エンドポイント

### GET /orders/{orderId}

指定した注文を取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| orderId | ○ | string | 注文ID |

#### レスポンス

```json
{
  "orderId": "1",
  "tableUseId": "1",
  "storeId": "1",
  "storeName": "渋谷店",
  "tableId": "1",
  "tableName": "テーブル1",
  "orderDateTime": "2024-01-01T12:30:00+09:00",
  "subtotal": "3600",
  "total": "3600",
  "status": "ordered",
  "details": [
    {
      "orderDetailId": "1",
      "menuId": "1",
      "menuName": "ハンバーグランチ",
      "menuCode": "MENU001",
      "price": "1200",
      "quantity": "2",
      "subtotal": "2400",
      "memo": "",
      "printStatus": "printed",
      "toppings": [
        {
          "toppingId": "1",
          "toppingName": "デミグラスソース",
          "price": "0",
          "quantity": "1"
        }
      ]
    }
  ],
  "updDateTime": "2024-01-01T12:30:00+09:00"
}
```

##### 注文フィールド

| フィールド | 型 | 説明 |
|-----------|-----|------|
| orderId | string | 注文ID |
| tableUseId | string | テーブル利用ID |
| storeId | string | 店舗ID |
| storeName | string | 店舗名 |
| tableId | string | テーブルID |
| tableName | string | テーブル名 |
| orderDateTime | string | 注文日時 |
| subtotal | string | 小計 |
| total | string | 合計 |
| status | string | 注文ステータス |
| details | array | 注文明細一覧 |
| updDateTime | string | 更新日時 |

##### 注文明細フィールド（details[]）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| orderDetailId | string | 注文明細ID |
| menuId | string | メニューID |
| menuName | string | メニュー名 |
| menuCode | string | メニューコード |
| price | string | 単価 |
| quantity | string | 数量 |
| subtotal | string | 小計 |
| memo | string | メモ（調理指示など） |
| printStatus | string | キッチン印刷ステータス（unprinted/printed） |
| toppings | array | 選択トッピング一覧 |

## 注文ステータス一覧

| 値 | 説明 |
|----|------|
| ordered | 注文済み |
| cooking | 調理中 |
| served | 提供済み |
| cancelled | キャンセル |

## キッチン印刷ステータス

| 値 | 説明 |
|----|------|
| unprinted | 未印刷 |
| printed | 印刷済み |

## 注意事項

- 注文はテーブル利用（`tableUseId`）に紐付く
- 数量が変更された場合のみキッチンに印刷される（差分印刷）
- `memo` フィールドに調理指示を記入できる
- Webhookを使うとリアルタイムで注文情報を受信できる（`waiter.orders:read` スコープ相当のイベント）
- テーブル利用の注文一覧は `/table_uses/{tableUseId}` の詳細取得で一緒に取得できる場合がある
