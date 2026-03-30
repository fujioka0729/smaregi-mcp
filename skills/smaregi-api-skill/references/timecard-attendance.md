# 勤怠（タイムカード）

## 概要

勤怠実績を管理するAPI。勤怠実績の一覧取得・登録・詳細取得・更新・削除が可能。打刻とは別に、管理者が手動で勤怠データを作成・修正する場合に使用する。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /shifts/results
勤怠実績一覧を取得する。最大3ヶ月範囲で指定可能。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| from_date | ○ | string (date) | 検索開始日（YYYY-MM-DD） |
| to_date | ○ | string (date) | 検索終了日（YYYY-MM-DD、最大3ヶ月範囲） |
| staff_id | - | array(integer) | 従業員ID（カンマ区切りで複数指定可） |
| store_id | - | array(integer) | 事業所ID（カンマ区切りで複数指定可） |
| min_working_minutes | - | integer | 最小労働時間（分） |
| max_working_minutes | - | integer | 最大労働時間（分） |
| min_total_overtime_minutes | - | integer | 最小合計残業時間（分） |
| max_total_overtime_minutes | - | integer | 最大合計残業時間（分） |
| min_overtime_minutes | - | integer | 最小残業時間（分） |
| max_overtime_minutes | - | integer | 最大残業時間（分） |
| min_midnight_minutes | - | integer | 最小深夜労働時間（分） |
| max_midnight_minutes | - | integer | 最大深夜労働時間（分） |
| min_break_minutes | - | integer | 最小休憩時間（分） |
| max_break_minutes | - | integer | 最大休憩時間（分） |
| min_tardy_minutes | - | integer | 最小遅刻時間（分） |
| max_tardy_minutes | - | integer | 最大遅刻時間（分） |
| min_early_leaving_minutes | - | integer | 最小早退時間（分） |
| max_early_leaving_minutes | - | integer | 最大早退時間（分） |
| holiday_type | - | array(string) | 休日種別（none, prescribed, statutory） |
| page | - | integer | ページ番号（デフォルト1） |
| limit | - | integer | 取得件数（1〜2000、デフォルト30） |
| sort | - | string | ソート順（例: shift_date,staff_id:desc） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| results[].shiftDate | string | 勤務日 |
| results[].staffId | string | 従業員ID |
| results[].staffName | string | 従業員名 |
| results[].staffCode | string | 社員番号 |
| results[].storeId | string | 事業所ID |
| results[].storeName | string | 事業所名 |
| results[].attendanceAt | string (date-time) | 出勤時刻 |
| results[].attendanceAtRounded | string (date-time) | 出勤時刻（丸め後） |
| results[].leavingAt | string (date-time) | 退勤時刻 |
| results[].leavingAtRounded | string (date-time) | 退勤時刻（丸め後） |
| results[].break1StartAt | string (date-time) | 休憩1開始時刻 |
| results[].break1EndAt | string (date-time) | 休憩1終了時刻 |
| results[].break2StartAt | string (date-time) | 休憩2開始時刻 |
| results[].break2EndAt | string (date-time) | 休憩2終了時刻 |
| results[].workingMinutes | number | 労働時間（分） |
| results[].overtimeMinutes | number | 残業時間（分） |
| results[].over45HourOvertimeMinutes | number | 45時間超残業（分） |
| results[].over60HourOvertimeMinutes | number | 60時間超残業（分） |
| results[].midnightMinutes | number | 深夜労働時間（分） |
| results[].breakMinutes | number | 休憩時間（分） |
| results[].tardyMinutes | number | 遅刻時間（分） |
| results[].earlyLeavingMinutes | number | 早退時間（分） |
| results[].holidayType | string | 休日種別（none/prescribed/statutory） |
| results[].calculated | boolean | 給与確定済みフラグ |

### POST /shifts/{store_id}/{staff_id}
勤怠を手動登録する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |
| staff_id | ○ | string | 従業員ID |

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| shiftDate | ○ | string (date) | 勤務日（YYYY-MM-DD） |
| attendanceAt | - | string (date-time) | 出勤時刻 |
| leavingAt | - | string (date-time) | 退勤時刻 |
| break1StartAt | - | string (date-time) | 休憩1開始時刻 |
| break1EndAt | - | string (date-time) | 休憩1終了時刻 |

#### レスポンス
登録した勤怠実績情報（shiftResultId 含む）を返す。

### GET /shifts/results/{shift_result_id}
指定した勤怠実績の詳細を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID |

#### レスポンス
勤怠実績の詳細情報（一覧と同フィールド）を返す。

### PUT /shifts/{shift_result_id}
勤怠実績を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID |

#### リクエストボディ
更新するフィールドのみ指定する（attendanceAt, leavingAt, break1StartAt 等）。

### DELETE /shifts/{shift_result_id}
勤怠実績を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID |

#### レスポンス
成功時は204 No Contentを返す。

## 注意事項
- 必要スコープ: `timecard.shifts:read`（取得）/ `timecard.shifts:write`（登録・更新・削除）
- `from_date` と `to_date` の範囲は最大3ヶ月
- `calculated=true` の実績は給与確定済みのため、一部の操作が制限される場合がある
- 大量データ取得時は `limit=2000`（最大）を活用してページング
- 出勤中の従業員一覧は GET /shifts/{store_id}/duty を使用
