import Link from "next/link";

import Reveal from "@/components/Reveal";
import { writing } from "@/lib/content";

export default function Writing() {
  return (
    <section id="writing" className="section">
      <div className="wrap">
        <Reveal className="sec-eyebrow" index={0}>
          {writing.eyebrow}
        </Reveal>
        <Reveal as="h2" index={1}>
          {writing.heading}
        </Reveal>

        <Reveal className="writing-card" index={2} style={{ marginTop: 30 }}>
          <p>{writing.body}</p>
          <Link href="/blog" className="kbd">
            {writing.kbd}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
