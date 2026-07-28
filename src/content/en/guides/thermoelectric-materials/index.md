---
title: 'Thermoelectric Materials: Turning Waste Heat into Electricity — Why It Hasn''t Taken Off'
slug: 'thermoelectric-materials'
description: 'Thermoelectrics can convert waste heat directly into electricity. The problem is efficiency — and the materials tradeoffs that keep ZT values too low for commercial scale.'
keywords: ['thermoelectric', 'ZT value', 'Bi2Te3', 'SnSe', 'Skutterudite', 'waste heat recovery']
author: 'Jerry Hu'
date: 2026-07-24
cover: ./cover.webp
updated: 2026-07-24
category: 'guides'
tags: ['Materials Science', 'Thermoelectrics', 'Energy Efficiency']
locale: 'en'

draft: false
---

## The Biggest Waste in the Energy System

Roughly two-thirds of the world's primary energy is lost as waste heat. Power plant cooling towers, car exhaust pipes, industrial furnaces — these heat sinks represent an enormous untapped resource. Recover even a fraction of it, and the impact on global energy efficiency would be transformative.

Thermoelectric materials offer an elegant path: they exploit the **Seebeck effect** to convert a temperature difference directly into a voltage — no moving parts, no turbines, no working fluids. A solid block of material generates electricity from heat.

So why aren't thermoelectric generators pasted onto every exhaust pipe?

## ZT: The Single Number That Matters

Thermoelectric performance is summarized by a single dimensionless figure of merit:

\[ ZT = \frac{S^2 \sigma T}{\kappa} \]

- **S** = Seebeck coefficient
- **σ** = electrical conductivity
- **T** = absolute temperature
- **κ** = thermal conductivity

The numerator is the "power factor," the denominator is thermal conductivity. The ideal thermoelectric material must **conduct electricity like a metal and heat like a glass** — but this contradicts the physics of most solids, where electron and phonon transport are tightly coupled. Good electrical conductors are usually good heat conductors too.

This is the central tension: optimizing one parameter tends to worsen another. Doping boosts conductivity but also raises electronic thermal conductivity; introducing defects lowers lattice thermal conductivity but scatters charge carriers, reducing mobility. Moving ZT from 0.5 to 1.0 is hard; from 1.0 to 2.0 requires a fundamental breakthrough in materials design.

Commercial thermoelectric modules operate around ZT ≈ 1.0, corresponding to an energy conversion efficiency of roughly **5–8%** — far below steam turbines (>40%) or photovoltaics (~20%).

## The Classics: Bi₂Te₃ and PbTe

### Bi₂Te₃ (Bismuth Telluride)

The best-performing thermoelectric near room temperature. ZT ≈ 1.0, widely used in cooling and low-grade heat recovery (<250°C). It is the workhorse of the thermoelectric industry today — powering car refrigerators, infrared detector coolers, and laser diode temperature controllers in optical communications.

But tellurium is among the rarest elements in the Earth's crust (rarer than platinum), raising serious concerns about scalability and cost for any application that requires more than a few grams.

### PbTe (Lead Telluride)

The mid-temperature (300–600°C) classic, with ZT between 1.0 and 1.5. PbTe was the material of choice for radioisotope thermoelectric generators (RTGs) on space probes, including the Voyager missions. The toxicity of lead, however, effectively rules it out for consumer or environmental applications.

## Two Landmark Breakthroughs and Their Harsh Lessons

### SnSe Single Crystal: ZT 2.6

In 2014, Lidong Zhao's group reported a ZT of 2.6 in SnSe single crystals — nearly three times that of Bi₂Te₃ and the highest ever recorded. The scientific community was electrified; media called it the "ultimate thermoelectric."

But follow-up work revealed a grim reality:

- SnSe has a layered structure with **catastrophic mechanical properties** — it cleaves easily along the layers and cannot be machined into the bulk modules needed for devices.
- The record ZT was measured along a specific crystallographic direction; polycrystalline samples showed significantly reduced performance.
- Synthesis conditions are impractical for mass production.

> **Lesson**: A peak ZT value achieved in a laboratory single crystal does not mean a material is engineering-ready. An unmachinable crystal is a lottery ticket you can't cash.

### Cu₂Se: Liquid-like Thermal Conductivity

Copper selenide attracted intense attention in the 2010s for a novel mechanism — **liquid-like thermal conductivity**. Above its phase transition temperature, Cu⁺ ions flow freely within the Se²⁻ framework like a liquid, scattering phonons so effectively that κ drops to near-amorphous levels.

Cu₂Se achieves ZT of 1.5–2.0 near 1000 K, using relatively abundant and non-toxic elements. The catch is **stability**: copper ion migration causes compositional segregation and electrode corrosion under sustained high-temperature operation, and irreversible structural degradation occurs under repeated thermal cycling.

> **Lesson**: An elegant physical mechanism that cannot survive 10,000 hours of operation is, for an engineer, just a footnote.

### SnSe's Lattice Thermal Conductivity: Why It's So Low

The SnSe ZT record rests on extraordinarily low lattice thermal conductivity — κ_L as low as 0.23 W/m·K in the b-axis direction, comparable to amorphous silica. This is not accidental; SnSe possesses three structural features that conspire to block thermal transport. First, its layered orthorhombic structure (Pnma space group) creates strong bonding within layers but weak van der Waals-like coupling between them, producing anisotropic phonon propagation. Second, SnSe exhibits strong lattice anharmonicity — the potential energy surface of atomic displacements deviates sharply from a harmonic spring model, meaning phonon modes interact and scatter each other vigorously. Third, the stereochemical activity of the Sn²⁺ 5s² lone pair creates a highly distorted coordination environment that further breaks phonon coherence.

The tragic catch is that these same features — layered structure, lone-pair distortion — make SnSe mechanically fragile. Single crystals cleave under modest shear stress; polycrystalline samples avoid cleavage but lose the ultralow b-axis κ_L through randomized grain orientation. Hot-pressing and spark plasma sintering can partially recover performance, but polycrystalline SnSe ZT remains stuck near 1.0–1.5 — a stark demonstration that the very physics enabling the record also blocks engineering deployment.

## The Major Material Families Today

### Skutterudites: Cage Structures for Ultralow κ

Skutterudites have the general formula MX₃ (e.g., **CoSb₃**), with natural voids in the crystal lattice that can be filled with heavy elements (Ce, Yb, Ba) to form "filled skutterudites." These filler atoms "rattle" inside the cages, scattering phonons without disturbing electron transport — realizing the phonon-glass electron-crystal (PGEC) ideal.

ZT ranges from 1.0 to 1.5 in the mid-temperature range (300–500°C). The drawbacks are **cost** — antimony is not cheap, and the rare-earth filler elements add further expense.

### The Filling Mechanism: Rattling Atoms as Phonon Filters

The skutterudite filling strategy is one of the most elegant structural solutions in thermoelectrics. In unfilled CoSb₃, the Co atoms form a rigid framework of corner-sharing octahedra while the Sb atoms create large icosahedral voids — roughly 2 Å in radius — at the body center. These voids are large enough to accommodate a rare-earth ion (Ce³⁺, Yb²⁺, Ba²⁺) but too large for the ion to sit snugly in a potential minimum; the filler atom instead oscillates with an unusually large displacement amplitude, behaving as a localized "rattler."

The rattler interacts with phonons through resonant scattering — when the filler's natural vibrational frequency overlaps with the dominant heat-carrying phonon modes in CoSb₃, energy exchange is maximized and those phonons are effectively blocked. This is conceptually analogous to a tuned mass damper in a skyscraper: the rattler absorbs the vibrational energy of the phonons it resonates with and redistributes it at lower frequencies that contribute less to thermal transport. Ce-filled CoSb₃ achieves κ_L reduced from ~10 W/m·K to ~2–3 W/m·K; multi-filled compositions (e.g., Ba₀.₂Ce₀.₄Yb₀.₄Co₄Sb₁₂) use fillers of different ionic radii and masses to cover multiple phonon frequency ranges, pushing κ_L below 1.5 W/m·K and ZT to 1.5–1.6. The tradeoff is that filled skutterudites are among the most expensive thermoelectric formulations per kilogram, limiting them to applications where performance is the overriding metric.

### Half-Heuslers: Mechanical Toughness over Peak ZT

Half-Heusler compounds (e.g., **NbFeSb**, **ZrNiSn**) are known for outstanding mechanical strength and thermal stability. Their ZT sits at 1.0–1.5 — lower than filled skutterudites — but their power factor is very high, and they excel at high temperatures (>700°C).

Mechanical toughness is Half-Heuslers' killer feature: they withstand vibration, high temperature gradients, and thermal cycling. This makes them the most practical candidate for **automotive waste heat recovery** and **industrial high-temperature exhaust**. The downsides are relatively high thermal conductivity and the cost of certain constituents (Hf, Nb).

### Half-Heusler Composition Engineering

The Half-Heusler family spans dozens of compositions, but three have emerged as the leading candidates. TiNiSn (n-type) achieves ZT ≈ 1.0–1.2 at 700–800 K, with cost advantages from titanium's abundance but a modest power factor. ZrNiSn (also n-type) pushes ZT higher — 1.3–1.5 — at the cost of more expensive zirconium; doping with Hf on the Zr site introduces strong mass-fluctuation scattering (the large atomic mass difference between Hf and Zr disrupts phonon propagation without significantly altering the electronic structure). NbFeSb (p-type) is the champion, with ZT reaching 1.5–1.7 thanks to an exceptionally high power factor combined with intrinsically low lattice thermal conductivity from its complex valence band structure.

Compositional tuning in Half-Heuslers follows a well-established script: isoelectronic alloying on the heavy-element site (Hf for Zr, or Zr for Ti) suppresses κ_L through mass fluctuation; band convergence strategies align the conduction or valence band extrema to boost S²σ; and grain boundary engineering via ball milling refines the microstructure. The result is a family where peak ZT is moderate but the power factor — the numerator S²σ — is among the highest of any thermoelectric, making Half-Heuslers especially effective for high-heat-flux applications where raw wattage matters more than peak efficiency.

### Mg₃Sb₂: Abundant-Element Pragmatism

A Zintl-phase thermoelectric that has risen rapidly in recent years. Mg₃Sb₂ achieves ZT ≈ 1.6–1.7 in the 300–500°C range using relatively earth-abundant elements (magnesium, antimony) at a fraction of the cost of CoSb₃ or PbTe.

It represents a new design philosophy: not chasing peak efficiency, but aiming for **good-enough performance in a usable temperature window using common elements**.

### GeTe-based materials (TAGS, PbGeTe)

GeTe derivatives such as TAGS (tellurium-antimony-germanium-silver) hold the record for mid-temperature ZT among practical alloys at 1.5–1.7. They are mechanically robust and have been deployed in some NASA RTG upgrades. Germanium's moderate cost and tellurium's scarcity remain limiting factors for mass deployment.

## From Peak ZT to Practical Stability

Looking back at the last decade, the focus of thermoelectric research has shifted markedly:

| Generation | Goal | Representative | ZT |
|-----------|------|---------------|-----|
| 1st | Discover materials | Bi₂Te₃, PbTe | 0.5–1.0 |
| 2nd | Break ZT records | SnSe, Cu₂Se | 1.5–2.6 |
| 3rd | Engineer for stability | Mg₃Sb₂, Half-Heusler | 1.0–1.7 |

This shift reflects a growing consensus: **the bottleneck for commercial thermoelectrics is not ZT — it's everything else.**

A practical thermoelectric generator must satisfy far more constraints than efficiency alone:

- **Long-term stability**: thousands of hours at elevated temperature without degradation
- **Mechanical strength**: machinable into standard module geometries, resistant to vibration
- **Thermal expansion match**: must align with electrodes and ceramic substrates to prevent delamination under thermal cycling
- **Elemental abundance**: potential supply-chain constraints rule out Te, Hf, and rare earths for mass deployment
- **Toxicity**: Pb, Te, and other hazardous elements face regulatory hurdles

A material with ZT of 2.5 that degrades 30% after 500 hours is less valuable than one with a stable ZT of 1.2 that runs reliably for a decade.

## Nanostructuring: Trading Complexity for Efficiency

Nanostructuring has opened a powerful lever: introducing a high density of grain boundaries and nanoscale precipitates can selectively scatter low-frequency phonons (which carry the most heat) without severely degrading carrier mobility.

Common strategies include:

- **Nanograin refinement**: reducing grain size to the nanometer scale increases grain-boundary density
- **Embedded nanoprecipitates**: dispersing a second phase uniformly within the matrix
- **Superlattice thin films**: alternating layers of different compositions to exploit interfacial thermal resistance

These approaches do raise ZT, but they also increase fabrication complexity and cost. Nanostructuring works well for thin-film devices, but scaling it economically to bulk materials remains an open question.

## Where Thermoelectrics Work Today

Despite low overall efficiency, thermoelectrics have found footholds in several **niche markets**:

### Space and Remote Power

The radioisotope thermoelectric generator (RTG) is the most iconic application. Decades of maintenance-free operation and zero moving parts make it the standard for deep-space missions. Voyager 1's RTG has been running for over 45 years.

### Automotive Waste Heat Recovery

Toyota, BMW, and others have experimented with thermoelectric generators mounted on exhaust pipes. Real-world tests recover 200–500W under certain driving conditions. The problem is cost — the materials cost per watt recovered remains far higher than simply adding a larger battery or improving engine efficiency.

### Automotive TE Generator Prototypes: A Decade of Experiments

Between roughly 2008 and 2018, multiple automakers built and tested exhaust-mounted thermoelectric generators with the goal of reducing alternator load — capturing 2–5% of engine waste heat to offset fuel consumption. BMW's 2011 prototype on a 530i sedan used Bi₂Te₃-based modules coupled to a coolant loop, recovering up to 600 W during highway cruising and demonstrating a fuel-efficiency improvement of 1–2%. Ford's partnership with Amerigon produced a Lincoln MKT prototype with a 500 W target using skutterudite modules, though the system added nearly 30 kg to the vehicle. Toyota's work with the Japanese thermoelectric consortium tested segmented modules (Bi₂Te₃ for the cold side cascaded with Half-Heusler or skutterudite for the hot side) to widen the operating temperature window.

None of these programs reached production. The barriers were convergent: the weight of the required heat exchangers and cooling loops exceeded the fuel savings from recovered electricity; module longevity under hundreds of thousands of thermal cycles proved unreliable; and the dollar-per-watt cost of the thermoelectric material alone exceeded the cost of generating the same power with a larger alternator. The automotive thermoelectric generator remains a compelling laboratory demonstration that the economics of a combustion engine vehicle — already optimized within a few percent — cannot absorb.

### Industrial Waste Heat

Steel mills, cement kilns, and glass furnaces produce exhaust at 400–800°C, and they run continuously. This is the most promising large-scale application. The hurdle is economics: industrial customers demand a payback period of under three years, and current thermoelectric systems struggle to meet that threshold.

## The Phonon-Glass Electron-Crystal Concept

The phonon-glass electron-crystal (PGEC) concept, articulated by Glen Slack in the 1990s, defines the ideal thermoelectric as a material that conducts electricity like a crystalline solid but conducts heat like an amorphous glass. In most solids, electrical and thermal transport are coupled through the periodic atomic lattice — good conductors of electricity are also good conductors of heat. PGEC breaks this coupling by engineering a crystal structure with two distinct roles: a rigid covalent framework that provides a highway for charge carriers, and weakly bound atoms that "rattle" inside structural cages, scattering phonons without disturbing electron flow.

Filled skutterudites are the textbook realization. The CoSb₃ framework supplies the electron crystal; the filler atoms (Ce, Yb, Ba) occupy natural voids and vibrate independently, suppressing lattice thermal conductivity to near-glass levels. The same principle appears in clathrates (guest atoms inside silicon or germanium cages) and certain Zintl phases. PGEC remains the dominant design heuristic in thermoelectrics today — not because it is perfectly realizable, but because it captures the central materials challenge in a single, intuitive picture.

## The Economics of Thermoelectric Power Generation

The binding constraint for thermoelectric power generation is not efficiency but cost per watt. Thermoelectric generators based on Bi₂Te₃ cost roughly $5–10/W, compared with $0.30–0.80/W for silicon photovoltaics, $1–2/W for wind, and $0.50–1/W for natural gas combined-cycle turbines. Even at high-volume production, the raw material costs alone for tellurium- and rare-earth-based thermoelectrics make $1/W difficult to reach.

Industrial waste-heat recovery — the largest potential market — requires a payback period of under three years. At industrial electricity prices of $0.05–0.08/kWh, this translates to a system cost target of roughly $1–2/W. No current thermoelectric system meets this threshold. The economics flip for applications where reliability trumps cost: deep-space probes, remote sensors, and medical implants can justify $100+/W because battery replacement or grid connection is orders of magnitude more expensive. The market is therefore demand-constrained — cost reduction, not efficiency improvement, is the binding constraint for mass adoption.

## Flexible Thermoelectrics for Wearable Devices

A rapidly growing frontier is flexible thermoelectric materials for body heat harvesting. The human body dissipates 50–100 W of thermal power at rest, and a wearable generator positioned against the skin could convert a 5–10 K temperature difference into tens of microwatts to a few milliwatts — enough to power a medical sensor, smartwatch, or IoT transmitter without batteries. Traditional thermoelectrics like Bi₂Te₃ are rigid and brittle, incompatible with curved skin surfaces.

Researchers have turned to organic thermoelectrics (PEDOT:PSS, carbon-nanotube composites), solution-processed thin films on polymer substrates, and printable thermoelectric inks. The ZT values of flexible materials remain low — typically 0.1–0.5 — but the value proposition is not efficiency but autonomy: eliminating battery replacement for implantable or skin-mounted sensors. The field is still at the proof-of-concept stage, with no commercial product at scale, but it represents one of the most active frontiers in thermoelectric research today.

### Organic Thermoelectrics: The ZT Ceiling and Its Consequences

Conducting polymers — particularly PEDOT:PSS — are the most studied organic thermoelectric platform because they can be tuned from insulating to moderately conducting via doping and solvent treatment. The best PEDOT:PSS films, treated with ethylene glycol or DMSO to enhance crystallinity and carrier mobility, achieve power factors of ~400–500 μW/m·K² and ZT ≈ 0.3–0.4 — two orders of magnitude below Bi₂Te₃. The fundamental limitation is intrinsic: organic semiconductors conduct charge via hopping between localized states rather than band transport, producing low carrier mobility (~1 cm²/V·s versus ~1000 cm²/V·s for crystalline inorganic thermoelectrics), and the Seebeck coefficient, while decent, cannot compensate.

Flexible thermoelectrics consequently inhabit a different market logic. They will never power a car or a factory; their addressable applications are microwatt-scale sensors, e-textiles, and disposable medical patches — niches where the cost of a lithium coin cell and its periodic replacement (often requiring minor surgery for implantables) exceeds the cost of a printed polymer generator. Research is pushing in two directions: hybrid inorganic-organic composites (Bi₂Te₃ nanowires embedded in PEDOT:PSS) that borrow the high ZT of inorganics while retaining flexibility, and all-polymer systems that optimize for ultra-low-cost, roll-to-roll printing at the expense of efficiency.

## From Peak ZT to Engineering Figure of Merit

The growing recognition that laboratory ZT does not translate directly to module efficiency has led to the adoption of the engineering figure of merit, ZT_eng. Unlike conventional ZT, which is defined at a single temperature, ZT_eng integrates material performance across the entire temperature gradient experienced by a thermoelectric leg, accounting for the temperature dependence of S, σ, and κ. A material with a high peak ZT at a narrow temperature range may underperform one with a lower but broader ZT plateau when deployed in a real device.

Additional practical factors widen the gap between materials-level and module-level performance: electrical contact resistance at the hot and cold junctions, parasitic heat losses through the module, and thermal expansion mismatch between thermoelectric legs and electrodes. ZT_eng captures these losses and provides a more honest assessment of whether a candidate material can deliver useful power in an actual generator.

## Module-Level Engineering: Why Pellet ZT ≠ Module Efficiency

A thermoelectric pellet with ZT of 1.5 in isolation does not translate to a module-level ZT of 1.5. The module interposes several parasitic loss mechanisms between the material and the output. Electrical contact resistance at the metal-semiconductor junctions — typically on the order of 10⁻⁸ to 10⁻⁷ Ω·m² for well-engineered interfaces — adds a voltage drop that scales with current and directly eats into the net power output. Thermal bypass through the ceramic substrates (usually Al₂O₃ or AlN plates that sandwich the TE legs) allows heat to travel around the thermoelectric material rather than through it, effectively reducing the temperature difference that drives the Seebeck voltage. In modules with thin legs (<1 mm), substrate thermal bypass can degrade effective ΔT by 15–30%.

Thermal expansion mismatch is the life-limiting mechanism. Most thermoelectrics have coefficients of thermal expansion (CTE) in the range of 10–20 × 10⁻⁶/K, while alumina substrates sit near 7 × 10⁻⁶/K. Over repeated heating-cooling cycles, the cumulative shear stress at the solder joints causes microcrack formation, delamination, and eventual electrical failure. Module lifetime — not peak ZT — is the real bottleneck for terrestrial waste-heat recovery, where 10 years of continuous operation with daily thermal cycling is the minimum viable specification. Current commercial Bi₂Te₃ modules have demonstrated 5+ year lifetimes in stable-temperature applications (cooling racks, laser diode controllers) but degrade rapidly under the thermal cycling regime required for exhaust-mounted generators. Solving the module is at least as hard as solving the material.

## Conclusion: The End of the ZT Race

The story of thermoelectric materials is a reminder that materials science is not just about breaking efficiency records. The real challenge is turning a physical effect into a **reliable engineering product** — balancing efficiency, cost, lifetime, and manufacturability.

Future breakthroughs may come from:

- **High-throughput screening**: AI-driven discovery across millions of candidate compositions
- **Elastic strain engineering**: using lattice strain to reshape the electronic band structure
- **Module-level optimization**: co-design of material, electrode, solder, and packaging

But the most likely path forward — as Mg₃Sb₂ demonstrates — is not finding a miracle material with ZT of 3.0. It is finding one with ZT of 1.0–1.5 that **passes every other test**: stable, strong, abundant, non-toxic, and manufacturable.
