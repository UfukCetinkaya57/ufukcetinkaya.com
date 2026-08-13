import { Fragment, type ReactNode } from "react";

/**
 * İçerikteki sınırlı zengin metni React düğümlerine çevirir.
 * Yalnızca şu etiketlere izin verilir: <b>, <code>, <span class="g">.
 * dangerouslySetInnerHTML kullanılmaz — tanınmayan her şey düz metin olarak basılır.
 */
const TOKEN = /<(b|code|span class="g")>([\s\S]*?)<\/(?:b|code|span)>/g;

export function rich(input: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(input)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={key++}>{input.slice(last, match.index)}</Fragment>);
    }

    const [, tag, inner] = match;
    if (tag === "b") {
      nodes.push(<b key={key++}>{inner}</b>);
    } else if (tag === "code") {
      nodes.push(<code key={key++}>{inner}</code>);
    } else {
      nodes.push(
        <span className="g" key={key++}>
          {inner}
        </span>,
      );
    }

    last = match.index + match[0].length;
  }

  if (last < input.length) {
    nodes.push(<Fragment key={key++}>{input.slice(last)}</Fragment>);
  }

  return nodes;
}
