---
title: 'XRD 晶粒尺寸怎麼算？Scherrer 方程與 Williamson–Hall 完整教學'
slug: 'xrd-scherrer-williamson-hall'
description: '用 XRD 峰寬計算晶粒尺寸，完整說明 Scherrer 方程、FWHM、單位換算與 Williamson–Hall plot，並介紹免 Python 的分析流程。'
keywords: ['XRD 晶粒尺寸計算', 'XRD Scherrer 方程怎麼算', 'Williamson–Hall plot 怎麼畫', 'XRD FWHM 晶粒尺寸', 'XRD 晶粒尺寸軟體', 'XRD 峰展寬', '微應變']
author: 'Jerry Hu'
date: 2026-08-20
updated: 2026-08-20
category: 'guides'
tags: ['XRD', '材料科學', '晶粒尺寸', '數據分析']
locale: 'zh'
project: true
draft: false
---
## XRD 晶粒尺寸怎麼算？先分清楚「晶粒」與「微晶」

在奈米材料、粉末材料、薄膜與催化材料研究中，XRD 常被用來估算材料的晶粒尺寸。不過，XRD 透過峰展寬得到的數值，嚴格來說是 **crystallite size，也就是微晶尺寸或相干繞射域尺寸**，不一定等於 SEM 影像中看到的單顆粒子尺寸。

如果一個顆粒由多個微晶組成，XRD 算出的尺寸可能小於 SEM 粒徑。這個區分在論文撰寫與回覆審稿意見時很重要。最常見的第一步分析，是使用 **Scherrer 方程**；如果還想區分晶粒尺寸與微應變，則可以進一步使用 **Williamson–Hall plot**。

![Spectra Studio 主畫面：載入並堆疊多組 XRD 圖譜。](../spectra-studio-guide/scene_0_main.png)

## Scherrer 方程式與所需參數

Scherrer 方程如下：

```text
D = Kλ / (β cos θ)
```

其中：

- `D`：微晶尺寸，通常以 nm 或 Å 表示
- `K`：形狀因子，常用約 0.9，但應依研究對象與文獻說明
- `λ`：X 光波長，例如 Cu Kα 常用 0.15406 nm
- `β`：扣除背景後的峰 FWHM，必須換算成弧度
- `θ`：Bragg angle，也就是圖上的 `2θ` 除以 2

最容易出錯的是兩個單位：**FWHM 必須使用弧度，而不是度數；波長與最後的 D 必須使用相同長度單位。** 如果直接把 0.42° 代入 β，結果可能錯上數十倍。

## 手算範例：由 2θ 與 FWHM 得到晶粒尺寸

假設 XRD 峰的資料如下：

- 峰位置：`2θ = 38.18°`
- FWHM：`0.42°`
- X 光源：Cu Kα，`λ = 1.5406 Å`
- 形狀因子：`K = 0.9`

### 1. 計算 Bragg angle

```text
θ = 38.18° / 2 = 19.09°
```

### 2. 將 FWHM 由度數換成弧度

```text
β = 0.42 × π / 180 = 0.00733 rad
```

### 3. 代入 Scherrer 方程

```text
D = (0.9 × 1.5406) / (0.00733 × cos 19.09°)
  ≈ 200.2 Å
  ≈ 20.0 nm
```

因此，這個範例的表觀微晶尺寸約為 **20.0 nm**。

實際研究通常會分析多個主要峰，再比較各峰的結果，而不是只挑一個峰就把它當成整個樣品的代表值。分析前也要確認峰沒有嚴重重疊，否則量到的 FWHM 可能是多個峰疊在一起的寬度。

![Spectra Studio 峰擬合畫面：顯示個別峰、擬合曲線與殘差。](../spectra-studio-guide/scene_2_fit_done.png)

## 為什麼只用 Scherrer 方程有時不夠？

XRD 峰變寬不只可能來自微晶尺寸，還可能受到以下因素影響：

1. **微應變（microstrain）**：晶格缺陷、摻雜、位錯或熱處理造成的非均勻晶格變形。
2. **儀器展寬（instrumental broadening）**：光源、狹縫、偵測器與光學系統本身造成的峰寬。
3. **峰重疊**：相鄰繞射峰沒有分開，導致 FWHM 被高估。
4. **背景與基線**：非晶背景或螢光背景若沒有處理，會影響峰面積與半高寬。

Scherrer 方程把主要展寬視為尺寸效應，因此適合作為快速估算，但不一定能單獨分離尺寸與應變效應。

![Spectra Studio 晶粒尺寸分析視窗與 Williamson–Hall plot。](../spectra-studio-guide/scene_7_grain_size.png)

## Williamson–Hall plot 怎麼畫？

Williamson–Hall 方法利用不同角度的峰對尺寸與應變有不同響應的特性。常見線性形式為：

```text
β cos θ = (Kλ / D) + 4ε sin θ
```

將 `β cos θ` 對 `4 sin θ` 作圖後：

- y 軸截距可用來估算微晶尺寸 `D`
- 斜率可用來估算微應變 `ε`
- 線性擬合的 `R²` 可協助判斷資料是否適合這個簡化模型

通常至少需要兩個峰，使用更多品質良好的峰會更有說服力。Williamson–Hall 不是自動消除所有誤差的萬用方法；儀器展寬校正、峰形選擇與峰寬測量方式仍然會影響結果。

## 用 Spectra Studio 省去手動量峰寬的步驟

如果你不想在 Excel、Origin 或 Python 腳本中逐峰量測，可以使用 **Spectra Studio** 建立較完整的 XRD 分析流程：

1. 直接載入 `.xrdml`、`.brml`、`.uxd`，或 `.txt`、`.xy`、`.csv`、`.dat` 檔案。
2. 先用 Savitzky–Golay smoothing 與 ALS baseline correction 預覽資料處理效果。
3. 使用可調靈敏度的自動峰偵測找出候選峰。
4. Pro 版可用 Gaussian、Lorentzian 或 mixed profile 進行峰擬合，取得位置、FWHM、面積、R² 與 residuals。
5. 在 Crystallite Size 功能中以 Scherrer 方程計算各峰的微晶尺寸。
6. 當有兩個以上的峰時，自動繪製 Williamson–Hall plot，並回報 `D`、`ε` 與 `R²`。

X 光波長與形狀因子都可以調整。需要注意的是，Spectra Studio 的一般計算並不會自動扣除儀器展寬；若你的樣品峰非常尖銳，應先用標準樣品校正，或在方法部分清楚說明限制。

Spectra Studio 是 Windows 10/11 64-bit 工具，資料在本機處理，不需要安裝 Python。Free 版可免費使用基本載入、平滑、基線校正、峰偵測與 PNG/JPG 輸出；Scherrer、Williamson–Hall、峰擬合與向量輸出則屬於 Pro 功能。

## 常見問題

### Scherrer 算出的晶粒尺寸等於 SEM 粒徑嗎？

不一定。Scherrer 方程估算的是相干繞射域尺寸，也常稱為 crystallite size；SEM 看到的粒子可能由多個微晶組成，因此兩者不同是正常的。

### FWHM 可以直接用度數代入嗎？

不可以。Scherrer 方程中的 β 通常要換算成弧度。這是 XRD 晶粒尺寸計算最常見的單位錯誤。

### Williamson–Hall 至少需要幾個峰？

兩個峰可以建立直線，但峰數越多且品質越好，尺寸與應變分離通常越有參考價值。不要為了增加點數而納入重疊或低信噪比峰。

### 有沒有不用 Python 的 XRD 晶粒尺寸軟體？

可以試用 Spectra Studio。它提供 Windows 免費版，並將峰偵測、峰擬合、Scherrer 與 Williamson–Hall 分析放在同一個工作流程中。

## 結語：先確認峰寬品質，再相信計算結果

XRD 晶粒尺寸計算的難點通常不是把公式輸入計算機，而是取得可信的峰位置與 FWHM，並確認儀器展寬、微應變、基線與峰重疊沒有主導結果。若只是快速估算，Scherrer 方程很實用；若要討論尺寸與應變的差異，則可進一步檢查 Williamson–Hall plot。

👉 **下載 Spectra Studio，免費開始處理 XRD 資料：**
[前往 Spectra Studio 官方功能介紹](../spectra-studio-guide/)

