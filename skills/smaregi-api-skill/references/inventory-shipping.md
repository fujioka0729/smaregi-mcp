# 出庫（Shipping）

## 概要

店舗間の商品移動における出庫（送り出し側）を管理するAPI。出庫依頼・承認・修正依頼・修正完了のワークフローに対応する。出庫されると対になる入荷（receiving）が生成される。
ベースパス: `/pos/shipping`

出庫ステータス:
- `0`: 未出庫
- `1`: 出庫依頼中
- `2`: 出庫完了
- `3`: 入荷完了

承認ステータス:
- `0`: 未承認
- `1`: 承認済
- `2`: 承認拒否
- `3`: 依頼未承認

修正依頼ステータス:
- `0`: なし
- `1`: 修正依頼中
- `2`: 修正完了

## エンドポイント

### GET /shipping
出庫一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| fields | - | array | レスポンスに含めるフィールド（カンマ区切り） |
| sort | - | string | 並び順（shippingId、shippingStoreId、receivingStoreId など） |
| limit | - | integer | 取得件数（1〜1000、デフォルト100） |
| page | - | integer | ページ番号（1始まり） |
| receiving_store_id | - | string | 入庫店舗IDでフィルタ |
| shipping_store_id | - | string | 出庫店舗IDでフィルタ |
| receiving_desired_date | - | string | 入庫希望日でフィルタ（YYYY-MM-DD） |
| receiving_expected_date_from | - | string | 入庫予定日Fromでフィルタ（YYYY-MM-DD） |
| receiving_expected_date_to | - | string | 入庫予定日Toでフィルタ（YYYY-MM-DD） |
| shipping_date | - | string | 出庫日でフィルタ（YYYY-MM-DD） |
| status | - | string | ステータスでフィルタ（0〜3） |
| identification_no | - | string | 識別番号でフィルタ |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| shippingId | string | 出庫ID |
| receivingStoreId | string | 入庫店舗ID |
| shippingStoreId | string | 出庫店舗ID |
| receivingDesiredDate | string | 入庫希望日 |
| receivingExpectedDateFrom | string | 入庫予定日From |
| receivingExpectedDateTo | string | 入庫予定日To |
| shippingDate | string | 出庫日 |
| staffId | string | スタッフID |
| requestStaffId | string | 出庫依頼スタッフID |
| memo | string | メモ |
| identificationNo | string | 識別番号 |
| status | string | ステータス |
| approvalStatus | string | 承認ステータス |
| approvalDateTime | string | 承認日時 |
| modificationRequestStatus | string | 修正依頼ステータス |
| modificationRequestCheckedDateTime | string | 修正依頼確認完了日時 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### POST /shipping/request
出庫依頼を登録する。入庫希望店舗から出庫店舗に対して商品移動を依頼する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| receivingStoreId | ○ | string | 入庫店舗ID（依頼する側） |
| shippingStoreId | ○ | string | 出庫店舗ID（依頼される側） |
| receivingDesiredDate | ○ | string | 入庫希望日（YYYY-MM-DD） |
| details | ○ | array | 出庫明細（最大1000件） |
| details[].productId | ○ | string | 商品ID |
| details[].requestQuantity | ○ | string | 出庫依頼数 |
| requestStaffId | - | string | 出庫依頼スタッフID |
| memo | - | string | メモ（最大1000文字） |
| identificationNo | - | string | 識別番号（最大32文字） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| shippingId | string | 登録された出庫ID |
| receivingStoreId | string | 入庫店舗ID |
| shippingStoreId | string | 出庫店舗ID |
| receivingDesiredDate | string | 入庫希望日 |
| status | string | ステータス |
| approvalStatus | string | 承認ステータス |
| details | array | 出庫明細 |
| insDateTime | string | 登録日時 |
| updDateTime | string | 更新日時 |

---

### GET /shipping/{shipping_id}
出庫詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shipping_id | ○ | string | 出庫ID |

---

### PATCH /shipping/{shipping_id}
出庫情報を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shipping_id | ○ | string | 出庫ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| status | - | string | ステータス |
| shippingDate | - | string | 出庫日 |
| receivingExpectedDateFrom | - | string | 入庫予定日From |
| receivingExpectedDateTo | - | string | 入庫予定日To |
| memo | - | string | メモ |
| staffId | - | string | スタッフID |
| details | - | array | 明細（更新対象のみ） |

---

### DELETE /shipping/{shipping_id}
出庫を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shipping_id | ○ | string | 出庫ID |

---

### PATCH /shipping/{shipping_id}/approval
出庫を承認・拒否する。出庫店舗側が承認処理を行う。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shipping_id | ○ | string | 出庫ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| approvalStatus | ○ | string | 承認ステータス（0:未承認、1:承認済、2:承認拒否、3:依頼未承認） |
| receivingExpectedDateFrom | △ | string | 入庫予定日From（依頼未承認時に必須、YYYY-MM-DD） |
| receivingExpectedDateTo | △ | string | 入庫予定日To（依頼未承認時に必須、YYYY-MM-DD） |
| shippingDate | △ | string | 出庫日（依頼未承認時に必須、YYYY-MM-DD） |
| memo | - | string | メモ（最大1000文字） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| shippingId | string | 出庫ID |
| approvalStatus | string | 更新後の承認ステータス |
| approvalDateTime | string | 承認日時 |
| status | string | ステータス |

承認済（approvalStatus=1）にすると、承認ステータスが「承認済」・ステータスが「未入庫（出庫済）」に更新される。

---

### POST /shipping_modification_requests/{shipping_id}/complete
出庫修正依頼を完了する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shipping_id | ○ | string | 出庫ID |

#### リクエストボディ
なし（リクエストボディ不要）。

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| shippingId | string | 出庫ID |
| modificationRequestStatus | string | 修正依頼ステータス |
| modificationRequestCheckedDateTime | string | 修正依頼確認完了日時 |
| details | array | 出庫明細 |

修正依頼がない状態で実行すると 409 エラーが返る。

## スコープ

| 操作 | 必要スコープ |
|------|------------|
| 一覧・詳細取得 | `pos.shipping:read` |
| 依頼・登録・更新・削除 | `pos.shipping:write` |
| 承認・修正完了 | `pos.shipping:write` |

## 出庫フロー

```
入庫希望店舗                出庫店舗
      |                        |
POST /shipping/request  →→→   受信
      |                        |
      |               PATCH /shipping/{id}/approval
      |               (承認: approvalStatus=1)
      |                        |
      |←←← 入荷(receiving)自動生成
      |
PATCH /receiving/{id}
(入荷完了: status=2)
```

## 注意事項

- 出庫（shipping）は店舗間の商品移動の出す側。仕入先への出荷は `/shipments` を使用する。
- 承認済（approvalStatus=1）にすると入荷（receiving）が自動生成される。
- 承認済データを再度「承認拒否」に変更しようとすると 400 エラーが返る。
- 修正依頼完了（`/shipping_modification_requests/{id}/complete`）は修正依頼がある場合のみ実行可能。
