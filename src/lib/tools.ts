// 全站工具/軟體資料（首頁 Software 區與 /tools 頁共用，DRY）
export interface Tool {
  name: string;
  tag: string;
  desc: string;
  points: string[];
  repo: string;
  lang: string;
  guide: string;
  landing?: string;
  featured?: boolean;
}

export function getTools(locale: 'zh' | 'en'): Tool[] {
  if (locale === 'zh') {
    return [
      {
        name: 'Spectra Studio 光譜繪圖與 XRD 分析',
        tag: 'Spectra Studio',
        desc: '免費 Windows 光譜繪圖工具，在本機整理 XRD、FTIR、Raman 與 UV-Vis 數據，輸出期刊樣式圖表。需要分峰擬合與進階分析時，再升級 Pro。',
        points: [
          '載入 XRDML、雙欄 UXD、XY 與常見文字格式',
          'Free：平滑、基線、自動尋峰與多樣品堆疊',
          'Free：期刊樣式，PNG / JPG 最高 300 DPI',
          'Pro：峰擬合、晶粒尺寸、Tauc 能隙與向量匯出',
        ],
        repo: 'https://github.com/hujerry96/Web/releases',
        lang: 'English / 中文',
        guide: '/zh/guides/spectra-studio-guide',
        landing: '/zh/spectra-studio',
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
      name: 'Spectra Studio Spectral Plotting & XRD Analysis',
      tag: 'Spectra Studio',
      desc: 'Free Windows spectral plotting for XRD, FTIR, Raman, and UV-Vis. Prepare data locally and export journal-style figures. Upgrade to Pro for peak fitting and advanced analysis.',
      points: [
        'Load XRDML, two-column UXD, XY, and text formats',
        'Free: smoothing, baseline, peak detection, and stacking',
        'Free: journal styles and PNG / JPG up to 300 DPI',
        'Pro: peak fitting, crystallite size, Tauc, and vector export',
      ],
      repo: 'https://github.com/hujerry96/Web/releases',
      lang: 'English / 中文',
      guide: '/en/guides/spectra-studio-guide-en',
      landing: '/en/spectra-studio',
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
