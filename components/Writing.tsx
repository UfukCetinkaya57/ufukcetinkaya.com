import Link from "next/link";

import Icon from "@/components/Icon";
import Section from "@/components/Section";
import { writing } from "@/lib/content";

export default function Writing() {
  return (
    <Section id="writing" label={writing.eyebrow} heading={writing.heading}>
      <p className="lead">{writing.body}</p>
      <p className="after-lead">
        <Link href="/blog" className="text-link">
          {writing.kbd}
          <Icon name="arrow-right" />
        </Link>
      </p>
    </Section>
  );
}
