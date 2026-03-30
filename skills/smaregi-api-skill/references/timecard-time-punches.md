# 打刻（タイムカード）

## 概要

打刻操作を行うAPI。出勤・退勤・応援打刻・休憩開始/終了の打刻が可能。打刻後に返される `shiftResultId` を後続の退勤・休憩打刻で使用する。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### POST /shifts/attendance/{store_id}/{staff_id}
出勤打刻を行う。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 事業所ID |
| staff_id | ○ | string | 従業員ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| attendance | ○ | string (date-time) | 出勤時刻（YYYY-MM-DDThh:mm:ssTZD） |
| latitude | - | number | 出勤時緯度 |
| longitude | - | number | 出勤時経度 |
| horizontalAccuracy | - | number | 水平誤差精度（m） |
| verticalAccuracy | - | number | 垂直誤差精度（m） |
| callbackUrl | - | string (uri) | コールバックURL（非同期処理時） |

#### レスポンス（200: 同期 / 201: 非同期）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| shiftResultId | string | シフト実績ID（後続の打刻で使用） |
| storeId | string | 事業所ID |
| staffId | string | 従業員ID |
| shiftDate | string (date) | 勤務日 |
| attendance | string (date-time) | 出勤時刻 |
| tardyFlag | string | 遅刻の有無（"" または "1"） |
| tardyMinute | string | 遅刻時間（分、丸め後） |

### PUT /shifts/leaving/{shift_result_id}
退勤打刻を行う。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID（出勤打刻時に取得） |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| leaving | ○ | string (date-time) | 退勤時刻（YYYY-MM-DDThh:mm:ssTZD） |
| latitude | - | number | 退勤時緯度 |
| longitude | - | number | 退勤時経度 |
| horizontalAccuracy | - | number | 水平誤差精度（m） |
| verticalAccuracy | - | number | 垂直誤差精度（m） |
| callbackUrl | - | string (uri) | コールバックURL（非同期処理時） |

#### レスポンス（200: 同期 / 201: 非同期）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| shiftResultId | string | シフト実績ID |
| attendance | string (date-time) | 出勤時刻 |
| leaving | string (date-time) | 退勤時刻 |
| earlyLeavingFlag | string | 早退の有無 |

### PUT /shifts/cheering/{store_id}/{staff_id}
応援打刻を行う。現在の勤務先から別の事業所へ移動する際に使用する。退勤と出勤を同時に処理する。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| store_id | ○ | string | 応援先の事業所ID |
| staff_id | ○ | string | 従業員ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| leavingShiftResultId | ○ | string | 退勤元のシフト実績ID |
| attendance | ○ | string (date-time) | 応援先の出勤時刻（YYYY-MM-DDThh:mm:ssTZD） |
| leavingLatitude | - | number | 退勤時緯度 |
| leavingLongitude | - | number | 退勤時経度 |
| leavingHorizontalAccuracy | - | number | 退勤時水平誤差精度（m） |
| leavingVerticalAccuracy | - | number | 退勤時垂直誤差精度（m） |
| latitude | - | number | 出勤時緯度 |
| longitude | - | number | 出勤時経度 |
| horizontalAccuracy | - | number | 出勤時水平誤差精度（m） |
| verticalAccuracy | - | number | 出勤時垂直誤差精度（m） |
| callbackUrl | - | string (uri) | コールバックURL |

#### レスポンス
| フィールド | 型 | 説明 |
|-----------|-----|------|
| leavingShiftResult | object | 退勤元のシフト実績情報 |
| attendanceShiftResult | object | 応援先のシフト実績情報（新しい shiftResultId を含む） |

### PUT /shifts/break_start_time/{shift_result_id}
休憩開始打刻を行う。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| breakDivision | ○ | string | 休憩区分（"1" または "2"） |
| breakStartTime | ○ | string (date-time) | 休憩開始時刻（YYYY-MM-DDThh:mm:ssTZD） |
| latitude | - | number | 休憩開始時緯度 |
| longitude | - | number | 休憩開始時経度 |
| horizontalAccuracy | - | number | 水平誤差精度（m） |
| verticalAccuracy | - | number | 垂直誤差精度（m） |
| callbackUrl | - | string (uri) | コールバックURL |

#### レスポンス
更新後のシフト実績（breakStartTime1/2 を含む）を返す。

### PUT /shifts/break_end_time/{shift_result_id}
休憩終了打刻を行う。

#### パスパラメータ
| 名前 | 必須 | 型 | 説明 |
|------|------|-----|------|
| shift_result_id | ○ | string | シフト実績ID |

#### リクエストボディ
| フィールド | 必須 | 型 | 説明 |
|-----------|------|-----|------|
| breakDivision | ○ | string | 休憩区分（"1" または "2"、開始時と同じ値） |
| breakEndTime | ○ | string (date-time) | 休憩終了時刻（YYYY-MM-DDThh:mm:ssTZD） |
| latitude | - | number | 休憩終了時緯度 |
| longitude | - | number | 休憩終了時経度 |
| horizontalAccuracy | - | number | 水平誤差精度（m） |
| verticalAccuracy | - | number | 垂直誤差精度（m） |
| callbackUrl | - | string (uri) | コールバックURL |

#### レスポンス
更新後のシフト実績（breakEndTime1/2 を含む）を返す。

## 打刻フロー

```
出勤 POST /shifts/attendance/{store_id}/{staff_id}
  → shiftResultId を取得

[休憩開始] PUT /shifts/break_start_time/{shiftResultId}  breakDivision="1"
[休憩終了] PUT /shifts/break_end_time/{shiftResultId}    breakDivision="1"

[応援] PUT /shifts/cheering/{別の事業所_id}/{staff_id}
  → leavingShiftResultId に元の shiftResultId を指定
  → 新しい shiftResultId を取得

退勤 PUT /shifts/leaving/{shiftResultId}
```

## 注意事項
- 必要スコープ: `timecard.shifts:write`
- 出勤打刻（POST）は同期（200）または非同期（201+callbackUrl）で処理される
- 退勤・休憩等（PUT）も同様にコールバックURL指定で非同期処理が可能
- `shiftResultId` は出勤打刻後にレスポンスで返される。以降の打刻で必ず使用する
- 休憩は最大2回（breakDivision: "1" または "2"）記録可能
- 時刻形式は YYYY-MM-DDThh:mm:ssTZD（例: `2026-03-27T09:00:00+09:00`）
