"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import Icon from "@/components/Icon";
import { navLinks, projects, site } from "@/lib/content";

interface Command {
  id: string;
  group: "Bölümler" | "Projeler" | "Eylemler";
  label: string;
  run: "go" | "open" | "copy";
  href: string;
}

const COMMANDS: Command[] = [
  ...navLinks.map((link) => ({
    id: `sec-${link.href}`,
    group: "Bölümler" as const,
    label: link.label,
    run: "go" as const,
    href: `/${link.href}`,
  })),
  ...projects.map((project) => ({
    id: `proj-${project.slug}`,
    group: "Projeler" as const,
    label: project.title,
    run: "go" as const,
    href: `/projeler/${project.slug}`,
  })),
  {
    id: "copy-mail",
    group: "Eylemler",
    label: "E-posta adresini kopyala",
    run: "copy",
    href: site.email,
  },
  {
    id: "cv",
    group: "Eylemler",
    label: "CV'yi aç",
    run: "open",
    href: site.cv,
  },
  {
    id: "gh",
    group: "Eylemler",
    label: "GitHub",
    run: "open",
    href: site.github,
  },
  {
    id: "li",
    group: "Eylemler",
    label: "LinkedIn",
    run: "open",
    href: site.linkedin,
  },
];

const norm = (s: string) => s.toLocaleLowerCase("tr");

/* Platform değişmez: abonelik gerekmez. Sunucuda null → ipucu çizilmez. */
const noop = () => () => {};
const useIsMac = () =>
  useSyncExternalStore(
    noop,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => null,
  );

/**
 * ⌘K / Ctrl+K komut paleti. Klavyeyle tetiklendiği için animasyonsuz açılır
 * (sık ve hızlı kullanılan arayüz). Dar ekranda nav bağlantıları gizli
 * olduğundan menü işlevi de görür.
 *
 * Erişilebilirlik: combobox + listbox deseni; odak hep arama kutusunda kalır,
 * seçili seçenek aria-activedescendant ile bildirilir. ESC kapatır, odak
 * açan öğeye döner.
 */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<"ok" | "fail" | null>(null);
  const isMac = useIsMac();
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const listId = useId();
  const titleId = useId();

  const results = useMemo(() => {
    const q = norm(query.trim());
    return q ? COMMANDS.filter((c) => norm(c.label).includes(q)) : COMMANDS;
  }, [query]);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setCopied(null);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  /* Kısayol: platforma göre ⌘K ya da Ctrl+K (ipucu yalnızca istemcide). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((was) => {
          if (was) return false;
          returnFocus.current = document.activeElement as HTMLElement | null;
          setQuery("");
          setActive(0);
          setCopied(null);
          return true;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  async function run(cmd: Command) {
    if (cmd.run === "copy") {
      try {
        await navigator.clipboard.writeText(cmd.href);
        setCopied("ok");
        window.setTimeout(close, 900);
      } catch {
        setCopied("fail");
      }
      return;
    }
    setOpen(false);
    if (cmd.run === "open") {
      window.open(cmd.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(cmd.href);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = results[active];
      if (cmd) run(cmd);
    } else if (e.key === "Tab") {
      // Odak paletten çıkmasın: tek odaklanabilir öğe arama kutusu.
      e.preventDefault();
    }
  }

  const optionId = (i: number) => `${listId}-opt-${i}`;

  return (
    <>
      <button
        type="button"
        className="palette-trigger"
        onClick={show}
        aria-haspopup="dialog"
      >
        <span>Menü</span>
        {isMac !== null && (
          <kbd className="palette-kbd" aria-hidden="true">
            {isMac ? "⌘K" : "Ctrl K"}
          </kbd>
        )}
      </button>

      {/* Portal: nav'daki backdrop-filter, içindeki fixed öğelerin kapsayıcısı
          olur — overlay body'ye taşınmazsa yalnızca nav yüksekliğini kaplar. */}
      {open &&
        createPortal(
          <div
            className="palette-overlay"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              className="palette"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <h2 id={titleId} className="sr-only">
                Komut paleti
              </h2>
              <input
                ref={inputRef}
                className="palette-input"
                type="text"
                placeholder="Bölüm, proje ya da eylem ara"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={
                  results[active] ? optionId(active) : undefined
                }
                aria-autocomplete="list"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
              />

              {results.length === 0 ? (
                <p className="palette-empty">
                  &quot;{query}&quot; için sonuç yok. Proje adı ya da
                  &quot;iletişim&quot; gibi bir bölüm dene.
                </p>
              ) : (
                <ul
                  id={listId}
                  role="listbox"
                  className="palette-list"
                  aria-label="Sonuçlar"
                >
                  {results.map((cmd, i) => {
                    const firstOfGroup =
                      i === 0 || results[i - 1].group !== cmd.group;
                    const label =
                      cmd.run === "copy" && copied === "ok"
                        ? "Kopyalandı"
                        : cmd.run === "copy" && copied === "fail"
                          ? "Kopyalanamadı, adres: " + site.email
                          : cmd.label;
                    return (
                      <li
                        key={cmd.id}
                        id={optionId(i)}
                        role="option"
                        aria-selected={i === active}
                        className={`palette-item${i === active ? " active" : ""}${firstOfGroup ? " group-start" : ""}`}
                        data-group={firstOfGroup ? cmd.group : undefined}
                        onMouseMove={() => setActive(i)}
                        onClick={() => run(cmd)}
                      >
                        <span>{label}</span>
                        {cmd.run === "open" && <Icon name="arrow-up-right" />}
                        {cmd.run === "go" && <Icon name="arrow-right" />}
                      </li>
                    );
                  })}
                </ul>
              )}

              <p className="sr-only" aria-live="polite">
                {copied === "ok"
                  ? "E-posta adresi kopyalandı"
                  : copied === "fail"
                    ? "Kopyalanamadı"
                    : ""}
              </p>
              <p className="palette-hint" aria-hidden="true">
                ↑↓ seç · Enter aç · Esc kapat
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
