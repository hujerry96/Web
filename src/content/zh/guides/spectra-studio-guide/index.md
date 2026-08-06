---
title: 'Spectra Studio 光譜分析繪圖工具：XRD / FTIR / RAMAN / DSC 一體化出圖'
slug: 'spectra-studio-guide'
description: '免費的光譜分析繪圖工具：支援 XRD、FTIR、RAMAN、DSC/TGA 數據載入、預處理、分峰擬合、相位比對與期刊級圖表匯出。下載安裝即可使用；Pro 功能已內建於同一安裝檔，金鑰立即解鎖。'
keywords: ['XRD', 'FTIR', 'RAMAN', 'DSC', '光譜分析', '繪圖工具', '分峰擬合', '相位比對', '期刊出圖', 'Spectra Studio']
author: 'Jerry Hu'
date: 2026-08-07
cover: ./spectra-studio-cover.png
category: 'guides'
tags: ['Python', 'XRD', '光譜', '資料視覺化']
locale: 'zh'

draft: false
project: true
---

在材料、化學與物理實驗室裡，光譜數據的「畫圖」是一項每天都會遇到、卻很少被認真對待的工作。常見的解法是：用 Excel 畫（格式調整費時、輸出品質不穩定）、用昂貴的商業軟體（授權費動輒數千美元）、或自己寫 Python 腳本（每次都要重寫一遍）。Spectra Studio 針對這個需求設計：**免費、開機即用，目標是以一致的流程產出可重複的期刊級圖表。**

![示意圖：Spectra Studio 主畫面，左側為樣品清單與工具列，右側為即時預覽的堆疊光譜圖](./spectra-studio-gui.png)

## 快速開始：下載免費版就有這些功能

下載安裝的這一份程式，就是完整版——**免費版功能全部立即可用**；Pro 功能也已經內建在同一個安裝檔裡，購買金鑰後立即解鎖，不需要重新下載任何東西。

免費版（$0，無限期、無浮水印）包含：

- **數據載入**：XRD（.txt / .xy / .csv / .dat）、FTIR（.asc）、RAMAN、DSC/TGA（Excel .xlsx / .xls）
- **多筆數據管理**：同時顯示、堆疊、歸一化、垂直偏移、批次上色
- **預處理**：Savitzky-Golay 平滑、ALS 基線校正
- **峰值分析**：自動尋峰
- **期刊繪圖樣式**：Nature / ACS / Elsevier 一鍵切換、圖例與刻度細調
- **匯出**：PNG / JPG（最高 300 DPI），無浮水印，可自由用於論文與報告

![示意圖：期刊樣式輸出的多樣品堆疊圖，可直接用於論文](./spectra-studio-output.png)

## 工具功能概述

Spectra Studio 讀入多種常見的光譜數據格式，提供即時預覽與一整套分析工具（★ 為 Pro 功能）：

- **多格式載入**：XRD（.txt / .xy / .csv / .dat）、FTIR（.asc，自動修正波數軸方向）、RAMAN 與 DSC/TGA（Excel .xlsx / .xls），以及 PDF# 標準卡片
- **多筆數據管理**：同時顯示、堆疊、歸一化、垂直偏移、批次上色
- **預處理**：Savitzky-Golay 平滑、ALS 基線校正
- **峰值分析**：自動尋峰；★ 分峰擬合（Gaussian / Lorentzian，輸出位置、半高寬、面積、R² 與殘差）
- **相位比對**：★ 樣品峰位對 PDF 標準卡比對，自動在峰上標註物相與 Miller 指數
- **期刊繪圖樣式**：Nature / ACS / Elsevier 一鍵切換，Miller 指數標註、圖例位置、字型、刻度方向均可細調
- **高解析度匯出**：PNG / JPG / TIFF / PDF / SVG / EPS；★ 向量格式（PDF / SVG / EPS / TIFF）與 300 DPI 以上輸出

## 所解決的問題

光譜數據繪圖存在幾個常見的痛點，而 Spectra Studio 的設計目標就是逐一消除它們：

1. **軟體成本**：商業分析軟體（如 Jade、Match!、OriginPro）授權費從數百到數千美元不等，個人研究者往往無法負擔。Spectra Studio 免費版涵蓋日常出圖的全部需求。
2. **格式調整的瑣碎**：不同的儀器產出不同格式的檔案，人工整理耗時且容易出錯。工具依副檔名與內容自動偵測格式，拖進來就能畫。
3. **重複操作**：同一組數據常常要畫好幾版（不同樣式、不同範圍）。所有設定即時預覽，改完即存，不必每次重來。
4. **輸出品質**：期刊投稿對圖檔解析度、格式與排版有要求。內建期刊樣式與多種向量格式匯出，可直接用於投稿。

## 免費版與 Pro 版

Spectra Studio 只有兩種版本：**免費版**與 **Pro 版**。免費版就是完整的日常工具，不會限時、不會浮水印；Pro 版補上進階分析與向量輸出。

| | 免費版 | Pro 版 |
|---|---|---|
| 價格 | $0（永久） | $79（一次買斷） |
| 數據載入與多筆管理 | ✅ | ✅ |
| 平滑、基線校正、自動尋峰 | ✅ | ✅ |
| 期刊樣式與 PNG/JPG 匯出（≤300 DPI） | ✅ | ✅ |
| 分峰擬合（含 R² 與殘差） | — | ✅ |
| 相位比對（PDF 卡片）與 Miller 指數 | — | ✅ |
| 微分 / 積分運算 | — | ✅ |
| 向量匯出（PDF / SVG / EPS / TIFF）與高 DPI | — | ✅ |

**Pro 版已經完成**：所有 Pro 功能都已開發完畢並內建在 v2.0.0 安裝檔中，不需要另外下載。購買 Pro 金鑰（一組 `SS-XXXX-...` 序號）後，在程式內「🔑 解鎖 Pro」輸入即可立即啟用。

- **一次買斷**，永久授權（包含目前 major 版本的更新）
- **30 天退款保證**
- **金鑰商店即將上線**：Pro 金鑰將透過 Gumroad 販售，上線後本頁會直接放上購買按鈕

## 安裝與下載

**系統需求**：Windows 10 以上（64 位元），免安裝 Python 或任何依賴套件。

兩種安裝方式（內容完全相同，都是含 Pro 功能的完整版）：

1. **安裝程式**（推薦）：[下載 SpectraStudio-Setup-v2.0.0.exe（120 MB）](https://github.com/hujerry96/Web/releases/latest/download/SpectraStudio-Setup-v2.0.0.exe)，雙擊執行，安裝至目前使用者目錄（不需管理員權限），並提供開始功能表捷徑與解除安裝程式。
2. **免安裝版**：[下載 SpectraStudio.exe（120 MB）](https://github.com/hujerry96/Web/releases/latest/download/SpectraStudio.exe)，雙擊即可執行。

> ⚠️ **SmartScreen 說明**：軟體目前尚未購買程式碼簽章憑證，Windows 可能顯示「Windows 已保護您的電腦」警告。點擊「更多資訊」→「仍要執行」即可繼續。我們會在累積足夠收入後盡快補上簽章。

**SHA-256 檢查碼**（下載後可自行驗證檔案完整性）：

- 安裝程式 `SpectraStudio-Setup-v2.0.0.exe`：`c0ff2fd0a7c6db93f082d7abf583b5b559d1ec2b9e4eef26af0deace75555c48`
- 免安裝版 `SpectraStudio.exe`：`7710d08df4423cc69fd5627f349eddbde78fab862023979bcc7bb7eeca41303a`

更新方式：軟體啟動時會自動檢查新版本（僅提示，不強制）。

## 隱私

所有數據都在您自己的電腦上處理，**不會上傳任何數據檔案**。授權驗證採離線方式，啟動時僅檢查版本編號。詳見[隱私權政策](/privacy.md)。

## 常見問題

**Q：支援 Mac 或 Linux 嗎？**
目前僅提供 Windows 版；macOS 版已在規劃中。

**Q：免費版可以拿來做論文數據嗎？**
可以。免費版涵蓋日常出圖需求，輸出無浮水印，可自由用於論文與報告。

**Q：Pro 版買了之後怎麼啟用？**
購買後會收到一組 `SS-XXXX-...` 金鑰，在程式左側欄點「🔑 解鎖 Pro」，貼上金鑰即可立即啟用，不需重新安裝。

**Q：分峰擬合的結果可以匯出嗎？**
可以。Pro 版擬合結果包含每個峰的參數表與殘差，可直接用於補充材料。

**Q：買了 Pro 版，換電腦怎麼辦？**
授權採離線綁定，換機時提供本機代碼即可補發金鑰（請保留購買證明）。
