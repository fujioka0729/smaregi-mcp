# 役職（タイムカード）

## 概要

役職情報を取得するAPI。役職は従業員の職位・ランクを表し、部長・課長・一般等の階層を管理する。役割（role）とは異なり、組織内の地位を示す。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /positions
役職一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| position_id | - | string | 役職ID（カンマ区切りで複数指定可） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |
| sort | - | string | ソート順（position_rank, position_id 等、:descで降順） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| positions[].positionId | string | 役職ID |
| positions[].positionName | string | 役職名（最大32文字） |
| positions[].positionRank | integer | 役職順位（1〜999999999） |

### GET /positions/{position_id}
指定した役職の詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| position_id | ○ | string | 役職ID |

#### レスポンス
役職の詳細情報（positionId, positionName, positionRank）を返す。

## 注意事項
- 必要スコープ: `timecard.staffs:read`
- AppAccessToken または UserAccessToken で認証
- `positionRank` の数値が小さいほど上位の役職を示す
- 勤怠実績（GET /shifts/results）のレスポンスに `positionId`, `positionName` が含まれる
- 役割（roles）は事業所ごとに定義されるが、役職（positions）は組織全体で共通
