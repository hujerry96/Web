---
title: 'The Rare Earth Crisis vs Materials Substitution: Permanent Magnets for EV Motors'
slug: 'rare-earth-magnet-alternatives'
description: 'NdFeB is the strongest permanent magnet, but over 70% of rare earth supply comes from China. Alternative materials MnBi, MnAl, and ferrite each offer different tradeoffs.'
keywords: ['rare earth', 'NdFeB', 'permanent magnet', 'MnBi', 'ferrite', 'EV motor']
author: 'Jerry Hu'
date: 2026-07-24
cover: ./cover.webp
updated: 2026-07-24
category: 'guides'
tags: ['Materials Science', 'Rare Earth', 'Electric Vehicle', 'Magnets']
locale: 'en'

draft: false
---

# The Rare Earth Crisis vs Materials Substitution: Permanent Magnets for EV Motors

## Why NdFeB Dominates

EV drive motors demand permanent magnets that are compact, lightweight, and highly efficient. Neodymium-Iron-Boron (NdFeB) is the strongest commercially available permanent magnet, with a maximum energy product (BHmax) exceeding 50 MGOe — far ahead of any other mass-produced magnet. This allows EV motors to achieve high power density in a small package, directly benefiting range and cabin space.

The exceptional performance of NdFeB stems from the unique electron structure of rare earth elements like neodymium (Nd) and dysprosium (Dy), which deliver extremely high coercivity and remanence. Over the past two decades, NdFeB has become the de facto standard for EV drive motors.

## The Rare Earth Supply Risk

The Achilles' heel of NdFeB is its supply chain. Over 70% of rare earth mining and more than 90% of processing capacity is concentrated in China. This is not merely a market concentration — China holds decades of lead in rare earth separation technology, and export control policies have turned this advantage into a geopolitical lever.

In 2023, China announced export restrictions on rare earth extraction and separation technologies, directly impacting permanent magnet supply chains in Japan, Europe, and North America. For an EV industry producing millions of vehicles annually, any supply disruption translates into massive cost exposure.

## The Alternative Materials Landscape

### MnBi: The High-Temperature Dark Horse

MnBi's room-temperature energy product (~8 MGOe) is far below NdFeB, but it has a unique advantage: a **positive temperature coefficient of coercivity**. While most permanent magnets — including NdFeB — lose coercivity as temperature rises, MnBi actually gains coercivity above 150°C. This makes it a compelling candidate for EV motors, which typically operate at 100–200°C.

Above 150°C, MnBi's usable magnetic performance can exceed that of NdFeB at the same volume. This means MnBi-based motors could maintain stable performance without active cooling, simplifying thermal management.

### Ferrite: Cheap but Limited

Ferrite permanent magnets are the most mature and cheapest option, with an energy product around 5 MGOe — roughly one-tenth that of NdFeB. They are suitable for entry-level motors and auxiliary applications, but cannot meet the power density requirements of high-performance EVs.

### MnAl and Ce-Substituted NdFeB

MnAl and Ce-substituted NdFeB occupy the middle ground. Their energy products range from 10–20 MGOe, with significantly lower material cost than NdFeB. However, mass production processes — particularly extrusion and hot deformation — have not yet reached automotive-grade maturity. Ce substitution is especially attractive because cerium is the most abundant rare earth element, carrying far less supply risk than neodymium or dysprosium.

## How High Temperature Changes the Comparison

At room temperature, the ranking is clear: NdFeB >> Ce-NdFeB > MnAl > MnBi > ferrite. But EV motors operate at 100–200°C, and that changes everything.

MnBi's positive temperature coefficient means its coercivity *increases* with temperature, unlike every other magnet on this list. Above 150°C, its usable energy product can match or exceed NdFeB at the same volume. This makes MnBi uniquely suited for high-temperature applications without the need for heavy rare earth additives like dysprosium.

## System-Level Optimization: Materials × Design

The ultimate answer to the rare earth problem may not be a single replacement material, but a co-optimization of materials and motor design. Weaker magnets can be compensated by better thermal management, advanced control algorithms, and optimized magnetic circuit topology.

Ferrite combined with concentrated windings and improved cooling channels can achieve acceptable power density in entry-level vehicles. MnBi in a hybrid magnetic circuit can exploit its high-temperature advantage where it matters most. And Ce-substituted NdFeB offers a pragmatic middle path — reducing rare earth cost without a complete redesign of existing motor lines.

## How EV Motor Design Affects Magnet Requirements

Motor topology fundamentally dictates magnet material requirements. Interior permanent magnet (IPM) motors — the dominant architecture in EVs from Toyota to Tesla — combine reluctance torque with permanent magnet torque. IPM rotors operate at higher temperatures and face greater demagnetization risk, which is why manufacturers add dysprosium to NdFeB to boost high-temperature coercivity.

Surface-mounted permanent magnet (SPM) motors, by contrast, rely entirely on permanent magnet torque and are more sensitive to remanence than coercivity. MnBi's positive temperature coefficient gives it a unique advantage in IPM designs, where thermal stability is critical. The choice of motor architecture therefore shapes the viability of each alternative material.

## Price Volatility and Supply Chain Realignment

Rare earth prices have experienced dramatic swings over the past decade. In 2011, after China imposed export restrictions, neodymium oxide prices surged from $50,000/tonne to over $500,000/tonne. Another price spike occurred in 2021–2022, driven by surging EV demand and pandemic-disrupted supply chains. A typical 80 kW drive motor requires 0.5–1 kg of NdFeB magnet; doubling rare earth prices can increase motor cost by 15–30%.

In response, governments and companies are diversifying supply. MP Materials has restarted California's Mountain Pass mine and is building domestic separation capacity. European recyclers REEtec and Solvay are expanding processing lines. Japan's Toyota Tsusho and Sumitomo are collaborating on processes that reduce dysprosium content. However, building a fully vertically integrated supply chain — from ore to finished magnet — will take 5–10 years.

## Grain Boundary Diffusion: Smarter Dysprosium Use

Grain boundary diffusion (GBD) is the most significant process innovation in recent years. The conventional approach distributes dysprosium uniformly throughout the magnet alloy, requiring high concentrations that drive up cost. GBD applies dysprosium only along grain boundaries after sintering, selectively strengthening coercivity where it matters most. This cuts dysprosium usage by 50–70% while preserving comparable magnetic performance.

Hitachi Metals (now Proterial) pioneered GBD at industrial scale, followed by Chinese producers like San Huan. While GBD cannot eliminate dysprosium demand entirely, it substantially reduces heavy rare earth dependence for high-performance motors.

## Automaker Efforts to Eliminate Rare Earths

Several automakers are accelerating development of reduced-rare-earth or rare-earth-free motor designs. Tesla announced in 2023 that its next-generation powertrain would use permanent magnet motors containing no rare earth elements, shifting toward ferrite-induction hybrid designs. BMW's fifth-generation eDrive — deployed in the iX3 and i4 — already uses an externally excited synchronous motor (EESM) that generates rotor magnetic fields through coils rather than permanent magnets, completely bypassing rare earth requirements.

Startups like Renaissance are developing axial-flux motors that achieve high power density with ferrite magnets alone. These developments underscore that the rare earth problem may be solved not only through new materials, but through fundamental shifts in motor design philosophy.

## The State of Rare Earth Magnet Recycling

Currently, less than 5% of NdFeB magnets are recycled — far below the recycling rates of lead-acid batteries or steel. The reasons are economic: limited magnet scrap volumes, difficult separation from motor assemblies, and volatile rare earth prices that make recycling investments risky. But the coming wave of retired EVs will change this — by 2030, millions of tonnes of end-of-life motors will need processing.

Short-loop recycling (directly remelting scrap magnets into new product) is the most economical near-term route. Longer term, hydrogen decrepitation and liquid metal extraction technologies could push recycling rates above 80%. The EU's Critical Raw Materials Act has set a strategic target of 15% recycling for rare earths by 2030, creating regulatory pressure to scale up recycling infrastructure.

## Recent Breakthroughs in Material Systems

Several research advances between 2024 and 2026 have opened new possibilities. Iron nitride (Fe₁₆N₂) thin films exhibit a theoretical energy product exceeding 100 MGOe — nearly double NdFeB's ceiling — though bulk-scale synthesis remains a profound challenge. Japan's NIMS has developed SmFeN bonded magnets with better magnetic retention at 200°C than NdFeB, without using heavy rare earths.

In nanocomposite magnets, MnBi/FeCo dual-phase nanowires have demonstrated interfacial exchange coupling that significantly enhances energy product, pointing toward a new design paradigm for next-generation permanent magnets. These breakthroughs are still at the laboratory stage but suggest that the long-term trajectory points beyond NdFeB entirely.

Meanwhile, Chinese manufacturers continue to push the performance ceiling of conventional NdFeB. In 2025, Yunsheng and JL MAG both announced sintered NdFeB grades exceeding 60 MGOe with dysprosium content below 1%, achieved through optimized grain boundary diffusion and multi-main-phase alloy design. This incremental improvement — using less heavy rare earth to get more performance — is itself a form of substitution and remains the most commercially impactful trend in the near term.

## Market Outlook: NdFeB Demand vs Substitution Trajectories

Despite the push for alternatives, the IEA projects NdFeB demand for EV motors will grow 5–7x by 2040 under net-zero scenarios, driven by rising EV adoption and larger magnet masses per vehicle as trucks and SUVs electrify. Even aggressive substitution scenarios only reduce NdFeB demand growth by 15–25% — the absolute volume of rare earths required continues to rise.

This paradox means that alternative materials and recycling are complementary, not competing, strategies. Every tonne of MnBi or ferrite-based motor displaces NdFeB demand at the margin, while recycling recovers value from the growing stock of magnets already in use. The market is likely to segment: premium EVs will continue using NdFeB (with reduced Dy via GBD), mid-range vehicles will adopt Ce-substituted NdFeB, and entry-level or urban EVs will increasingly use ferrite-based motor designs. Beyond automotive, wind turbine generators — the second-largest NdFeB consumer — face similar supply pressures and are shifting toward superconducting and gearbox-drivetrain configurations that reduce magnet mass per megawatt.

## The Geopolitical Picture: US and EU Responses

China's stranglehold on rare earth processing has triggered legislative responses on both sides of the Atlantic. The US Inflation Reduction Act (IRA) includes provisions for critical mineral supply chains, offering tax credits for domestic magnet manufacturing and accelerating permitting for new mining and processing facilities. The EU's Critical Raw Materials Act, enacted in 2024, sets binding benchmarks: at least 10% of annual rare earth consumption from domestic extraction, 40% from processing within the EU, and 25% from recycled sources by 2030.

Japan and South Korea have formed a rare earth supply chain alliance, stockpiling key oxides and jointly funding exploration in Vietnam, Australia, and Kazakhstan. The International Energy Agency now classifies rare earth magnets as a critical material for clean energy transitions, placing them alongside lithium and cobalt in strategic importance. Australia's Lynas Rare Earths has emerged as the largest non-Chinese producer, supplying 10-15% of global demand from its Mount Weld deposit and Kalgoorlie processing plant. Canada's Vital Metals and Brazil's Serra Verde are developing additional sources, though bringing new rare earth mines to production typically requires 7–10 years from discovery to first output.

## Rare Earth Cost Breakdown in EV Motors

Rare earth materials typically account for 15–30% of the total cost of an EV traction motor, and 2–5% of the total battery-electric vehicle cost. In a typical 80 kW IPM motor, the NdFeB magnet mass is 0.5–1.5 kg depending on design. With neodymium prices at roughly $100–150/kg (2024–2025 levels) and dysprosium at $200–300/kg, the magnet material cost alone ranges from $50 to $200 per motor.

The heavy rare earth content (dysprosium and terbium) adds disproportionately to cost and supply risk. Even though Dy typically constitutes only 3–8% of the magnet weight, it can account for 30–50% of the raw material cost. This cost structure explains the intense industry focus on grain boundary diffusion and other techniques to minimize heavy rare earth addition without sacrificing high-temperature performance.

## Iron Nitride (Fe₁₆N₂): The 100+ MGOe Theoretical Giant

Iron nitride — specifically the α″-Fe₁₆N₂ phase — has tantalized the magnetics community for over four decades. Its theoretical BHmax exceeds 100 MGOe, roughly double the current NdFeB ceiling. As a material built from iron and nitrogen alone, it promises rare-earth-free performance that surpasses NdFeB. The physics behind this is compelling: Fe₁₆N₂ derives its giant magnetization from the unique arrangement of nitrogen in the distorted iron lattice, which creates an extraordinarily high saturation magnetization — higher than any known iron-based compound.

The catch is synthesis. Fe₁₆N₂ is metastable: the α″ phase decomposes above ~200°C, making conventional sintering impossible. For decades, researchers could only produce it as thin films via molecular beam epitaxy or sputtering, limited to thicknesses of tens of nanometers. Bulk synthesis has been pursued through nitriding of iron powders under controlled ammonia atmospheres, spark plasma sintering, and mechanical alloying with nitrogen-bearing precursors — but none has produced densified bulk magnets with energy products above 20 MGOe.

Progress between 2020 and 2026 has shifted the outlook. Hitachi Metals (Proterial) demonstrated sputtered Fe₁₆N₂ thin-film magnets achieving 60 MGOe in 2022. The University of Minnesota and Niron Magnetics have advanced a gas-phase nitriding process that produces Fe₁₆N₂ powder — not yet at bulk magnet density, but crossing the threshold where bonded magnets become commercially interesting. Niron raised $75 million from Volvo Cars Tech Fund and GM Ventures in 2023–2024, signaling automaker interest in a rare-earth-free magnet with NdFeB-grade performance. If bulk sintering is ever solved — and significant funding is now behind that effort — Fe₁₆N₂ would render the entire rare earth supply chain discussion obsolete.

## SmFeN: Japan's Bonded Magnet Strategy

The National Institute for Materials Science (NIMS) in Japan has been developing samarium-iron-nitrogen (Sm₂Fe₁₇N₃) bonded magnets since the 1990s, and the technology reached a commercial inflection point around 2023–2024. SmFeN magnets achieve a remanence of 0.8–1.0 T and coercivity of 8–12 kOe — comparable to mid-grade NdFeB — with a BHmax of 16–28 MGOe in bonded form. Crucially, SmFeN retains its coercivity better than NdFeB at temperatures above 150°C without heavy rare earth additions.

Numerically, the comparison breaks down as follows. A typical NdFeB bonded magnet (MQ1 or MQP-B grade) delivers BHmax of 8–12 MGOe with a maximum operating temperature of 120–150°C before irreversible losses exceed 5%. A comparable SmFeN bonded magnet delivers BHmax of 16–22 MGOe — roughly double — with a maximum operating temperature above 180°C, all without dysprosium or terbium. The tradeoff is that SmFeN cannot be sintered into fully dense magnets because the Sm₂Fe₁₇N₃ phase decomposes above ~600°C. This limits the form factor to bonded magnets (magnet powder embedded in a polymer or metal matrix), which inherently have lower density and thus lower absolute BHmax than sintered NdFeB.

SmFeN's samarium content also merits scrutiny. Samarium is a light rare earth, less geopolitically concentrated than neodymium — China's share of global samarium production is roughly 60%, versus 70%+ for neodymium. Toyota Tsusho has partnered with NIMS-affiliated suppliers to industrialize SmFeN production for automotive auxiliary motors, positioning it as a complementary material rather than a wholesale NdFeB replacement for traction motors.

## Wind Turbine Generators: NdFeB's Second Front

Direct-drive wind turbine generators are the second-largest consumer of NdFeB magnets after EV traction motors. A single 5 MW direct-drive permanent magnet generator contains roughly 500–700 kg of NdFeB, equivalent to the magnet mass of over 500 EV motors. The reason is mechanical: direct-drive turbines eliminate the gearbox — which is the most frequent failure point in traditional turbines — by coupling the rotor directly to a large-diameter, low-speed permanent magnet generator. This requires massive magnet volume to produce sufficient flux across a large air gap.

The economics are shifting. Offshore wind turbines now routinely exceed 10 MW, with 15–18 MW designs entering production. At 15 MW direct-drive, magnet mass approaches 2 tonnes per turbine. Under the IEA's net-zero scenario, annual offshore wind additions exceed 80 GW by 2030 — translating to NdFeB demand on the order of 15,000–20,000 tonnes per year for wind alone. This competes directly with EV demand for the same neodymium and dysprosium supply.

Manufacturers are responding with hybrid designs. GE Renewable Energy's 14 MW Haliade-X switched from full direct-drive to a medium-speed geared generator, reducing magnet mass by roughly 40% while maintaining 98%+ efficiency. Siemens Gamesa and Vestas are exploring superconducting generators that replace permanent magnets with low-temperature superconducting coils — eliminating rare earths entirely, but adding the cost and complexity of cryogenic cooling systems. For onshore turbines below 5 MW, ferrite-based generators are gaining traction: Chinese manufacturer Goldwind deployed ferrite permanent magnet generators in its 3 MW platforms, accepting a 5–10% weight penalty to eliminate rare earth exposure.

## Axial-Flux Motor Startups: A Topology-Driven Alternative

Axial-flux motors represent a fundamentally different magnetic circuit topology from the radial-flux IPM and SPM motors that dominate EV traction drives. In an axial-flux motor, the magnetic flux travels parallel to the rotor axis rather than radially outward, creating a disc-shaped form factor with a much shorter flux path. This geometric difference has direct implications for magnet requirements.

The most prominent axial-flux pioneer is YASA (Yokeless And Segmented Armature), acquired by Mercedes-Benz in 2021 for integration into the AMG electric performance platform. YASA's topology achieves torque densities of 10–14 Nm/kg — roughly double a typical radial-flux IPM motor — with a motor that is 60–70% lighter and 50% shorter axially. Critically, axial-flux motors use segmented, flat-shape NdFeB magnets rather than the curved or rectangular magnets of radial-flux rotors. The magnet volume per kW is comparable, but the shorter flux path reduces iron losses and allows higher operating speeds.

Axial-flux topology also changes the coercivity requirement. The segmented magnet design, combined with lower rotor temperatures due to better cooling geometry, reduces the need for dysprosium content. YASA claims its motors operate with Dy-free NdFeB in the 45–50 MGOe range, achieving 200 kW peak power in a package weighing under 25 kg. Beyond Mercedes, startups like Beyond Motors (UK) and Magnax (Belgium) are developing axial-flux motors that target ferrite magnets for cost-sensitive applications. The short flux path of axial-flux machines partially compensates for weaker magnets, and combined with direct conductor cooling, ferrite-based axial-flux designs can approach the power density of radial-flux NdFeB motors at roughly half the magnet cost.

## The NdFeB Manufacturing Process: Where Material Science Matters

Understanding why NdFeB is difficult to substitute requires understanding how it is made. The manufacturing chain has four critical stages, each demanding tight tolerance on chemistry and microstructure.

**Strip casting** begins with melting neodymium, iron, boron, and additive elements (Dy, Tb, Co, Cu, Al, Ga) in an induction furnace. The molten alloy is poured onto a water-cooled copper wheel rotating at high speed, quenching it into flakes roughly 0.2–0.4 mm thick. Cooling rate control is paramount: too slow yields coarse α-Fe dendrites that ruin magnetic alignment later; too fast yields an amorphous structure that resists grain growth during sintering. The target is a homogeneous Nd₂Fe₁₄B matrix with a finely distributed Nd-rich grain boundary phase — the foundation for coercivity.

**Hydrogen decrepitation (HD)** exposes the strip-cast flakes to hydrogen gas at 0.1–1 MPa. The Nd-rich grain boundary phase absorbs hydrogen and expands, fracturing the flakes into a coarse powder. This step is chemically selective — hydrogen attacks only the Nd-rich intergranular phase, leaving the Nd₂Fe₁₄B grains intact. The particle size after HD is typically 100–500 µm.

**Jet milling** reduces the HD powder to the final particle size: 2–5 µm, roughly single-crystal dimension for Nd₂Fe₁₄B. High-pressure nitrogen gas accelerates particles into collision; the narrow size distribution is essential because alignment during pressing is particle-size-dependent. A 6 µm median with a tail down to 1 µm produces better alignment and higher remanence than a broader distribution. Oxygen exposure must be minimized — oxidation at this stage kills sinterability.

**Sintering and annealing** consolidate the fine powder into a fully dense magnet. The powder is aligned in a magnetic field (1.5–2 T) and pressed into a green compact, then sintered at 1,050–1,100°C under vacuum or argon. The Nd-rich phase melts and redistributes along grain boundaries, creating magnetically isolated Nd₂Fe₁₄B grains — the microstructural key to coercivity. Post-sinter annealing at 500–600°C optimizes the grain boundary phase distribution. The final magnet is machined, coated (typically Ni-Cu-Ni for corrosion resistance), and magnetized in a pulsed field of 3–5 T.

Grain boundary diffusion, discussed earlier, inserts into this process between sintering and annealing: a dysprosium- or terbium-bearing compound is applied to the sintered magnet surface and diffuses along grain boundaries during a secondary heat treatment. This selectively coats Nd₂Fe₁₄B grain surfaces with a high-anisotropy shell — the reason GBD achieves comparable coercivity at 50–70% less heavy rare earth.

## Rare Earth Price Trajectory: 2010–2026

The price history of neodymium and dysprosium reveals the volatility that drives substitution efforts. Neodymium oxide (Nd₂O₃, 99% purity) traded at roughly $50–60/kg through 2010. In mid-2011, China imposed a 40% export quota cut and consolidated rare earth mining under state-controlled entities. Prices exploded: Nd₂O₃ peaked at $350–550/kg in July 2011, while dysprosium oxide (Dy₂O₃) surged from $100/kg to over $3,000/kg — a 30x increase in six months. The panic subsided after WTO intervention and quota liberalization, and by 2013–2014 Nd₂O₃ had retreated to $50–70/kg with Dy₂O₃ around $300–500/kg.

The pandemic era triggered a second spike. Neodymium oxide rose from $70/kg in mid-2020 to $150–170/kg by January 2022, while dysprosium climbed from $300/kg to $600–800/kg over the same period. The driver was simultaneous EV production ramp-up in China, Europe, and the US, combined with logistic disruptions at Chinese ports. Prices softened through 2023–2024 as Chinese domestic production expanded and Mountain Pass output reached 40,000 tonnes REO per year. Nd₂O₃ settled in the $90–130/kg range through mid-2025, with Dy₂O₃ at $250–400/kg.

In early 2026, Nd₂O₃ prices moved toward $120–150/kg as EU and US magnet manufacturing capacity came online, pulling demand against an inelastic supply base. Dysprosium remained at $300–450/kg, elevated by heavy rare earth scarcity — Dy occurs at roughly 1–5% concentration within bastnäsite and monazite deposits, making its supply inherently coupled to neodymium production volume. Each unit of Nd₂O₃ output from Mountain Pass yields roughly 0.02–0.05 units of Dy₂O₃, creating a structural supply imbalance. Terbium oxide — used in the highest-coercivity grades — reached $1,200–2,000/kg in 2025, reflecting its even greater scarcity.

These price trajectories explain why grain boundary diffusion has been the most impactful innovation of the past decade: at 2026 prices, removing dysprosium from a 1 kg magnet saves $15–50 in raw material cost. Across 10 million motors per year, that is a $150–500 million annual differential — more than enough to justify the capital cost of GBD equipment.

## Conclusion

The rare earth supply risk is real, but the solution is not a single magic material — it is diversification at every level of the supply chain, from mining jurisdiction to magnet chemistry to motor architecture. MnBi's unique high-temperature behavior, ferrite's cost advantage in low-end applications, and the middle-ground options of MnAl and Ce-substituted NdFeB together form a diversified material strategy. The ultimate answer will likely be a co-optimization of materials and motor design — using smarter systems, advanced thermal management, and hybrid magnetic circuit topologies to compensate for less powerful but more resilient magnets. The global race to diversify rare earth supply chains will take a decade or more. But the engineering efforts running in parallel — grain boundary diffusion, nanocomposite magnets, and redesigned motor architectures — can deliver immediate cost and resilience improvements without waiting for new mines to come online.

Slug: `rare-earth-magnet-alternatives`
