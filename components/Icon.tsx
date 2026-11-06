/**
 * Sitedeki tek ikon seti: 24px ızgara, 1.5px çizgi, dolgu yok.
 * Unicode ok/× glifleri yerine kullanılır (fonttan fonta genişlikleri değişiyordu).
 */
const PATHS = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-down": "M12 5v14M6 13l6 6 6-6",
  "arrow-up-right": "M7 17L17 7M8 7h9v9",
  "arrow-left": "M19 12H5M11 6l-6 6 6 6",
  close: "M6 6l12 12M18 6L6 18",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
