# 予約（Waiter Reservations）

## 概要

スマレジ・ウェイターの予約情報を管理するAPI。テーブルやコースの予約を参照できる。

- **ベースURL（本番）**: `https://api.smaregi.jp/{contract_id}/waiter`
- **ベースURL（サンドボックス）**: `https://api.smaregi.dev/{contract_id}/waiter`
- **必要スコープ**: `waiter.reservations:read`（参照）

## エンドポイント

### GET /reservations

予約一覧を取得する。

#### クエリパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| sort | - | string | ソート順（例: `reservationId`, `reservationDateTime`, `reservationDateTime:desc`） |
| fields | - | string | レスポンスに含めるフィールド名をカンマ区切りで指定 |
| store_id | - | string | 店舗IDで絞り込み |
| status | - | string | 予約ステータスで絞り込み |
| reservation_date_time-from | - | string | 予約日時（開始）ISO 8601形式 |
| reservation_date_time-to | - | string | 予約日時（終了）ISO 8601形式 |
| upd_date_time-from | - | string | 更新日時（開始）ISO 8601形式 |
| upd_date_time-to | - | string | 更新日時（終了）ISO 8601形式 |

#### レスポンス

```json
[
  {
    "reservationId": "1",
    "storeId": "1",
    "storeName": "渋谷店",
    "reservationCode": "RES001",
    "reservationDateTime": "2024-01-15T19:00:00+09:00",
    "guestCount": "4",
    "status": "confirmed",
    "guestName": "田中 太郎",
    "guestNameKana": "タナカ タロウ",
    "guestPhone": "090-1234-5678",
    "guestEmail": "tanaka@example.com",
    "tableId": "2",
    "tableName": "個室A",
    "courseId": "1",
    "courseName": "ディナーコース",
    "memo": "誕生日のお祝い",
    "updDateTime": "2024-01-10T10:00:00+09:00"
  }
]
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| reservationId | string | 予約ID |
| storeId | string | 店舗ID |
| storeName | string | 店舗名 |
| reservationCode | string | 予約コード |
| reservationDateTime | string | 予約日時 |
| guestCount | string | 予約人数 |
| status | string | 予約ステータス |
| guestName | string | 予約者名 |
| guestNameKana | string | 予約者名（カナ） |
| guestPhone | string | 電話番号 |
| guestEmail | string | メールアドレス |
| tableId | string | 指定テーブルID（未指定はnull） |
| tableName | string | 指定テーブル名 |
| courseId | string | コースID（未指定はnull） |
| courseName | string | コース名 |
| memo | string | メモ・備考 |
| updDateTime | string | 更新日時 |

### GET /reservations/{reservationId}

指定した予約を取得する。

#### パスパラメータ

| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| reservationId | ○ | string | 予約ID |

#### レスポンス

予約一覧取得と同じ構造のオブジェクト。

## 予約ステータス一覧

| 値 | 説明 |
|----|------|
| pending | 仮予約 |
| confirmed | 予約確定 |
| checked_in | チェックイン済み |
| cancelled | キャンセル |
| no_show | ノーショー |

## 注意事項

- 予約情報の参照には `waiter.reservations:read` スコープが必要
- 予約の作成・更新はウェイター管理画面から行う（APIからの作成は現時点で非対応の場合あり）
- `reservationDateTime` はISO 8601形式で日本標準時（+09:00）
- `tableId` が未指定の場合、来店時に空きテーブルを案内する
- キャンセル後の予約も履歴として残る
- Webhookを使うと予約情報の変更をリアルタイムで受信できる
