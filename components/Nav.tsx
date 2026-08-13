import { navLinks, site } from "@/lib/content";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-in">
        <a href="#top" className="logo">
          {site.logo.mark}
          <span>{site.logo.suffix}</span>
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={link.cta ? "nav-cta" : undefined}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
