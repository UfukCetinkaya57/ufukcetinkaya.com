import Reveal from "@/components/Reveal";
import { skills, skillsSection } from "@/lib/content";
import { rich } from "@/lib/rich-text";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Reveal className="sec-eyebrow" index={0}>
          {skillsSection.eyebrow}
        </Reveal>
        <Reveal as="h2" index={1}>
          {skillsSection.heading}
        </Reveal>

        <div className="skills" style={{ marginTop: 34 }}>
          {skills.map((group, i) => (
            <Reveal key={group.title} className="skill-row" index={i}>
              <h3>{group.title}</h3>
              <p>{rich(group.body)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
