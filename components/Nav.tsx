import Link from "next/link";

import CommandPalette from "@/components/CommandPalette";
import { navLinks, site } from "@/lib/content";

export default function Nav() {
  return (
    <nav className="nav" aria-label="Ana menü">
      <div className="nav-in">
        <Link href="/#top" className="logo" aria-label={`${site.name}, sayfa başı`}>
          {site.logo.mark}
          <span>{site.logo.suffix}</span>
        </Link>
        <div className="nav-links">
          {navLinks
            .filter((link) => !link.cta)
            .map((link) => (
              <Link key={link.href} href={`/${link.href}`} className="nav-link">
                {link.label}
              </Link>
            ))}
          <CommandPalette />
          {navLinks
            .filter((link) => link.cta)
            .map((link) => (
              <Link key={link.href} href={`/${link.href}`} className="btn ghost nav-cta">
                {link.label}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
}
