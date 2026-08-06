---
title: 'Spectra Studio: A Free Spectral Plotting Tool for XRD, FTIR, RAMAN & DSC'
slug: 'spectra-studio-guide-en'
description: 'A free spectral analysis and plotting tool for XRD, FTIR, RAMAN and DSC/TGA data — multi-format loading, peak fitting, phase matching and journal-ready figure export. Download and use the free edition now; Pro is built into the same installer and unlocks instantly with a key.'
keywords: ['XRD', 'FTIR', 'RAMAN', 'DSC', 'spectral analysis', 'plotting tool', 'peak fitting', 'phase matching', 'journal figures', 'Spectra Studio']
author: 'Jerry Hu'
date: 2026-08-07
cover: ./spectra-studio-gui.png
category: 'guides'
tags: ['Python', 'XRD', 'Spectroscopy', 'Data Visualization']
locale: 'en'

draft: false
project: true
---

In materials, chemistry and physics labs, plotting spectral data is a daily task that rarely gets the attention it deserves. The usual workarounds are: Excel (tedious formatting, inconsistent output quality), expensive commercial software (licenses cost hundreds to thousands of dollars), or hand-written Python scripts (rewritten from scratch every time). Spectra Studio was built for exactly this need: **free, ready to use in seconds, and designed to produce reproducible, journal-ready figures through a consistent workflow.**

![Screenshot: the Spectra Studio main window — sample list and tools on the left, live stacked-spectrum preview on the right](./spectra-studio-gui.png)

## Quick Start: What You Get in the Free Download

The installer you download is the complete application — **all Free-edition features work immediately**. Pro features are already built into the same installer; buy a key and they unlock instantly, with no re-download.

The Free edition ($0, forever, no watermarks) includes:

- **Data loading**: XRD (.txt / .xy / .csv / .dat), FTIR (.asc), RAMAN, DSC/TGA (Excel .xlsx / .xls)
- **Multi-sample management**: overlay, stack, normalize, vertical offset, batch coloring
- **Preprocessing**: Savitzky-Golay smoothing, ALS baseline correction
- **Peak analysis**: automatic peak detection
- **Journal styles**: one-click Nature / ACS / Elsevier, fine-tunable legend and ticks
- **Export**: PNG / JPG (up to 300 DPI), watermark-free, free to use in papers and reports

![Example: a journal-style multi-sample stacked figure exported directly from the tool](./spectra-studio-output.png)

## What the Tool Does

Spectra Studio loads common spectral data formats and provides live preview plus a complete analysis toolbox (★ = Pro feature):

- **Multi-format loading**: XRD (.txt / .xy / .csv / .dat), FTIR (.asc, with automatic wavenumber-axis correction), RAMAN and DSC/TGA (Excel .xlsx / .xls), and PDF# reference cards
- **Multi-sample management**: overlay, stack, normalize, vertical offset, batch coloring
- **Preprocessing**: Savitzky-Golay smoothing, ALS baseline correction
- **Peak analysis**: automatic peak detection; ★ peak fitting (Gaussian / Lorentzian with position, FWHM, area, R² and residuals)
- **Phase matching**: ★ compare sample peaks against PDF reference cards, annotate phases and Miller indices directly on the plot
- **Journal styles**: one-click Nature / ACS / Elsevier styles, Miller index annotation, legend placement, fonts, tick direction — all fine-tunable
- **High-resolution export**: PNG / JPG / TIFF / PDF / SVG / EPS; ★ vector formats (PDF / SVG / EPS / TIFF) and output above 300 DPI

## The Problems It Solves

Spectral plotting suffers from a few recurring pain points that Spectra Studio is designed to eliminate:

1. **Software cost**: Commercial tools (Jade, Match!, OriginPro) cost hundreds to thousands of dollars. Individual researchers often cannot afford them. The free edition covers all everyday plotting needs.
2. **Format drudgery**: Different instruments produce different file formats; manual cleanup is time-consuming and error-prone. The tool auto-detects format by extension and content — drop the file in and it plots.
3. **Repetitive work**: The same dataset often needs several versions (different styles, different ranges). Every setting previews live, so you adjust and export without redoing anything.
4. **Output quality**: Journals impose strict requirements on resolution, format and layout. Built-in journal styles and vector export produce submission-ready figures.

## Free vs. Pro

Spectra Studio comes in two editions only: **Free** and **Pro**. The free edition is a complete everyday tool — no time limits, no watermarks. Pro adds advanced analysis and vector export.

| | Free | Pro |
|---|---|---|
| Price | $0 (forever) | $79 (one-time) |
| Data loading & multi-sample management | ✅ | ✅ |
| Smoothing, baseline correction, peak detection | ✅ | ✅ |
| Journal styles & PNG/JPG export (≤300 DPI) | ✅ | ✅ |
| Peak fitting (with R² and residuals) | — | ✅ |
| Phase matching (PDF cards) & Miller indices | — | ✅ |
| Derivative / integral calculus | — | ✅ |
| Vector export (PDF / SVG / EPS / TIFF) & high DPI | — | ✅ |

**Pro is already complete**: every Pro feature is finished and built into the v2.0.0 installer — nothing extra to download. After purchase you receive a key (`SS-XXXX-...`), enter it under "🔑 Unlock Pro" in the app, and the features activate immediately.

- **One-time purchase**, permanent license (includes updates within the current major version)
- **30-day money-back guarantee**
- **Key store launching soon**: Pro keys will be sold through Gumroad — this page will link the buy button once it goes live

## Installation & Download

**System requirements**: Windows 10 or later (64-bit). No Python or dependencies needed.

Both options are identical in content — the full application including Pro features:

1. **Setup program** (recommended): [Download SpectraStudio-Setup-v2.0.0.exe (120 MB)](https://github.com/hujerry96/Web/releases/latest/download/SpectraStudio-Setup-v2.0.0.exe), double-click to install into the current user's directory (no administrator rights needed), with Start-menu shortcut and uninstaller.
2. **Portable build**: [Download SpectraStudio.exe (120 MB)](https://github.com/hujerry96/Web/releases/latest/download/SpectraStudio.exe) and double-click to run.

> ⚠️ **About the SmartScreen warning**: The software does not yet have a code-signing certificate. Windows may show a "Windows protected your PC" warning — click "More info" → "Run anyway" to continue. We plan to add signing as soon as revenue allows.

**SHA-256 checksums** (verify file integrity after download):

- Setup `SpectraStudio-Setup-v2.0.0.exe`: `c0ff2fd0a7c6db93f082d7abf583b5b559d1ec2b9e4eef26af0deace75555c48`
- Portable `SpectraStudio.exe`: `7710d08df4423cc69fd5627f349eddbde78fab862023979bcc7bb7eeca41303a`

Updates: the app silently checks for new versions on startup (prompt only, never forced).

## Privacy

All data is processed locally on your machine — **no data files are ever uploaded**. License verification is offline; only the version number is checked on startup. See the [privacy policy](/privacy.md) for details.

## FAQ

**Q: Is there a Mac or Linux version?**
Windows only for now; a macOS build is planned.

**Q: Can I use the free edition for published data?**
Yes. The free edition covers everyday plotting, exports have no watermarks, and figures can be used freely in papers and reports.

**Q: How do I activate Pro after buying?**
You receive a `SS-XXXX-...` key by email. Click "🔑 Unlock Pro" in the sidebar, paste the key, and the features unlock immediately — no reinstall needed.

**Q: Can I export peak-fitting results?**
Yes. The Pro edition reports each fitted peak's parameters plus residuals, ready for supplementary materials.

**Q: What if I switch computers?**
Licenses are bound offline. If you change machines, contact us with your machine code for a key reissue (keep your purchase receipt).
