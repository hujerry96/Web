---
title: 'Tauc plot 每次重算都出不同 Eg？UV-Vis Band Gap 估算的常見陷阱'
seoTitle: 'Tauc plot 常見陷阱：為什麼 Eg 每次算都不同？'
slug: 'uv-vis-tauc-bandgap-workflow'
description: '波長轉能量、direct/indirect 模型、吸收係數與線性區間都可能影響 Eg。了解 Tauc plot 常見錯誤，並用 Spectra Studio 減少重複計算。'
keywords: ['UV-Vis band gap 計算', 'Tauc plot 怎麼畫', 'Tauc bandgap 軟體', 'direct indirect band gap', '吸收係數 alpha 計算', 'UV-Vis 分析軟體 Windows']
author: 'Jerry Hu'
date: 2026-08-26
updated: 2026-10-20
cover: './cover.png'
category: 'guides'
tags: ['Spectra Studio', 'UV-Vis', 'Tauc plot', 'Band Gap', '半導體']
locale: 'zh'
project: true
draft: false
---

## Tauc plot 最讓人崩潰的時刻：同一份資料，換個人就得到另一個 Eg

UV-Vis 資料看起來比 XRD 或 FTIR 簡單：一欄 wavelength、一欄 absorbance，畫出曲線，再把吸收邊轉成 Tauc plot。但真正開始計算後，常見的問題會一起出現：

- wavelength 要怎麼轉成 photon energy？
- 要用 direct 還是 indirect transition？
- 沒有薄膜厚度，還能不能算吸收係數？
- 線性區間要從哪裡開始、在哪裡結束？
- 為什麼 Excel、Origin 和手寫計算的 Eg 不完全一樣？

如果每次都靠複製欄位、拖曳選取範圍和手動畫線，結果不只耗時，也很難說明每個數值是怎麼得到的。

## Tauc 分析不是「畫一條最好看的直線」

常見的 Tauc 關係式為：

```text
(αhν)^n = A(hν − Eg)
```

其中 α 是吸收係數，hν 是光子能量，Eg 是光學能隙，n 則取決於躍遷類型。常見做法包括：

- **直接允許躍遷**：繪製 `(αhν)²` 對 `hν`。
- **間接允許躍遷**：繪製 `(αhν)^(1/2)` 對 `hν`。

在線性區間進行外推，與 x 軸的交點才是估計的 Eg。也就是說，模型與線性區間一改，結果就可能改變；不能只選一條最接近預期值的直線。

![從 wavelength、光子能量到線性外推交點的 Tauc band-gap 流程示意圖](./workflow.png)

*圖 1｜Tauc 分析的三個核心步驟；圖片為概念示意，非實際介面。*

## 手動用試算表計算，最常出錯的四個地方

### 1. 把吸收邊波長直接當成 Eg

波長與能量不是同一個量。Tauc 分析需要先透過 `E = hc/λ` 將 wavelength 轉成 photon energy。吸收邊波長可以提供直觀參考，但不能取代能量軸上的線性外推。

### 2. 忘記交代 direct 或 indirect

同一份 UV-Vis 資料使用不同的 n 值，可能得到不同的線性圖與 Eg。如果論文沒有說明躍遷模型，讀者就無法重現你的計算。材料文獻、晶體結構與實驗條件應該是模型選擇的依據，而不是哪個結果比較符合預期。

### 3. 選取太長的線性區

吸收邊附近可能有缺陷態、雜訊、散射或多重躍遷。把整段曲線都拿去擬合，會把非線性區帶入結果；但區間選得太窄，又可能只是在擬合雜訊。最好記錄起點、終點與擬合品質，並檢查稍微改變區間後 Eg 是否大幅變動。

### 4. 把 absorbance、transmittance 和 α 混在一起

如果有薄膜厚度 `d`，可以使用常見關係式：

```text
α = 2.303A / d
```

其中 A 是 absorbance。厚度單位必須與後續分析一致；若只有相對吸收資料，也可以做相對 α 的 Tauc 分析，但要在方法與限制中清楚說明。

## 用 Spectra Studio 把重複計算變成可檢查的流程

### Step 1：載入原始 UV-Vis 資料

Spectra Studio 可載入常見的 `.txt`、`.xy` 與 `.csv` 資料，並辨識以 nm 為單位的 wavelength 軸。載入後先確認第一欄是波長、第二欄是適合分析的訊號，避免把 transmittance 直接當成 absorbance 使用。

### Step 2：開啟 Tauc Bandgap，切換模型

在 Tauc Bandgap 分析中，可切換 direct 與 indirect 模式，系統會建立相應的 Tauc plot。這讓不同模型的計算規則明確留在同一個工作流程中，減少手動複製公式時的欄位錯誤。

### Step 3：先用自動線性區，再用手動模式核對

Spectra Studio 可先自動找出線性區，快速取得初步 Eg；如果吸收邊附近有特殊形狀或自動範圍不合理，也可以切換 manual mode，以兩個點調整線性區，讓研究者把判斷保留在流程裡。

### Step 4：查看 Eg、波長與擬合線

結果會在圖上標示估計的 Eg、對應波長與線性外推。這能減少在試算表與繪圖軟體間來回搬運數值，但正式報告前仍應保留原始吸收光譜、線性區設定與模型選擇紀錄。

## Spectra Studio 能解決什麼，不能解決什麼？

它能解決的是：wavelength 轉換、Tauc 變換、direct/indirect 切換、線性區選擇、圖上標註與圖表輸出的重複工作。若提供薄膜厚度，還能協助計算吸收係數；沒有厚度時，也能用相對吸收係數進行估算。

它不能替你決定材料一定是 direct 或 indirect，也不能保證每個樣品都存在清楚的 Tauc 線性區。散射嚴重的粉末、缺陷態明顯的材料、基線漂移或多重吸收邊，都需要研究者回到原始資料與文獻判斷。

## Free 版與 Pro 版

Free 版可以先完成資料載入、基本圖譜整理與 PNG/JPG 輸出；Tauc Bandgap、峰擬合、Scherrer、Williamson–Hall 與向量輸出則屬於 Pro 功能。你可以先用自己的 UV-Vis 檔案確認資料格式與工作流程，再依研究需求決定是否啟用進階分析。

## 投稿前的 Tauc plot 檢查表

- 是否明確說明使用 direct 或 indirect 模型？
- 是否把 wavelength 轉成 photon energy，而不是直接把 nm 當作 Eg？
- 線性區間是否落在合理的吸收邊附近？
- 是否記錄線性區端點與擬合品質？
- 薄膜厚度、吸收係數與單位是否交代清楚？
- 是否比較原始 UV-Vis 曲線與 Tauc plot，而不是只報一個 Eg？
- 是否避免只挑「最接近文獻」的結果？

## 延伸閱讀

- [UV-Vis Tauc plot 怎麼畫？一鍵計算材料 Band Gap 的完整教學](/zh/guides/uv-vis-tauc-plot-bandgap/)
- [鈣鈦礦太陽能電池：效率奇蹟背後的材料工程挑戰](/zh/guides/perovskite-solar-materials/)
- [儀器檔案格式太亂怎麼辦？把 XRD、FTIR、Raman、UV-Vis 資料放進同一個工作流程](/zh/guides/spectra-data-format-conversion/)

## 結語：讓 Eg 是一個可說明的結果，而不是試算表裡的神秘數字

Tauc plot 的難點不在於公式本身，而在於模型、單位、線性區與資料品質。Spectra Studio 把波長轉換、Tauc 變換、線性區、自動或手動外推與圖表標註集中在同一個 Windows 工具中，讓你少花時間重複搬欄位，多花時間確認結果是否具有材料上的意義。

👉 **用自己的 UV-Vis 資料建立第一張 Tauc plot：**
[查看 Spectra Studio 功能與下載方式](https://hulab.pages.dev/zh/spectra-studio/)
