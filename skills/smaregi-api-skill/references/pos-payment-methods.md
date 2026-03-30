# 支払方法（Payment Methods）

## 概要

POS端末で利用可能な支払方法を管理するAPI。

## エンドポイント

### GET /payment-methods
支払方法一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド |
| sort | - | string | ソート順 |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| upd_date_time-from | - | string | 更新日時（開始） |
| upd_date_time-to | - | string | 更新日時（終了） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| paymentMethodId | string | 支払方法ID |
| paymentMethodName | string | 支払方法名 |
| paymentMethodDivision | string | 支払方法区分 |
| paymentMethodAbbreviation | string | 支払方法略称 |
| changeFlag | string | お釣りフラグ |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

### POST /payment-methods
支払方法を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| paymentMethodName | ○ | string | 支払方法名 |
| paymentMethodDivision | - | string | 支払方法区分 |
| changeFlag | - | string | お釣りフラグ |

### GET /payment-methods/{paymentMethodId}
指定した支払方法を取得する。

### PATCH /payment-methods/{paymentMethodId}
支払方法を更新する。

### DELETE /payment-methods/{paymentMethodId}
支払方法を削除する。
