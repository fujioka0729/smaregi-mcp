# 勤怠・従業員別（タイムカード）

## 概要

従業員単位で集計した勤怠データを取得するAPI。従業員ごとの日次・月次・時間帯別集計が可能。個人の勤怠実績確認や給与計算に使用する。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /shifts/staffs/{staff_id}/daily
従業員別の日別勤怠を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_id | ○ | string | 従業員ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| division | ○ | string | シフト/実績区分（"schedule" または "result"） |
| year | ○ | string | 集計年（YYYY） |
| month | ○ | string | 集計月（MM） |
| store_id | - | string | 事業所ID（カンマ区切りで複数指定可） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| year | string | 集計年 |
| month | string | 集計月 |
| staffId | string | 従業員ID |
| staffName | string | 従業員名 |
| division | string | シフト/実績区分 |
| shiftStaffDaily | object | 日別勤怠データ（日付をキーとするオブジェクト） |
| shiftStaffDaily.{date}[].storeId | string | 事業所ID |
| shiftStaffDaily.{date}[].storeName | string | 事業所名 |
| shiftStaffDaily.{date}[].attendanceTime | string (date-time) | 出勤時刻 |
| shiftStaffDaily.{date}[].leavingTime | string (date-time) | 退勤時刻 |
| shiftStaffDaily.{date}[].workingMinutes | number | 労働時間（分） |

### GET /shifts/staffs/{staff_id}/monthly
従業員別の月別勤怠を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_id | ○ | string | 従業員ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| year | ○ | string | 集計年（YYYY） |
| division | ○ | string | シフト/実績区分（"schedule" または "result"） |
| store_id | - | string | 事業所ID（カンマ区切りで複数指定可） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| year | string | 集計年 |
| staffId | string | 従業員ID |
| shiftMonthly | object | 月別勤怠データ（月をキーとするオブジェクト） |
| shiftMonthly.{MM}[].storeId | string | 事業所ID |
| shiftMonthly.{MM}[].storeName | string | 事業所名 |
| shiftMonthly.{MM}[].storeAbbr | string | 事業所名略称 |
| shiftMonthly.{MM}[].fromDate | string | 集計開始日 |
| shiftMonthly.{MM}[].toDate | string | 集計終了日 |
| shiftMonthly.{MM}[].totalDutyHour | number | 合計勤務時間（時） |
| shiftMonthly.{MM}[].totalDutyMinute | number | 合計勤務時間（分） |
| shiftMonthly.{MM}[].tardyCount | number | 遅刻回数 |
| shiftMonthly.{MM}[].earlyLeavingCount | number | 早退回数 |
| shiftMonthly.{MM}[].personnelExpenses | number | 人件費概算 |
| shiftMonthly.{MM}[].absenceDayCount | number | 欠勤日数 |
| shiftMonthly.{MM}[].totalPersonnelExpenses | number | 給与概算合計 |

### 時間帯別集計（従業員別）
従業員別の時間帯別勤怠は、事業所別時間帯別集計（GET /shifts_summary/{store_id}/hourly）のレスポンス中の `staffs` 配列で確認できる。

## 注意事項
- 必要スコープ: `timecard.shifts:read`
- AppAccessToken または UserAccessToken で認証
- `division` は "schedule"（シフト予定）または "result"（実績）を指定
- 月次集計は1年分（1〜12月）のデータを一度に返す
- UserAccessToken の場合、ログイン中のユーザーの権限に基づいてアクセス制御が行われる
