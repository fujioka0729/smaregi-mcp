# 精算（Adjustments）

## 概要

店舗・端末の精算処理を管理するAPI。精算一覧の取得（売上集計・現金残高確認）と精算の実行（現金精算処理）が行える。精算は1日の営業終了時に実施し、現金過不足や銀行預入金などの情報を記録する。

**利用可能プラン:** スタンダード、プレミアム、プレミアムプラス、フードビジネス、リテールビジネス

**必要スコープ:**
- 参照: `pos.transactions:read`
- 実行: `pos.transactions:write`

---

## エンドポイント

### GET /adjustments
精算の一覧を取得する。店舗IDと日時条件の指定が必要。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | integer | 店舗ID |
| terminal_id | - | integer | 端末ID（省略時は全端末） |
| adjustment_date | △ | string | 精算日（YYYY-MM-DD形式）。下記いずれか1つが必須 |
| adjustment_date_time | △ | string | 精算日時（YYYY-MM-DDThh:mm:ssTZD形式） |
| adjustment_date_time-from | △ | string | 精算日時範囲（開始）。最大31日間 |
| adjustment_date_time-to | △ | string | 精算日時範囲（終了） |
| fields | - | array | レスポンス項目をカンマ区切りで指定 |

※ `adjustment_date`・`adjustment_date_time`・`adjustment_date_time-from/to` のいずれか1つを指定すること。複数同時指定は不可。

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storeId | string | 店舗ID |
| terminalId | string | 端末ID |
| adjustmentDateTime | string | 精算日時（ISO 8601形式） |
| childTerminals | array | 子端末リスト |
| transactionCount | string | 通常取引数 |
| preparationCash | string | 釣銭準備金 |
| cashSales | string | 現金売上額 |
| creditSales | string | クレジット売上額 |
| otherSalesList | array | その他支払い方法の売上一覧 |
| partPayment | string | 前受金受領額 |
| partPaymentCash | string | 前受金受領額（現金） |
| tip | string | チップ合計額 |
| deposit | string | 入金合計額 |
| payment | string | 出金合計額 |
| calculateBalance | string | 計算現金残高 |

#### cashAdjustment（現金精算情報）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| realBalance | string | 実現金残高 |
| difference | string | 現金過不足額 |
| saving | string | 銀行預入金 |
| carryOver | string | 繰越準備金 |
| tenThousandYen | string | 一万円札の枚数 |
| fiveThousandYen | string | 五千円札の枚数 |
| twoThousandYen | string | 二千円札の枚数 |
| thousandYen | string | 千円札の枚数 |
| fiveHundredYen | string | 五百円玉の枚数 |
| hundredYen | string | 百円玉の枚数 |
| fiftyYen | string | 五十円玉の枚数 |
| tenYen | string | 十円玉の枚数 |
| fiveYen | string | 五円玉の枚数 |
| oneYen | string | 一円玉の枚数 |

#### エラー（400）
- 検索条件が未指定
- 日時範囲でfrom/toの片方のみ指定
- 期間が31日を超過
- 複数の日時条件を同時指定
- 指定した店舗IDが存在しない

---

### POST /adjustments
精算を実行する。

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| storeId | ○ | string | 店舗ID |
| terminalId | △ | string | 端末ID（uuidと併用不可） |
| uuid | △ | string | 端末UUID（terminalIdと併用不可） |
| cashAdjustment | △ | object | 現金精算情報（店舗設定で必須化される場合あり） |
| cashAdjustment.tenThousandYen | - | integer | 一万円札の枚数 |
| cashAdjustment.fiveThousandYen | - | integer | 五千円札の枚数 |
| cashAdjustment.twoThousandYen | - | integer | 二千円札の枚数 |
| cashAdjustment.thousandYen | - | integer | 千円札の枚数 |
| cashAdjustment.fiveHundredYen | - | integer | 五百円玉の枚数 |
| cashAdjustment.hundredYen | - | integer | 百円玉の枚数 |
| cashAdjustment.fiftyYen | - | integer | 五十円玉の枚数 |
| cashAdjustment.tenYen | - | integer | 十円玉の枚数 |
| cashAdjustment.fiveYen | - | integer | 五円玉の枚数 |
| cashAdjustment.oneYen | - | integer | 一円玉の枚数 |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| adjustmentDateTime | string | 精算日時 |
| storeId | string | 店舗ID |
| terminalId | string | 端末ID |

#### エラー（400）
- 存在しない店舗の指定
- 倉庫・受注店舗への精算実行
- 必須パラメータ欠落
- 現金管理設定の不整合
- 稼働中テーブルが存在する

---

## 使用例

```javascript
// 特定店舗の本日の精算情報を取得
smaregi_api_get({
  "path": "/adjustments",
  "query": {
    "store_id": 1,
    "adjustment_date": "2024-03-27"
  }
})

// 期間指定で精算履歴を取得
smaregi_api_get({
  "path": "/adjustments",
  "query": {
    "store_id": 1,
    "adjustment_date_time-from": "2024-03-01T00:00:00+09:00",
    "adjustment_date_time-to": "2024-03-31T23:59:59+09:00"
  }
})

// 精算実行（現金残高入力あり）
smaregi_api_post({
  "path": "/adjustments",
  "body": {
    "storeId": "1",
    "terminalId": "1",
    "cashAdjustment": {
      "tenThousandYen": 10,
      "fiveThousandYen": 2,
      "thousandYen": 5,
      "fiveHundredYen": 3,
      "hundredYen": 10,
      "oneYen": 5
    }
  }
})
```

## 関連リソース

- 取引（Transactions）: `/transactions` で個々の売上取引を管理
- 店舗（Stores）: `/stores` で店舗情報を管理
- 端末（Terminals）: `/terminals` でレジ端末情報を管理
