---
title: 'XRD 峰擬合怎麼做？Gaussian、Lorentzian 與 FWHM 分析完整指南'
slug: 'xrd-peak-fitting'
description: '了解 XRD 峰擬合、Gaussian/Lorentzian 峰形、FWHM、R² 與 residuals，並用 Spectra Studio 快速分析重疊峰與輸出論文圖。'
keywords: ['XRD 峰擬合', 'XRD peak fitting software', 'XRD Gaussian Lorentzian fitting', 'XRD FWHM 怎麼量', 'XRD 重疊峰分析軟體', '峰形擬合', 'XRD 殘差']
author: 'Jerry Hu'
date: 2026-08-20
updated: 2026-08-20
category: 'guides'
tags: ['XRD', '峰擬合', '材料科學', '數據分析']
locale: 'zh'
project: true
draft: false
---
## 為什麼 XRD 不能只用滑鼠讀取最高點？

XRD 圖譜中的峰位置、峰高、峰面積與半高寬，往往會被用來討論晶相、結晶性、微晶尺寸與材料處理前後的差異。但當兩個峰彼此靠近、背景不平，或樣品峰形不對稱時，直接用游標讀取最高點與寬度，結果很容易受到主觀判斷影響。

這就是 **XRD peak fitting（XRD 峰擬合）** 的用途：用數學峰形描述實驗資料，將重疊峰拆開，並回報每一個峰的中心位置、FWHM、面積與擬合品質。對需要把數值放進論文結果表或 supplementary materials 的研究者來說，峰擬合通常比手動量測更容易重複。

![使用資料夾中的範例資料製作的期刊風格 XRD 圖。](../spectra-studio-guide/examples/xrd-overview.png)

## Gaussian、Lorentzian 與 mixed profile 有什麼差別？

常見的 XRD 峰形包括 Gaussian 與 Lorentzian。簡單來說：

- **Gaussian profile**：峰形由中心向兩側平滑下降，常用來描述許多統計性展寬來源。
- **Lorentzian profile**：峰尾通常比 Gaussian 更長，在某些尺寸或物理展寬模型中常見。
- **Mixed profile**：以兩者的組合描述實際峰形，適合單一理想峰形無法充分表達的資料。

沒有任何一種峰形可以對所有材料與儀器資料一律適用。選擇模型時，應該結合儀器設定、研究領域常用方法、峰形殘差與擬合穩定性，而不是只挑讓 R² 最高的模型。

![Gaussian 峰擬合結果，顯示個別峰、擬合曲線與 residuals。](../spectra-studio-guide/examples/gaussian-peak-fitting.png)

## XRD 峰擬合通常會得到哪些結果？

一個完整的峰擬合結果至少應該包含：

1. **Peak position**：峰中心位置，例如 2θ。
2. **FWHM**：半高寬，可用於比較展寬，或進一步帶入 Scherrer 方程。
3. **Peak area**：峰面積，可用於比較相對訊號或在特定模型下估算結晶性。
4. **R²**：擬合解釋資料變異的指標之一。
5. **Residuals**：原始資料與擬合曲線之間的差異。

R² 很高不代表模型一定正確。建議同時觀察原始曲線、總擬合曲線、各個個別峰，以及 residuals 是否在峰頂、峰尾或背景處呈現系統性偏差。若殘差明顯呈現規律波形，可能代表峰形、背景或峰數設定仍不合適。

## 實際操作流程：從重疊峰到可用的結果表

### 第一步：先載入原始 XRD 檔案

保留原始資料副本，再載入 `.xrdml`、`.brml`、`.uxd` 或一般的 `.txt`、`.xy`、`.csv`、`.dat` 檔案。PANalytical 與 Bruker 的檔案可直接讀取，減少先轉檔再分析時遺失資訊的機會。

### 第二步：處理背景，但不要過度平滑

如果背景明顯傾斜或有螢光背景，可以先使用 baseline correction。若資料雜訊較大，可先以 Savitzky–Golay smoothing 預覽效果，但必須確認 smoothing 沒有把窄峰削平、讓峰變寬或製造假峰。

一個好的原則是：**處理後的曲線用於幫助偵測與擬合，原始資料仍應保留，並在論文方法中說明處理參數。**

### 第三步：自動偵測候選峰

先用高度與形狀為基礎的自動峰偵測找出候選峰，再調整 sensitivity。偵測結果應回到圖上檢查：真正的峰是否被找到？背景起伏是否被誤判？兩個重疊峰是否需要拆分？

### 第四步：選擇峰形並進行擬合

在 Spectra Studio 的 Pro 峰擬合功能中，可使用 Gaussian、Lorentzian 或 mixed profiles。自動偵測到的峰會提供初始值，接著由擬合程序調整峰位置、寬度與強度，並顯示總曲線、個別峰與 residuals。

### 第五步：檢查結果，而不是只看一個數字

確認以下幾點：

- 個別峰是否落在合理的 2θ 位置？
- 擬合曲線是否跟上峰頂與峰尾？
- residuals 是否在某一側持續偏高或偏低？
- 峰數是否過少，導致重疊峰被錯誤合併？
- 峰數是否過多，變成沒有物理意義的 overfitting？
- FWHM 是否受到儀器展寬或背景處理影響？

完成後，結果表會列出 position、FWHM、area、R² 與 residuals，可整理到論文或補充資料中。

![AlN XRD 峰部放大圖，可用來檢查定量分析前的峰寬。](../spectra-studio-guide/examples/xrd-peak-width.png)

## 峰擬合與晶粒尺寸計算的關係

XRD 峰擬合不只是為了讓圖看起來漂亮。對重疊峰而言，先把各峰分開，才能得到較合理的單峰 FWHM，再進行 Scherrer 或 Williamson–Hall 分析。

但要注意，峰擬合得到的是模型下的峰寬，不代表所有展寬都來自微晶尺寸。若要報告晶粒尺寸，仍需說明使用的形狀因子、X 光波長，以及是否進行儀器展寬校正。若峰形選擇或基線設定改變，計算出的尺寸也可能改變。

## 用 Spectra Studio 做 XRD 峰擬合的優點

許多研究者會在 Origin 中手動設定多個峰，或用 Python 建立 scipy、lmfit 與 matplotlib 的分析腳本。這些方法都很有彈性，但也需要處理環境安裝、初始值、檔案格式與繪圖樣式。

Spectra Studio 適合想快速完成常見 XRD 工作流程的人：

- 不必安裝 Python 或額外依賴套件
- 可直接讀取多種儀器與通用格式
- 自動偵測結果可作為峰擬合初始值
- Gaussian、Lorentzian 與 mixed profile 集中在同一個介面
- 一次查看個別峰、總擬合曲線與 residuals
- Pro 可進一步做 Scherrer、Williamson–Hall、phase matching 與 Miller index 標註
- Nature、ACS、Elsevier 樣式可一鍵切換，再微調字體、線寬、座標軸與圖例

Free 版可以先完成載入、平滑、基線校正、峰偵測與 PNG/JPG 圖片輸出；峰擬合與進階定量分析則由 Pro 解鎖。資料在本機處理，不需要建立帳戶，也不會把光譜上傳到雲端。

## 常見問題

### XRD 峰擬合一定要用 Gaussian 嗎？

不一定。Gaussian、Lorentzian 或 mixed profile 各有適用情境，應根據材料、儀器與殘差表現選擇。不要因為某一種峰形常見，就直接套用到所有樣品。

### R² 越高，結果就越可信嗎？

不一定。R² 應與 residuals、峰形、峰數及材料物理意義一起判斷。過度增加峰數可能讓 R² 變高，卻造成 overfitting。

### 重疊峰可以直接用 FWHM 嗎？

若重疊嚴重，直接量整個包絡峰的 FWHM 可能高估峰寬。更好的做法是先以合理的多峰模型擬合，再檢查每個單峰的結果。

### 有免費的 XRD peak fitting software 嗎？

Spectra Studio 提供 Windows Free 版，基本圖譜處理與峰偵測不需要付費；Pro 版則增加 Gaussian/Lorentzian/mixed 峰擬合與進階分析功能。

## 結語

XRD 峰擬合的價值不只是把曲線畫得更平滑，而是讓重疊峰、FWHM、峰面積與擬合品質變成可檢查、可重複的分析結果。只要保留原始資料、合理設定背景與峰形，並同時查看 residuals，峰擬合就能成為從原始 XRD 檔案走向論文數據表的重要一步。

👉 **試用 Spectra Studio：不用 Origin 或 Python，先免費開始整理你的 XRD 圖譜。**
[查看 Spectra Studio 完整功能](../spectra-studio-guide/)

