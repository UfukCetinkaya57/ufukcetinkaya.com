# CLAUDE.md — ufukcetinkaya.com

Kişisel portfolio + blog sitesi. Bu dosya Claude Code için proje hafızasıdır.

## Amaç
İki kitle: (1) recruiter / teknik müdür → vitrin, (2) teknik blog okuru.
Tek sayfa vitrin (hero → hakkımda → projeler → yetkinlikler → yazılar → iletişim) + `/blog`.

## Teknoloji
- **Next.js (App Router) + TypeScript**
- **Tailwind CSS v4** (CSS-first; tasarım token'ları `globals.css`'te CSS değişkeni olarak)
- **next/font** ile Google Fonts (Bricolage Grotesque, Instrument Sans) — iki aile, mono yok
- Harici state/DB yok; içerik tipli bir modülde (`lib/content.ts`)
- Deploy hedefi: Vercel

## Tasarım referansı — ÖNEMLİ
`design-reference/index.html` yalnızca **İÇERİK** kaynağıdır. Görsel dil 2026-11-06'da baştan revize edildi (`tasarim-kurallari` skill'i + kullanıcı kararı): lacivert + elektrik mavisi palet "AI kokuyor" diye bırakıldı. Görsel kararlar için güncel kaynak `app/globals.css` başındaki token bloğudur; referanstaki eski kalıpları (eyebrow, hero metrik, eşit kart ızgarası, scroll fade-up, glow, mono font, lacivert palet) geri getirme.

## Tasarım token'ları (globals.css)
```
Açık (varsayılan) "kağıt":  --bg:#f3f0e8  --surface:#ebe7dc  --surface2:#e4dfd2
  --text:#1c1a16  --heading:#12110e  --muted:#55524a  --muted2:#6b675d
  --accent:#b4441c (pas turuncusu)  --on-accent:#fffaf2  --green:#2f7a4f
Koyu (prefers-color-scheme: dark) "kömür":  --bg:#151412  --surface:#1c1b18
  --text:#ece8de  --muted:#a39e92  --accent:#e8a33d (kehribar)  --green:#8fd6a6
display: 'Bricolage Grotesque' (800/700) — başlıklar
body:    'Instrument Sans' (400/500/600) — gövde
(mono font yok; satır içi <code> sistem mono yığını)
yazı boyutu: 5 adet (--fs-1..5), gövde 18px, en küçük 16px
köşe: 4px her yerde (hap yok) · gölge: dururken yok · boşluk: 4'ün katları
maxw: 1080px
```
Tek vurgu rengi (birincil buton, odak, alt çizgi, diyagram vurgusu); yeşil yalnızca "Canlı" durumu. Glow / gradient metin yok. Tema değiştirme düğmesi yok — sistem tercihi izlenir.

## Yapı
```
app/
  layout.tsx        (fontlar, nav, skip-link, meta)
  page.tsx          (tek sayfa: bölümleri birleştirir)
  blog/
    page.tsx        (yazı listesi — şimdilik "çok yakında" + boş liste)
    [slug]/page.tsx (yazı detay — altyapı dursun, içerik sonra)
  not-found.tsx     (404: istenen yol + proje listesi)
  projeler/
    [slug]/page.tsx (proje dökümü)
    [slug]/opengraph-image.tsx (projeye özel paylaşım görseli)
components/
  Nav, Hero, About, Projects, ProjectModal, Skills, Writing, Contact, Footer
  Section (bölüm iskeleti), ActionLink, Icon (tek ikon seti), Status,
  ArchDiagram (mimari çizim, etkileşimli), CopyEmail,
  CommandPalette (⌘K / Ctrl+K; mobilde menü), HeroTrace (hero süsü),
  RequestedPath (404'te istenen yol, yalnızca istemcide)
lib/
  content.ts        (TÜM içerik burada, tipli)
  og-fonts.ts       (paylaşım görselleri için TTF yükleyici)
assets/fonts/       (OG görselleri için statik TTF + OFL lisansları; ImageResponse woff2 okuyamaz)
```

## İçerik kuralı — KRİTİK
Tüm metin/proje/yetkinlik içeriği `design-reference/index.html` içinde mevcut ve **doğrulanmış**. Bunları `lib/content.ts`'e taşı, **değiştirme/uydurma/ekleme yapma**. Özellikle proje detaylarındaki teknik iddialar (ADR sayısı, "atomik conditional UPDATE", "refresh token rotation" vb.) kod-doğrulamalıdır; yeni teknik iddia ekleme.

## Proje dökümü sayfaları
Modal kaldırıldı (2026-11-06). Her projenin `/projeler/[slug]` sayfası var; ana sayfadaki "Detay" oraya gider. Sabit sıra: başlık + durum + rol → açıklama + link → **Mimari** (varsa) → öne çıkan teknik kararlar → teknoloji seti → önceki/sonraki proje.
Mimari çizim `projects[].detail.architecture`'dan gelir (`components/ArchDiagram.tsx`, HTML+CSS). Çizimdeki her metin aynı projenin `bullets` maddelerinden türetilmeli; çizim yeni teknik iddia taşımaz. NDA'lı proje (`sales`) çizilirse yalnızca genel bileşenler: ürün/müşteri adı, BaaS/veritabanı adı yok.

## Motion ve süsleme
Kullanıcı bilinçli süslemeye açık; ama her süs tek, ölçülü ve kapatılabilir olmalı.
- Hero: ilk açılışta öğeler 70ms arayla yükselir (`.rise`), ardından `HeroTrace`'te bir istek BİR KEZ yolunu çizer (sonsuz döngü yok). Dar ekranda (<1100px) şema gizli.
- Komut paleti klavyeyle açıldığı için animasyonsuz. Nav'daki `backdrop-filter` yüzünden portal ile `body`'ye render edilir — kaldırma.
- Diyagram: `refs` taşıyan kutu üzerine gelince/odakta/dokununca ilgili karar maddesi altta görünür.
- Scroll-reveal yok, hover'da hareket yok (yalnızca renk).
- `prefers-reduced-motion`: hareket opaklığa iner, istek izi paketi hiç çıkmaz.
- Unicode ok/× yerine `components/Icon.tsx`.

## Kalite tabanı
Mobil responsive (kartlar 2→1 sütun), klavye focus görünür, semantic HTML, Lighthouse yeşil, meta/OG etiketleri (isim, rol, açıklama).

## Komutlar
```
npm run dev     # geliştirme
npm run build   # prod build
npm run lint
```

## Deploy
Vercel'e bağla → `ufukcetinkaya.com` domainini ekle (Metunic'ten alındı; DNS oradan yönetilir). Build komutu default (`next build`).

## Yapma
- Lacivert + elektrik mavisi palete geri dönme.
- Yeni teknik iddia / rakam uydurma.
- localStorage/dış API ekleme (gerek yok).
- Aşırı animasyon (AI-üretimi hissi verir).
- UI işinde `tasarim-kurallari` skill'ini uygula.
