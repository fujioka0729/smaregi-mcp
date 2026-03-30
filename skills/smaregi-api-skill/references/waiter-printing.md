# 印刷（Waiter Printing）

## 概要

スマレジ・ウェイターの店舗プリンターから印刷を実行するAPI。キッチンプリンターやレシートプリンターへの印刷指示を送信できる。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.stores:print`

## エンドポイント

### POST /stores/{storeId}/printers/{printerId}/print

指定した店舗のプリンターから印刷を実行する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storeId | ○ | string | 店舗ID |
| printerId | ○ | string | プリンターID |

#### リクエストボディ

```json
{
  "content": "印刷内容のテキスト",
  "copies": 1
}
```

| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| content | ○ | string | 印刷するテキスト内容 |
| copies | - | integer | 印刷部数（デフォルト1） |

#### レスポンス

```json
{
  "printId": "print_001",
  "storeId": "1",
  "printerId": "1",
  "status": "queued",
  "requestedAt": "2024-01-01T12:00:00+09:00"
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| printId | string | 印刷ジョブID |
| storeId | string | 店舗ID |
| printerId | string | プリンターID |
| status | string | 印刷ステータス（queued/printing/done/error） |
| requestedAt | string | 印刷リクエスト日時 |

### GET /stores/{storeId}/printers

店舗のプリンター一覧を取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| storeId | ○ | string | 店舗ID |

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |

#### レスポンス

```json
[
  {
    "printerId": "1",
    "storeId": "1",
    "printerName": "キッチンプリンター",
    "printerType": "kitchen",
    "status": "online",
    "ipAddress": "192.168.1.100",
    "updDateTime": "2024-01-01T00:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| printerId | string | プリンターID |
| storeId | string | 店舗ID |
| printerName | string | プリンター名 |
| printerType | string | プリンター種別（kitchen/receipt/label） |
| status | string | オンライン状態（online/offline） |
| ipAddress | string | IPアドレス |
| updDateTime | string | 更新日時 |

## プリンター種別

| 値 | 説明 |
|----|------|
| kitchen | キッチンプリンター（調理場用） |
| receipt | レシートプリンター |
| label | ラベルプリンター |

## 注意事項

- 印刷を実行するには `waiter.stores:print` スコープが必要
- プリンターがオフライン（`status=offline`）の場合は印刷ができない
- キッチンプリンターへの印刷は通常、注文確定時に自動的に実行される
- 手動印刷はこのAPIで明示的にリクエストする
- 注文の数量変更時のみ差分をキッチンに印刷する仕様
- プリンターの設定（IPアドレス等）はウェイター管理画面から行う
