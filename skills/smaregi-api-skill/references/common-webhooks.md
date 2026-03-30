# Webhook

## 概要

スマレジのリソースに変更が発生した際に、登録したエンドポイントへHTTP POSTで通知を送信する仕組み。スマレジ Developers管理画面の「Webhook」セクションで設定する。

## 設定項目

| 項目 | 説明 |
|------|------|
| エンドポイントURL | 通知先URL（本番はHTTPS必須） |
| イベントタイプ | 受信するイベントの種類 |
| カスタムヘッダー | 認証用の独自ヘッダー（任意） |

## イベントタイプ

### 取引（pos:transactions）
| アクション | 説明 |
|-----------|------|
| created | 取引登録 |
| edited | 取引更新 |
| canceled | 取引取消 |
| disposed | 打消取消 |
| bulk-update | 一括更新 |
| bulk-deleted | 一括削除 |

### 商品（pos:products）
| アクション | 説明 |
|-----------|------|
| created | 商品登録 |
| edited | 商品更新 |
| deleted | 商品削除 |

### 会員（pos:customers）
| アクション | 説明 |
|-----------|------|
| created | 会員登録 |
| edited | 会員更新 |
| deleted | 会員削除 |

### 在庫（pos:stock）
| アクション | 説明 |
|-----------|------|
| updated | 在庫更新 |

### 店舗（pos:stores）
| アクション | 説明 |
|-----------|------|
| created | 店舗登録 |
| edited | 店舗更新 |
| deleted | 店舗削除 |

## リクエスト仕様

### ヘッダー
```
content-type: application/json
smaregi-contract-id: {contractId}
smaregi-event: {eventName}
```

### ボディ例
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

## レスポンス要件

- HTTP 200 を空ボディで **3秒以内** に返すこと
- 3秒を超えるとタイムアウト扱い

## 重要な注意事項

- 同じイベントが **複数回送信される可能性** がある（冪等処理必須）
- イベントの **順序は保証されない**（並列送信のため）
- アプリ停止中のイベントは **再送されない**
- リトライ機能は現在未実装

## ベストプラクティス

1. 必要最小限のイベントのみ購読する
2. メッセージキューで非同期処理する
3. Webhook受信時にPlatform APIを直接呼ばない（レート制限対策）
4. イベントの順序不同と重複を前提に設計する
5. カスタムヘッダーで送信元を検証する
6. バックアップとしてAPIポーリングも併用する
