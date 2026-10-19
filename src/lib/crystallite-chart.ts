export interface ChartData {
  title: string; subtitle: string; settings: string; meanLabel: string; mean: number;
  notes: string[];
  peaks: { label: string; twoTheta: number; size: number }[];
}
export interface ChartOptions {
  type: 'scatter' | 'bar'; color: string; axisColor: string; background: string; meanColor: string;
  frame: 'box' | 'axes' | 'none'; lineWidth: number;
  tickDirection: 'in' | 'out' | 'both'; majorTicks: boolean; minorTicks: boolean; grid: boolean;
  marker: 'circle' | 'square' | 'triangle' | 'diamond'; markerSize: number; barWidth: number;
  font: 'Arial' | 'Times New Roman' | 'Helvetica'; fontSize: number;
  widthMm: number; heightMm: number; pngWidth: number;
  title: string; xLabel: string; yLabel: string;
  meanLine: boolean; legend: boolean; labels: boolean;
  xMin?: number; xMax?: number; yMin?: number; yMax?: number; xStep?: number; yStep?: number;
}
export const DEFAULT_CHART_OPTIONS: ChartOptions = {
  type: 'scatter', color: '#0072b2', axisColor: '#111111', background: '#ffffff', meanColor: '#111111',
  frame: 'box', lineWidth: 0.8, tickDirection: 'in', majorTicks: true, minorTicks: true, grid: false,
  marker: 'circle', markerSize: 6, barWidth: 0.65, font: 'Arial', fontSize: 9,
  widthMm: 180, heightMm: 120, pngWidth: 4252, title: '', xLabel: '', yLabel: '',
  meanLine: true, legend: true, labels: true,
};
export class ChartSettingsError extends Error {}
const escape = (v: string) => v.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const format = (v: number) => v === 0 ? '0' : v >= 0.01 && v < 10000 ? Number(v.toPrecision(4)).toString() : v.toExponential(2);
function niceStep(span: number) {
  const raw = Math.max(Number.MIN_VALUE, span / 5);
  const magnitude = Math.max(Number.MIN_VALUE, 10 ** Math.floor(Math.log10(raw)));
  const fraction = raw / magnitude;
  return (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10) * magnitude;
}
function ticks(min: number, max: number, step: number): number[] {
  if ((max - min) / step > 100) throw new ChartSettingsError('density');
  const values: number[] = [];
  for (let i = 0; i <= 101; i++) {
    const value = min + i * step;
    if (!Number.isFinite(value) || value > max + step * 1e-8) break;
    values.push(value);
  }
  return values;
}
export function validateChartOptions(o: ChartOptions) {
  for (const key of ['color', 'axisColor', 'background', 'meanColor'] as const) if (!/^#[0-9a-f]{6}$/i.test(o[key])) throw new ChartSettingsError('color');
  const ranges: [number, number, number][] = [[o.widthMm, 90, 240], [o.heightMm, 60, 240], [o.fontSize, 6, 16], [o.lineWidth, 0.25, 3], [o.markerSize, 2, 14], [o.barWidth, 0.1, 0.95], [o.pngWidth, 1200, 6000]];
  if (ranges.some(([v, min, max]) => !Number.isFinite(v) || v < min || v > max)) throw new ChartSettingsError('number');
  for (const key of ['xMin', 'xMax', 'yMin', 'yMax', 'xStep', 'yStep'] as const) if (o[key] !== undefined && !Number.isFinite(o[key])) throw new ChartSettingsError('range');
  if ((o.xMin !== undefined && (o.xMin < 0 || o.xMin >= 180)) || (o.xMax !== undefined && (o.xMax <= 0 || o.xMax > 180)) || (o.yMin !== undefined && o.yMin < 0) || (o.yMax !== undefined && o.yMax <= 0)) throw new ChartSettingsError('range');
  if ((o.xStep !== undefined && o.xStep <= 0) || (o.yStep !== undefined && o.yStep <= 0)) throw new ChartSettingsError('step');
  for (const [value, allowed] of [[o.type, ['scatter', 'bar']], [o.frame, ['box', 'axes', 'none']], [o.tickDirection, ['in', 'out', 'both']], [o.marker, ['circle', 'square', 'triangle', 'diamond']], [o.font, ['Arial', 'Times New Roman', 'Helvetica']]] as const) if (!(allowed as readonly string[]).includes(value)) throw new ChartSettingsError('number');
}

/** Same vector renderer for live preview and exports; physical fonts are in pt. */
export function createSizeChart(data: ChartData, options: Partial<ChartOptions> = {}): { svg: string; width: number; height: number; clipped: number } {
  const o = { ...DEFAULT_CHART_OPTIONS, ...options }; validateChartOptions(o);
  if (!data.peaks.length || !Number.isFinite(data.mean) || data.mean <= 0 || data.peaks.some(p => !Number.isFinite(p.twoTheta) || p.twoTheta <= 0 || p.twoTheta >= 180 || !Number.isFinite(p.size) || p.size <= 0)) throw new Error('Invalid chart data');
  if (o.type === 'bar' && o.yMin !== undefined && o.yMin !== 0) throw new ChartSettingsError('barBaseline');
  const width = 900; const height = width * o.heightMm / o.widthMm;
  const pt = 25.4 / 72 * width / o.widthMm;
  const fs = o.fontSize * pt; const stroke = o.lineWidth * pt;
  const left = Math.max(100, fs * 6.8); const right = width - Math.max(35, fs * 2.5);
  const top = Math.max(80, fs * 5 + (o.title ? fs * 1.8 : 0));
  const bottom = height - Math.max(90, fs * 6);
  if (bottom - top < 100 || right - left < 250) throw new ChartSettingsError('layout');
  const plotWidth = right - left; const plotHeight = bottom - top;
  const angles = data.peaks.map(p => p.twoTheta); const minAngle = Math.min(...angles); const maxAngle = Math.max(...angles);
  const padding = Math.max((maxAngle - minAngle) * 0.12, 2);
  const xAutoStep = niceStep(maxAngle - minAngle + padding * 2);
  const xMin = o.type === 'bar' ? -0.5 : o.xMin ?? Math.max(0, Math.floor((minAngle - padding) / xAutoStep) * xAutoStep);
  const xMax = o.type === 'bar' ? data.peaks.length - 0.5 : o.xMax ?? Math.min(180, Math.ceil((maxAngle + padding) / xAutoStep) * xAutoStep);
  const maxSize = Math.max(...data.peaks.map(p => p.size));
  const yTarget = Number.isFinite(maxSize * 1.12) ? maxSize * 1.12 : Number.MAX_VALUE;
  const autoYStep = niceStep(yTarget); const roundedMax = Math.ceil(yTarget / autoYStep) * autoYStep;
  const yMin = o.yMin ?? 0; const yMax = o.yMax ?? (Number.isFinite(roundedMax) ? roundedMax : Number.MAX_VALUE);
  if (xMin >= xMax || yMin >= yMax) throw new ChartSettingsError('range');
  const xStep = o.xStep ?? niceStep(xMax - xMin); const yStep = o.yStep ?? niceStep(yMax - yMin);
  const xTicks = o.type === 'bar' ? [] : ticks(xMin, xMax, xStep);
  const yTicks = ticks(yMin, yMax, yStep);
  const x = (v: number) => left + (v - xMin) / (xMax - xMin) * plotWidth;
  const y = (v: number) => bottom - (v - yMin) / (yMax - yMin) * plotHeight;
  const text = (px: number, py: number, v: string, extra = '') => `<text x="${px}" y="${py}" ${extra}>${escape(v)}</text>`;
  const line = (x1: number, y1: number, x2: number, y2: number, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.axisColor}" stroke-width="${stroke}" ${extra}/>`;
  const marker = (px: number, py: number, title: string, index?: number) => {
    const r = o.markerSize * pt / 2; const attr = `fill="${o.color}" stroke="${o.axisColor}" stroke-width="${stroke / 2}"${index === undefined ? '' : ` data-peak="${index + 1}"`}`;
    const child = `<title>${escape(title)}</title>`;
    if (o.marker === 'square') return `<rect x="${px - r}" y="${py - r}" width="${r * 2}" height="${r * 2}" ${attr}>${child}</rect>`;
    if (o.marker === 'triangle') return `<polygon points="${px},${py - r} ${px - r},${py + r} ${px + r},${py + r}" ${attr}>${child}</polygon>`;
    if (o.marker === 'diamond') return `<polygon points="${px},${py - r} ${px - r},${py} ${px},${py + r} ${px + r},${py}" ${attr}>${child}</polygon>`;
    return `<circle${index === undefined ? '' : ` data-peak="${index + 1}"`} cx="${px}" cy="${py}" r="${r}" fill="${o.color}" stroke="${o.axisColor}" stroke-width="${stroke / 2}">${child}</circle>`;
  };
  const clipped = data.peaks.filter(p => p.size < yMin || p.size > yMax || (o.type === 'scatter' && (p.twoTheta < xMin || p.twoTheta > xMax))).length;
  const fragments = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${o.widthMm}mm" height="${o.heightMm}mm" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(data.title)}">`,
    `<title>${escape(data.title)}</title><desc>${escape(`${data.subtitle}. ${data.settings}. ${data.meanLabel}: ${format(data.mean)} nm. ${data.notes.join(' ')}. Plot type: ${o.type}; clipped peaks: ${clipped}; options: ${JSON.stringify(o)}. ${data.peaks.map(p => `${p.label}: 2θ=${p.twoTheta}°, D=${p.size} nm`).join('; ')}`)}</desc>`,
    `<defs><clipPath id="plot-area"><rect x="${left}" y="${top}" width="${plotWidth}" height="${plotHeight}"/></clipPath></defs>`,
    `<rect width="100%" height="100%" fill="${o.background}"/>`,
    `<g font-family="${escape(o.font)}, Noto Sans TC, serif" font-size="${fs}" fill="${o.axisColor}">`,
    text(left, fs * 1.4, data.settings, `font-size="${fs * 0.8}"`),
  ];
  if (o.title) fragments.push(text((left + right) / 2, top - fs * 2.9, o.title, `text-anchor="middle" font-size="${fs * 1.2}"`));
  if (o.legend) {
    const legendY = top - fs * 1.8;
    fragments.push(o.type === 'scatter' ? marker(left + 5, legendY - fs * 0.3, '') : `<rect x="${left}" y="${legendY - fs * 0.7}" width="12" height="10" fill="${o.color}"/>`);
    fragments.push(text(left + 20, legendY, 'Scherrer estimates', `font-size="${fs * 0.92}"`));
    if (o.meanLine) fragments.push(`<line x1="${left + plotWidth * 0.38}" y1="${legendY - fs * 0.3}" x2="${left + plotWidth * 0.43}" y2="${legendY - fs * 0.3}" stroke="${o.meanColor}" stroke-width="${stroke}" stroke-dasharray="7 5"/>`, text(left + plotWidth * 0.45, legendY, `Mean = ${format(data.mean)} nm`, `font-size="${fs * 0.92}"`));
    fragments.push(text(right, legendY, `n = ${data.peaks.length}`, `text-anchor="end" font-size="${fs * 0.92}"`));
  }
  if (o.grid) {
    yTicks.forEach(v => fragments.push(line(left, y(v), right, y(v), 'opacity="0.15"')));
    xTicks.forEach(v => fragments.push(line(x(v), top, x(v), bottom, 'opacity="0.15"')));
  }
  if (o.frame === 'box') fragments.push(`<rect x="${left}" y="${top}" width="${plotWidth}" height="${plotHeight}" fill="none" stroke="${o.axisColor}" stroke-width="${stroke}"/>`);
  if (o.frame === 'axes') fragments.push(line(left, top, left, bottom), line(left, bottom, right, bottom));
  const tick = (pos: number, horizontal: boolean, minor = false) => {
    const length = fs * (minor ? 0.25 : 0.45);
    const inward = o.tickDirection === 'out' ? 0 : length; const outward = o.tickDirection === 'in' ? 0 : length;
    if (horizontal) return line(pos, bottom - inward, pos, bottom + outward) + (o.frame === 'box' ? line(pos, top - outward, pos, top + inward) : '');
    return line(left - outward, pos, left + inward, pos) + (o.frame === 'box' ? line(right - inward, pos, right + outward, pos) : '');
  };
  xTicks.forEach(v => { const px = x(v); if (o.majorTicks) fragments.push(tick(px, true)); fragments.push(text(px, bottom + fs * 1.8, format(v), 'text-anchor="middle"')); });
  yTicks.forEach(v => { const py = y(v); if (o.majorTicks) fragments.push(tick(py, false)); fragments.push(text(left - fs * 0.9, py + fs * 0.32, format(v), 'text-anchor="end"')); });
  if (o.minorTicks) {
    xTicks.forEach(v => { const middle = v + xStep / 2; if (middle < xMax) fragments.push(tick(x(middle), true, true)); });
    yTicks.forEach(v => { const middle = v + yStep / 2; if (middle < yMax) fragments.push(tick(y(middle), false, true)); });
  }
  if (o.type === 'bar') {
    const stride = Math.max(1, Math.ceil(data.peaks.length / 12));
    data.peaks.forEach((p, i) => { if (i % stride) return; const px = x(i); if (o.majorTicks) fragments.push(tick(px, true)); const short = Array.from(p.label).slice(0, 12).join(''); fragments.push(text(px, bottom + fs * 1.8, short, `text-anchor="end" font-size="${fs * 0.85}" transform="rotate(-35 ${px} ${bottom + fs * 1.8})"`)); });
  }
  fragments.push('<g clip-path="url(#plot-area)">');
  data.peaks.forEach((p, i) => {
    const px = x(o.type === 'bar' ? i : p.twoTheta); const py = y(p.size);
    const title = `${p.label}; 2θ = ${p.twoTheta}°; D = ${format(p.size)} nm`;
    if (o.type === 'scatter') fragments.push(marker(px, py, title, i));
    else { const bw = plotWidth / data.peaks.length * o.barWidth; fragments.push(`<rect data-peak="${i + 1}" x="${px - bw / 2}" y="${py}" width="${bw}" height="${Math.max(0, bottom - py)}" fill="${o.color}" stroke="${o.axisColor}" stroke-width="${stroke / 2}"><title>${escape(title)}</title></rect>`); }
  });
  if (o.meanLine) fragments.push(`<line x1="${left}" y1="${y(data.mean)}" x2="${right}" y2="${y(data.mean)}" stroke="${o.meanColor}" stroke-width="${stroke}" stroke-dasharray="7 5"/>`);
  const occupied: { x: number; y: number; width: number }[] = [];
  if (o.labels && data.peaks.length <= 12) data.peaks.forEach((p, i) => {
    const px = x(o.type === 'bar' ? i : p.twoTheta); const py = y(p.size);
    if (px < left || px > right || py < top || py > bottom) return;
    const label = o.type === 'bar' ? format(p.size) : Array.from(p.label).slice(0, 18).join('');
    const labelWidth = Array.from(label).reduce((sum, ch) => sum + (ch.codePointAt(0)! > 255 ? fs * 0.85 : fs * 0.47), 0);
    const lx = Math.min(px + fs * 0.6, right - labelWidth - 8); const ly = Math.max(top + fs, py - fs * 0.8);
    if (occupied.some(b => Math.abs(b.y - ly) < fs * 1.25 && lx < b.x + b.width + 8 && lx + labelWidth + 8 > b.x)) return;
    occupied.push({ x: lx, y: ly, width: labelWidth }); fragments.push(text(lx, ly, label, `font-size="${fs * 0.85}"`));
  });
  fragments.push('</g>');
  fragments.push(text((left + right) / 2, height - fs * 2, o.xLabel || (o.type === 'bar' ? 'Diffraction peak' : '2θ (°)'), `text-anchor="middle" font-size="${fs * 1.2}"`));
  fragments.push(`<text transform="translate(${fs * 2} ${(top + bottom) / 2}) rotate(-90)" text-anchor="middle" font-size="${fs * 1.15}">${escape(o.yLabel || 'Apparent crystallite size, D (nm)')}</text>`);
  const footerNotes = [];
  if (clipped) footerNotes.push(`${clipped} peaks outside axes; mean uses all ${data.peaks.length} peaks`);
  if (data.notes.some(n => n.startsWith('*'))) footerNotes.push('* Illustrative data, not measurements');
  if (footerNotes.length) fragments.push(text(right, height - 7, footerNotes.join(' · '), `text-anchor="end" font-size="${fs * 0.75}"`));
  fragments.push('</g></svg>');
  return { svg: fragments.join(''), width, height, clipped };
}
