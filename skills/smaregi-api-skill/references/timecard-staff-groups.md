# 従業員グループ（タイムカード）

## 概要

従業員グループ情報を取得するAPI。従業員グループは階層構造を持ち、部署・チーム等の組織単位を表す。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /staff_groups
従業員グループ一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_group_code | - | string | 従業員グループコード（カンマ区切りで複数指定可） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| staffGroupCode | string | 従業員グループコード |
| staffGroupName | string | 従業員グループ名（最大255文字） |
| parentStaffGroupCode | string | 親グループコード |
| staffCount | string | 従業員数 |
| hierarchy | string | ルートからの階層数 |
| displaySequence | string | 表示順 |

### GET /staff_groups/{staff_group_code}
指定した従業員グループの詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_group_code | ○ | string | 従業員グループコード |

#### レスポンス
従業員グループの詳細情報（staffGroupCode, staffGroupName, parentStaffGroupCode, staffCount, hierarchy, displaySequence）を返す。

## 注意事項
- 必要スコープ: `timecard.staffs:read`
- AppAccessToken または UserAccessToken で認証
- 従業員グループは階層構造を持つ（`parentStaffGroupCode` で親子関係を表現）
- `hierarchy` フィールドはルートからの階層数（ルートは0）
- 従業員一覧（GET /staffs）では `staff_group_code` でフィルタリング可能
- 従業員のグループ登録は PUT /staffs/{staff_id}/staff-groups/{staff_group_code} を使用
