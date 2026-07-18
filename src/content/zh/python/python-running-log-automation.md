---
title: '用 Python 自動化你的訓練紀錄：從 CSV 到每週跑量圖表'
slug: 'python-running-log-automation'
description: '用不到 30 行的 Python 腳本，把零散的跑步紀錄 CSV 轉成每週跑量與配速圖表，讓訓練更有感。'
keywords: ['Python 教學', '資料視覺化', '跑步紀錄', 'pandas', 'matplotlib']
author: 'Jerry Hu'
date: 2026-07-15
category: 'python'
tags: ['Python', '數據', '自動化']
canonical: 'https://hujerry96.github.io/Web/zh/python/python-running-log-automation'
locale: 'zh'
draft: false
---

紀錄跑步不難，難的是「回頭看」。本文用一個最小可執行腳本，把 CSV 裡的日期、距離、配速，自動彙總成每週跑量圖表。

## 準備資料

假設你有一份 `runs.csv`：

```csv
date,distance_km,pace
2026-07-01,5.2,6:10
2026-07-03,8.0,5:55
2026-07-05,4.5,6:20
```

## 讀入與彙總

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('runs.csv', parse_dates=['date'])
df['week'] = df['date'].dt.to_period('W')
weekly = df.groupby('week')['distance_km'].sum()

weekly.plot(kind='bar', color='#9c3b2e')
plt.title('每週跑量')
plt.show()
```

## 小結

三十行內就能擁有屬於自己的訓練儀表板。下一步可以加入配速趨勢線，或匯出成 PNG 自動存檔。
