---
title: 'Python Automation for Your Running Log: From CSV to Weekly Charts'
slug: 'python-running-log-automation-en'
description: 'A minimal Python script that turns a scattered running-log CSV into weekly distance and pace charts — under 30 lines.'
keywords: ['Python tutorial', 'data visualization', 'running log', 'pandas', 'matplotlib']
author: 'Jerry Hu'
date: 2026-07-14
category: 'guides'
tags: ['Python', 'Data', 'Automation']
locale: 'en'
draft: false
---

Logging runs is easy; looking back is hard. This minimal script aggregates dates, distances, and paces from a CSV into a weekly chart.

## Prepare the data

Assume a `runs.csv`:

```csv
date,distance_km,pace
2026-07-01,5.2,6:10
2026-07-03,8.0,5:55
2026-07-05,4.5,6:20
```

## Read and aggregate

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('runs.csv', parse_dates=['date'])
df['week'] = df['date'].dt.to_period('W')
weekly = df.groupby('week')['distance_km'].sum()

weekly.plot(kind='bar', color='#9c3b2e')
plt.title('Weekly Distance')
plt.show()
```

## Wrap-up

Under thirty lines gets you a personal training dashboard. Next, add a pace trend line or export to PNG automatically.
