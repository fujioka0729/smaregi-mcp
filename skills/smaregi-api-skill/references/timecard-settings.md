# 設定（タイムカード）

## 概要

タイムカードの基本設定を取得するAPI。給与計算ルール・所定労働時間・週別休日設定等、システム全体の設定情報を取得する。

ベースパス: `https://api.smaregi.jp/{contract_id}/timecard`

## エンドポイント

### GET /settings
タイムカードの基本設定を取得する。

#### クエリパラメータ
なし

#### レスポンス（主要フィールド）

**打刻・表示設定**
| フィールド | 型 | 説明 |
|-----------|-----|------|
| setting.timeDivision | string | アプリ打刻の時刻設定（サーバー時刻/端末時刻） |
| setting.pinCode | string | 出退勤画面用PINコード（半角数字4文字） |
| setting.calendarDivision | string | カレンダー表示形式（通常/締め日） |
| setting.csvWorkingTimeDivision | string | CSV給与の勤務時間表示形式 |

**給与・残業設定**
| フィールド | 型 | 説明 |
|-----------|-----|------|
| setting.overtimeWageEnabled | boolean | 時間外労働割増賃金の適用可否 |
| setting.legalOvertimeRate | number | 法定内残業割増賃金倍率 |
| setting.weeklyOvertimeEnabled | boolean | 週40/44時間超過の時間外労働適用 |
| setting.over45HourOvertimeRate | number | 月45時間超割増倍率 |
| setting.over60HourOvertimeRate | number | 月60時間超割増倍率 |
| setting.midnightRate | number | 深夜労働割増倍率（既定125%） |
| setting.prescribedHolidayRate | number | 所定休日労働割増倍率 |
| setting.statutoryHolidayRate | number | 法定休日労働割増倍率 |

**所定労働時間設定**
| フィールド | 型 | 説明 |
|-----------|-----|------|
| prescribedWorkTime.monthlyAverageDays | number | 1ヶ月の平均所定労働日数 |
| prescribedWorkTime.dailyWorkMinutes | number | 1日の所定労働時間（分単位） |
| prescribedWorkTime.monthlyAverageMinutes | number | 1ヶ月の平均所定労働時間（分単位） |

**週別休日設定**
| フィールド | 型 | 説明 |
|-----------|-----|------|
| holidayWeekSetting | array | 曜日ごとの休日区分（7要素の配列） |
| holidayWeekSetting[].dayOfWeek | string | 曜日（0: 日曜〜6: 土曜） |
| holidayWeekSetting[].holidayDivision | string | 休日区分（所定労働/所定休日/法定休日） |

## 注意事項
- 必要スコープ: `timecard.settings:read`
- AppAccessToken または UserAccessToken で認証
- 設定はシステム管理者のみ変更可能（APIからの変更は不可、管理画面で設定）
- 給与計算はここで設定した倍率・所定労働時間に基づいて行われる
- `dailyWorkMinutes` は残業判定の基準となる（これを超えた分が残業時間として計算される）
