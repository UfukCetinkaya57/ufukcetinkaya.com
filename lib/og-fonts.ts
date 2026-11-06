import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Paylaşım görselleri için sitedeki iki yazı tipi. ImageResponse woff2
 * okuyamadığı için statik TTF'ler repoda durur (assets/fonts, OFL lisanslı);
 * build sırasında ağa çıkılmaz.
 */
export async function ogFonts() {
  const file = (name: string) =>
    readFile(join(process.cwd(), "assets/fonts", name));

  const [display, body, bodySemi] = await Promise.all([
    file("BricolageGrotesque-Bold.ttf"),
    file("InstrumentSans-Regular.ttf"),
    file("InstrumentSans-SemiBold.ttf"),
  ]);

  return [
    { name: "Bricolage Grotesque", data: display, weight: 700 as const, style: "normal" as const },
    { name: "Instrument Sans", data: body, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Sans", data: bodySemi, weight: 600 as const, style: "normal" as const },
  ];
}
