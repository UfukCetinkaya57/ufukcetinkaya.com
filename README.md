# ufukcetinkaya.com

Ufuk Çetinkaya'nın kişisel portfolio ve blog sitesi.
Tek sayfa vitrin (hero → hakkımda → projeler → yetkinlikler → yazılar → iletişim) + `/blog`.

## Teknoloji

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** — CSS-first; tasarım token'ları `app/globals.css` içinde CSS değişkeni
- **next/font** ile Google Fonts: Bricolage Grotesque (başlık), Instrument Sans (gövde), Space Mono (mono)
- Harici state / veritabanı yok — tüm içerik `lib/content.ts` içinde tipli
- Deploy: Vercel

## Çalıştırma

```bash
npm install
npm run dev     # geliştirme  → http://localhost:3100
npm run build   # prod build
npm start       # prod sunucu → http://localhost:3100
npm run lint    # eslint
npx tsc --noEmit  # tip kontrolü
```

> `dev` ve `start` 3100 portuna sabitlenmiştir (3000'de çakışan başka bir uygulama vardı).
> Değiştirmek için `package.json` içindeki `-p` bayrağını düzenleyin.

## Yapı

```
app/
  layout.tsx            fontlar, bg-atmos + bg-grid, meta/OG
  page.tsx              tek sayfa — bölümleri birleştirir
  globals.css           tasarım token'ları + tüm bileşen stilleri
  opengraph-image.tsx   1200×630 paylaşım kartı (runtime üretilir)
  icon.svg              favicon
  sitemap.ts
  blog/
    page.tsx            yazı listesi (şimdilik boş → "çok yakında")
    [slug]/page.tsx     yazı detayı
components/
  Nav, Hero, About, Projects, ProjectModal,
  Skills, Writing, Contact, Footer, Reveal
lib/
  content.ts            TÜM içerik, tipli
  rich-text.tsx         sınırlı zengin metin (<b>, <code>, <span class="g">) → React
```

## İçerik nasıl güncellenir

Tüm metinler `lib/content.ts` içindedir; bileşenlerde sabit metin yoktur.

- **Proje eklemek:** `projects` dizisine `Project` tipinde bir kayıt ekleyin.
  `detail` alanı modalde gösterilir.
- **Yazı eklemek:** `posts` dizisine `Post` ekleyin. Dizi doldukça `/blog`
  listesi, `/blog/[slug]` sayfası ve `sitemap.xml` otomatik çalışır —
  ek kod gerekmez.
- Madde metinlerinde yalnızca `<b>`, `<code>` ve `<span class="g">` etiketleri
  desteklenir; `lib/rich-text.tsx` bunları güvenli şekilde React'e çevirir
  (`dangerouslySetInnerHTML` kullanılmaz).

## Erişilebilirlik & kalite

- Proje detay modali: `role="dialog"`, `aria-modal`, ESC ile kapanma,
  Tab/Shift+Tab focus trap, kapanışta odağın tetikleyici butona dönmesi
- Klavye focus'u her yerde görünür (2px mavi outline)
- `prefers-reduced-motion` desteklenir — animasyon, geçiş ve smooth-scroll kapanır
- Mobilde kartlar tek sütuna düşer; yatay taşma yok
- Lighthouse (prod build, mobil): **Performans 96 · Erişilebilirlik 100 ·
  Best Practices 100 · SEO 100**

## Deploy (Vercel)

Ek yapılandırma gerekmez — `next.config.ts` boştur, build komutu Vercel'in
varsayılanıdır (`next build`).

1. Depoyu GitHub'a push edin.
2. Vercel → **Add New → Project** → depoyu import edin (framework otomatik
   "Next.js" algılanır).
3. **Deploy**.
4. **Settings → Domains** → `ufukcetinkaya.com` ekleyin (Vercel `www` variantını
   da eklemeyi önerir; kabul edin).
5. Vercel size iki kayıt gösterir — **apex için A**, **www için CNAME**.
   CNAME hedefi projeye özeldir (ör. `d1d4fc829fe7bc7c.vercel-dns-017.com`),
   bu yüzden panelde yazan değerleri birebir kopyalayın.
6. Alan adı **Metunic**'ten alındı → Metunic panelinde **DNS yönetimi**ne girip
   bu iki kaydı ekleyin. TLS sertifikasını Vercel otomatik alır.

Alternatif: Metunic'te nameserver'ları Vercel'inkilerle değiştirip tüm DNS'i
Vercel'den yönetebilirsiniz (e-posta kaydınız varsa önce onu Vercel'e taşımayı
unutmayın).

Ortam değişkeni yoktur.

## Notlar

- `design-reference/index.html` onaylanmış tasarım kaynağıdır; yerelde durur,
  `.gitignore` ile depo dışında tutulur.
- `h1.hero` genişliği referanstaki `15ch` yerine `em` cinsindendir: Google
  Fonts'un next/font'a verdiği Bricolage kesitinde `opsz` ekseni bulunmadığı
  için `ch` farklı ölçülüyor ve başlık yanlış yerden kırılıyordu.
