const sharp = require('sharp');
const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
<rect width='1200' height='630' fill='#f5f4ed'/>
<rect x='0' y='0' width='1200' height='14' fill='#9c3b2e'/>
<text x='80' y='250' font-family='Georgia, serif' font-size='34' fill='#9c3b2e' letter-spacing='6'>AI 工具 · PYTHON 教學 · 科技評測 · KDP 資源</text>
<text x='80' y='370' font-family='Georgia, serif' font-size='110' font-weight='500' fill='#1c1917'>Hu Lab</text>
<text x='80' y='450' font-family='Georgia, serif' font-size='40' fill='#504e49'>胡杰瑞 · Jerry Hu</text>
<text x='80' y='560' font-family='Georgia, serif' font-size='30' fill='#6b6a64'>實測、教學與評測 — 長期累積有用的知識</text>
</svg>`;
sharp(Buffer.from(svg)).png().toFile('public/images/og-default.png', (e) => {
  if (e) throw e;
  console.log('og-default.png created');
});
