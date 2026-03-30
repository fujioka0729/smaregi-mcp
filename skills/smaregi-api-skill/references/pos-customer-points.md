# 会員ポイント（Customer Points）

## 概要

会員のポイント残高の照会・更新を管理するAPI。絶対値指定と相対値指定の2つの更新方法がある。

## エンドポイント

### GET /customers/point
会員ポイント一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| customer_id | - | string | 会員IDでフィルタ |
| customer_code | - | string | 会員コードでフィルタ |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| customerId | string | 会員ID |
| customerCode | string | 会員コード |
| point | string | ポイント残高 |
| pointExpireDate | string | ポイント有効期限 |
| mile | string | マイル残高 |

### PATCH /customers/{customerId}/point
会員ポイントを絶対値で更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| customerId | ○ | string | 会員ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| point | ○ | string | 設定するポイント値 |
| pointExpireDate | - | string | ポイント有効期限 |

### POST /customers/{customerId}/point/add
会員ポイントを相対値で更新する（加算・減算）。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| customerId | ○ | string | 会員ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| point | ○ | string | 加減算するポイント値（マイナス指定で減算） |

## 使い分け

| 操作 | メソッド | パス | 用途 |
|------|---------|------|------|
| 絶対値更新 | PATCH | /customers/{id}/point | ポイントを特定の値に設定 |
| 相対値更新 | POST | /customers/{id}/point/add | 現在のポイントに加算/減算 |

**注意**: 並行処理でポイントを操作する場合は、相対値更新（add）を使用することを推奨。絶対値更新は競合の可能性がある。
