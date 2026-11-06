import Section from "@/components/Section";
import { about } from "@/lib/content";
import { rich } from "@/lib/rich-text";

export default function About() {
  return (
    <Section id="about" label={about.eyebrow} heading={about.heading}>
      <div className="about-grid">
        <div className="prose">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{rich(paragraph)}</p>
          ))}
        </div>

        <aside className="facts" aria-labelledby="about-facts-title">
          <h3 id="about-facts-title" className="minor-title">
            {about.sidebarTitle}
          </h3>
          <dl>
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
