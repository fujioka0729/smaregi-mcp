# Webhook設定

## 概要

スマレジのリソース変更をリアルタイムに受信するためのWebhook設定手順。

## 設定手順

### 1. エンドポイントを準備する

Webhook受信用のHTTPSエンドポイントを用意する。

要件:
- HTTPS（本番環境では必須）
- HTTP 200 を空ボディで **3秒以内** に返せること
- POST リクエストを受け付けること

### 2. スマレジ Developers管理画面で設定

1. [スマレジ Developers](https://developers.smaregi.dev/) にログイン
2. 対象アプリの「Webhook」セクションを開く
3. エンドポイントURLを入力
4. 購読するイベントタイプを選択
5. （任意）カスタムヘッダーを設定（認証用）

### 3. イベントタイプを選択

| イベント | アクション | 説明 |
|---------|-----------|------|
| pos:transactions | created | 取引登録 |
| pos:transactions | edited | 取引更新 |
| pos:transactions | canceled | 取引取消 |
| pos:transactions | disposed | 打消取消 |
| pos:products | created | 商品登録 |
| pos:products | edited | 商品更新 |
| pos:products | deleted | 商品削除 |
| pos:customers | created | 会員登録 |
| pos:customers | edited | 会員更新 |
| pos:customers | deleted | 会員削除 |
| pos:stock | updated | 在庫更新 |
| pos:stores | created | 店舗登録 |
| pos:stores | edited | 店舗更新 |
| pos:stores | deleted | 店舗削除 |

### 4. 受信処理を実装

#### リクエストヘッダー
```
content-type: application/json
smaregi-contract-id: {contractId}
smaregi-event: {eventName}
{カスタムヘッダー}
```

#### リクエストボディ例
```json
{
  "event": "pos:transactions",
  "action": "created",
  "contractId": "sb_xxxxx",
  "data": {
    "transactionHeadId": "12345"
  }
}
```

#### レスポンス
```
HTTP 200 OK
（空ボディ）
```

## 実装パターン

### 推奨: 非同期処理

```
1. Webhookを受信
2. メッセージキュー（SQS、Cloud Tasks等）にエンキュー
3. 即座に HTTP 200 を返す
4. ワーカーがキューから取り出して処理
```

### 非推奨: 同期処理

```
1. Webhookを受信
2. Platform APIを呼んでデータ取得
3. データベースに保存
4. HTTP 200 を返す（3秒を超える可能性あり）
```

## 注意事項

- 同じイベントが **複数回送信される可能性** がある → 冪等処理必須
- イベントの **順序は保証されない** → 順序に依存しない設計にする
- アプリ停止中のイベントは **再送されない**
- リトライ機能は現在未実装
- カスタムヘッダーで送信元を検証する
- バックアップとしてAPIポーリングも併用する
- 必要最小限のイベントのみ購読する（不要なイベントはパフォーマンス低下の原因）
