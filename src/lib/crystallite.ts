export type Correction = 'none' | 'gaussian' | 'lorentzian';
export interface Settings { wavelength: number; k: number; correction: Correction; instrument: number }
export interface Peak { label: string; twoTheta: string; fwhm: string }
export type Issue = 'angle' | 'width' | 'wavelength' | 'k' | 'instrument' | 'unresolved';
export type Result = { ok: false; issue: Issue } | { ok: true; theta: number; beta: number; correctedWidth: number; size: number };

export function calculate(peak: Peak, settings: Settings): Result {
  const angle = peak.twoTheta.trim() ? Number(peak.twoTheta) : NaN;
  const width = peak.fwhm.trim() ? Number(peak.fwhm) : NaN;
  if (!Number.isFinite(angle) || angle <= 0 || angle >= 180) return { ok: false, issue: 'angle' };
  if (!Number.isFinite(width) || width <= 0 || width >= 180) return { ok: false, issue: 'width' };
  if (!Number.isFinite(settings.wavelength) || settings.wavelength <= 0) return { ok: false, issue: 'wavelength' };
  if (!Number.isFinite(settings.k) || settings.k < 0.1 || settings.k > 2) return { ok: false, issue: 'k' };
  let correctedWidth = width;
  if (settings.correction !== 'none') {
    if (!Number.isFinite(settings.instrument) || settings.instrument <= 0 || settings.instrument >= 180) return { ok: false, issue: 'instrument' };
    if (width <= settings.instrument) return { ok: false, issue: 'unresolved' };
    correctedWidth = settings.correction === 'gaussian'
      ? Math.sqrt((width - settings.instrument) * (width + settings.instrument))
      : width - settings.instrument;
  }
  const theta = angle * Math.PI / 360;
  const beta = correctedWidth * Math.PI / 180;
  const size = settings.k * settings.wavelength / (10 * beta * Math.cos(theta));
  if (!Number.isFinite(size) || size <= 0) return { ok: false, issue: 'unresolved' };
  return { ok: true, theta, beta, correctedWidth, size };
}

/** Unweighted arithmetic mean of valid, unrounded per-peak results. */
export function meanSize(results: Result[]): number | null {
  const sizes = results.flatMap(result => result.ok ? [result.size] : []);
  return sizes.length ? sizes.reduce((sum, size) => sum + size / sizes.length, 0) : null;
}

// Excel TSV and CSV; labels may be quoted. No silent dropping of malformed rows.
export function parsePeaks(text: string): Peak[] {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).filter(line => line.trim());
  if (!lines.length) throw new Error('empty');
  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const split = (line: string) => {
    const fields: string[] = []; let value = ''; let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (quoted && line[i + 1] === '"') { value += '"'; i++; }
        else quoted = !quoted;
      } else if (ch === delimiter && !quoted) { fields.push(value.trim()); value = ''; }
      else value += ch;
    }
    if (quoted) throw new Error('format');
    fields.push(value.trim()); return fields;
  };
  const rows = lines.map(split);
  const isHeader = (row: string[]) => /^(2\s*[θϑ]|2theta|two.?theta|峰位)/i.test(row[row.length - 2] || '') && /fwhm|峰寬/i.test(row[row.length - 1] || '');
  if (isHeader(rows[0])) rows.shift();
  if (!rows.length) throw new Error('empty');
  if (rows.length > 200) throw new Error('limit');
  return rows.map(row => {
    if (row.length !== 2 && row.length !== 3) throw new Error('format');
    const peak = { label: row.length === 3 ? row[0] : '', twoTheta: row[row.length - 2], fwhm: row[row.length - 1] };
    const check = calculate(peak, { wavelength: 1.5406, k: 0.9, correction: 'none', instrument: 0 });
    if (!check.ok) throw new Error('format');
    return peak;
  });
}

export function csvCell(value: string | number): string {
  // Prevent spreadsheet formula injection in user-provided labels.
  const text = String(value);
  const safe = /^[=+@\-\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}
