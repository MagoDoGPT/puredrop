/**
 * PureDrop — Single source of truth for all product data.
 * Consumed by ShopPage (grid) and ProductPage (detail).
 */

export const CATEGORIES = {
  SIGNATURE: 'Signature',
  KITCHEN: 'Kitchen',
  HOME: 'Home',
  BATHROOM: 'Bathroom',
  ACCESSORIES: 'Accessories',
};

export const products = [
  {
    handle: 'signature-bottle',
    name: 'PureDrop Signature Bottle',
    tagline: 'The patented 4-in-1 water transformation bottle',
    category: CATEGORIES.SIGNATURE,
    signature: true,
    price: 189,
    compareAtPrice: 240,
    currency: 'GBP',
    currencySymbol: '£',
    badge: null,
    rating: 4.9,
    reviews: 1268,
    shortDescription:
      'Patented portable bottle that filters, mineralises, hydrogenates and structures water — in a single device. Carry transformation.',
    longDescription:
      'The Signature Bottle is the only product in the PureDrop range protected by a registered patent. A 4-in-1 chamber transforms ordinary water in under 90 seconds: a nano-membrane filters microplastics and chlorine, a ceramic core releases magnesium, calcium and potassium, an electrolytic cell infuses molecular hydrogen, and a hexagonal vortex restructures cluster size for faster cellular absorption. Hand-finished in stainless steel and borosilicate glass — engineered to be the last bottle you ever buy.',
    heroIcon: 'signatureBottle',
    colorAccent: '#0EA5E9',
    pillars: [
      {
        id: 'filter',
        icon: 'pillarFilter',
        title: 'Filters',
        copy: 'Nano-membrane removes microplastics, chlorine and heavy metals down to 0.01μm.',
      },
      {
        id: 'mineralize',
        icon: 'pillarMineralize',
        title: 'Mineralises',
        copy: 'Ceramic core restores magnesium, calcium and potassium for living, balanced water.',
      },
      {
        id: 'hydrogenate',
        icon: 'pillarHydrogen',
        title: 'Hydrogenates',
        copy: 'Electrolytic cell infuses molecular H₂, a known antioxidant linked to lower oxidative stress.',
      },
      {
        id: 'structure',
        icon: 'pillarStructure',
        title: 'Structures',
        copy: 'Hexagonal vortex re-orders cluster geometry — smaller clusters absorb faster at cell level.',
      },
    ],
    gallery: [
      { id: 'g1', label: 'Front view', icon: 'signatureBottle' },
      { id: 'g2', label: 'Mineralisation core', icon: 'pillarMineralize' },
      { id: 'g3', label: 'Hydrogen cell', icon: 'pillarHydrogen' },
      { id: 'g4', label: 'Structuring vortex', icon: 'pillarStructure' },
    ],
    highlights: [
      'Patented 4-in-1 transformation chamber',
      'Filters · Mineralises · Hydrogenates · Structures',
      '750ml — fits standard cup holders',
      'Borosilicate glass + 316 stainless shell',
      'USB-C charging · 30 cycles per charge',
      '5-year limited warranty',
    ],
    specs: [
      { label: 'Capacity', value: '750 ml' },
      { label: 'Material', value: 'Borosilicate glass + 316 stainless steel' },
      { label: 'Dimensions', value: '24 × 7 × 7 cm' },
      { label: 'Weight (empty)', value: '480 g' },
      { label: 'Filtration', value: 'Nano-membrane (0.01μm)' },
      { label: 'Hydrogen output', value: 'Up to 1,200 ppb dissolved H₂' },
      { label: 'Battery', value: '1,200 mAh · USB-C · ~30 cycles per charge' },
      { label: 'Patents', value: 'GB2587910 · EP3978456' },
      { label: 'Certifications', value: 'NSF 42, NSF 53, NSF 401, WRAS, CE' },
    ],
    inTheBox: ['Signature Bottle (750ml)', '1 × patented 4-in-1 transformation core', 'USB-C charging cable', 'Travel sleeve in vegan leather', 'Microfibre cloth', 'Owner\'s manual & 5-year warranty'],
    faq: [
      {
        q: 'What does "4-in-1" actually mean?',
        a: 'A single chamber performs four steps in sequence: filtration, mineral release, hydrogen infusion, and molecular structuring. Press once and the bottle does all four in 90 seconds.',
      },
      {
        q: 'Is hydrogen-rich water safe?',
        a: 'Yes. Molecular hydrogen has been studied in over 1,200 peer-reviewed papers and is recognised as safe by the FDA. Concentrations from our cell sit between 800–1,200 ppb, well within studied therapeutic ranges.',
      },
      {
        q: 'How long does the core last?',
        a: 'The transformation core is rated for 1,500 cycles — roughly 12 months for daily users. Replacement cores are £45 and ship via subscription if you choose.',
      },
      {
        q: 'Why is this bottle patented?',
        a: 'No other portable bottle combines all four functions in a single chamber. Our patents (GB2587910 in the UK and EP3978456 in Europe) cover the integrated geometry and the order of operations.',
      },
      {
        q: 'Can I drink hot water from it?',
        a: 'The bottle is rated for 4–60°C. Above 60°C the hydrogen cell dissipates dissolved H₂ rapidly, which defeats the purpose. Use The Carafe for hot beverages.',
      },
    ],
    related: ['the-carafe', 'home-purifier', 'replacement-cartridges'],
  },

  {
    handle: 'the-carafe',
    name: 'The Carafe',
    tagline: 'Glass pitcher with 4-stage micro-filtration',
    category: CATEGORIES.KITCHEN,
    price: 85,
    compareAtPrice: 110,
    currency: 'GBP',
    currencySymbol: '£',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 2847,
    shortDescription:
      'Beautiful borosilicate glass pitcher with 4-stage micro-filtration. Removes microplastics, chlorine & restores essential minerals, glass by glass.',
    longDescription:
      'The Carafe turns your dining table into a centrepiece of wellness. Hand-blown borosilicate glass holds 1.8L of freshly purified water, while our 4-stage cartridge removes microplastics down to 0.01 microns, neutralises chlorine, and reintroduces magnesium, calcium, and potassium. Zero plastic, zero waste.',
    heroIcon: 'carafe',
    colorAccent: '#00A5FF',
    gallery: [
      { id: 'g1', label: 'Front view', icon: 'carafe' },
      { id: 'g2', label: 'Detail — spout', icon: 'drop' },
      { id: 'g3', label: 'In-use', icon: 'pour' },
      { id: 'g4', label: 'Filter cartridge', icon: 'filter' },
    ],
    highlights: [
      '4-stage micro-filtration (0.01μm)',
      'Removes 99.99% of microplastics',
      'Restores Mg, Ca, K minerals',
      '1.8L hand-blown borosilicate glass',
      'Dishwasher safe (top rack)',
      'Cartridge lasts 3 months / 300L',
    ],
    specs: [
      { label: 'Capacity', value: '1.8 L' },
      { label: 'Material', value: 'Borosilicate glass + food-grade silicone' },
      { label: 'Dimensions', value: '26 × 14 × 10 cm' },
      { label: 'Weight (empty)', value: '1.1 kg' },
      { label: 'Filtration stages', value: '4' },
      { label: 'Cartridge life', value: '3 months / 300 L' },
      { label: 'Certifications', value: 'NSF 42, NSF 53, WRAS' },
    ],
    inTheBox: ['The Carafe (1.8L)', '1 × 4-stage filter cartridge', 'Silicone lid seal', 'Microfibre polishing cloth', 'Quick-start guide'],
    faq: [
      {
        q: 'How long does one cartridge last?',
        a: 'A single cartridge filters up to 300 litres, or about 3 months of daily use for a family of four. The lid indicator tells you exactly when to swap.',
      },
      {
        q: 'Is the glass safe for hot water?',
        a: 'Yes. The carafe is made from borosilicate glass and can handle water up to 90°C without thermal shock. We recommend room-temperature water for best filtration.',
      },
      {
        q: 'Can I put it in the dishwasher?',
        a: 'The glass body is top-rack dishwasher safe. Always remove the cartridge before washing — it should be rinsed with cool tap water only.',
      },
      {
        q: 'What exactly does it remove?',
        a: 'Microplastics (down to 0.01μm), chlorine, chloramines, heavy metals (lead, copper), pesticides, and VOCs. It leaves in the essential minerals your body needs.',
      },
      {
        q: 'How does the subscription work?',
        a: 'Cartridge refills arrive every 3 months automatically. Pause, skip, or cancel any time from your account. Subscribers save 15% on every refill.',
      },
    ],
    related: ['signature-bottle', 'home-purifier', 'tap-filter'],
  },

  {
    handle: 'home-purifier',
    name: 'Home Purifier',
    tagline: 'Countertop reverse-osmosis dispenser',
    category: CATEGORIES.HOME,
    price: 299,
    compareAtPrice: 349,
    currency: 'GBP',
    currencySymbol: '£',
    badge: 'New',
    rating: 4.8,
    reviews: 912,
    shortDescription:
      'Zero-install countertop reverse osmosis with smart remineralisation. Cold, ambient, and hot pure water in seconds.',
    longDescription:
      'Our Home Purifier brings lab-grade reverse osmosis to your kitchen counter — no plumber required. A 4-stage RO membrane strips contaminants down to 0.0001μm, then a remineralisation cartridge restores the minerals your body needs. The smart display shows TDS in real time, and three temperature presets deliver exactly the water you want, instantly.',
    heroIcon: 'purifier',
    colorAccent: '#1565C0',
    gallery: [
      { id: 'g1', label: 'Hero', icon: 'purifier' },
      { id: 'g2', label: 'Display close-up', icon: 'display' },
      { id: 'g3', label: 'Dispensing', icon: 'pour' },
      { id: 'g4', label: 'Filters', icon: 'filter' },
    ],
    highlights: [
      'Reverse osmosis (0.0001μm)',
      'Smart remineralisation',
      'Hot / ambient / cold in seconds',
      'Real-time TDS display',
      'Zero installation — plug & play',
      'Reduces plastic bottle waste by 98%',
    ],
    specs: [
      { label: 'Tank capacity', value: '5 L purified + 10 L raw' },
      { label: 'Power', value: '900 W (hot) / 75 W (cold)' },
      { label: 'Dimensions', value: '42 × 28 × 45 cm' },
      { label: 'Weight', value: '12.4 kg' },
      { label: 'Filtration stages', value: '5 (incl. RO + remin)' },
      { label: 'Filter life', value: 'PP/GAC 6m · RO 24m · Post 12m' },
      { label: 'Certifications', value: 'NSF 58, WRAS, CE' },
    ],
    inTheBox: ['Home Purifier unit', 'Starter 5-stage filter set', 'Power cable (UK plug)', 'Installation-free setup guide', '2-year warranty card'],
    faq: [
      {
        q: 'Do I need a plumber?',
        a: 'No. The Home Purifier is fully countertop — you fill the raw-water tank and plug it in. No drilling, no pipes.',
      },
      {
        q: 'How fast is the hot water?',
        a: 'About 6 seconds from tap to 90°C, on demand. No kettle, no waiting, no boiling.',
      },
      {
        q: 'What does the TDS display mean?',
        a: 'TDS (total dissolved solids) shows incoming vs outgoing water quality in ppm. Most UK tap water reads 200–500 ppm; our RO brings it below 10.',
      },
      {
        q: 'Can I use it in a hard-water area?',
        a: 'Absolutely — RO is especially effective in hard-water regions, and the remineralisation cartridge compensates so the water still tastes alive.',
      },
    ],
    related: ['signature-bottle', 'the-carafe', 'under-sink', 'replacement-cartridges'],
  },

  {
    handle: 'under-sink',
    name: 'Under-Sink Pro',
    tagline: 'Hidden 5-stage filter for a dedicated drinking tap',
    category: CATEGORIES.KITCHEN,
    price: 449,
    compareAtPrice: 520,
    currency: 'GBP',
    currencySymbol: '£',
    badge: null,
    rating: 4.8,
    reviews: 487,
    shortDescription:
      'Professional-grade 5-stage filtration installed below your sink, dispensing pure water through a dedicated brushed-steel tap.',
    longDescription:
      'Under-Sink Pro disappears into your kitchen cabinet and delivers unlimited filtered water through a slim, brushed-steel companion tap. A 5-stage cartridge stack — sediment, GAC, carbon block, RO membrane, and remineralisation — strips contaminants to 0.0001μm and restores essential minerals. Engineered for UK plumbing standards with quick-fit connectors. Includes professional installation in mainland UK.',
    heroIcon: 'underSink',
    colorAccent: '#2D6A8E',
    gallery: [
      { id: 'g1', label: 'System & tap', icon: 'underSink' },
      { id: 'g2', label: 'Companion tap', icon: 'tap' },
      { id: 'g3', label: 'Filter stack', icon: 'filter' },
      { id: 'g4', label: 'Quick-fit fittings', icon: 'adapter' },
    ],
    highlights: [
      '5-stage RO + remineralisation',
      'Dedicated brushed-steel tap included',
      '0.0001μm membrane filtration',
      'Quick-fit JG connectors',
      'Professional install included (mainland UK)',
      'Filter life: 12 months typical use',
    ],
    specs: [
      { label: 'Flow rate', value: '1.6 L / min (filtered)' },
      { label: 'System dimensions', value: '38 × 15 × 42 cm (fits standard cabinet)' },
      { label: 'Tap finish', value: 'Brushed 304 stainless steel' },
      { label: 'Connections', value: '3/8" quick-fit JG' },
      { label: 'Filtration', value: '5-stage (incl. RO + remin)' },
      { label: 'Filter life', value: '12 months / 4,000 L' },
      { label: 'Certifications', value: 'NSF 58, WRAS, CE' },
    ],
    inTheBox: ['Under-sink filter housing', '5-stage cartridge set (pre-installed)', 'Brushed-steel companion tap', 'Quick-fit hoses & adapters', 'Drain saddle', 'Professional installation voucher'],
    faq: [
      {
        q: 'Is installation really included?',
        a: 'Yes — a vetted PureDrop engineer installs the system within 14 days of order anywhere in mainland UK. Highlands and islands are quoted separately.',
      },
      {
        q: 'Will it fit my cabinet?',
        a: 'The unit is 38cm tall and fits 95% of UK kitchen cabinets. If yours is shallower, we offer a horizontal-mount version at no extra cost — just tell us at checkout.',
      },
      {
        q: 'Does it need electricity?',
        a: 'No — the system is fully passive and runs on mains water pressure. No plug, no power bill.',
      },
      {
        q: 'How is it different from the Tap Filter?',
        a: 'The Tap Filter clips onto your existing tap and uses a 3-stage carbon cartridge. Under-Sink Pro is a permanent install with a separate dedicated tap and full 5-stage RO — far higher purity, much lower cost per litre.',
      },
    ],
    related: ['signature-bottle', 'home-purifier', 'whole-home', 'replacement-cartridges'],
  },

  {
    handle: 'tap-filter',
    name: 'Tap Filter',
    tagline: 'Faucet attachment — pure water instantly',
    category: CATEGORIES.KITCHEN,
    price: 65,
    compareAtPrice: 80,
    currency: 'GBP',
    currencySymbol: '£',
    badge: null,
    rating: 4.7,
    reviews: 1543,
    shortDescription:
      'Sleek faucet attachment that transforms tap water into alkaline drinking water with a single lever. Fits 98% of UK taps.',
    longDescription:
      'The Tap Filter clips onto your existing kitchen tap in under a minute — no tools, no plumber. A three-stage carbon-block cartridge removes chlorine, sediment, and heavy metals, while alkaline beads raise pH to 8.5. A simple lever switches between filtered and raw water, so your tap does everything.',
    heroIcon: 'tap',
    colorAccent: '#4FD1C5',
    gallery: [
      { id: 'g1', label: 'Installed', icon: 'tap' },
      { id: 'g2', label: 'Lever close-up', icon: 'lever' },
      { id: 'g3', label: 'Cartridge', icon: 'filter' },
      { id: 'g4', label: 'Fitting', icon: 'adapter' },
    ],
    highlights: [
      '3-stage carbon-block filter',
      'Raises pH to 8.5 (alkaline)',
      'Removes chlorine, sediment, lead',
      'Fits 98% of UK taps',
      'Tool-free install in 60 seconds',
      'Cartridge lasts 2 months / 200L',
    ],
    specs: [
      { label: 'Flow rate', value: '2 L / min (filtered)' },
      { label: 'Material', value: 'Brushed 304 stainless steel' },
      { label: 'Dimensions', value: '8 × 6 × 6 cm' },
      { label: 'Weight', value: '320 g' },
      { label: 'Adapters included', value: '4 (M22, M24, F22, F24)' },
      { label: 'Cartridge life', value: '2 months / 200 L' },
      { label: 'Certifications', value: 'NSF 42, WRAS' },
    ],
    inTheBox: ['Tap Filter housing', '1 × alkaline carbon cartridge', '4 × universal adapters', 'Seal tape', 'Install guide'],
    faq: [
      {
        q: 'Will it fit my tap?',
        a: 'Yes — our universal adapters fit M22, M24, F22, and F24 threads, covering 98% of UK and EU kitchen taps. If it doesn\'t fit, we\'ll refund in full.',
      },
      {
        q: 'Can I switch to unfiltered water?',
        a: 'Yes. A side lever toggles between filtered (for drinking) and raw (for washing dishes) so you only use the cartridge when you need to.',
      },
      {
        q: 'What does alkaline water do?',
        a: 'It balances body pH and tastes smoother than acidic tap water. Our beads raise pH to a mild 8.5 — noticeable, never chalky.',
      },
    ],
    related: ['signature-bottle', 'the-carafe', 'shower-filter', 'replacement-cartridges'],
  },

  {
    handle: 'shower-filter',
    name: 'Shower Filter',
    tagline: 'Soft skin, silky hair, every shower',
    category: CATEGORIES.BATHROOM,
    price: 95,
    compareAtPrice: 120,
    currency: 'GBP',
    currencySymbol: '£',
    badge: 'Editor\'s Pick',
    rating: 4.9,
    reviews: 2104,
    shortDescription:
      'Inline shower filter removes chlorine, chloramines, and heavy metals for healthier hair and softer skin.',
    longDescription:
      'Chlorine in UK shower water strips natural oils from your hair and skin. Our Shower Filter threads between your hose and showerhead in one minute — a 15-stage media blend removes chlorine, chloramines, and heavy metals, while vitamin-C beads neutralise residual oxidants. After two weeks, you\'ll feel the difference.',
    heroIcon: 'shower',
    colorAccent: '#E8D5F5',
    gallery: [
      { id: 'g1', label: 'Installed', icon: 'shower' },
      { id: 'g2', label: 'Detail', icon: 'filter' },
      { id: 'g3', label: 'Vitamin-C beads', icon: 'beads' },
      { id: 'g4', label: 'Threading', icon: 'adapter' },
    ],
    highlights: [
      '15-stage filtration media',
      'Removes chlorine & chloramines',
      'Vitamin-C infusion',
      'Universal 1/2" thread fitment',
      'Tool-free inline install',
      'Cartridge lasts 6 months',
    ],
    specs: [
      { label: 'Flow rate', value: '9 L / min' },
      { label: 'Material', value: 'Chrome-finished ABS + stainless' },
      { label: 'Dimensions', value: '9 × 9 × 11 cm' },
      { label: 'Weight', value: '280 g' },
      { label: 'Thread', value: '1/2" BSP (universal)' },
      { label: 'Cartridge life', value: '6 months' },
      { label: 'Certifications', value: 'NSF 177' },
    ],
    inTheBox: ['Shower Filter unit', '1 × 15-stage cartridge', 'Vitamin-C bead sachet', 'Teflon tape', 'Install guide'],
    faq: [
      {
        q: 'Will my water pressure drop?',
        a: 'No — the filter is engineered for 9 L/min, matching typical UK showers. Most users feel no difference in pressure.',
      },
      {
        q: 'How soon will I notice a difference?',
        a: 'Most customers report softer skin after a week and silkier hair after two. If you have sensitive skin, it can be sooner.',
      },
      {
        q: 'Does it work with electric showers?',
        a: 'Yes, as long as the shower uses a standard 1/2" BSP connection — which covers virtually all UK electric and mixer showers.',
      },
    ],
    related: ['signature-bottle', 'the-carafe', 'tap-filter', 'replacement-cartridges'],
  },

  {
    handle: 'whole-home',
    name: 'Whole-Home System',
    tagline: 'Pure water at every tap, throughout your home',
    category: CATEGORIES.HOME,
    price: null,
    compareAtPrice: null,
    priceFrom: 1850,
    quoteOnly: true,
    currency: 'GBP',
    currencySymbol: '£',
    badge: 'Bespoke',
    rating: 4.9,
    reviews: 142,
    shortDescription:
      'Point-of-entry filtration for the entire household — soft, pure water from every tap, shower and appliance. Designed and installed by our engineers.',
    longDescription:
      'The Whole-Home System sits at your mains water entry and treats every drop before it reaches a single tap, shower or appliance. A four-vessel architecture — sediment pre-filter, granular activated carbon, salt-free conditioner, and UV sterilisation — removes chlorine, microplastics, heavy metals and microbes while preventing limescale buildup. Each install is bespoke: we survey your property, recommend the right configuration, and project-manage the install end-to-end. Suitable for homes from 2 to 8 bedrooms.',
    heroIcon: 'wholeHome',
    colorAccent: '#1E3A5F',
    gallery: [
      { id: 'g1', label: 'Installed system', icon: 'wholeHome' },
      { id: 'g2', label: 'Filter vessels', icon: 'filter' },
      { id: 'g3', label: 'UV chamber', icon: 'pillarHydrogen' },
      { id: 'g4', label: 'Smart monitor', icon: 'display' },
    ],
    highlights: [
      'Treats every tap, shower & appliance',
      '4-vessel pro architecture',
      'Salt-free limescale prevention',
      'UV sterilisation built-in',
      'Bespoke survey & install included',
      '10-year system warranty',
    ],
    specs: [
      { label: 'Flow rate', value: 'Up to 60 L / min' },
      { label: 'Footprint', value: 'From 1.2 × 0.6 m (configuration dependent)' },
      { label: 'Filtration', value: 'Sediment + GAC + conditioner + UV' },
      { label: 'Service interval', value: '12 months' },
      { label: 'Property size', value: '2 – 8 bedrooms' },
      { label: 'Certifications', value: 'WRAS, NSF 42, NSF 53, NSF 55' },
      { label: 'Warranty', value: '10 years (system) / 5 years (UV)' },
    ],
    inTheBox: ['On-site survey by PureDrop engineer', 'Bespoke system configuration', 'All vessels, media and fittings', 'Full installation & commissioning', 'First annual service', '10-year system warranty'],
    faq: [
      {
        q: 'Why is there no fixed price?',
        a: 'Every home is different. A 2-bed flat needs a different configuration than an 8-bed country home — the survey ensures you only pay for the capacity you need. Most installs land between £1,850 and £4,200.',
      },
      {
        q: 'How long does installation take?',
        a: 'Once the survey is approved, install takes one full day. Water is off for around 2–3 hours during the connection.',
      },
      {
        q: 'Will it affect my boiler or appliances?',
        a: 'On the contrary — softer, cleaner water extends the life of boilers, dishwashers and washing machines. Most customers see scale-related callouts disappear within 6 months.',
      },
      {
        q: 'How do I get a quote?',
        a: 'Request a survey from this page and one of our engineers will be in touch within 48 hours to schedule a visit. The survey is free with no obligation.',
      },
    ],
    related: ['signature-bottle', 'home-purifier', 'under-sink'],
  },

  {
    handle: 'replacement-cartridges',
    name: 'Replacement Cartridges',
    tagline: 'Keep every drop as pure as day one',
    category: CATEGORIES.ACCESSORIES,
    price: 24,
    compareAtPrice: 30,
    currency: 'GBP',
    currencySymbol: '£',
    badge: 'Subscribe & Save',
    rating: 4.9,
    reviews: 4120,
    shortDescription:
      'Genuine PureDrop cartridges for the Signature Bottle, Carafe, Tap and Shower Filter. Subscribe and save 15%.',
    longDescription:
      'The only cartridges engineered specifically for PureDrop hardware. Each one is recyclable through our free mail-back programme — send the old one back with your new order.',
    heroIcon: 'filter',
    colorAccent: '#E0F5EE',
    gallery: [
      { id: 'g1', label: 'Signature core', icon: 'filter' },
      { id: 'g2', label: 'Carafe cartridge', icon: 'filter' },
      { id: 'g3', label: 'Tap cartridge', icon: 'filter' },
      { id: 'g4', label: 'Shower cartridge', icon: 'filter' },
    ],
    highlights: [
      'Genuine PureDrop media',
      'Free recycling mail-back',
      'Subscribe: 15% off every refill',
      'Skip, pause, cancel any time',
    ],
    specs: [
      { label: 'Available for', value: 'Signature · Carafe · Tap · Shower' },
      { label: 'Packaging', value: '100% recycled cardboard' },
      { label: 'Ships from', value: 'Manchester, UK' },
    ],
    inTheBox: ['1 × selected cartridge', 'Pre-paid recycling bag'],
    faq: [
      {
        q: 'How do I know when to swap?',
        a: 'The Signature Bottle and Carafe both have indicator lights; the Tap and Shower filters slow noticeably when exhausted. Subscribers receive theirs right on time.',
      },
      {
        q: 'Can I recycle the old one?',
        a: 'Yes — every order includes a pre-paid return bag. Drop it at any Royal Mail box and we handle the rest.',
      },
    ],
    related: ['signature-bottle', 'the-carafe', 'tap-filter', 'shower-filter'],
  },
];

export function getProductByHandle(handle) {
  return products.find((p) => p.handle === handle) || null;
}

export function getRelatedProducts(handle) {
  const product = getProductByHandle(handle);
  if (!product) return [];
  return product.related
    .map((h) => getProductByHandle(h))
    .filter(Boolean);
}

export function getProductsByCategory(category) {
  if (!category || category === 'All') return products;
  return products.filter((p) => p.category === category);
}

export function getSignatureProduct() {
  return products.find((p) => p.signature) || null;
}
