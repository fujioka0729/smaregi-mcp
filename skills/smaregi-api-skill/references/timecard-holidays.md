# 休暇（タイムカード）

## 概要

従業員の休暇を管理するAPI。休暇の一覧取得・登録・更新・削除が可能。有給休暇・欠勤・半休等の種別を管理する。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /staff/holidays
従業員の休暇一覧を取得する。

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| from_date | ○ | string (date) | 検索開始日（YYYY-MM-DD） |
| to_date | ○ | string (date) | 検索終了日（YYYY-MM-DD） |
| staff_name | - | string | 従業員名 |
| staff_code | - | string | 社員番号 |
| holiday_name | - | string | 休暇名 |
| absence_flag | - | string | 欠勤扱いかどうか（0: 否, 1: 是） |
| paid_holiday_flag | - | string | 有給取得かどうか（0: 否, 1: 是） |
| limit | - | integer | 取得件数（1〜100、デフォルト30） |
| page | - | integer | ページ番号（デフォルト1） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| count | number | 総件数 |
| page | number | 現在のページ番号 |
| pageCount | number | 総ページ数 |
| staffHolidays[].staffHolidayId | string | 従業員休暇ID |
| staffHolidays[].staffId | string | 従業員ID |
| staffHolidays[].staffName | string | 従業員名 |
| staffHolidays[].fromDate | string (date) | 休暇開始日 |
| staffHolidays[].fromDateTime | string (date-time) | 休暇開始日時 |
| staffHolidays[].toDate | string (date) | 休暇終了日 |
| staffHolidays[].toDateTime | string (date-time) | 休暇終了日時 |
| staffHolidays[].holidaySettingId | string | 休暇設定ID |
| staffHolidays[].holidaySettingName | string | 休暇設定名 |
| staffHolidays[].division | string | 区分 |
| staffHolidays[].applicationDivision | string | 申請区分 |
| staffHolidays[].totalDigestValue | number | 消化日数 |
| staffHolidays[].totalDigestMinutes | number | 消化時間（分） |
| staffHolidays[].paidHolidayFlag | string | 有給取得フラグ（0: 否, 1: 是） |
| staffHolidays[].absenceFlag | string | 欠勤扱いフラグ（0: 否, 1: 是） |
| staffHolidays[].halfDayFlag | string | 半休フラグ（0: 否, 1: 是） |
| staffHolidays[].hourlyFlag | string | 時間単位フラグ（0: 否, 1: 是） |
| staffHolidays[].treatAsAttendanceFlag | integer | 出勤扱いフラグ（0: 否, 1: 是） |
| staffHolidays[].memo | string | メモ |

### POST /staff/holidays
従業員の休暇を登録する。

#### リクエストボディ（主要フィールド）
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| staffId | ○ | string | 従業員ID |
| holidaySettingId | ○ | string | 休暇設定ID |
| fromDate | ○ | string (date) | 休暇開始日（YYYY-MM-DD） |
| toDate | ○ | string (date) | 休暇終了日（YYYY-MM-DD） |
| halfDayFlag | - | string | 半休フラグ（"0" または "1"） |
| paidHolidayFlag | - | string | 有給取得フラグ（"0" または "1"） |
| absenceFlag | - | string | 欠勤扱いフラグ（"0" または "1"） |
| treatAsAttendanceFlag | - | integer | 出勤扱いフラグ（0 または 1） |
| memo | - | string | メモ |

#### レスポンス
登録した休暇情報（staffHolidayId 含む）を返す。

### PUT /staff/holidays/{staff_holiday_id}
従業員の休暇を更新する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_holiday_id | ○ | string | 従業員休暇ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| halfDayFlag | - | string | 半休フラグ（"0" または "1"） |
| paidHolidayFlag | - | string | 有給取得フラグ（"0" または "1"） |
| absenceFlag | - | string | 欠勤扱いフラグ（"0" または "1"） |
| treatAsAttendanceFlag | - | integer | 出勤扱いフラグ（0 または 1） |

#### レスポンス
| フィールド | 型 | 説明 |
|-----------|-----|------|
| staffHolidayId | string | 従業員休暇ID |
| memo | string | メモ |
| paidHolidayFlag | string | 有給取得フラグ |
| absenceFlag | string | 欠勤扱いフラグ |
| halfDayFlag | string | 半休フラグ |
| treatAsAttendanceFlag | integer | 出勤扱いフラグ |

### DELETE /staff/holidays/{staff_holiday_id}
従業員の休暇を削除する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| staff_holiday_id | ○ | string | 従業員休暇ID |

#### レスポンス
成功時は204 No Contentを返す。

## 参考エンドポイント

### GET /holiday_settings
休暇設定一覧を取得する（休暇種別の定義）。登録時に使用する `holidaySettingId` を確認できる。

### GET /staff_holiday_settings
従業員休暇設定一覧を取得する（個人の有給残日数等）。

### GET /staff_holiday_settings/{staff_id}/history
従業員の休暇設定履歴を取得する。

## 注意事項
- 必要スコープ: `timecard.holidays:read`（取得）/ `timecard.holidays:write`（登録・更新・削除）
- 休暇登録前に GET /holiday_settings で holidaySettingId を確認すること
- `halfDayFlag=1` の場合、午前または午後の半休を意味する
- `treatAsAttendanceFlag=1` は休暇でも出勤扱いとする場合に指定（例: 研修等）
- 時間単位休暇（hourlyFlag=1）は fromDateTime / toDateTime で時刻まで指定
