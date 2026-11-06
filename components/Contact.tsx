import ActionLink from "@/components/ActionLink";
import CopyEmail from "@/components/CopyEmail";
import Section from "@/components/Section";
import { contact, site } from "@/lib/content";

export default function Contact() {
  const [primary, ...rest] = contact.links;

  return (
    <Section id="contact" label={contact.eyebrow} heading={contact.heading}>
      <p className="lead">{contact.lead}</p>

      {/* Adres görünür: kopyalamak isteyen mail istemcisi açmak zorunda kalmasın. */}
      <div className="contact-mail-row">
        <a className="contact-mail" href={primary.href}>
          {site.email}
        </a>
        <CopyEmail email={site.email} />
      </div>

      <div className="contact-links">
        <ActionLink href={primary.href} label={primary.label} variant="primary" />
        {rest.map((link) => (
          <ActionLink
            key={link.href}
            href={link.href}
            label={link.label}
            variant="text"
            external={"external" in link && link.external}
          />
        ))}
      </div>
    </Section>
  );
}
