# 役割（タイムカード）

## 概要

事業所ごとの役割（ロール）情報を取得するAPI。役割は従業員に割り当てられ、事業所内での役割区分（レジ担当、調理担当等）を表す。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /roles
役割一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID（カンマ区切りで複数指定可） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |
| sort | - | string | ソート順（store_id, display_sequence, role_id 等、:descで降順） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| roles[].storeId | string | 事業所ID |
| roles[].roleId | string | 役割ID |
| roles[].roleName | string | 役割名（1〜20文字） |
| roles[].description | string | 説明（0〜255文字） |
| roles[].displaySequence | integer | 表示順 |

### GET /roles/{role_id}
指定した役割の詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| role_id | ○ | string | 役割ID |

#### レスポンス
役割の詳細情報（storeId, roleId, roleName, description, displaySequence）を返す。

## 注意事項
- 必要スコープ: `timecard.staffs:read`
- AppAccessToken または UserAccessToken で認証
- 役割は事業所単位で管理される（store_id は必須パラメータ）
- 従業員の所属事業所登録（PUT /staffs/{staff_id}/staff-stores/{store_id}）でroleIdを指定して役割を割り当てる
