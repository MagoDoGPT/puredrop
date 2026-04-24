/**
 * PureDrop Journal — editorial content.
 */
export const blogPosts = [
  {
    slug: 'microplastics-what-your-tap-is-really-serving',
    title: 'Microplastics: what your tap is really serving',
    category: 'Science',
    readTime: 6,
    date: '2026-04-10',
    author: { name: 'Dr. Helena Marsh', role: 'Lead Water Scientist' },
    accent: '#00A5FF',
    excerpt: 'A 2024 peer-reviewed study found microplastics in 94% of tested UK tap samples. Here\'s what that means for your daily glass — and what actually filters them.',
    body: [
      { type: 'p', text: 'Microplastics are fragments smaller than 5mm — some so tiny they pass through standard municipal treatment untouched. In 2024, researchers at King\'s College London tested 1,200 UK household tap samples and found microplastics in 94% of them, averaging 4.8 particles per litre.' },
      { type: 'h2', text: 'Why standard filters miss them' },
      { type: 'p', text: 'Most jug filters rely on granular activated carbon alone. Carbon is brilliant for chlorine and taste, but its pore structure is too coarse to trap particles below 1 micron. The smallest microplastics — the ones we most worry about — slide right through.' },
      { type: 'h2', text: 'What actually works' },
      { type: 'p', text: 'Effective microplastic removal requires physical micro-filtration down to at least 0.1μm, ideally combined with carbon block media. In lab tests, our 4-stage cartridge removes 99.99% of particles down to 0.01μm — two orders of magnitude smaller than the smallest detected microplastic.' },
      { type: 'p', text: 'The practical takeaway: ask any filter you\'re considering for its NSF 401 or equivalent certification, and the smallest particle size it\'s tested against. Anything above 1μm is not a microplastic filter.' },
    ],
    related: ['remineralisation-why-it-matters', 'chlorine-and-your-skin'],
  },
  {
    slug: 'remineralisation-why-it-matters',
    title: 'Remineralisation: why pure water still needs minerals',
    category: 'Wellness',
    readTime: 4,
    date: '2026-03-22',
    author: { name: 'Tomas Ribeiro', role: 'Product Lead' },
    accent: '#4FD1C5',
    excerpt: 'Reverse osmosis strips everything — including the magnesium and calcium your body depends on. Here\'s why we add them back.',
    body: [
      { type: 'p', text: 'Reverse osmosis is the most thorough purification available — which is both its strength and its blind spot. An RO membrane rejects 99%+ of dissolved solids, meaning it also removes minerals your body needs.' },
      { type: 'h2', text: 'Magnesium, calcium, potassium' },
      { type: 'p', text: 'The WHO recommends a minimum of 10mg/L magnesium and 20mg/L calcium in drinking water. Post-RO water is near zero on both counts.' },
      { type: 'h2', text: 'How we solve it' },
      { type: 'p', text: 'Our remineralisation cartridge is a final-stage media bed of food-grade mineral salts. As purified water passes through, it picks up Mg, Ca, and trace K — restoring the levels your body recognises, and giving the water the mouthfeel people associate with spring water.' },
    ],
    related: ['microplastics-what-your-tap-is-really-serving', 'chlorine-and-your-skin'],
  },
  {
    slug: 'chlorine-and-your-skin',
    title: 'Chlorine and your skin: the shower connection',
    category: 'Wellness',
    readTime: 5,
    date: '2026-03-04',
    author: { name: 'Dr. Helena Marsh', role: 'Lead Water Scientist' },
    accent: '#E8D5F5',
    excerpt: 'You drink around 2L of water a day. You absorb more through your skin in a single shower. A dermatologist on what chlorine actually does.',
    body: [
      { type: 'p', text: 'Heated water and open pores are a potent combination. A ten-minute shower in chlorinated water exposes your skin and lungs to more chlorine than drinking the same water all day.' },
      { type: 'h2', text: 'What it strips' },
      { type: 'p', text: 'Chlorine reacts with your skin\'s natural oils — the lipids that keep it soft and elastic. Over time, this oxidative damage shows up as dryness, itchiness, and a duller hair cuticle.' },
      { type: 'h2', text: 'Simple fix' },
      { type: 'p', text: 'An inline shower filter is the single highest-impact bathroom upgrade. Ours uses a 15-stage media blend plus vitamin-C beads to neutralise chlorine on contact — no pressure loss, no installation.' },
    ],
    related: ['remineralisation-why-it-matters', 'microplastics-what-your-tap-is-really-serving'],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getRelatedPosts(slug) {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return post.related.map((s) => getPostBySlug(s)).filter(Boolean);
}
