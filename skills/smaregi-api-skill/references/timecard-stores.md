# 事業所（タイムカード）

## 概要

タイムカードの事業所情報を取得するAPI。事業所の一覧取得と詳細取得が可能。タイムカードAPIにおける「事業所」はスマレジPOSの「店舗」に対応する概念。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /stores
事業所一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| display_flag | - | number | 非表示事業所を含む（0: 含まない, 1: 含む） |
| store_name | - | string | 事業所名で検索（部分一致） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |
| sort | - | string | ソート順（:descで降順） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| stores[].storeId | string | 事業所ID |
| stores[].storeName | string | 事業所名 |
| stores[].storeAbbr | string | 事業所名略称 |
| stores[].phone | string | 電話番号 |
| stores[].autoBreakTimeDivision | string | 休憩時間自動設定区分（1: 時間指定, 2: 条件指定） |
| stores[].displayFlag | string | 表示設定（0: 非表示, 1: 表示） |
| stores[].geoFencingEnabled | string | ジオフェンシング打刻設定（0: 使用しない, 1: 使用する） |

### GET /stores/{store_id}
指定した事業所の詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| storeId | string | 事業所ID |
| storeName | string | 事業所名 |
| storeAbbr | string | 事業所名略称 |
| phone | string | 電話番号 |
| autoBreakTimeDivision | string | 休憩時間自動設定区分 |
| displayFlag | string | 表示設定 |
| geoFencingEnabled | string | ジオフェンシング打刻設定 |

## 注意事項
- 必要スコープ: `timecard.stores:read`
- AppAccessToken または UserAccessToken で認証
- デフォルトでは非表示事業所は返されない。`display_flag=1` で全件取得可能
- 事業所IDは打刻APIや勤怠APIで頻繁に使用するため事前に確認しておくこと
