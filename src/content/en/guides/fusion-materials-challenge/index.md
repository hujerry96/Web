---
title: "The Real Bottleneck in Fusion Energy Isn't Plasma — It's Materials"
slug: 'fusion-materials-challenge'
description: 'Fusion reactors need materials that can withstand 150 million degrees and constant neutron bombardment. No known material can do this for long.'
keywords:
  - 'nuclear fusion'
  - 'tungsten'
  - 'beryllium'
  - 'EUROFER'
  - 'ITER'
  - 'plasma-facing material'
author: 'Jerry Hu'
date: 2026-07-24
cover: ./cover.webp
updated: 2026-07-24
category: 'guides'
tags:
  - 'Materials Science'
  - 'Nuclear Fusion'
  - 'Energy'
locale: 'en'

draft: false
---

Every fusion breakthrough makes headlines—a record Q value, a longer plasma confinement time, a successful ignition. But inside the reactor, facing 150 million degrees of plasma and a relentless bombardment of 14 MeV neutrons, every known material degrades. This unglamorous bottleneck—the inner wall of the fusion vessel—may be the single hardest problem standing between a laboratory experiment and a commercial power plant.

## The Materials Blind Spot

When the media covers fusion, the spotlight falls on plasma physics: the magnetic coils of a tokamak, the twisted windings of a stellarator, the lasers of an inertial confinement chamber. These are extraordinarily difficult engineering challenges. But they share a reassuring property: **given enough time and money, engineering problems can be solved.**

Materials do not obey Moore's law. You cannot throw more engineers at a diffusion coefficient. You cannot budget your way past thermodynamics.

A fusion reactor's first wall must simultaneously:

- Withstand heat fluxes above 10 MW/m² (higher than a spacecraft re-entering the atmosphere)
- Resist 14 MeV neutron bombardment that displaces lattice atoms and generates helium and hydrogen bubbles
- Minimize plasma contamination (any sputtered impurity radiates away energy, cooling the plasma)
- Produce low-level waste (not material that remains hazardous for millennia)
- Be fabricable, weldable, and scalable

This list reads as a materials scientist's nightmare. And the current candidates—tungsten, beryllium, and reduced-activation steels—are each compromises with distinct failure modes.

## Three Zones, Three Distinct Environments

The material challenge inside a fusion reactor divides naturally into three zones, each with radically different conditions.

### The Divertor: Directly Facing the Hottest Plasma

The divertor sits at the bottom of the tokamak, exhausting helium ash and impurities from the plasma. It is the most thermally loaded component in the reactor. In ITER's design, the divertor handles steady-state heat fluxes of 10 MW/m², with transient events—edge-localized modes (ELMs)—pushing local loads above 20 MW/m².

**Tungsten** was chosen for the ITER divertor for clear reasons: it has the highest melting point of any metal (3,422°C), low sputter yield, low hydrogen retention, and good thermal conductivity. Among all known solid materials, tungsten is the only one that can stand where the divertor stands.

But tungsten's vulnerabilities are accumulating in the literature.

**Neutron embrittlement.** A 14 MeV neutron striking the tungsten lattice produces a displacement cascade—a shower of vacancies and interstitials that pins dislocations and transforms ductile tungsten into a brittle material. Radiation-hardened tungsten cracks under thermal stress.

**Recrystallization temperature drop.** Pure tungsten recrystallizes around 1,200°C. Neutron irradiation introduces defects that lower the recrystallization onset temperature. Once recrystallization occurs during service, grains coarsen, grain boundaries weaken, and mechanical strength collapses.

**Hydrogen retention and blistering.** Although tungsten's hydrogen retention is relatively favorable, neutron damage creates trap sites where deuterium and tritium accumulate, forming surface blisters that can flake off—releasing radioactive dust into the vacuum vessel.

**Plasma contamination.** Tungsten is a high-Z element (Z = 74). A tungsten atom sputtered into the plasma does not fully ionize; its remaining bound electrons continuously radiate energy. Even trace amounts of tungsten in the core can cool the plasma below the ignition threshold. The divertor material cannot afford to wear out—not even gradually.

### The First Wall: The Low-Z Strategy

The first wall is the inner liner of the reactor vessel, facing the plasma across a wider area. Its heat flux is an order of magnitude lower than the divertor's (0.5–2 MW/m²), but it must protect the structural components from erosion while minimizing plasma contamination.

**Beryllium** was chosen for the ITER first wall. As a low-Z element (Z = 4), beryllium fully ionizes in the plasma; its radiated power is negligible compared with tungsten's. This is its strategic advantage: high plasma tolerance.

But beryllium's practical liabilities are substantial:

- **Low melting point (1,287°C).** The safety margin in a reactor is thin. Any local heat-flux anomaly—an off-normal event or a misaligned tile—can cause melting.
- **High erosion rate.** Beryllium's physical sputter yield is orders of magnitude higher than tungsten's. This shortens component lifetime and generates beryllium dust—toxic, carcinogenic, and potentially suspended in the vacuum chamber as a safety hazard.
- **Toxicity.** Beryllium is a known human carcinogen. Handling, machining, and accident response require stringent containment, raising maintenance cost and complexity.
- **Neutron transmutation.** Neutron irradiation converts beryllium via (n,2n) reactions into helium, producing internal gas bubbles and swelling.

In recent years, **tungsten-fiber-reinforced tungsten composites (Wf/W)** and advanced tungsten alloys have been explored as first-wall alternatives—aiming to retain tungsten's sputtering resistance while suppressing crack propagation through composite design. These remain at the laboratory stage.

## Liquid Divertors: The Self-Healing Alternative

The solid-tungsten divertor carries an irreducible vulnerability: every sputtered atom is permanently lost, every crack is cumulative, every recrystallization event is irreversible. The **liquid-metal divertor** concept proposes a radically different approach: replace solid tungsten with a flowing liquid surface that continuously replenishes itself.

**Liquid lithium** is the leading candidate. Lithium is the lightest metal (Z = 3), fully ionizes in the plasma, and its low atomic number makes it an excellent radiator comparably benign to beryllium. It also has a strong chemical affinity for hydrogen isotopes, acting as a getter pump that reduces recycling and improves plasma performance. Experimental lithium divertor tests at LTX-β (Lithium Tokamak Experiment) and NSTX-U in the US demonstrated that a thin flowing lithium layer can suppress edge-localized modes and improve energy confinement. Confirming lithium's promise, LTX-β achieved record electron temperatures with a lithium-coated wall, showing that a low-Z liquid surface can simultaneously protect the substrate and improve plasma performance.

The engineering challenges, however, are severe. Liquid lithium is chemically aggressive—it corrodes most structural alloys at reactor temperatures. It must be pumped through a magnetic field where Lorentz forces fight the flow direction (magneto-hydrodynamic drag). Capillary forces must distribute the liquid uniformly across the divertor target; any dry spot immediately exposes the substrate to plasma, defeating the self-healing premise. And lithium reacts vigorously with air and water, complicating maintenance and accident scenarios.

**Liquid tin** offers a higher boiling point, lower chemical reactivity, and no violent reaction with coolant. But tin is high-Z and its edge radiation impact is more severe than lithium's. A hybrid approach—lithium first-wall with tin divertor in a dual-loop system—has been studied for fusion pilot plants, but no such integrated loop has been tested at relevant scale.

The liquid-metal divertor remains the most elegant solution on paper and the most treacherous to engineer. If the stability, corrosion, and MHD problems are solved, it could eliminate the divertor lifetime constraint entirely. If they are not, tungsten remains the only solid standing.

### Structural Materials: The Silent Load-Bearers

The divertor and first wall are plasma-facing. But they must be mounted on a structure that bears mechanical loads, coolant pressure, and electromagnetic forces—while remaining low-activation.

**EUROFER**—a 9% Cr reduced-activation ferritic-martensitic (RAFM) steel—is the leading structural candidate. It offers good strength and radiation resistance in the 300–550°C range. Crucially, its alloying elements (tungsten and vanadium replace molybdenum and niobium) give it a decay half-life on the order of 100 years after neutron activation—dramatically shorter than conventional stainless steel's tens of millennia.

EUROFER's limitations:

- **Temperature ceiling.** Above 550°C, EUROFER's strength drops sharply. This constrains coolant system design and thermodynamic efficiency.
- **DBTT shift.** Neutron irradiation raises the ductile-to-brittle transition temperature (DBTT). If the reactor is shut down or started below the DBTT, structural components risk brittle fracture.
- **Tritium retention and permeation.** Tritium trapped in the steel or permeating through cooling pipes affects fuel-cycle efficiency and radiological safety.
- **Limited high-dose data.** EUROFER's neutron irradiation database extends to roughly 20 dpa (displacements per atom); a fusion reactor structure is designed for 80–150 dpa. The behavior at high dose—particularly the synergistic effect of helium and displacement damage—remains uncertain.

## The Twenty-Year Rule

There is a sobering rule of thumb in the fusion materials community: **from initial down-selection to qualified, irradiated data for licensing takes at least 20 years.**

The timeline breaks down as follows:

1. **Synthesis and screening (2–3 years).** Candidate alloys are prepared; basic thermophysical and mechanical properties are measured.
2. **Neutron irradiation experiment (5–10 years).** Neutron irradiation is intrinsically slow. Even in dedicated material test reactors such as IFMIF-DONES (International Fusion Materials Irradiation Facility—DEMO Oriented NEutron Source), accumulating the target dose requires years of continuous exposure.
3. **Post-irradiation examination (2–3 years).** Activated samples must cool, be cut, and be tested in hot cells—every step slowed by radiation protection protocols.
4. **Engineering validation and licensing (5+ years).** Material databases, design codes, and regulatory review consume another half-decade or more.

ITER was originally scheduled to begin operation in the 2020s; the timeline has slipped repeatedly. And crucially, ITER is not designed to produce high-dose material data—its neutron fluence is far below what DEMO (the demonstration power plant) will deliver. The data needed for material qualification may not arrive until IFMIF-DONES begins operation, currently planned for the 2030s.

This creates an uncomfortable temporal mismatch: plasma physics advances in years; materials development advances in decades.

## Shortcuts or No Shortcuts?

The materials community is exploring several acceleration pathways.

**Self-healing materials.** Liquid lithium or liquid gallium walls—a liquid metal surface that automatically repairs plasma damage. But MHD stability, chemical compatibility with structural materials, and uniform coverage over complex geometries remain unsolved.

**Advanced manufacturing.** Additive manufacturing (3D-printed tungsten, functionally graded materials) allows internal cooling channels and gradient designs impossible with conventional powder metallurgy. The irradiation performance of 3D-printed tungsten, however, is essentially unmeasured.

**Machine learning acceleration.** High-throughput computation and ML models are being deployed to screen alloy compositions and predict damage evolution. But ML is data-hungry, and the existing experimental database for fusion materials is sparse. It is a chicken-and-egg problem: ML could accelerate the search if the data existed, but generating the data requires exactly the slow irradiation experiments that ML is meant to replace.

**Tiered qualification.** Use operational data from ITER—even at low fluence—to calibrate models, then extrapolate to high-dose behavior rather than waiting for full dose accumulation. This is the most practical near-term path, but it trades uncertainty for time.

## Radiation Damage at the Atomic Scale

The 14 MeV neutrons produced by deuterium-tritium fusion carry an order of magnitude more energy than the neutrons in a fission reactor's core. When such a neutron strikes the tungsten lattice, it transfers enough kinetic energy to displace thousands of atoms in a collision cascade that lasts only picoseconds. Most displaced atoms settle back into lattice sites, but the survivors—vacancies and interstitials—cluster into dislocation loops, voids, and stacking-fault tetrahedra. At operating temperatures above 0.3 Tₘ (the melting point), these defects become mobile and evolve into larger microstructures: voids swell the material, dislocation networks harden it, and grain-boundary segregation weakens it.

**Helium embrittlement** is a particularly insidious mechanism. Each 14 MeV neutron transmutes nucleus atoms inside the wall material, producing helium via (n,α) reactions. Unlike hydrogen, helium is virtually insoluble in metals. It precipitates into nano-scale bubbles that migrate to grain boundaries, where they grow and coalesce, eventually linking up to cause intergranular fracture under stress. This process, termed **high-temperature helium embrittlement**, threatens structural integrity at temperatures as low as 500°C—well within a reactor's operating window.

Simulations using molecular dynamics and rate-theory cluster dynamics have improved the understanding of these mechanisms, but experimental validation at fusion-relevant dpa and helium production rates remains scarce. The existing body of fission-neutron data under-represents the helium generation rate by a factor of 10–50, making direct extrapolation unreliable.

## Displacements Per Atom (dpa): The Cumulative Damage Yardstick

Radiation damage in fusion materials is measured in **displacements per atom**—a dimensionless metric that counts, on average, how many times each lattice atom has been knocked from its equilibrium site over the component's service life. A dpa value of 1 means every atom in the crystal has been displaced once; 100 means the lattice has been reshuffled a hundred times.

The dpa scale reveals why fusion's materials problem is a step change from fission. A pressurized water reactor's core structural components accumulate **5–10 dpa** over a 40-year service life. ITER's first wall is designed for roughly **3 dpa** across its entire operational campaign—enough to screen materials, but far from representative. DEMO, the first electricity-producing fusion plant, is projected to accumulate **80–150 dpa** in the first wall and divertor over a 25-year operational horizon. The gap between 3 and 150 is not linear in materials degradation: it is the difference between dislocation hardening—a well-understood saturation phenomenon—and void swelling, which accelerates nonlinearly once the incubation dose is exceeded. No fusion-relevant material has been tested to 150 dpa under a 14 MeV spectrum with simultaneous helium production. The highest-dose specimens tested to date—EUROFER variants irradiated in BOR-60 and HFIR—reach about 70 dpa but with a fission neutron spectrum that under-produces helium by a factor of 20. The damage seen in those samples may be the *mild* case.

A second dimension of the dpa problem is the **damage rate** itself. Fission damage rates are roughly 10⁻⁷ dpa/s; IFMIF-DONES is designed for 10⁻⁵ dpa/s, compressing 20 years of fission damage into 2 years. But even this accelerated rate is slower than DEMO's projected 10⁻⁴ dpa/s, and rate effects—where defects evolve differently depending on how quickly they are produced—are an active research question. High dpa rates can suppress recombination and leave more surviving defects, or they can intensify cascade overlap and drive faster clustering. Which effect dominates at DEMO conditions is uncertain, because no facility can produce that rate with a fusion spectrum.

The licensing community has yet to agree on a standard dpa-to-component-life correlation for fusion, because the data simply does not exist. Until IFMIF-DONES or an equivalent fusion-spectrum facility produces specimens at DEMO-relevant doses and rates, every fusion power plant design carries an irreducible materials uncertainty.

## Reactor Design Shapes Materials Requirements

The material challenge is not uniform across fusion approaches. Each reactor architecture imposes distinct demands.

**Tokamaks** (ITER, DEMO, SPARC) rely on axisymmetric magnetic confinement with a pulsed or steady-state plasma. The divertor must manage the highest steady-state heat flux of any design. The pulsed nature of ITER introduces thermal cycling, which accelerates fatigue crack growth in plasma-facing components.

**Stellarators** (Wendelstein 7‑X, HSX) achieve steady-state operation without plasma current, eliminating the need for disruption mitigation—but their complex, twisted magnetic coils produce highly non-uniform heat loads on the inner wall. Localized hot spots on plasma-facing components can exceed 15 MW/m², and the difficult maintenance access demands materials with exceptionally long lifetimes. The stellarator community has pushed for tungsten-armoured components from the start, bypassing beryllium entirely.

**Inertial confinement fusion** (NIF, Laser Mégajoule, indirect-drive designs) subjects chamber walls to repeated micro-explosions—short, intense pulses of X-rays, neutrons, and debris. The first wall experiences cyclic ablation and re-deposition, with peak heat fluxes that dwarf magnetic-confinement conditions. Candidate materials include carbon-fiber composites and refractory metals, but no solution has been validated at ignition-relevant shot rates.

**Compact high-field designs** (SPARC, ARC) use rare-earth barium copper oxide (REBCO) high-temperature superconductors to reach magnetic fields above 12 T, shrinking the reactor size dramatically. Smaller size means higher wall loading—SPARC's first wall is projected to handle neutron fluxes 3–4 times higher than ITER's per unit area—tested in a campaign at JET in 2021 using a beryllium-tungsten divertor, which confirmed that tungsten melt-layer motion under ELM-like transient loads can be modeled but not yet fully mitigated.

## Lessons from the JET Deuterium-Tritium Campaigns

JET (Joint European Torus), the world's largest operating tokamak, conducted its second deuterium-tritium campaign—DTE2—in 2021 and its third campaign—DTE3—in 2023, producing the most reactor-relevant erosion data ever collected from an operating fusion device. The campaigns used a beryllium first wall and a tungsten-coated divertor—the ITER-Like Wall (ILW)—exposing them to sustained DT plasmas with fusion neutron production rates approaching ITER's lower operating range.

The findings are sobering. **Tungsten erosion rates** observed during DTE2 were higher than predicted by pre-campaign models. Gross erosion of the tungsten divertor targets, measured via spectroscopy and post-mortem surface analysis, exceeded model projections by a factor of 2–3 during high-power ELMy H-mode discharges. A significant fraction of eroded tungsten was re-deposited locally on the divertor surface—local re-deposition efficiency approached 90%—rather than transported into the core plasma, a finding that partially mitigates the core-contamination risk but concentrates damage in the divertor region, where thickness loss accumulates faster than expected.

**Beryllium migration** was another key observation. Beryllium eroded from the main-chamber first wall was transported globally and deposited on the tungsten divertor in thick, mixed-material layers—Be-W co-deposits—that are chemically and mechanically distinct from pure tungsten. These co-deposits trap tritium at concentrations that exceed pure tungsten by an order of magnitude, raising both fuel-inventory accounting and decommissioning concerns. The in-vessel tritium inventory after DTE2 was several grams—manageable at JET's scale—but extrapolation to a DEMO-class device with 100 times the plasma-facing surface area suggests kilograms of trapped tritium, a radiological and fuel-cycle challenge that the current materials baseline does not fully address.

Perhaps the most operationally significant finding was that **ELM-induced tungsten melting** occurred under conditions previously thought safe. Transient heat pulses from Type I ELMs produced localized surface temperatures above tungsten's melting point on divertor leading edges, causing melt-layer motion and droplet ejection. Post-campaign inspection identified 1–3 mm deep melt craters concentrated at tile edges and misalignment locations—the exact geometric vulnerabilities that exist in any segmented divertor design. This confirms that even tungsten, the highest-melting-point candidate, is not immune to transient damage, and that melt-layer motion—splashing, droplet ejection, and resolidification—can redistribute tungsten into the vessel in ways that simple erosion models do not capture. These JET results have directly informed ITER's divertor shaping and ELM mitigation strategy, and they underscore the central tension: the divertor material must survive not only the steady-state heat flux but also the transient events that every H-mode tokamak plasma generates.

## The Long Road to Licensing

ITER's materials testing program, once fully operational, will provide the first fusion-relevant neutron irradiation data at meaningful scale. ITER's Test Blanket Module (TBM) program will insert six different breeder blanket concepts into dedicated ports, subjecting them to the fusion neutron spectrum and tritium breeding conditions. First TBM operations are not expected until the 2030s.

IFMIF-DONES—a dedicated accelerator-based neutron source—remains the materials community's flagship facility. Currently planned for construction in Granada, Spain, it aims to produce a 14 MeV neutron flux of 10¹⁴ n/cm²/s across a 200 cm² test volume, enough to reach 20 dpa per full-power year. Even with aggressive timelines, IFMIF-DONES will not produce design-relevant data until the late 2030s or early 2040s.

In parallel, **early fusion pilot plants** (FPPs) are being studied by the US Department of Energy and private consortia. These explicitly accept higher licensing risk by using existing materials with limited fusion-neutron data—an approach that mirrors how early fission reactors were built. The economic calculation is simple: waiting for a fully qualified materials database delays deployment by two decades, but deploying without it risks premature component failure that could set the industry back further.

## National Programs: STEP, FIRE, and the Bold Decadal Vision

The fusion community is reorganizing around the materials bottleneck at the programmatic level. Three national strategies illustrate the shift from plasma-first to materials-parallel development.

The **UK STEP (Spherical Tokamak for Energy Production)** program, led by the UK Atomic Energy Authority, aims to deliver a prototype fusion power plant by 2040—on a compressed timeline that deliberately short-circuits the traditional qualification pipeline. STEP's spherical tokamak geometry, with its compact core and higher neutron wall loading per unit area than a conventional tokamak, intensifies the materials challenge. The program's strategy accepts this risk: use EUROFER-97 as the structural baseline, tungsten for the divertor, and qualify both through operation rather than waiting for IFMIF-DONES data. STEP's aggressive materials R&D program includes in-situ diagnostics to monitor irradiation damage during operation—a capability that no large tokamak has deployed. If a component degrades, the plan is to replace it, not to wait for a certified lifetime prediction. STEP is gambling that operational experience will accumulate faster than irradiation data.

The **US Fusion Innovation Research Engine (FIRE)** collaborative and the **Bold Decadal Vision for Commercial Fusion Energy** (2022 White House summit) reframe fusion materials as a national infrastructure priority. The US strategy calls for multiple fusion pilot plants operating by the 2030s, funded jointly by public and private investment, with a dedicated materials test facility bridging the gap between fission-spectrum data and fusion-relevant conditions. The FIRE collaboratives explicitly target materials qualification as a parallel track to plasma development—not a downstream activity that starts after plasmas are optimized. The US approach also funds multiple materials concepts simultaneously (ODS steels, SiC₍/SiCₘ, vanadium alloys) to hedge against the possibility that any single candidate will fail at high dose.

Both the UK and US strategies share a common philosophical shift: acknowledging that fusion materials cannot be "solved" before deployment, only risk-managed. The twenty-year rule is being contested not by trying to shorten the neutron exposure timeline, but by building plants anyway and monitoring damage as it happens—a strategy that depends on diagnostics and component replaceability, which themselves require materials innovation.

## Next-Generation Materials on the Horizon

Beyond the current baseline candidates, several advanced materials are being actively developed:

**Oxide-dispersion-strengthened (ODS) steels** embed nano-scale yttrium oxide particles in a ferritic matrix. The oxide dispersoids act as sinks for radiation-induced defects and pin grain boundaries at high temperatures, extending the operating window to 700–800°C while improving creep resistance. The challenge lies in fabrication: powder metallurgy routes are expensive, joining ODS steels to conventional components remains unsolved, and the oxide particles coarsen or dissolve under extended irradiation.

**Tungsten alloys (W‑Ta, W‑Re, W‑C)** aim to suppress the ductile-to-brittle transition shift that plagues pure tungsten. Rhenium additions improve low-temperature ductility by altering dislocation core structure, but rhenium is expensive and itself becomes brittle under irradiation. Tantalum-alloyed tungsten shows better stability but requires precise composition control to avoid sigma-phase embrittlement.

**Silicon carbide composites (SiC₍/SiCₘ)** are the long-range aspirant. SiC₍/SiCₘ exhibits excellent high-temperature strength, low activation (no long-lived isotopes), and remarkable radiation tolerance—up to 40 dpa with minimal swelling. It is already used in fission accident-tolerant fuel cladding research. But it is porous, difficult to seal against tritium permeation, and its brittle matrix requires fiber-coating development to retain load-bearing capacity.

The composite architecture matters: **SiC fibers** (typically Hi-Nicalon Type S or Tyranno SA3, with 10–15 µm diameter) are woven into 2D or 3D preforms, then densified via **chemical vapor infiltration (CVI)**—a slow process that deposits SiC matrix material from vapor-phase precursors, filling the fiber weave layer by layer at temperatures above 1,000°C. A thin interfacial coating (pyrolytic carbon or boron nitride, ~100 nm thick) is applied to each fiber before infiltration; this coating allows the matrix to crack without breaking the fibers, the same deflection-toughening mechanism that makes ceramic-matrix composites fracture-tolerant rather than catastrophically brittle. The resulting composite can operate at temperatures exceeding 1,000°C—nearly double EUROFER's ceiling. Its thermal conductivity, however, is anisotropic and roughly 10–30 W/m·K, well below tungsten's 175 W/m·K, making it a poor divertor candidate but an attractive first-wall and blanket structural material where heat fluxes are lower. If the fiber-coating oxidation problem and tritium barrier integration are solved, SiC₍/SiCₘ could replace RAFM steels as the structural material of choice, raising coolant outlet temperatures and enabling higher thermal efficiency.

Each of these materials faces the same bottleneck: the qualification pipeline. No accelerated development program can fully bypass the requirement for years of neutron exposure, and the fusion materials community is still building the facilities to deliver it.

## Conclusion

The materials problem in fusion lacks the elegance of plasma physics. There is no magnetic configuration to tune, no feedback algorithm to optimize. It is a brute-force screening problem, and brute force demands time.

Tungsten embrittles. Beryllium is toxic. EUROFER gives out at 550°C. Liquid metals sound promising but leak engineering complexity at every seam. And the qualification cycle for any of these takes two decades.

This is not a counsel of despair. It is a reminder that if fusion is to become commercially viable, the materials budget must match the plasma physics budget—because what the reactor is built from will ultimately determine whether it can be built at all, and for how much.
