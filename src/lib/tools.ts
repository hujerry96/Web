// 全站工具/軟體資料（首頁 Software 區與 /tools 頁共用，DRY）
export interface Tool {
  name: string;
  tag: string;
  desc: string;
  points: string[];
  repo: string;
  lang: string;
  guide: string;
  featured?: boolean;
}

export function getTools(locale: 'zh' | 'en'): Tool[] {
  if (locale === 'zh') {
    return [
      {
        name: 'Spectra Studio — 光譜繪圖與 XRD 分析',
        tag: 'Spectra Studio',
        desc: '免費的光譜繪圖與 XRD 分析工具：載入 XRD / FTIR / RAMAN / UV-Vis / DSC 數據，平滑、基線校正、自動尋峰、分峰擬合、晶粒尺寸、Tauc 能隙與相位比對，輸出期刊級圖表。',
        points: [
          '多格式載入（.xrdml / .brml / .uxd / .txt / .csv）',
          '自動尋峰與多峰擬合（含 R² 與殘差）',
          '晶粒尺寸（Scherrer / Williamson-Hall）、Tauc 能隙（Pro）',
          '期刊樣式與向量輸出（最高 600 DPI）',
        ],
        repo: '',
        lang: 'English / 中文',
        guide: '/zh/guides/spectra-studio-guide',
        featured: true,
      },
      {
        name: 'SEM 粒徑分析工具',
        tag: 'Particle Analyzer',
        desc: '從 SEM 影像自動量測顆粒與孔洞的粒徑分布，支援 Watershed 與 Hough 圓形偵測雙演算法，可直接校正比例尺並匯出統計報表。',
        points: [
          'Watershed 分割重疊顆粒',
          'Hough 圓形偵測圓形顆粒',
          '互動校正 SEM 比例尺',
          '匯出 CSV / 統計 / 分布圖',
        ],
        repo: 'https://github.com/hujerry96/particle-analyzer',
        lang: '中文 / English',
        guide: '/zh/guides/particle-analyzer-guide',
      },
      {
        name: '論文格式修正工具',
        tag: 'Thesis Formatter',
        desc: '一鍵修正 Word 碩博士論文格式：頁碼、圖表編號、標題階層、參考文獻與封面，規則以 YAML 設定，GUI 拖檔即用。',
        points: [
          '頁碼羅馬/阿拉伯自動切換',
          '圖表編號與標題統一',
          '標題階層與縮排修正',
          '參考文獻交叉參照',
        ],
        repo: 'https://github.com/hujerry96/thesis-formatter',
        lang: '中文 / English',
        guide: '/zh/guides/thesis-formatter-guide',
      },
    ];
  }
  return [
    {
      name: 'Spectra Studio — Spectral Plotting & XRD Analysis',
      tag: 'Spectra Studio',
      desc: 'Free spectral plotting and XRD analysis for XRD, FTIR, RAMAN, UV-Vis & DSC — load, clean, fit, and export journal-ready figures in minutes.',
      points: [
        'Multi-format loading (.xrdml / .brml / .uxd / .txt / .csv)',
        'Auto peak finding & multi-peak fitting (R² / residuals)',
        'Crystallite size (Scherrer / Williamson-Hall), Tauc bandgap (Pro)',
        'Journal styles & vector export (up to 600 DPI)',
      ],
      repo: '',
      lang: 'English / 中文',
      guide: '/en/guides/spectra-studio-guide-en',
      featured: true,
    },
    {
      name: 'SEM Particle Analyzer',
      tag: 'Particle Analyzer',
      desc: 'Measure particle and pore size distributions from SEM images automatically. Two algorithms (Watershed and Hough Circle), interactive scale calibration, and exportable statistics.',
      points: [
        'Watershed for overlapping particles',
        'Hough Circle for round particles',
        'Interactive SEM scale-bar calibration',
        'Export CSV / stats / distribution plot',
      ],
      repo: 'https://github.com/hujerry96/particle-analyzer',
      lang: '中文 / English',
      guide: '/en/guides/particle-analyzer-guide-en',
    },
    {
      name: 'Thesis Format Fixer',
      tag: 'Thesis Formatter',
      desc: 'One-click fix for Word thesis formatting: page numbers, figure/table numbering, heading levels, references, and cover. Rules live in YAML, and the GUI takes a drag-and-drop file.',
      points: [
        'Auto Roman/Arabic page numbers',
        'Unified figure & table numbering',
        'Heading levels and indents',
        'Reference cross-references',
      ],
      repo: 'https://github.com/hujerry96/thesis-formatter',
      lang: '中文 / English',
      guide: '/en/guides/thesis-formatter-guide-en',
    },
  ];
}
