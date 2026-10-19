import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate, meanSize, parsePeaks, csvCell } from '../src/lib/crystallite.ts';
import { createSizeChart, DEFAULT_CHART_OPTIONS, ChartSettingsError } from '../src/lib/crystallite-chart.ts';
const peak = { label: '(111)', twoTheta: '38.18', fwhm: '0.42' };
const settings = { wavelength: 1.5406, k: 0.9, correction: 'none', instrument: 0.1 };
test('Scherrer converts 2theta, degrees and angstroms correctly', () => {
  const r = calculate(peak, settings);
  assert.equal(r.ok, true);
  assert.ok(Math.abs(r.size - 20.0157180782) < 1e-9);
  assert.ok(Math.abs(r.theta - 19.09 * Math.PI / 180) < 1e-12);
  assert.ok(Math.abs(r.beta - 0.42 * Math.PI / 180) < 1e-12);
});
test('Gaussian and Lorentzian instrument corrections', () => {
  const g = calculate(peak, { ...settings, correction: 'gaussian' });
  const l = calculate(peak, { ...settings, correction: 'lorentzian' });
  assert.equal(g.ok, true); assert.equal(l.ok, true);
  assert.ok(Math.abs(g.correctedWidth - Math.sqrt(0.42 ** 2 - 0.1 ** 2)) < 1e-12);
  assert.ok(Math.abs(l.correctedWidth - 0.32) < 1e-12);
  assert.ok(l.size > g.size && g.size > calculate(peak, settings).size);
});
test('rejects empty, nonfinite, out-of-range and unresolved inputs', () => {
  for (const angle of ['', '0', '180', 'Infinity', '38xyz']) assert.equal(calculate({ ...peak, twoTheta: angle }, settings).issue, 'angle');
  for (const width of ['', '0', '-1', 'Infinity', '180']) assert.equal(calculate({ ...peak, fwhm: width }, settings).issue, 'width');
  for (const correction of ['gaussian', 'lorentzian']) {
    assert.equal(calculate(peak, { ...settings, correction, instrument: 0.42 }).issue, 'unresolved');
    assert.equal(calculate(peak, { ...settings, correction, instrument: 0.5 }).issue, 'unresolved');
    assert.equal(calculate(peak, { ...settings, correction, instrument: 0 }).issue, 'instrument');
  }
  assert.equal(calculate(peak, { ...settings, wavelength: NaN }).issue, 'wavelength');
  assert.equal(calculate(peak, { ...settings, k: 3 }).issue, 'k');
  assert.equal(calculate(peak, { ...settings, instrument: NaN }).ok, true);
});
test('imports Excel TSV and quoted CSV with optional header', () => {
  assert.deepEqual(parsePeaks('Label\t2theta\tFWHM\n(111)\t38.18\t0.42'), [peak]);
  assert.deepEqual(parsePeaks('2θ,FWHM\n38.18,0.42'), [{ ...peak, label: '' }]);
  assert.deepEqual(parsePeaks('"peak, one",38.18,0.42'), [{ ...peak, label: 'peak, one' }]);
  assert.deepEqual(parsePeaks('"peak ""one""",38.18,0.42'), [{ ...peak, label: 'peak "one"' }]);
});
test('malformed or oversized paste is rejected atomically', () => {
  for (const text of ['', '38.18,', '38.18,0.42\nabc,0.4', 'a,b,c,d', '"unterminated,38.18,0.42', '2theta,FWHM']) assert.throws(() => parsePeaks(text));
  assert.equal(parsePeaks(Array(200).fill('38.18,0.42').join('\n')).length, 200);
  assert.throws(() => parsePeaks(Array(201).fill('38.18,0.42').join('\n')));
});
test('mean uses valid unrounded sizes and excludes invalid peaks', () => {
  const valid = calculate(peak, settings);
  assert.equal(meanSize([]), null);
  assert.equal(meanSize([{ ok: false, issue: 'width' }]), null);
  assert.equal(meanSize([valid]), valid.size);
  assert.equal(meanSize([{ ...valid, size: 10.123 }, { ok: false, issue: 'unresolved' }, { ...valid, size: 20.456 }]), (10.123 + 20.456) / 2);
});
test('journal scatter chart is self-contained, escaped and has publication dimensions', () => {
  const data = { title: 'Scherrer', subtitle: 'n = 2', settings: 'K = 0.9', meanLabel: 'Arithmetic mean', mean: 15, notes: ['Descriptive summary only.'], peaks: [{ label: '<script>alert(1)</script>', twoTheta: 38.18, size: 10 }, { label: 'A & B', twoTheta: 64.58, size: 20 }] };
  const chart = createSizeChart(data);
  assert.ok(chart.svg.includes('&lt;script&gt;'));
  assert.ok(!chart.svg.includes('<script>'));
  assert.ok(chart.svg.includes('A &amp; B'));
  assert.ok(chart.svg.includes('Mean = 15 nm'));
  assert.ok(chart.svg.includes('stroke-dasharray'));
  assert.ok(chart.svg.includes('width="180mm" height="120mm"'));
  assert.ok(chart.svg.includes('2θ (°)'));
  assert.ok(chart.svg.includes('Apparent crystallite size, D (nm)'));
  assert.ok(chart.width === 900 && chart.height === 600);
  const coordinates = [...chart.svg.matchAll(/data-peak="\d+" cx="([^"]+)" cy="([^"]+)"/g)];
  assert.equal(coordinates.length, 2);
  assert.ok(Number(coordinates[0][1]) < Number(coordinates[1][1]));
  assert.ok(Number(coordinates[0][2]) > Number(coordinates[1][2]));
  assert.throws(() => createSizeChart({ ...data, peaks: [] }));
  assert.throws(() => createSizeChart({ ...data, peaks: [{ ...data.peaks[0], twoTheta: NaN }] }));
  const long = createSizeChart({ ...data, peaks: Array(200).fill(data.peaks[0]), notes: ['中文限制說明'.repeat(100)] });
  assert.equal((long.svg.match(/data-peak=/g) || []).length, 200);
  assert.equal(long.height, 600);
  assert.ok(!/NaN|Infinity/.test(long.svg));
  const single = createSizeChart({ ...data, mean: 10, peaks: [data.peaks[0]] });
  assert.ok(!/NaN|Infinity/.test(single.svg));
  const identical = createSizeChart({ ...data, mean: 10, peaks: Array(3).fill(data.peaks[0]) });
  assert.ok(!/NaN|Infinity/.test(identical.svg));
  for (const size of [Number.MIN_VALUE, Number.MAX_VALUE]) {
    const extreme = createSizeChart({ ...data, mean: size, peaks: [{ ...data.peaks[0], size }] });
    assert.ok(!/NaN|Infinity/.test(extreme.svg));
  }
});
test('figure controls customize type, color, geometry and labels without changing data', () => {
  const data = { title: 'Scherrer', subtitle: 'n = 2', settings: 'K = 0.9', meanLabel: 'Mean', mean: 15, notes: [], peaks: [{ label: 'A', twoTheta: 38, size: 10 }, { label: 'B', twoTheta: 64, size: 20 }] };
  const plot = createSizeChart(data, { type: 'bar', color: '#dd3344', axisColor: '#222222', background: '#fefefe', meanLine: false, legend: false, frame: 'axes', labels: false, widthMm: 150, heightMm: 150, title: '<Custom & title>', xLabel: '<Peak>', yLabel: 'Size & units' });
  assert.equal(plot.height, 900);
  assert.ok(plot.svg.includes('width="150mm" height="150mm"'));
  assert.ok(plot.svg.includes('fill="#dd3344"'));
  assert.ok(plot.svg.includes('&lt;Custom &amp; title&gt;'));
  assert.ok(plot.svg.includes('&lt;Peak&gt;'));
  assert.ok(plot.svg.includes('Size &amp; units'));
  assert.ok(!plot.svg.includes('stroke-dasharray'));
  assert.equal((plot.svg.match(/<rect data-peak=/g) || []).length, 2);
  const bounded = createSizeChart(data, { xMin: 40, xMax: 80, yMax: 18, marker: 'diamond', xStep: 10, yStep: 2, grid: true });
  assert.equal(bounded.clipped, 2);
  assert.ok(bounded.svg.includes('<polygon'));
  assert.ok(bounded.svg.includes('opacity="0.15"'));
  assert.ok(bounded.svg.includes('Mean = 15 nm'));
  assert.deepEqual(DEFAULT_CHART_OPTIONS.type, 'scatter');
});
test('invalid figure settings fail clearly instead of rendering a stale or misleading plot', () => {
  const data = { title: 'Scherrer', subtitle: '', settings: '', meanLabel: 'Mean', mean: 15, notes: [], peaks: [{ label: 'A', twoTheta: 38, size: 15 }] };
  for (const options of [{ widthMm: 0 }, { color: 'red' }, { fontSize: NaN }, { xMin: 80, xMax: 20 }, { yMin: -1 }, { xStep: 0 }, { yStep: 0.00001 }, { type: 'bar', yMin: 5 }, { widthMm: 240, heightMm: 60, fontSize: 16 }]) {
    assert.throws(() => createSizeChart(data, options), ChartSettingsError);
  }
});
test('CSV escapes strings and neutralizes spreadsheet formulas', () => {
  assert.equal(csvCell('a,"b"'), '"a,""b"""');
  assert.equal(csvCell('=SUM(1,2)'), '"\'=SUM(1,2)"');
  assert.equal(csvCell('@evil'), '"\'@evil"');
  assert.equal(csvCell(20.5), '"20.5"');
});
