import ActionLink from "@/components/ActionLink";
import HeroTrace from "@/components/HeroTrace";
import { hero } from "@/lib/content";

/**
 * Sayfadaki giriş anı burada: ilk açılışta başlık satırları, alt metin ve
 * eylemler 70ms arayla yükselir (globals.css → .rise); ardından sağdaki
 * şemada bir istek bir kez yolunu çizer.
 */
export default function Hero() {
  const [primary, ...rest] = hero.ctas;

  return (
    <header id="top" className="hero">
      <div className="wrap">
        <h1 className="hero-title">
          <span className="rise" style={{ "--i": 0 } as React.CSSProperties}>
            {hero.headline.lead}
          </span>{" "}
          <span className="rise" style={{ "--i": 1 } as React.CSSProperties}>
            {hero.headline.accent}
          </span>
        </h1>

        <div className="hero-main">
          <div className="hero-copy rise" style={{ "--i": 2 } as React.CSSProperties}>
            <p className="hero-sub">
              {hero.sub.before}
              <b>{hero.sub.strong}</b>
              {hero.sub.after}
            </p>

            <div className="hero-cta">
              <ActionLink {...primary} icon="arrow-down" />
              {rest.map((cta) => (
                <ActionLink
                  key={cta.href}
                  href={cta.href}
                  label={cta.label}
                  variant="text"
                  external={"external" in cta && cta.external}
                />
              ))}
            </div>
          </div>

          <HeroTrace />
        </div>

        {/* Rakamlar dev puntoyla değil, cümle olarak: değer + bağlamı aynı satırda. */}
        <ul className="hero-facts rise" style={{ "--i": 4 } as React.CSSProperties}>
          {hero.stats.map((stat) => (
            <li key={stat.value}>
              <b>{stat.value}</b> {stat.label}
            </li>
          ))}
          <li>{hero.eyebrow}</li>
        </ul>
      </div>
    </header>
  );
}
