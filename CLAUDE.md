# CLAUDE.md — ufukcetinkaya.com

Kişisel portfolio + blog sitesi. Bu dosya Claude Code için proje hafızasıdır.

## Amaç
İki kitle: (1) recruiter / teknik müdür → vitrin, (2) teknik blog okuru.
Tek sayfa vitrin (hero → hakkımda → projeler → yetkinlikler → yazılar → iletişim) + `/blog`.

## Teknoloji
- **Next.js (App Router) + TypeScript**
- **Tailwind CSS v4** (CSS-first; tasarım token'ları `globals.css`'te CSS değişkeni olarak)
- **next/font** ile Google Fonts (Bricolage Grotesque, Instrument Sans, Space Mono)
- Harici state/DB yok; içerik tipli bir modülde (`lib/content.ts`)
- Deploy hedefi: Vercel

## Tasarım referansı — ÖNEMLİ
`design-reference/index.html` çalışan, onaylanmış tam tasarımdır. **Görsel dili, renkleri, tipografiyi, motion'ı ve İÇERİĞİ birebir buradan al.** Sıfırdan tasarım uydurma; bunu temiz React bileşenlerine böl.

## Tasarım token'ları (design-reference'tan)
```
--bg:#0a0f1a  --bg2:#0b1120  --surface:#0e1626  --surface2:#111c30
--border:rgba(90,169,255,.14)  --border-strong:rgba(90,169,255,.35)
--accent:#5aa9ff  --accent-soft:#8fc4ff  --glow:rgba(90,169,255,.18)
--text:#eaf1fb  --muted:#8ba0bd  --muted2:#6f849f  --green:#7ef0c0
display: 'Bricolage Grotesque' (800/700) — başlıklar
body:    'Instrument Sans' (400/500/600) — gövde
mono:    'Space Mono' (400/700) — eyebrow, tag, buton, künye
maxw: 1080px
```
Koyu-teknik zemin + mavi vurgu. Bu dil, kullanıcının LinkedIn banner'ı ve GitHub'ıyla **tutarlı olmalı** (aynı mavi, aynı his). Vurguyu tek yerde harca (hero + kart hover glow); gerisi sakin.

## Yapı
```
app/
  layout.tsx        (fontlar, bg-atmos + bg-grid, meta)
  page.tsx          (tek sayfa: bölümleri birleştirir)
  blog/
    page.tsx        (yazı listesi — şimdilik "çok yakında" + boş liste)
    [slug]/page.tsx (yazı detay — altyapı dursun, içerik sonra)
components/
  Nav, Hero, About, Projects, ProjectModal, Skills, Writing, Contact, Footer
lib/
  content.ts        (TÜM içerik burada, tipli)
```

## İçerik kuralı — KRİTİK
Tüm metin/proje/yetkinlik içeriği `design-reference/index.html` içinde mevcut ve **doğrulanmış**. Bunları `lib/content.ts`'e taşı, **değiştirme/uydurma/ekleme yapma**. Özellikle proje detaylarındaki teknik iddialar (ADR sayısı, "atomik conditional UPDATE", "refresh token rotation" vb.) kod-doğrulamalıdır; yeni teknik iddia ekleme.

## Proje detay modali
Her proje kartında "Detay →" → modal (rol + öne çıkan teknik kararlar + tam stack + canlı/GitHub linki). Veri `content.ts`'teki `projects[].detail`'den gelir. Erişilebilir olsun: ESC ile kapat, focus trap, `aria-modal`.

## Motion
Ölçülü. Hero'da ambient glow + dot-grid, scroll-reveal (IntersectionObserver → fade-up), kart hover glow. `prefers-reduced-motion` MUTLAKA saygı görsün.

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
- Görsel dili değiştirme (mavi-koyu dışına çıkma).
- Yeni teknik iddia / rakam uydurma.
- localStorage/dış API ekleme (gerek yok).
- Aşırı animasyon (AI-üretimi hissi verir).
