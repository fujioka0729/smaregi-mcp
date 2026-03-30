# 勤怠・事業所別（タイムカード）

## 概要

事業所単位で集計した勤怠データを取得するAPI。日次集計・月次集計・時間帯別集計が可能。シフト予定（schedule）と実績（result）の切り替えができる。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /shifts_summary/{store_id}/daily
事業所別の日別勤怠集計を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| division | ○ | string | シフト/実績区分（"schedule" または "result"） |
| year | ○ | string | 集計年（YYYY） |
| month | ○ | string | 集計月（MM） |
| date | - | string | 集計日（DD）※指定した場合は1日分のみ返す |
| callback_url | - | string (uri) | コールバックURL |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| year | string | 集計年 |
| month | string | 集計月 |
| storeId | string | 事業所ID |
| storeName | string | 事業所名 |
| storeAbbr | string | 事業所名略称 |
| division | string | シフト/実績区分 |
| shiftStoreDaily | object | 日別勤怠データ（日付をキーとするオブジェクト） |
| totalPersonnelExpenses | number | 給与概算合計 |

### GET /shifts_summary/{store_id}/monthly
事業所別の月別勤怠集計を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| division | ○ | string | シフト/実績区分（"schedule" または "result"） |
| year | ○ | string | 集計年（YYYY） |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| year | string | 集計年 |
| storeId | string | 事業所ID |
| storeName | string | 事業所名 |
| division | string | シフト/実績区分 |
| shiftStoreMonthly | object | 月別勤怠データ（月をキーとするオブジェクト） |
| totalPersonnelExpenses | number | 給与概算合計 |

### GET /shifts_summary/{store_id}/hourly
事業所別の時間帯別勤怠集計を取得する。指定日の時間帯ごとの人員・労働時間を集計する。レスポンスはコールバックURL経由で返される（非同期）。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| division | ○ | string | シフト/実績区分（"schedule" または "result"） |
| year | ○ | string | 集計年（YYYY） |
| month | ○ | string | 集計月（MM） |
| day | ○ | string | 集計日（DD） |
| callback_url | ○ | string (uri) | コールバックURL（必須） |

#### レスポンス（201: 受付完了、コールバックで本データ返却）
コールバックに送られるデータの主要フィールド：

| フィールド | 型 | 説明 |
|-----------|-----|------|
| year | string | 集計年 |
| month | string | 集計月 |
| day | string | 集計日 |
| storeId | string | 事業所ID |
| storeName | string | 事業所名 |
| division | string | シフト/実績区分 |
| shiftStoreHourly | array | 時間帯別データ |
| shiftStoreHourly[].hour | number | 時間（0〜23） |
| shiftStoreHourly[].hourlyTotalHour | number | その時間帯の総労働時間（時） |
| shiftStoreHourly[].hourlyTotalMinute | number | その時間帯の総労働時間（分） |
| shiftStoreHourly[].hourlyTotalStaff | number | その時間帯の人員数 |
| shiftStoreHourly[].totalPersonnelExpenses | number | 給与概算合計 |

### GET /shifts/{store_id}/duty
指定時刻に出勤中の従業員一覧を取得する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |

#### クエリパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| duty_time | - | string (date-time) | 指定時刻（YYYY-MM-DDThh:mm:ssTZD）※未指定時はサーバー現在時刻 |

#### レスポンス（主要フィールド）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| dutyTime | string (date-time) | 指定時刻 |
| storeId | string | 事業所ID |
| storeName | string | 事業所名 |
| dutyStaffs | array | 出勤中の従業員リスト |
| dutyStaffs[].staffId | string | 従業員ID |
| dutyStaffs[].staffName | string | 従業員名 |
| dutyStaffs[].shiftResultId | string | シフト実績ID |
| dutyStaffs[].attendance | string (date-time) | 出勤時刻 |
| dutyStaffs[].leaving | string (date-time) | 退勤時刻（予定） |
| dutyStaffs[].breakStartTime1 | string (date-time) | 休憩1開始時刻 |
| dutyStaffs[].breakEndTime1 | string (date-time) | 休憩1終了時刻 |
| dutyStaffs[].breakStartTime2 | string (date-time) | 休憩2開始時刻 |
| dutyStaffs[].breakEndTime2 | string (date-time) | 休憩2終了時刻 |

## 注意事項
- 必要スコープ: `timecard.shifts:read`
- `division` は "schedule"（シフト予定）または "result"（実績）を指定
- 時間帯別集計（hourly）はコールバックURLが必須の非同期API（HTTPステータス201で受付）
- 月次・日次集計は同期処理（200で即時返却）
