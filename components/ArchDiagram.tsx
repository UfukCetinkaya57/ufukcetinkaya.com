"use client";

import { useId, useState, type CSSProperties } from "react";

import Icon from "@/components/Icon";
import type { ArchNode, Architecture, RichText } from "@/lib/content";
import { rich } from "@/lib/rich-text";

type Vars = CSSProperties & Record<`--${string}`, number>;

interface ArchDiagramProps {
  architecture: Architecture;
  /** Projenin teknik karar maddeleri — kutuların `refs` alanı bunlara işaret eder. */
  bullets: RichText[];
}

/**
 * Katmanlı mimari çizimi: yukarıdan aşağı katmanlar, aralarında bağlantı hattı.
 * HTML + CSS ile çizilir (SVG değil) — dar ekranda katmanlar alt alta dizilir,
 * yazılar küçülmeden okunur kalır.
 *
 * Etkileşim: `refs` taşıyan kutular buton olur. Üzerine gelince, odaklanınca
 * ya da dokununca o kutuyla ilgili teknik karar(lar) çizimin altında görünür.
 */
export default function ArchDiagram({ architecture, bullets }: ArchDiagramProps) {
  const { tiers, pipeline, sequence } = architecture;
  const [active, setActive] = useState<ArchNode | null>(null);
  const panelId = useId();
  const interactive = tiers.some((tier) => tier.some((n) => n.refs?.length));

  return (
    <div className={`arch${active ? " has-active" : ""}`}>
      <div className="arch-flow">
        {tiers.map((tier, i) => (
          <div key={i}>
            {i > 0 && <Link above={tiers[i - 1].length} below={tier.length} />}
            <ul className="arch-tier" style={{ "--n": tier.length } as Vars}>
              {tier.map((node) => (
                <li key={node.name}>
                  {node.refs?.length ? (
                    <button
                      type="button"
                      className={`arch-node${node.core ? " core" : ""}${active === node ? " active" : ""}`}
                      aria-controls={panelId}
                      aria-pressed={active === node}
                      onMouseEnter={() => setActive(node)}
                      onFocus={() => setActive(node)}
                      onClick={() => setActive(node)}
                    >
                      <NodeBody node={node} />
                    </button>
                  ) : (
                    <div className={`arch-node${node.core ? " core" : ""}`}>
                      <NodeBody node={node} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {interactive && (
        <div id={panelId} className="arch-panel" aria-live="polite">
          {active?.refs?.length ? (
            <>
              <h3 className="minor-title">{active.name}: ilgili karar</h3>
              <ul className="decision-list">
                {active.refs.map((r) => (
                  <li key={r}>{rich(bullets[r])}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="arch-panel-hint">
              Bir kutunun üzerine gel ya da dokun: ilgili teknik karar burada görünür.
            </p>
          )}
        </div>
      )}

      {pipeline && (
        <div className="arch-steps">
          <h3 className="minor-title">{pipeline.title}</h3>
          <ol className="arch-pipeline">
            {pipeline.steps.map((step, i) => (
              <li key={step}>
                {i > 0 && <Icon name="arrow-right" />}
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Gerçek bir adım sırası olduğu için numaralı. */}
      {sequence && (
        <div className="arch-steps">
          <h3 className="minor-title">{sequence.title}</h3>
          <ol className="arch-seq">
            {sequence.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function NodeBody({ node }: { node: ArchNode }) {
  return (
    <>
      <span className="arch-name">{node.name}</span>
      {node.detail && <span className="arch-detail">{node.detail}</span>}
    </>
  );
}

/** İki katman arasındaki hat: üstteki kutulardan iner, ortada birleşir, alttakilere dağılır. */
function Link({ above, below }: { above: number; below: number }) {
  return (
    <div className="arch-link" aria-hidden="true">
      <div className="arch-stubs top" style={{ "--n": above } as Vars}>
        {Array.from({ length: above }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <span className="arch-bus top" style={{ "--n": above } as Vars} />
      <span className="arch-stem" />
      <span className="arch-bus bottom" style={{ "--n": below } as Vars} />
      <div className="arch-stubs bottom" style={{ "--n": below } as Vars}>
        {Array.from({ length: below }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}
