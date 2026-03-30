# タイムカード操作ガイド

## 概要

スマレジ タイムカードAPIを使ったタイムカード操作の実践ガイド。打刻フロー・勤怠確認・給与確定・日報管理・休暇管理の手順を説明する。

タイムカードAPIはPOS APIと異なるベースパスを使用する。
- 本番: `https://api.smaregi.jp/{contract_id}/timecard`
- サンドボックス: `https://api.smaregi.dev/{contract_id}/timecard`

## 利用可能なパス

| パス | メソッド | 説明 |
|------|---------|------|
| /staffs | GET | 従業員一覧取得 |
| /stores | GET | 事業所一覧取得 |
| /shifts/attendance/{store_id}/{staff_id} | POST | 出勤打刻 |
| /shifts/leaving/{shift_result_id} | PUT | 退勤打刻 |
| /shifts/cheering/{store_id}/{staff_id} | PUT | 応援打刻 |
| /shifts/break_start_time/{shift_result_id} | PUT | 休憩開始打刻 |
| /shifts/break_end_time/{shift_result_id} | PUT | 休憩終了打刻 |
| /shifts/{store_id}/duty | GET | 出勤中の従業員取得 |
| /shifts/results | GET | 勤怠実績一覧取得 |
| /shifts/staffs/{staff_id}/daily | GET | 従業員別日別勤怠取得 |
| /shifts/staffs/{staff_id}/monthly | GET | 従業員別月別勤怠取得 |
| /shifts_summary/{store_id}/daily | GET | 事業所別日別集計取得 |
| /shifts_summary/{store_id}/monthly | GET | 事業所別月別集計取得 |
| /shifts_summary/{store_id}/hourly | GET | 事業所別時間帯別集計取得 |
| /budgets/monthly | GET | 月別給与一覧取得 |
| /budgets/monthly/{store_id}/{staff_id} | GET | 月別給与明細取得 |
| /budgets/determine | PUT | 給与確定 |
| /daily_reports/store/{store_id} | GET | 日報一覧取得 |
| /daily_reports/{shift_result_id} | POST | 日報登録 |
| /daily_reports/{daily_report_id} | GET | 日報詳細取得 |
| /daily_reports/{shift_result_id} | PUT | 日報更新 |
| /daily_reports/{shift_result_id} | DELETE | 日報削除 |
| /daily_report_tags | GET | 日報タグ一覧取得 |
| /daily_report_tags/summary/staff | GET | 日報タグ従業員別集計 |
| /staff/holidays | GET | 従業員休暇一覧取得 |
| /staff/holidays | POST | 従業員休暇登録 |
| /staff/holidays/{staff_holiday_id} | PUT | 従業員休暇更新 |
| /staff/holidays/{staff_holiday_id} | DELETE | 従業員休暇削除 |
| /settings | GET | 設定取得 |

## 使用例

### 事前準備: 事業所・従業員IDを確認する

```
smaregi_api_get({ "path": "/timecard/stores", "query": { "limit": "100" } })
```

```
smaregi_api_get({ "path": "/timecard/staffs", "query": { "store_id": "1", "active": "1" } })
```

---

### 打刻フロー

#### 1. 出勤打刻
出勤時刻を記録する。レスポンスの `shiftResultId` を保存しておく（以降の打刻で使用）。

```
smaregi_api_post({
  "path": "/timecard/shifts/attendance/1/123",
  "body": {
    "attendance": "2026-03-27T09:00:00+09:00"
  }
})
```

#### 2. 休憩開始打刻
`breakDivision` は "1"（1回目の休憩）または "2"（2回目の休憩）。

```
smaregi_api_put({
  "path": "/timecard/shifts/break_start_time/456",
  "body": {
    "breakDivision": "1",
    "breakStartTime": "2026-03-27T12:00:00+09:00"
  }
})
```

#### 3. 休憩終了打刻
開始時と同じ `breakDivision` を指定する。

```
smaregi_api_put({
  "path": "/timecard/shifts/break_end_time/456",
  "body": {
    "breakDivision": "1",
    "breakEndTime": "2026-03-27T13:00:00+09:00"
  }
})
```

#### 4. 退勤打刻

```
smaregi_api_put({
  "path": "/timecard/shifts/leaving/456",
  "body": {
    "leaving": "2026-03-27T18:00:00+09:00"
  }
})
```

#### 5. 応援打刻（別の事業所への移動）
現在の勤務先（store_id: 1）から別の事業所（store_id: 2）へ移動する場合。

```
smaregi_api_put({
  "path": "/timecard/shifts/cheering/2/123",
  "body": {
    "leavingShiftResultId": "456",
    "attendance": "2026-03-27T14:00:00+09:00"
  }
})
```

---

### 勤怠確認

#### 日次勤怠: 期間を指定して実績一覧を取得する

```
smaregi_api_get({
  "path": "/timecard/shifts/results",
  "query": {
    "from_date": "2026-03-01",
    "to_date": "2026-03-31",
    "store_id": "1",
    "limit": "100"
  }
})
```

#### 特定従業員の月別勤怠を確認する

```
smaregi_api_get({
  "path": "/timecard/shifts/staffs/123/monthly",
  "query": {
    "year": "2026",
    "division": "result"
  }
})
```

#### 事業所別日別集計を確認する（シフト予定）

```
smaregi_api_get({
  "path": "/timecard/shifts_summary/1/daily",
  "query": {
    "division": "schedule",
    "year": "2026",
    "month": "03"
  }
})
```

#### 事業所別月別集計を確認する（実績）

```
smaregi_api_get({
  "path": "/timecard/shifts_summary/1/monthly",
  "query": {
    "division": "result",
    "year": "2026"
  }
})
```

#### 時間帯別集計を取得する（非同期、callbackUrl必須）

```
smaregi_api_get({
  "path": "/timecard/shifts_summary/1/hourly",
  "query": {
    "division": "result",
    "year": "2026",
    "month": "03",
    "day": "27",
    "callback_url": "https://your-server.example.com/callback"
  }
})
```

#### 現在出勤中の従業員を確認する

```
smaregi_api_get({
  "path": "/timecard/shifts/1/duty",
  "query": {}
})
```

---

### 給与確定フロー

#### 1. 給与一覧で内容を確認する

```
smaregi_api_get({
  "path": "/timecard/budgets/monthly",
  "query": {
    "year": "2026",
    "month": "03",
    "store_id": "1"
  }
})
```

#### 2. 個別の給与明細を確認する

```
smaregi_api_get({
  "path": "/timecard/budgets/monthly/1/123",
  "query": {
    "year": "2026",
    "month": "03"
  }
})
```

#### 3. 給与を確定する（管理者のみ）

```
smaregi_api_put({
  "path": "/timecard/budgets/determine",
  "body": {
    "year": "2026",
    "month": "03",
    "store_id": "1"
  }
})
```

---

### 日報管理

#### 日報一覧を取得する

```
smaregi_api_get({
  "path": "/timecard/daily_reports/store/1",
  "query": {
    "from_date": "2026-03-01",
    "to_date": "2026-03-31"
  }
})
```

#### 日報を登録する（shift_result_id に紐付け）

```
smaregi_api_post({
  "path": "/timecard/daily_reports/456",
  "body": {
    "content": "本日は接客業務と在庫確認を行いました。",
    "dailyReportTagIds": ["1", "2"],
    "dailyReportTagTimes": { "1": 120, "2": 60 }
  }
})
```

#### 日報タグを集計する（従業員別）

```
smaregi_api_get({
  "path": "/timecard/daily_report_tags/summary/staff",
  "query": {
    "from_date": "2026-03-01",
    "to_date": "2026-03-31",
    "store_id": "1"
  }
})
```

---

### 休暇管理

#### 休暇設定（種別）を確認する

```
smaregi_api_get({ "path": "/timecard/holiday_settings", "query": {} })
```

#### 従業員の休暇一覧を取得する

```
smaregi_api_get({
  "path": "/timecard/staff/holidays",
  "query": {
    "from_date": "2026-03-01",
    "to_date": "2026-03-31"
  }
})
```

#### 有給休暇を登録する

```
smaregi_api_post({
  "path": "/timecard/staff/holidays",
  "body": {
    "staffId": "123",
    "holidaySettingId": "1",
    "fromDate": "2026-04-01",
    "toDate": "2026-04-01",
    "paidHolidayFlag": "1"
  }
})
```

#### 半休に更新する

```
smaregi_api_put({
  "path": "/timecard/staff/holidays/789",
  "body": {
    "halfDayFlag": "1",
    "paidHolidayFlag": "1"
  }
})
```

#### 休暇を削除する

```
smaregi_api_delete({ "path": "/timecard/staff/holidays/789" })
```

---

## 注意事項

- タイムカードAPIのパスは `/timecard/` プレフィックスで始まる（POS APIの `/pos/` とは別）
- 打刻は `POST /shifts/attendance/...` で出勤し、返却される `shiftResultId` を使って退勤・休憩を打刻する
- 応援打刻は退勤と出勤を同時処理するため、`leavingShiftResultId`（退勤元）と応援先の `store_id` を同時に指定する
- 時間帯別集計（hourly）は非同期APIのため、`callback_url` の指定が必須。レスポンスは201で受付完了を示し、実データはコールバックで届く
- 給与確定はシステム管理者権限が必要。確定後は勤怠実績の `calculated` フラグが `true` になり、修正に制限がかかる
- 時刻フォーマットは常に `YYYY-MM-DDThh:mm:ssTZD`（例: `2026-03-27T09:00:00+09:00`）を使用すること
- 勤怠実績の取得（GET /shifts/results）は最大3ヶ月の範囲制限がある
