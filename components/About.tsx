import Reveal from "@/components/Reveal";
import { about } from "@/lib/content";
import { rich } from "@/lib/rich-text";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about-grid">
        <Reveal className="about" index={0}>
          <div className="sec-eyebrow">{about.eyebrow}</div>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{rich(paragraph)}</p>
          ))}
        </Reveal>

        <Reveal className="about-side" index={1}>
          <h3>{about.sidebarTitle}</h3>
          {about.facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <span>{fact.label}</span>
              <span>{fact.value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
