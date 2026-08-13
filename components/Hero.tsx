import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <header id="top" className="hero-header">
      <div className="wrap">
        <p className="eyebrow">
          <span className="dot" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 className="hero">
          {hero.headline.lead} <span className="ac">{hero.headline.accent}</span>
        </h1>

        <p className="hero-sub">
          {hero.sub.before}
          <b>{hero.sub.strong}</b>
          {hero.sub.after}
        </p>

        <div className="stats">
          {hero.stats.map((stat) => (
            <div className="stat" key={stat.value}>
              <div className="n">{stat.value}</div>
              <div className="l">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-cta">
          {hero.ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`btn ${cta.variant}`}
              {...("external" in cta && cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
