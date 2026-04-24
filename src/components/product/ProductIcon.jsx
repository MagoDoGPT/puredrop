const PATHS = {
  carafe: 'M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7M8 3h8M12 3v4',
  purifier: 'M5 3v18M19 3v18M5 8h14M5 16h14M12 8v8',
  tap: 'M12 3v4M8 7h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM12 13v8M9 21h6',
  shower: 'M12 2v6M9 8h6a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3zM8 19v-3M12 21v-5M16 19v-3',
  filter: 'M4 4h16l-5 8v8l-6-2v-6L4 4z',
  drop: 'M12 3l6 9a6 6 0 1 1-12 0l6-9z',
  pour: 'M6 4h10v6c0 3-2 5-5 5s-5-2-5-5V4zM11 15v5M8 20h6',
  display: 'M4 6h16v10H4zM8 20h8M12 16v4',
  lever: 'M4 12h10a3 3 0 0 1 3 3v3M14 12V9',
  adapter: 'M6 4h12v6l-4 4v6H10v-6L6 10V4z',
  beads: 'M7 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM13 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM10 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM10 17a2 2 0 1 1 4 0 2 2 0 0 1-4 0z',
  // Signature Bottle: tall portable bottle with cap and core indicator
  signatureBottle: 'M9 2h6M10 2v3M14 2v3M8 5h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM9 11h6M9 15h6M12 11v4',
  // Under-sink: cabinet box with tap above
  underSink: 'M10 3h4v3M9 6h6M12 6v3M5 10h14v10H5zM8 13h2M14 13h2M8 17h8',
  // Whole-home: house silhouette with droplet inside
  wholeHome: 'M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10zM12 11l3 4.5a3 3 0 1 1-6 0L12 11z',
  // 4 pillars
  pillarFilter: 'M5 4h14l-4 7v6l-6 2v-8L5 4z',
  pillarMineralize: 'M12 3l3 4-3 4-3-4 3-4zM6 12l3 4-3 4-3-4 3-4zM18 12l3 4-3 4-3-4 3-4zM12 13l3 4-3 4-3-4 3-4z',
  pillarHydrogen: 'M5 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM8 11h8M12 4v3M12 17v3',
  pillarStructure: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 3v18M4 7.5l8 4.5 8-4.5M4 16.5l8-4.5 8 4.5',
};

export default function ProductIcon({ name, stroke = '#00A5FF', className = '' }) {
  const d = PATHS[name] || PATHS.drop;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
