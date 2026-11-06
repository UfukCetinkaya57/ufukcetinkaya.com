import Section from "@/components/Section";
import { skills, skillsSection } from "@/lib/content";
import { rich } from "@/lib/rich-text";

export default function Skills() {
  return (
    <Section id="skills" label={skillsSection.eyebrow} heading={skillsSection.heading}>
      {/* Kutucuk ızgarası yerine tanım listesi: alan adı solda, teknolojiler sağda. */}
      <dl className="skill-list">
        {skills.map((group) => (
          <div key={group.title}>
            <dt>{group.title}</dt>
            <dd>{rich(group.body)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
