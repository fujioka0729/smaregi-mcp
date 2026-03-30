# ダッシュボード・営業状況（Waiter Dashboard）

## 概要

スマレジ・ウェイターの店舗営業状況を取得するAPI。現在のテーブル使用状況やスタッフ呼び出し機能を含む。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.stores:read`（店舗情報）、`waiter.orders:read`（営業状況）、`waiter.staff-calls:write`（スタッフ呼び出し）

## エンドポイント

### GET /dashboard/stores/{storeId}

指定した店舗の現在の営業状況を取得する。

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
{
  "storeId": "1",
  "storeName": "渋谷店",
  "businessStatus": "open",
  "openDateTime": "2024-01-01T10:00:00+09:00",
  "totalTableCount": 20,
  "activeTableCount": 12,
  "waitingTableCount": 3,
  "emptyTableCount": 8,
  "totalGuestCount": 48,
  "tables": [
    {
      "tableId": "1",
      "tableName": "テーブル1",
      "tableCode": "T001",
      "status": "in_use",
      "tableUseId": "123",
      "guestCount": 4,
      "checkInDateTime": "2024-01-01T12:00:00+09:00",
      "elapsedMinutes": 45
    }
  ]
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| storeId | string | 店舗ID |
| storeName | string | 店舗名 |
| businessStatus | string | 営業ステータス（open/closed） |
| openDateTime | string | 開店日時 |
| totalTableCount | integer | テーブル総数 |
| activeTableCount | integer | 使用中テーブル数 |
| waitingTableCount | integer | 予約待ちテーブル数 |
| emptyTableCount | integer | 空きテーブル数 |
| totalGuestCount | integer | 現在の来客合計数 |
| tables | array | テーブル状況一覧 |

##### テーブル状況フィールド（tables[]）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| tableId | string | テーブルID |
| tableName | string | テーブル名 |
| tableCode | string | テーブルコード |
| status | string | テーブルステータス |
| tableUseId | string | 現在のテーブル利用ID（空き時はnull） |
| guestCount | integer | 現在の来客数 |
| checkInDateTime | string | チェックイン日時 |
| elapsedMinutes | integer | 経過時間（分） |

### POST /staff_calls

スタッフ呼び出しを実行する。店舗のハンディ端末（スマレジ・ウェイターが動作しているタブレット）にプッシュ通知を送信する。

**必要スコープ**: `waiter.staff-calls:write`

#### リクエストボディ

```json
{
  "storeId": "1",
  "tableId": "1",
  "message": "お呼びです。テーブル1番のお客様をご案内ください。"
}
```

| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeId | ○ | string | 店舗ID |
| tableId | - | string | テーブルID（指定すると特定テーブルへの呼び出し） |
| message | - | string | 呼び出しメッセージ（デフォルトあり） |

#### レスポンス

```json
{
  "staffCallId": "1",
  "storeId": "1",
  "tableId": "1",
  "message": "お呼びです。テーブル1番のお客様をご案内ください。",
  "sentAt": "2024-01-01T12:30:00+09:00"
}
```

## テーブルステータス一覧

| 値 | 説明 |
|----|------|
| empty | 空き |
| in_use | 使用中 |
| reserved | 予約済み |
| cleaning | 清掃中 |

## 注意事項

- 営業状況の取得はリアルタイムの情報を返す
- スタッフ呼び出しには `waiter.staff-calls:write` スコープが必要
- スタッフ呼び出しはウェイターアプリ（タブレット）へのプッシュ通知として送信される
- スタッフ呼び出し機能はウェイターアプリがインストールされた端末が店舗に登録されている必要がある
- `elapsedMinutes` は現在時刻とチェックイン日時の差分（分単位）
