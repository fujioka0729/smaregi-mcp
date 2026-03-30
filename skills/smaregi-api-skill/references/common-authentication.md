# 認証

## 概要

スマレジ・プラットフォームAPIはOAuth 2.0ベースの認証を使用する。アプリケーション認証（Client Credentials）とユーザー認証（Authorization Code）の2種類がある。smaregi-mcpではアプリケーション認証を使用。

## 環境

| 環境 | 認証エンドポイント | APIエンドポイント |
|------|-------------------|------------------|
| サンドボックス | https://id.smaregi.dev | https://api.smaregi.dev |
| 本番 | https://id.smaregi.jp | https://api.smaregi.jp |

## アプリケーション認証（Client Credentials）

### トークン取得

```
POST https://id.smaregi.dev/app/{contractId}/token
```

#### リクエストヘッダー
| 名前 | 値 |
|------|-----|
| Authorization | Basic {Base64(clientId:clientSecret)} |
| Content-Type | application/x-www-form-urlencoded |

#### リクエストボディ
| 名前 | 必須 | 説明 |
|------|------|------|
| grant_type | ○ | `client_credentials` 固定 |
| scope | ○ | スペース区切りのスコープ文字列 |

#### レスポンス
| フィールド | 型 | 説明 |
|-----------|-----|------|
| access_token | string | アクセストークン |
| expires_in | integer | 有効期間（秒） |
| token_type | string | `Bearer` 固定 |
| scope | string | 付与されたスコープ |

### トークン使用

```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**重要**: トークンは有効期間内で再利用すること。APIコールごとに新規取得しない。

## スコープ一覧

| スコープ | 説明 |
|---------|------|
| pos.products:read | 商品情報の読み取り |
| pos.products:write | 商品情報の書き込み |
| pos.customers:read | 会員情報の読み取り |
| pos.customers:write | 会員情報の書き込み |
| pos.stores:read | 店舗情報の読み取り |
| pos.stores:write | 店舗情報の書き込み |
| pos.transactions:read | 取引情報の読み取り |
| pos.transactions:write | 取引情報の書き込み |
| pos.staffs:read | スタッフ情報の読み取り |
| pos.staffs:write | スタッフ情報の書き込み |
| pos.stock:read | 在庫情報の読み取り |
| pos.stock:write | 在庫情報の書き込み |

## レート制限

| カテゴリ | メソッド | サンドボックス | 本番 |
|---------|---------|--------------|------|
| 読み取り | GET | 10回/秒 | 50回/秒 |
| 書き込み | POST, PUT, PATCH, DELETE | 4回/秒 | 20回/秒 |

- トークン取得もカウント対象
- 超過時: HTTP 429 + `Retry-After` ヘッダー
- エクスポネンシャルバックオフで再試行

## エラーコード

| ステータス | 意味 | 対処 |
|-----------|------|------|
| 400 | パラメータ不正 | リクエスト内容を確認 |
| 401 | 認証エラー（トークン無効/期限切れ） | トークンを再取得 |
| 403 | 権限不足（スコープ不足） | 必要なスコープを確認 |
| 404 | リソースが見つからない | パスやIDを確認 |
| 429 | レート制限超過 | Retry-After後に再試行 |
| 500 | サーバーエラー | 時間をおいて再試行 |
| 503 | サービス利用不可 | メンテナンス情報を確認 |

エラーレスポンスの Content-Type は `application/problem+json`。

## 共通仕様

- プロトコル: HTTPS/1.1
- 文字エンコーディング: UTF-8
- リクエスト形式: JSON（ボディ）、application/x-www-form-urlencoded（トークン）
- レスポンス形式: JSON
