import Reveal from "@/components/Reveal";
import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal className="sec-eyebrow" index={0}>
          {contact.eyebrow}
        </Reveal>
        <Reveal as="h2" index={1}>
          {contact.heading}
        </Reveal>
        <Reveal as="p" className="lead" index={2} style={{ margin: "0 auto" }}>
          {contact.lead}
        </Reveal>

        <Reveal className="contact-links" index={3}>
          {contact.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`btn ${link.variant}`}
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
