/**
 * Sitenin TÜM içeriği burada, tipli olarak tutulur.
 * Kaynak: design-reference/index.html (doğrulanmış içerik).
 * Buradaki teknik iddialar kod-doğrulamalıdır — yeni iddia/rakam eklenmez.
 */

export type BadgeKind = "live" | "oss";

export interface Badge {
  label: string;
  kind: BadgeKind;
}

/** Modal madde metinleri sınırlı zengin metin içerir (<b>, <code>). */
export type RichText = string;

export interface ProjectLink {
  href: string;
  label: string;
}

export interface ProjectDetail {
  role: string;
  desc: string;
  bullets: RichText[];
  stack: string[];
  link: ProjectLink;
}

export interface Project {
  slug: string;
  title: string;
  badge: Badge;
  summary: string;
  tags: string[];
  /** Kart üzerindeki dış link (canlı site ya da GitHub). */
  link: ProjectLink;
  /** Grid'de tam genişlik kaplasın mı. */
  wide?: boolean;
  detail: ProjectDetail;
}

export interface SkillGroup {
  title: string;
  /** <span class="g"> ile ikincil (muted) parçalar işaretlenir. */
  body: RichText;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface NavLink {
  href: string;
  label: string;
  cta?: boolean;
}

/* ------------------------------------------------------------------ site */

export const site = {
  name: "Ufuk Çetinkaya",
  role: ".NET Backend Developer",
  title: "Ufuk Çetinkaya · .NET Backend Developer",
  description:
    "Ufuk Çetinkaya — .NET Backend Developer. Production SaaS + RAG & agentic AI sistemleri. C#, ASP.NET Core, PostgreSQL/pgvector, Semantic Kernel.",
  url: "https://ufukcetinkaya.com",
  locale: "tr_TR",
  logo: { mark: "UÇ", suffix: "/dev" },
  email: "ufukcetinkaya_10@hotmail.com",
  github: "https://github.com/UfukCetinkaya57",
  linkedin: "https://www.linkedin.com/in/ufukcetinkaya",
  cv: "/cv/UfukCetinkaya-CV.pdf",
} as const;

export const navLinks: NavLink[] = [
  { href: "#about", label: "Hakkımda" },
  { href: "#work", label: "Projeler" },
  { href: "#skills", label: "Yetkinlikler" },
  { href: "#writing", label: "Yazılar" },
  { href: "#contact", label: "İletişim", cta: true },
];

/* ------------------------------------------------------------------ hero */

export const hero = {
  eyebrow: "C# · .NET · RAG · AGENTIC AI",
  headline: { lead: "Production backend,", accent: "reinforced with agentic AI." },
  sub: {
    before: "Ben Ufuk — ",
    strong: ".NET Backend Developer",
    after:
      ". Sağlam backend mühendisliğini modern AI ile birleştiriyorum: production'da çalışan SaaS ürünleri, yüksek performanslı API'ler ve RAG / agentic sistemler kuruyorum.",
  },
  stats: [
    { value: "3 ülke", label: "pazarında canlı SaaS" },
    { value: "140+", label: "belediyede kullanılan sistem" },
    { value: "Milyonlarca", label: "kayıt · migrasyon & optimizasyon" },
  ] satisfies Stat[],
  ctas: [
    { href: "#work", label: "Projelere bak →", variant: "primary" as const },
    { href: `mailto:${site.email}`, label: "İletişime geç", variant: "ghost" as const },
    { href: site.github, label: "GitHub", variant: "ghost" as const, external: true },
    { href: site.cv, label: "CV", variant: "ghost" as const, external: true },
  ],
};

/* ----------------------------------------------------------------- about */

export const about = {
  eyebrow: "01 — Hakkımda",
  heading: "AI'ı kullanan değil, disipline eden mühendis.",
  paragraphs: [
    "C# / .NET ekosisteminde <b>3 yıllık production deneyimine</b> sahibim. 3 ülke pazarında hizmet veren SaaS platformlarından, 140+ belediyede kullanılan ve milyonlarca kayıt barındıran bilgi sistemlerine kadar uçtan uca sorumluluk üstlendim.",
    "Çekirdek işim klasik ama sağlam: <b>Clean Architecture</b>, yüksek performanslı RESTful API'ler, veri tabanı migrasyonları ve Docker tabanlı deployment. Bunun üzerine <b>RAG ve agentic AI</b> sistemleri kuruyorum — pgvector ile semantik arama, Semantic Kernel ile faithfulness-kontrollü RAG.",
    "AI'ı kontrolsüz kullanmak yerine <b>denetim altına alıyorum</b>: kendi yazdığım açık kaynak governance framework'ü, üretilen kodun güvenlik ve mimari incelemesinden geçmesini zorunlu kılıyor.",
  ] satisfies RichText[],
  sidebarTitle: "Künye",
  facts: [
    { label: "Konum", value: "Çayırova, Kocaeli" },
    { label: "Rol", value: "Backend Developer · SUNS Tech" },
    { label: "Odak", value: ".NET · Clean Arch · RAG" },
    { label: "Eğitim", value: "Bilgisayar Müh. · NEÜ" },
    { label: "Diller", value: "Türkçe · İngilizce" },
  ] satisfies Fact[],
};

/* -------------------------------------------------------------- projects */

export const projectsSection = {
  eyebrow: "02 — Seçili Projeler",
  heading: "Production'a iş çıkaran sistemler.",
  lead: 'Her kartta <b>"Detay"</b> ile projenin teknik dökümüne inebilirsin. Çoğu canlıda; ürün kodları özel, açık kaynak araçlarım GitHub\'da.',
};

export const projects: Project[] = [
  {
    slug: "menti",
    title: "Menti Mentör",
    badge: { label: "Canlı", kind: "live" },
    summary:
      "AI destekli mentor–menti eşleştirme ve seans yönetim SaaS'ı. pgvector ile hibrit semantik eşleştirme, atomik slot rezervasyonu, 46 ADR ile mimari disiplin.",
    tags: [".NET 10", "pgvector", "Clean Arch", "Hangfire"],
    link: { href: "https://ankongenclik.com", label: "Canlı ↗" },
    detail: {
      role: "Rol: Architect · Backend · DevOps · Proje Yönetimi (uçtan uca)",
      desc: "Öğrencileri profesyonellerle AI tabanlı semantik eşleştirmeyle buluşturan; seans takvimi ve süreç yönetimini tek çatıda sunan SaaS platformu.",
      bullets: [
        "<b>.NET 10 + Clean/Layered Architecture</b>; her mimari kararı kayıt altına alan <b>46 ADR</b> ve UUID v7 identifier standardı.",
        "PostgreSQL 16 + pgvector (HNSW) üzerinde Cloudflare Workers AI (bge-m3, 1024-dim) embedding'leriyle <b>hibrit eşleştirme motoru</b> — semantik + anket + kural skorunu ağırlıklı birleştirir; ayrı vektör DB'ye gerek kalmadan tek transaction'da tutarlılık.",
        "Slot rezervasyonundaki yarış koşulunu <b>atomik conditional UPDATE</b> ile kilit/deadlock olmadan çözdüm.",
        "Argon2id parola hash + HS256 JWT; Menti / Mentor / Admin / SuperAdmin için RBAC.",
        "Google Calendar API (OAuth 2.0) ile otomatik Meet linki; Hangfire ile asenkron işler; Cloudflare çağrılarını <b>Polly retry + circuit breaker</b> ile dayanıklı hale getirdim.",
        "Docker (multi-stage, non-root) + <b>GitHub Actions CI/CD</b> (staging otomatik / production onaylı) + Testcontainers ile gerçek PostgreSQL'e karşı integration test.",
        "Next.js frontend + Blazor Server admin panel entegrasyonunu koordine ettim.",
      ],
      stack: [
        ".NET 10",
        "ASP.NET Core",
        "PostgreSQL 16",
        "pgvector",
        "EF Core",
        "Hangfire",
        "Cloudflare Workers AI",
        "JWT",
        "Argon2id",
        "Google Calendar API",
        "Docker",
        "GitHub Actions",
        "Testcontainers",
        "Polly",
        "Blazor Server",
        "Next.js",
      ],
      link: { href: "https://ankongenclik.com", label: "Canlı siteyi gör ↗" },
    },
  },
  {
    slug: "ani",
    title: "Anı Kutusu",
    badge: { label: "Canlı", kind: "live" },
    summary:
      "Etkinlik medya paylaşım platformunun backend'i. Presigned URL ile R2'ye doğrudan 2 GB upload; refresh token rotation + reuse detection ile güvenli oturum.",
    tags: [".NET 9", "Cloudflare R2", "Result Pattern", "k6"],
    link: { href: "https://anikutusu.com.tr", label: "Canlı ↗" },
    detail: {
      role: "Rol: Backend (tek başına, sıfırdan tasarım & geliştirme)",
      desc: "Düğün, doğum günü, mezuniyet gibi etkinliklerde konukların QR kod ile galeriye fotoğraf/video yüklediği bulut tabanlı SaaS'ın backend'i.",
      bullets: [
        "<b>.NET 9 + Clean Architecture</b>; 13 controller / ~59 endpoint; Application katmanında <b>Result Pattern</b> (sıfır throw).",
        "Cloudflare R2'ye <b>presigned URL ile doğrudan 2 GB upload</b> — dosya byte'ları API sunucusuna hiç uğramıyor; IDOR'a karşı tek kullanımlık completion token; yarım yüklemeler için saatlik <b>Hangfire orphan-cleanup</b>.",
        "<b>Güvenli JWT:</b> 15 dk access token; DB'de yalnızca SHA256 hash'i tutulan refresh token; her yenilemede <b>rotation</b>; çalınan token tekrar kullanıldığında tüm aileyi revoke eden <b>reuse-detection</b>.",
        "Cloudflare + Nginx arkasında proxy-farkındalıklı gerçek IP çözümleme + <b>IP / anonim ID / etkinlik bazlı 3 katmanlı rate limiting</b>.",
        "Parola: ASP.NET Core Identity PasswordHasher (PBKDF2); Google OAuth 2.0.",
        "HEIC→JPEG dönüşümü (Magick.NET + ImageSharp), QRCoder; xUnit / Moq / FluentAssertions + <b>k6 yük testi</b>; Sentry + KVKK uyumlu PII scrubbing.",
      ],
      stack: [
        ".NET 9",
        "ASP.NET Core",
        "MySQL",
        "EF Core",
        "Cloudflare R2",
        "Hangfire",
        "JWT",
        "OAuth 2.0",
        "Docker",
        "Nginx",
        "GitHub Actions",
        "Sentry",
        "k6",
        "xUnit",
      ],
      link: { href: "https://anikutusu.com.tr", label: "Canlı siteyi gör ↗" },
    },
  },
  {
    slug: "sales",
    title: "Sales Growth Steps",
    badge: { label: "Canlı", kind: "live" },
    // NDA (karşılıklı, 2025) gereği bu projede yalnızca kamuya açık düzeyde
    // bilgi ve genel teknoloji yetkinlikleri yer alır. Ürüne özgü mimari
    // kararlar, iş mantığı/algoritma ve güvenlik geçmişi bilinçli olarak
    // çıkarılmıştır — yazılı izin alınmadan geri eklenmemelidir.
    summary:
      "Doğu Avrupa pazarında hizmet veren uluslararası SaaS ürününün backend'i. .NET 8 Minimal API üzerinde Clean Architecture.",
    tags: [".NET 8", "Minimal API", "Firebase", "JWKS"],
    link: { href: "https://salesgrowthsteps.com", label: "Canlı ↗" },
    detail: {
      role: "Rol: Backend (uçtan uca mühendislik & teknik karar)",
      desc: "Doğu Avrupa pazarında canlı, işletmelere yönelik uluslararası SaaS ürününün backend geliştirmesi.",
      bullets: [
        "<b>.NET 8 Minimal API + Clean Architecture</b> ile backend geliştirme.",
        "Firebase Auth ID token doğrulaması (<b>JWKS</b>); .NET 8 yerleşik rate limiting ve FluentValidation ile istek doğrulama.",
        "Serilog + Correlation ID ile yapısal loglama; systemd + Nginx (Let's Encrypt TLS) ile production deployment.",
      ],
      stack: [
        ".NET 8",
        "Minimal API",
        "Clean Architecture",
        "Firebase",
        "Firestore",
        "JWT / JWKS",
        "FluentValidation",
        "Serilog",
        "xUnit",
        "Nginx",
      ],
      link: { href: "https://salesgrowthsteps.com", label: "Canlı siteyi gör ↗" },
    },
  },
  {
    slug: "rag",
    title: "Enterprise RAG",
    badge: { label: "Açık Kaynak", kind: "oss" },
    summary:
      ".NET tabanlı agentic RAG sistemi. Semantic Kernel ile faithfulness-kontrollü yanıt üretimi ve generator-critic reflection loop; provider-agnostik, on-prem hazır.",
    tags: [".NET 8", "Semantic Kernel", "pgvector", "SSE"],
    link: {
      href: "https://github.com/UfukCetinkaya57/enterprise-rag-dotnet",
      label: "GitHub ↗",
    },
    detail: {
      role: "Rol: Kişisel Ar-Ge / referans mimari",
      desc: "Kurumsal PDF'ler üzerinde kaynak-atıflı soru-cevap sağlayan .NET tabanlı agentic RAG sistemi.",
      bullets: [
        "PdfPig → chunking → embedding → <b>pgvector (HNSW) retrieval → LLM reranking</b> → yanıt akışı, SSE streaming ile.",
        "<b>Semantic Kernel agentic doğrulama:</b> faithfulness/groundedness checker ajanı yanıtın context'e dayandığını skorlar; eşik altındaysa <b>generator-critic reflection loop</b> yeniden üretir.",
        "Provider-agnostik portlar (<b>OpenAI ↔ Azure OpenAI ↔ on-prem Ollama</b>) ile KVKK / on-prem hazır mimari.",
        "Kural tabanlı <b>prompt injection guard</b> (TR/EN).",
      ],
      stack: [
        ".NET 8",
        "Clean Architecture",
        "PostgreSQL",
        "pgvector",
        "Semantic Kernel",
        "OpenAI",
        "PdfPig",
        "SSE",
        "Docker",
      ],
      link: {
        href: "https://github.com/UfukCetinkaya57/enterprise-rag-dotnet",
        label: "GitHub'da incele ↗",
      },
    },
  },
  {
    slug: "gov",
    title: "Backend Governance",
    badge: { label: "Açık Kaynak · MIT", kind: "oss" },
    wide: true,
    summary:
      "Claude Code'u yapılandırılmış bir yazılım ekibine dönüştüren çok-agent governance framework'ü: 6 uzman agent, 13 kural, riske göre 3 kademeli kod-inceleme pipeline'ı. En az yetki ilkesini araç seviyesinde uygular — denetleyen agent'ın yazma yetkisi yok. Meva Photo projesinde gerçek üretimde kullandım.",
    tags: ["Multi-Agent", "Claude Code", "MCP", "Governance"],
    link: {
      href: "https://github.com/UfukCetinkaya57/backend-governance",
      label: "GitHub ↗",
    },
    detail: {
      role: "Rol: Kişisel açık kaynak framework (Ar-Ge)",
      desc: "Claude Code'u yapılandırılmış bir yazılım ekibine dönüştüren, yapay zekâ ajanlarının backend geliştirme sürecini uçtan uca yönettiği governance çerçevesi.",
      bullets: [
        '<b>"Team Lead" koordinatör ajan</b>, 6 uzman alt-ajana (backend, security-reviewer, quality-gate, architect, devops, qa) görev delege eder — çok-ajanlı orkestrasyon.',
        "Riske göre <b>3 kademeli pipeline</b> (hafif / normal / tam); ajanlar arası feedback döngüsü; 13 otomatik kural + 15 yeniden kullanılabilir skill.",
        "<b>En az yetki ilkesi araç seviyesinde:</b> denetleyen ajanın yazma yetkisi yok.",
        "Commit öncesi sırları eleyen <b>deterministik hook</b> — prompt değil, atlanamaz script.",
        "<code>/governance-eval</code> ile yapısal / tutarlılık / davranışsal katmanlarda otomatik scorecard.",
        "<b>Meva Photo</b> projesinde gerçek üretimde kullanıldı.",
      ],
      stack: [
        "Claude Code",
        "Anthropic Agent SDK",
        "Multi-Agent",
        "MCP",
        "Prompt Engineering",
        "Bash",
        "Git",
      ],
      link: {
        href: "https://github.com/UfukCetinkaya57/backend-governance",
        label: "GitHub'da incele ↗",
      },
    },
  },
];

/* ---------------------------------------------------------------- skills */

export const skillsSection = {
  eyebrow: "03 — Yetkinlikler",
  heading: "Gerçek projelerde kullandığım teknolojiler.",
};

export const skills: SkillGroup[] = [
  {
    title: "Diller & Framework",
    body: 'C# · ASP.NET Core <span class="g">(Web API, MVC, Minimal API)</span> · .NET 8/9/10 · Entity Framework Core <span class="g">(Code-First)</span> · RESTful API',
  },
  {
    title: "Mimari & Prensipler",
    body: 'Clean Architecture · Katmanlı Mimari · SOLID · Dependency Injection · Result Pattern · <span class="g">ADR süreçleri · UUID v7</span>',
  },
  {
    title: "Veri Tabanı",
    body: 'PostgreSQL + pgvector <span class="g">(HNSW)</span> · Microsoft SQL Server <span class="g">(T-SQL, stored procedure, indeksleme, query optimizasyonu)</span> · MySQL · Oracle · Redis',
  },
  {
    title: "AI & Agentic",
    body: 'RAG <span class="g">(retrieval + reranking + faithfulness)</span> · Semantic Kernel · Embeddings / vektörel arama · LLM entegrasyonu <span class="g">(OpenAI / Azure / Ollama)</span> · MCP · multi-agent orchestration',
  },
  {
    title: "Güvenlik & Auth",
    body: 'JWT <span class="g">(rotation + reuse detection)</span> · Argon2id · OAuth 2.0 · Firebase Auth <span class="g">(JWKS)</span> · IDOR koruması · çok katmanlı rate limiting · CSRF/CSP · Stripe 3D Secure',
  },
  {
    title: "Mesajlaşma & İş Kuyruğu",
    body: 'RabbitMQ · Apache Kafka · Hangfire <span class="g">(background & recurring jobs)</span> · SOAP / REST 3. parti entegrasyonlar',
  },
  {
    title: "DevOps & Bulut",
    body: 'Docker <span class="g">(multi-stage)</span> · Nginx · GitHub Actions CI/CD · AWS EC2 · Cloudflare <span class="g">(R2 / Workers AI)</span> · Linux · systemd',
  },
  {
    title: "Test & Gözlemlenebilirlik",
    body: 'xUnit · Moq · FluentAssertions · Testcontainers <span class="g">(gerçek DB)</span> · k6 <span class="g">(yük testi)</span> · Serilog · Sentry · Correlation ID',
  },
];

/* --------------------------------------------------------------- writing */

export const writing = {
  eyebrow: "04 — Yazılar",
  heading: "Backend & AI üzerine notlar.",
  body: "Backend mimarisi, RAG sistemleri ve AI'ı disiplinli kullanma üzerine yazılar yakında burada olacak.",
  kbd: "// blog · çok yakında",
};

/**
 * Blog yazıları — altyapı hazır, içerik sonra eklenecek.
 * Buraya bir kayıt eklendiğinde /blog listesi ve /blog/[slug] otomatik çalışır.
 */
export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  /** Paragraf dizisi; sınırlı zengin metin (<b>, <code>) içerebilir. */
  body: RichText[];
}

export const posts: Post[] = [];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/* --------------------------------------------------------------- contact */

export const contact = {
  eyebrow: "05 — İletişim",
  heading: "Birlikte bir şeyler kuralım.",
  lead: "Yeni fırsatlara açığım. Bir projeniz ya da pozisyonunuz varsa yazın.",
  links: [
    { href: `mailto:${site.email}`, label: "E-posta gönder", variant: "primary" as const },
    { href: site.linkedin, label: "LinkedIn", variant: "ghost" as const, external: true },
    { href: site.github, label: "GitHub", variant: "ghost" as const, external: true },
  ],
};

export const footer = {
  text: "© 2026 Ufuk Çetinkaya · Bricolage Grotesque + Instrument Sans ile kuruldu",
};
