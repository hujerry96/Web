---
title: 'FTIR、Raman 光譜怎麼整理？批次疊圖、基線校正與投稿圖輸出'
slug: 'ftir-raman-spectra-analysis'
description: '整理 FTIR 與 Raman 光譜的實用流程：直接載入、基線校正、平滑、多樣品疊圖、峰偵測、期刊樣式與高解析度輸出。'
keywords: ['FTIR Raman 光譜分析軟體', 'FTIR 作圖軟體 Windows', 'Raman spectrum plotting software', 'FTIR 基線校正', 'Raman 多組光譜疊圖', '光譜論文作圖']
author: 'Jerry Hu'
date: 2026-08-20
updated: 2026-08-20
category: 'guides'
tags: ['FTIR', 'Raman', '光譜學', '論文配圖']
locale: 'zh'
project: true
draft: false
---
## FTIR 與 Raman 資料最常卡在哪裡？

FTIR 與 Raman 儀器產生的檔案通常不難取得，真正耗時的地方往往是後續整理：不同樣品檔案格式不一致、基線漂移、雜訊太多、光譜方向不同、樣品曲線互相遮住，以及最後輸出時字體和解析度不符合論文要求。

如果只是畫一張曲線，Excel 或一般繪圖軟體或許足夠；但當你需要同時比較十幾個樣品、標出主要峰、統一顏色與線寬，或把 FTIR、Raman、XRD 與 UV-Vis 圖表維持同一種學術風格時，專門的光譜工具會更省時間。

**Spectra Studio** 是一個 Windows 桌面工具，除了 XRD，也支援 FTIR、Raman、UV-Vis 以及 DSC/TGA 資料的載入與圖譜整理。

![Spectra Studio 主畫面：載入多組量測曲線。](../spectra-studio-guide/scene_0_main.png)

## Spectra Studio 支援哪些 FTIR 與 Raman 檔案？

常見格式包括：

- **FTIR**：`.asc`
- **Raman**：`.txt`、`.xy`、`.csv`
- **通用光譜資料**：兩欄文字或 CSV 資料

FTIR 的 wavenumber 軸若是反向輸出，工具可以自動修正軸方向，讓不同儀器輸出的資料更容易放在同一個閱讀方向中。載入前仍建議確認第一欄是波數或 Raman shift，第二欄是吸光度、強度或儀器輸出的對應訊號。

![Spectra Studio 預處理畫面：平滑與基線校正後的光譜曲線。](../spectra-studio-guide/scene_3_preprocessed.png)

## FTIR、Raman 光譜整理的推薦流程

### Step 1：一次載入多組樣品

將同一批樣品檔案一次載入，讓 sample list 集中管理。多樣品比較時，先決定你要使用：

- **Overlay**：適合比較峰位偏移與相對形狀
- **Stack**：適合讓每條曲線保持分離
- **Vertical offset**：控制曲線之間的垂直間距
- **Normalize**：當你要比較相對峰形，而不是絕對訊號強度
- **Batch coloring**：依樣品組別快速配置顏色

這些選項比在 Excel 中逐一複製曲線、手動改顏色與輸入偏移量更不容易出錯。

### Step 2：先檢查軸與資料方向

FTIR 通常以 wavenumber（cm⁻¹）呈現，Raman 則常以 Raman shift（cm⁻¹）呈現。即使兩者單位看起來相同，物理意義與儀器輸出仍不一樣，因此圖軸標籤要寫清楚。

另外，部分 FTIR 圖習慣由高波數往低波數排列；若把多組資料疊在一起，必須確認每個檔案方向一致。Spectra Studio 會協助校正 FTIR 軸方向，但正式輸出前仍應檢查座標範圍與標籤。

### Step 3：進行適度 smoothing 與 baseline correction

Savitzky–Golay smoothing 適合降低高頻雜訊，同時盡量保留峰形；ALS baseline correction 則可處理背景漂移。實際參數要依資料取樣間距、峰寬與訊噪比設定。

平滑與基線校正要有節制。過大的 smoothing window 可能削弱窄峰，錯誤的 baseline 可能改變峰面積或讓弱峰消失。比較好的做法是同時保留原始曲線與處理後曲線，並在方法或圖說中記錄使用的處理方式。

### Step 4：用自動峰偵測找出候選峰

當樣品數量多、峰位大致已知時，自動峰偵測可以快速建立候選峰清單。工具會依據峰高與形狀找出訊號，再由你調整 sensitivity 並在圖上確認。

自動偵測適合當作起點，不等於完成峰指認。FTIR 或 Raman 峰的化學歸屬仍需根據材料、官能基、晶相、文獻與對照樣品判讀。Spectra Studio 的核心價值是把資料整理與圖表製作加速，而不是替代光譜學上的峰指認。

### Step 5：需要定量時再使用峰擬合

若兩個峰互相重疊，Pro 版可使用 Gaussian、Lorentzian 或 mixed profile 進行峰擬合，查看 peak position、FWHM、area、R² 與 residuals。這對比較熱處理前後的峰寬、相對峰面積或重疊訊號很有幫助。

峰擬合仍要以合理模型為前提，不要為了讓曲線貼得更緊就不斷增加峰數。正式報告時，最好保留原始資料、擬合曲線與殘差圖，並記錄峰形與背景設定。

### Step 6：套用統一的論文圖樣式

Spectra Studio 提供 Nature、ACS 與 Elsevier 風格，可快速建立一致的字體、線條與座標軸基礎。你可以再調整：

- 圖例位置
- 字體與字級
- 線寬與顏色
- tick direction 與長度
- 軸範圍與標題
- 疊圖或 stack 的樣品標示

如果同一篇論文同時放入 XRD、FTIR、Raman 與 UV-Vis，使用相近的版面規則，可以降低讀者切換圖表時的負擔。

![Spectra Studio 輸出面板：設定論文圖的輸出格式。](../spectra-studio-guide/scene_5_export.png)

## Free 版與 Pro 版的差別

想先完成一般 FTIR 或 Raman 圖表時，Free 版可以使用：

- 多種格式載入
- 多樣品 overlay、stack、normalize 與 vertical offset
- Savitzky–Golay smoothing
- ALS baseline correction
- 自動峰偵測
- Nature、ACS、Elsevier 樣式
- 無浮水印 PNG/JPG 輸出，最高 300 DPI

Pro 版則增加 Gaussian/Lorentzian/mixed peak fitting、R² 與 residuals、進階 XRD 分析、Tauc bandgap，以及 PDF、SVG、EPS、TIFF 等向量或高解析度輸出。

這種設計適合先用 Free 版確認檔案能否正常讀取與圖表流程，再依投稿格式或分析需求決定是否升級。兩個版本使用同一個安裝程式，買 key 後不需要重新下載。

## 為什麼選桌面工具，而不是線上光譜分析網站？

材料研究資料常包含尚未發表的樣品、製程條件與合作計畫。Spectra Studio 在本機處理資料，不需要把光譜上傳到線上服務；Free 版也不需要帳戶。對不方便使用雲端工具的實驗室，這是桌面工作流程的一個優點。

Windows 10/11 64-bit 安裝程式約 120 MB，不需要 Python 或額外 runtime。對直接在儀器電腦、實驗室共用電腦或沒有開發環境的研究者來說，安裝與開始使用都比較單純。

## 常見問題

### Spectra Studio 可以做 FTIR 峰指認嗎？

它可以協助載入、校正、偵測與擬合峰，並製作高品質圖表；實際的官能基或化學鍵指認仍需要由研究者根據材料與文獻判斷。

### FTIR 和 Raman 可以放在同一個圖嗎？

可以分別載入與整理，再依研究目的安排版面。但兩種技術的軸意義、訊號強度與量測條件不同，建議用 panel 或清楚標註區分，不要在沒有說明的情況下直接比較絕對強度。

### FTIR 資料可以做基線校正嗎？

可以。Spectra Studio 提供 ALS baseline correction，且每次調整都能即時預覽。請依資料特性設定參數，避免把真實寬峰誤當成背景。

### 有免費的 Raman spectrum plotting software 嗎？

Spectra Studio Free 版支援常見 `.txt`、`.xy`、`.csv` Raman 檔案，可進行多樣品疊圖、平滑、基線校正、峰偵測與 PNG/JPG 輸出。

## 結語：把光譜整理變成可重複的流程

FTIR 與 Raman 圖表真正需要的，不只是把資料畫出來，而是能穩定地管理多個樣品、記錄處理步驟、檢查峰形並以一致的格式輸出。Spectra Studio 將載入、smoothing、baseline correction、peak detection、journal styling 與 export 集中在同一個 Windows 工具中，適合想減少手動排版與環境設定時間的研究者。

👉 **免費開始整理 FTIR、Raman、XRD 與 UV-Vis 光譜：**
[前往 Spectra Studio 官方功能介紹](../spectra-studio-guide/)

