"""batch_calc.py — wt% / mol% / at% conversion and weigh-out masses for a powder batch.

Free script from Hu Lab (https://hulab.pages.dev). MIT licence.

Usage
-----
    python batch_calc.py --basis mol --total 20 ZrO2:92:99.9 Y2O3:8:99.99
    python batch_calc.py --basis wt  --total 50 SiO2:80 B2O3:13 Na2O:4 Al2O3:3

Each component is FORMULA:AMOUNT[:PURITY%]. AMOUNT is in the chosen basis
(mol% or wt%; it is normalised, so 92/8 and 0.92/0.08 give the same result).
--total is the batch size in grams of pure material. PURITY defaults to 100.

Formulas may use parentheses, decimal counts and hydrates, e.g. Ca(OH)2,
K0.5Na0.5NbO3 or Y(NO3)3*6H2O. Write hydrate water with '*' (CuSO4*5H2O, not
CuSO4.5H2O): a '.' is always read as a decimal point.
The masses to weigh are corrected for purity: mass_to_weigh = pure_mass / purity.

Please check every result before you weigh. This is a calculation aid.
"""
import argparse
import re
from collections import defaultdict

# IUPAC 2021 abridged standard atomic weights (conventional values), g/mol
ATOMIC_WEIGHT = {
    'H': 1.008, 'Li': 6.94, 'B': 10.81, 'C': 12.011, 'N': 14.007, 'O': 15.999,
    'F': 18.998, 'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974,
    'S': 32.06, 'Cl': 35.45, 'K': 39.098, 'Ca': 40.078, 'Sc': 44.956, 'Ti': 47.867,
    'V': 50.942, 'Cr': 51.996, 'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693,
    'Cu': 63.546, 'Zn': 65.38, 'Ga': 69.723, 'Ge': 72.630, 'Sr': 87.62, 'Y': 88.906,
    'Zr': 91.224, 'Nb': 92.906, 'Mo': 95.95, 'Ag': 107.87, 'Sn': 118.71, 'Ba': 137.33,
    'La': 138.91, 'Ce': 140.12, 'Pr': 140.91, 'Nd': 144.24, 'Sm': 150.36, 'Eu': 151.96,
    'Gd': 157.25, 'Er': 167.26, 'Yb': 173.05, 'Hf': 178.49, 'Ta': 180.95, 'W': 183.84,
    'Pb': 207.2, 'Bi': 208.98,
}


def parse_formula(formula):
    """Return {element: count} for a formula such as Ba(NO3)2 or Y(NO3)3*6H2O."""
    total = defaultdict(float)
    # Hydrate water is separated by '*' or '·' (CaCl2*2H2O). A '.' is always a decimal
    # point (YO1.5, K0.5Na0.5NbO3), because CuSO4.5H2O and K0.5Na can't be told apart.
    for part in re.split(r'[*·]', formula):
        m = re.match(r'^(\d+(?:\.\d+)?)(.*)$', part)
        mult, body = (float(m.group(1)), m.group(2)) if m else (1.0, part)
        stack = [defaultdict(float)]
        for token in re.findall(r'([A-Z][a-z]?)(\d*\.?\d*)|(\()|(\))(\d*\.?\d*)', body):
            el, n, open_, close, n_close = token
            if el:
                if el not in ATOMIC_WEIGHT:
                    raise SystemExit(f'Unknown element {el!r} in {formula!r}')
                stack[-1][el] += float(n) if n else 1.0
            elif open_:
                stack.append(defaultdict(float))
            elif close:
                group = stack.pop()
                k = float(n_close) if n_close else 1.0
                for e, c in group.items():
                    stack[-1][e] += c * k
        for e, c in stack[0].items():
            total[e] += c * mult
    return dict(total)


def molar_mass(counts):
    return sum(ATOMIC_WEIGHT[e] * n for e, n in counts.items())


def calculate(components, basis, total_mass):
    """components: list of (formula, amount, purity%). Returns rows and element table."""
    rows = []
    for formula, amount, purity in components:
        counts = parse_formula(formula)
        rows.append({'formula': formula, 'counts': counts, 'M': molar_mass(counts),
                     'amount': amount, 'purity': purity})
    if basis == 'mol':
        s = sum(r['amount'] for r in rows)
        for r in rows:
            r['x'] = r['amount'] / s
        mean_m = sum(r['x'] * r['M'] for r in rows)
        for r in rows:
            r['w'] = r['x'] * r['M'] / mean_m
    else:
        s = sum(r['amount'] for r in rows)
        for r in rows:
            r['w'] = r['amount'] / s
        n_sum = sum(r['w'] / r['M'] for r in rows)
        for r in rows:
            r['x'] = (r['w'] / r['M']) / n_sum
    for r in rows:
        r['pure_g'] = r['w'] * total_mass
        r['weigh_g'] = r['pure_g'] / (r['purity'] / 100)
        r['mmol'] = r['pure_g'] / r['M'] * 1000
    atoms = defaultdict(float)   # mol of atoms
    mass = defaultdict(float)    # g of element
    for r in rows:
        n = r['pure_g'] / r['M']
        for e, c in r['counts'].items():
            atoms[e] += n * c
            mass[e] += n * c * ATOMIC_WEIGHT[e]
    n_atoms, m_tot = sum(atoms.values()), sum(mass.values())
    elements = [(e, atoms[e] / n_atoms * 100, mass[e] / m_tot * 100) for e in atoms]
    return rows, elements


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('components', nargs='+', help='FORMULA:AMOUNT[:PURITY%%]')
    ap.add_argument('--basis', choices=['mol', 'wt'], default='mol', help='input basis (default mol)')
    ap.add_argument('--total', type=float, default=10.0, help='batch size in grams of pure material')
    args = ap.parse_args()

    comps = []
    for spec in args.components:
        parts = spec.split(':')
        if len(parts) not in (2, 3):
            raise SystemExit(f'Bad component {spec!r}; use FORMULA:AMOUNT[:PURITY]')
        comps.append((parts[0], float(parts[1]), float(parts[2]) if len(parts) == 3 else 100.0))

    rows, elements = calculate(comps, args.basis, args.total)
    print(f'Batch: {args.total:g} g pure material, input basis {args.basis}%\n')
    print(f"{'Component':<16}{'M g/mol':>10}{'mol%':>9}{'wt%':>9}{'pure g':>10}{'purity%':>9}{'WEIGH g':>10}{'mmol':>10}")
    for r in rows:
        print(f"{r['formula']:<16}{r['M']:>10.3f}{r['x']*100:>9.2f}{r['w']*100:>9.2f}"
              f"{r['pure_g']:>10.4f}{r['purity']:>9.2f}{r['weigh_g']:>10.4f}{r['mmol']:>10.3f}")
    print(f"{'Total':<16}{'':>10}{100:>9.2f}{100:>9.2f}{args.total:>10.4f}{'':>9}"
          f"{sum(r['weigh_g'] for r in rows):>10.4f}")
    print('\nElement        at%       wt%')
    for e, at, wt in elements:
        print(f'{e:<10}{at:>8.2f}{wt:>10.2f}')


if __name__ == '__main__':
    main()
