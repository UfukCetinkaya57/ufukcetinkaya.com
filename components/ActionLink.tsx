import Icon, { type IconName } from "@/components/Icon";

interface ActionLinkProps {
  href: string;
  label: string;
  variant: "primary" | "ghost" | "text";
  external?: boolean;
  icon?: IconName;
}

/**
 * Buton görünümlü ya da metin bağlantı. Dış bağlantılar her zaman ↗ ikonu
 * taşır ve yeni sekmede açılır; ikon bilgi taşır (sayfadan çıkıyorsun).
 */
export default function ActionLink({ href, label, variant, external, icon }: ActionLinkProps) {
  const iconName: IconName | undefined = icon ?? (external ? "arrow-up-right" : undefined);
  return (
    <a
      href={href}
      className={variant === "text" ? "text-link" : `btn ${variant}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
      {iconName && <Icon name={iconName} />}
      {external && <span className="sr-only"> (yeni sekmede açılır)</span>}
    </a>
  );
}
