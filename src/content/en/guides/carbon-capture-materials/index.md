---
title: 'The Materials Race in Carbon Capture: Amines, MOFs, and Zeolites'
slug: 'carbon-capture-materials'
description: 'Carbon capture has been talked about for decades. The bottleneck is not engineering — it is materials chemistry.'
keywords: ['carbon capture', 'MOF', 'metal-organic framework', 'zeolite', 'amine', 'CO2']
author: 'Jerry Hu'
date: 2026-07-24
cover: ./cover.webp
updated: 2026-07-24
category: 'guides'
tags: ['Materials Science', 'Carbon Capture', 'Climate Tech']
locale: 'en'

draft: false
---

Carbon capture sounds like the perfect compromise: let power plants and factories keep running while intercepting the CO₂ before it reaches the atmosphere. The idea is straightforward in principle, but the execution has proven extraordinarily difficult. The problem is not engineering — we know how to build the equipment. The problem is materials. No existing material can adsorb CO₂ at scale while balancing cost, energy consumption, and long-term stability.

Roughly two dozen large-scale carbon capture facilities operate worldwide today, the vast majority using chemical absorption. But the cost remains between $60 and $100 per ton of CO₂ captured, and most of that cost comes from the energy required to regenerate the capture material. This **energy penalty** — burning more fossil fuel to power the capture process itself — is the fundamental reason carbon capture has not scaled.

## The Energy Penalty Problem

Every carbon capture method shares a thermodynamic reality: separating CO₂ from a mixed gas stream requires energy. The minimum theoretical energy for separating CO₂ from coal plant flue gas (roughly 12-15% CO₂) is about 0.4 GJ per ton of CO₂. Real processes consume 2-4 GJ per ton — five to ten times the thermodynamic minimum.

This penalty translates directly to lost output. For a coal power plant using amine scrubbing, 20-30% of the plant's steam output goes to regenerating the capture solvent. That is electricity that cannot be sold, efficiency that cannot be recovered. Until the energy penalty drops, carbon capture will remain a cost center that plant operators have little incentive to adopt.

## Amine Scrubbing: Mature Technology, Hard Ceiling

Amine scrubbing is the incumbent technology. Flue gas passes through an aqueous solution of monoethanolamine (MEA) or a similar amine. CO₂ reacts chemically with the amine, forming a weak bond. The solution is then heated to around 120°C, breaking the bond and releasing pure CO₂. The solvent is recycled.

The chemistry is well-understood and the technology has been deployed at industrial scale for decades — not for climate purposes, but for natural gas processing where CO₂ removal was already required. That operational history is both a strength and a clue. If amines were going to get cheap enough for climate-scale capture, they probably would have by now.

Several variants exist. Advanced amines, amine blends, and hindered amines can reduce regeneration energy by 20-30% compared to MEA. But all aqueous amine systems share a fundamental limitation: you are heating a large volume of water (the solvent) to release a relatively small amount of CO₂. The heat capacity of water dominates the energy balance. This is not a problem that better chemistry can fully solve — it is a physical constraint of the approach.

Amine degradation is another persistent issue. Oxygen and SO₂ in flue gas gradually break down the amine molecules, requiring continuous solvent replacement. This adds operating cost and generates waste that must be treated.

### Physicochemical Principles of the Amine-CO₂ Reaction

The amine-CO₂ reaction proceeds through a two-step **zwitterion mechanism** that governs both capture kinetics and regeneration energetics. In the first step, dissolved CO₂ attacks the amine's nitrogen lone pair to form a zwitterion — a transient intermediate bearing both positive (N⁺) and negative (COO⁻) charges within the same molecule. This step is rate-limiting and highly sensitive to amine basicity: stronger amines accelerate capture but increase the heat of reaction, directly raising regeneration energy demand.

In the second step, a base (another amine molecule or water) deprotonates the zwitterion to form a stable carbamate anion. The overall stoichiometry requires two amine molecules per CO₂ captured for primary and secondary amines, which effectively halves the theoretical capacity to roughly 0.5 mol CO₂ per mol amine. Tertiary amines cannot form carbamates and instead catalyze CO₂ hydrolysis to bicarbonate, which shifts capacity upward at the cost of slower kinetics.

The regeneration energy for MEA systems runs 3.0-3.5 GJ per ton CO₂. Roughly 40-50% of this goes to providing the reaction enthalpy — breaking the carbamate bond and deprotonating the amine-H⁺. The remainder, often underestimated, goes to heating and vaporizing water. Advanced proprietary amines like Shell's CANSOLV and Fluor's Econamine FG Plus target 2.3-2.7 GJ/ton by shifting to sterically hindered amines that form weaker carbamate bonds, reducing water content, and integrating process heat recovery. These are incremental improvements to a thermodynamic landscape where the fundamental heat of reaction for the N-CO₂ bond remains the floor.

## Metal-Organic Frameworks: Designed for the Job

Metal-organic frameworks (MOFs) are among the most exciting developments in materials science over the past two decades. These crystalline structures consist of metal ion nodes connected by organic linker molecules, forming nanometer-scale pores. By varying the metal center and the organic linker, researchers can precisely tune pore size, shape, and chemical functionality.

This **designability** is the MOF's defining advantage over conventional adsorbents. Traditional porous materials like zeolites and activated carbon have fixed structures determined by nature or by relatively simple synthesis. MOFs can be engineered at the molecular level for a specific application. For CO₂ capture, this means introducing amine-functionalized pore walls, open metal sites that bind CO₂ preferentially, or pore dimensions that exclude nitrogen by size.

Some MOFs achieve CO₂ adsorption capacities several times higher than the best zeolites, with regeneration energies approaching the thermodynamic minimum. A handful of MOFs can release captured CO₂ under mild vacuum or gentle heating, dramatically reducing the energy penalty.

But MOFs face serious hurdles on the path to commercial deployment. Scalable synthesis remains expensive — many high-performance MOFs rely on costly organic linkers and large volumes of solvent. Water vapor in real flue gas degrades many MOF structures or competes for adsorption sites. And the long-term cycling stability data that industrial operators demand simply does not exist for most candidates. A MOF that survives 100 lab cycles is promising; an industrial capture plant needs a material that performs reliably for years.

The gap between laboratory performance and industrial conditions is wide. MOFs represent the highest-potential pathway for next-generation carbon capture materials, but they are likely 5-10 years from meaningful commercial deployment.

### Key MOF Topologies for CO₂ Capture

Three MOF architectures dominate the carbon capture literature, each anchoring a distinct design principle.

**MOF-74 (Mg₂(dobdc))** exposes a high density of coordinatively unsaturated metal sites — open magnesium atoms — along one-dimensional hexagonal channels. Each open Mg site can bind one CO₂ molecule via an end-on electrostatic interaction, achieving 5-6 mmol CO₂ per gram at 1 bar and 25°C. This is among the highest volumetric capacities of any known physisorbent under realistic partial pressures. The trade-off is moisture sensitivity: water directly competes for open metal sites and begins degrading the framework within hours under humid flue gas. Recent Mg₂(m-dobdc) variants partially address this by introducing hydrophobic methyl groups into the linker without sacrificing open site density.

**HKUST-1 (Cu₃(BTC)₂)** features a paddlewheel motif — two copper ions bridged by four carboxylate groups — arranged in a cubic framework with three intersecting pore sizes. Its open copper sites adsorb CO₂ across a broad pressure range, and the material benefits from simple, solvent-based synthesis using commercially available linkers. Capacity under dry conditions reaches 4-5 mmol/g, but performance collapses above roughly 40% relative humidity as water molecules displace CO₂ at the copper centers. Encapsulation strategies, including graphene oxide composites and post-synthetic hydrophobic coatings, have restored some humid performance in lab tests but add synthesis cost and complexity.

**ZIF-8 (Zn(mIm)₂)** adopts a sodalite (SOD) zeolitic topology with zinc-imidazolate bonds that impart exceptional thermal and chemical stability — the material survives boiling in water and organic solvents. Its pore aperture of roughly 3.4 Å acts as a molecular gate: the aperture is large enough to admit CO₂ (kinetic diameter 3.3 Å) but effectively excludes larger molecules and slows diffusion of similarly sized N₂. This size-sieving effect delivers an ideal CO₂/N₂ selectivity of 10-15 at moderate pressures, though selectivity narrows under dynamic breakthrough conditions where diffusion kinetics dominate. ZIF-8's CO₂ capacity (roughly 1-2 mmol/g at 1 bar) is modest compared to MOF-74, but its durability under realistic humidity and contaminant exposure makes it among the most industrially credible MOF candidates for near-term deployment.

## Zeolites: Cheap and Proven, but Not Optimized

Zeolites are microporous aluminosilicate minerals that have been used in industrial catalysis, gas separation, and ion exchange for decades. They are cheap, thermally stable, and well-characterized under real-world conditions.

Unlike amines, which capture CO₂ through chemical bonding, zeolites rely on physisorption — the CO₂ molecule is held by weaker van der Waals forces and electrostatic interactions within the pore structure. This makes regeneration easier (mild heating or pressure swing is sufficient) but limits selectivity and capacity under real flue gas conditions.

The weakness of zeolites for CO₂ capture is most apparent in competitive adsorption. Flue gas is roughly 70-75% nitrogen, 10-15% CO₂, and 5-10% water vapor. Zeolites adsorb nitrogen and water readily. Water in particular is strongly retained in hydrophilic zeolites and can dramatically reduce CO₂ uptake. In humid flue gas, many zeolites perform far worse than their dry-lab data suggests.

Recent research focuses on ion-exchange modifications (replacing charge-balancing cations to tune pore dimensions and electric fields) and surface functionalization to improve CO₂/N₂ selectivity. Nano-sized zeolite crystals can reduce diffusion path lengths and improve adsorption kinetics. But these are incremental improvements to a material that was not designed for CO₂ capture in the first place.

### Zeolite Framework Types and CO₂ Selectivity

Among the 260+ recognized zeolite framework types, three stand out for CO₂ separation, each with a distinct mechanism of selectivity.

**Faujasite (FAU)**, commercially available as zeolite 13X, is the workhorse of industrial gas drying and CO₂ removal. Its 12-ring pores (roughly 7.4 Å) give ample CO₂ access and a high accessible surface area, yielding capacities of 3-4 mmol/g under dry single-component conditions. The bottleneck is N₂ co-adsorption: FAU's large pores permit nitrogen access roughly equal to CO₂, yielding an equilibrium CO₂/N₂ selectivity of only 3-8. Under humid gas streams, selectivity drops further as water outcompetes CO₂ at the hydrophilic aluminum sites. Replacing sodium cations with lithium or potassium narrows effective pore windows and increases the local electric field gradient, modestly improving CO₂/N₂ discrimination.

**MFI-type zeolites (silicalite-1, ZSM-5)** possess a medium-pore 10-ring channel system (5.1-5.6 Å). The narrower channels introduce a kinetic separation effect: CO₂ diffuses faster through the pore network than the slightly larger N₂ molecule, yielding kinetic selectivities of 15-30 despite modest equilibrium adsorption differences. High-silica silicalite-1 variants reduce framework hydrophilicity, preserving about 70% of dry CO₂ capacity under humid breakthrough conditions — a significant advantage over standard FAU.

**Chabazite (CHA)** involves a small-pore 8-ring system (roughly 3.8 Å apertures) with cage-like adsorption chambers. This topology creates a trapping effect: CO₂ passes through the aperture into the cage, but N₂ requires overcoming a higher diffusion barrier. CHA zeolites, particularly SSZ-13 with tailored silicon-to-aluminum ratios, deliver CO₂/N₂ selectivities above 20 under dry conditions. Ion exchange with divalent cations (Ca²⁺, Sr²⁺) further sharpens selectivity by polarizing the framework electric field to favor the CO₂ quadrupole moment. CHA's disadvantage is capacity — roughly 1.5-2.5 mmol/g at realistic partial pressures, below that of FAU or MFI — creating a selectivity-versus-capacity trade-off characteristic of small-pore zeolites.

Zeolites will likely serve in niche roles — perhaps as a pre-concentration step or in applications where low material cost outweighs moderate performance.

## Direct Air Capture: An Order of Magnitude Harder

Point-source capture is difficult; direct air capture (DAC) is an order of magnitude harder. Atmospheric CO₂ concentration is roughly 420 ppm (0.042%), compared to 10-15% in coal flue gas — a 300-fold difference. A DAC contactor must process 300 times more gas volume to capture the same mass of CO₂, placing extreme demands on material throughput, contactor design, and energy efficiency.

DAC materials face a distinct set of challenges. The contactor is open to the atmosphere, exposing the material to weather, dust, and ambient pollutants. The low CO₂ concentration demands exceptionally high selectivity — any competitive adsorption from nitrogen, oxygen, or water vapor drastically reduces effective capacity. And because the captured CO₂ per unit mass of material is so low, the regeneration cycle must be exceptionally efficient.

Two main approaches have reached pilot and commercial scale. **Liquid solvent DAC**, deployed by Carbon Engineering (now part of 1PointFive), uses a potassium hydroxide (KOH) solution that captures CO₂ from air, then passes the carbonate-rich solution through a calciner at roughly 900°C to release the CO₂. The high calcination temperature is the main energy penalty — the process requires significant natural gas input, though electric calcination powered by clean energy is under development.

**Solid sorbent DAC**, deployed by Climeworks, passes air through filters coated with amine-functionalized materials. CO₂ is released by heating the filter to 80-120°C, much lower than the liquid route. Climeworks' Orca and Mammoth facilities in Iceland use geothermal energy for this heat, keeping the overall carbon footprint low. However, solid sorbents degrade over time due to oxygen exposure and amine oxidation, requiring periodic replacement that adds operating cost.

The scale progression tells the industry trajectory. Orca, commissioned in 2021 in Hellisheiði, Iceland, captures roughly 4,000 tons CO₂ per year using eight modular collector containers, each housing stacked arrays of amine-functionalized cellulose filters. Mammoth, commissioned in 2024 at the same site, scales to 36,000 tons/year using 72 collector containers — nine times Orca's capacity. The captured CO₂ is mixed with water and injected into basaltic rock by Carbfix, where it mineralizes to stable carbonate within two years. Climeworks has publicly targeted megaton-scale capacity by 2030, with projects under development in the United States (Louisiana, funded through DOE DAC Hub grants) and Norway.

Carbon Engineering's liquid solvent route, now developed by 1PointFive under Occidental Petroleum, takes a different operational philosophy. The first commercial-scale plant, Stratos, is under construction in Ector County, Texas, targeting 500,000 tons/year capacity. Its design circulates roughly 50,000 liters of KOH solution through an air contactor — essentially a 20-meter-tall forced-draft cooling tower repurposed for CO₂ absorption. The calcination step, which heats calcium carbonate to roughly 900°C to regenerate the KOH loop, consumes approximately 8 GJ/ton as natural gas, releasing roughly 0.3 tons CO₂ per ton captured. With permanent geologic storage of the captured stream and 45Q credits at $180/ton, the net economics are positive even before planned electrification of the calciner.

The energy trade-off between the two approaches is stark: liquid DAC requires roughly 8-12 GJ/ton primarily as high-temperature heat, while solid DAC operates at 5-8 GJ/ton as low-temperature heat that can be supplied by waste or geothermal sources.

## Recent MOF Developments (2024-2026)

The past three years have seen significant progress on the key weaknesses of MOFs for carbon capture. Water stability — historically the Achilles' heel — has been addressed through hydrophobic functionalization, high-valence metal nodes (Zr⁴⁺, Ti⁴⁺), and MOF@polymer composites that protect the framework while maintaining pore accessibility.

On the commercialization front, NuMat Technologies and MOFapps have begun offering MOF-based products at ton-scale for gas storage and industrial separation. While not yet targeting flue gas CO₂ capture, the manufacturing infrastructure they are building — scalable synthesis, quality control, supply chains — will benefit carbon capture applications when the right MOFs are ready.

Water-stable MOF-801 and MIL-101(Cr) variants have demonstrated sustained CO₂ uptake under humid conditions. Researchers at UC Berkeley and KAIST have independently shown MOF-coated contactor prototypes achieving stable performance through thousands of adsorption-desorption cycles under simulated flue gas — a significant step toward industrial credibility.

The contrast with amine systems is instructive. A well-optimized MEA scrubber operates at roughly 0.3-0.5 mmol CO₂ per gram of solution per cycle and requires 3-3.5 GJ/ton for regeneration. Leading MOF candidates such as Mg₂(dobdc) and CALF-20 achieve 3-5 mmol/g with regeneration energies below 2 GJ/ton. The challenge is translating this lab advantage into an industrial process that remains cost-competitive after accounting for synthesis cost, contactor fabrication, and sorbent lifetime.

## The Economics of Materials Innovation

The carbon capture cost curve is ultimately determined by materials performance. At current natural gas prices, each GJ of thermal energy adds roughly $5-8 to the per-ton capture cost. Reducing regeneration energy from 3 GJ/ton (current amine baseline) to 1.5 GJ/ton (achievable with advanced MOFs or solid sorbents) saves $7-12/ton — significant but not transformative alone.

Capital expenditure matters just as much. A capture plant using an expensive MOF at $50/kg may require similar or higher upfront investment than an amine system using $2/kg solvent, even with better operating efficiency. The key metric is levelized cost of capture, which includes sorbent lifetime, replacement frequency, contactor size, and auxiliary energy consumption — not just adsorption capacity.

Recent life-cycle analyses suggest next-generation solid sorbents could achieve $30-50/ton for point-source capture, compared to $60-100/ton for current amine systems. Reaching this target requires a material that simultaneously achieves: (1) regeneration energy below 1.5 GJ/ton, (2) working capacity above 2 mmol/g, (3) stability through at least 10,000 cycles, and (4) scalable synthesis cost below $10-20/kg. No material has demonstrated all four simultaneously — but the gap is narrowing.

Public investment is accelerating. The U.S. Department of Energy has committed over $3 billion to carbon capture demonstration projects through 2026 under the Bipartisan Infrastructure Law and Inflation Reduction Act. The Carbon Negative Shot initiative explicitly ties materials targets to cost goals: $100/ton for DAC and $30/ton for point-source capture by 2035. Meeting these targets will likely require not a single material but a portfolio — different sorbents optimized for different CO₂ sources, humidity levels, and temperature windows — deployed through shared capture infrastructure that reduces per-plant capital costs. The material that wins at a cement kiln (high CO₂, dry, high temperature) may not be the same one that wins at a natural gas power plant (low CO₂, humid, moderate temperature), and neither will work for DAC without significant adaptation.

### Policy Economics Driving Materials Demand

The economics of carbon capture materials cannot be understood only through process engineering. Carbon pricing and tax credits create the market pull that determines whether a $30/ton sorbent or a $60/ton sorbent matters at all.

The **EU Emissions Trading System (EU ETS)** is the world's largest carbon market and has undergone a structural shift since 2023. Allowance prices hovered around €60-80/ton in the early 2020s; following the Fit for 55 package and accelerated free allocation phase-out for heavy industry, prices crossed €100/ton in early 2025 and are projected to reach €120-160/ton by 2030 under current market tightening schedules. At these levels, the entire existing $60-100/ton amine capture envelope becomes commercially viable without additional subsidy — provided the CO₂ can be stored under the EU's emerging CCS regulatory framework.

In the United States, the **Section 45Q tax credit**, expanded under the Inflation Reduction Act, provides a direct per-ton payment for carbon capture: $85/ton for permanent geologic storage (CCS), $60/ton for utilization including enhanced oil recovery, and $180/ton for direct air capture with geologic storage. These are 12-year credits with prevailing wage and apprenticeship requirements. The DAC premium at $180/ton already exceeds operational costs for both Climeworks' solid sorbent and Carbon Engineering's liquid solvent routes, making early commercial DAC facilities economically viable in the US before manufacturing scale reduces upfront capital costs.

The gap between US and EU policy creates strategic tension. Section 45Q is an explicit production subsidy — capture a ton and receive payment. The EU ETS is a price penalty — emit a ton and pay. The former de-risks investment for first-mover projects; the latter creates a durable incentive that strengthens with time as the cap tightens. A materials developer evaluating which market to target must account for both current credits and the trajectory of the underlying carbon price, since Section 45Q credits sunset after 12 years while an ETS obligation is permanent.

For DAC specifically, voluntary carbon markets have been an early revenue bridge. Microsoft, Stripe, and Shopify have committed hundreds of millions in advance purchase agreements at $200-600/ton — well above regulatory credit levels — signaling demand for permanent, verifiable removals rather than avoided emissions. These commitments directly fund sorbent material research at Climeworks and competitors, bridging the period before regulatory carbon prices catch up to DAC operating costs.

## No Silver Bullet

Carbon capture will not be solved by a single breakthrough material. The three families of capture materials each address different parts of the problem, and each has clear limitations:

- **Amines** are operationally ready but energy-intensive and approaching their performance ceiling.
- **MOFs** offer the highest theoretical efficiency but remain expensive, unproven at scale, and sensitive to real-world conditions.
- **Zeolites** are cheap and robust but lack the selectivity and capacity for high-efficiency capture.

The likely outcome is not one winner but a portfolio of materials matched to specific sources. High-purity CO₂ streams (cement kilns, ethanol plants) might use simple physical adsorbents. Coal power plants may continue using amines with waste-heat integration to reduce the penalty. Natural gas combined-cycle plants, with their lower CO₂ concentrations, might benefit from advanced zeolites or early commercial MOFs. Long-term, MOF-based membranes that separate CO₂ without a regeneration step could bypass the energy penalty entirely — but that technology remains years from pilot testing.

The challenges also extend beyond materials chemistry. Integration with existing power plant heat and water systems, solvent or sorbent handling at massive scale, CO₂ transport and storage infrastructure, and regulatory frameworks all matter. But the materials question is the hardest scientific bottleneck. Until a capture material exists that combines low cost, low regeneration energy, high selectivity, and long-term stability under real flue gas conditions, carbon capture will remain a technology of great promise and limited deployment.
