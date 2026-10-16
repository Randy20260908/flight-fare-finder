import { Link } from "react-router-dom";
import { Plane, Radar, MailCheck, CalendarX2 } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Airliner, Cloud, Luggage, Sparkle } from "@/components/SkyDecor";
import { useDocumentMeta } from "@/lib/use-document-meta";

const FEATURES = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: MailCheck,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

/* Presentational only: one illustration colour per feature card, in order. */
const FEATURE_BADGES = ["bg-sky text-ink", "bg-sun text-ink", "bg-rust text-white"];

export default function LandingPage() {
  useDocumentMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description:
      "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b-[2.5px] border-ink bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
            <span className="ink-badge size-9 bg-sun">
              <Plane className="size-[18px] -rotate-12 text-ink" aria-hidden />
            </span>
            <span>Flight Price Notifier</span>
          </div>
          <Link to="/auth" className="btn-sun px-4 py-1.5 text-sm">
            Sign in / 登入
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="sky-scene relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-glow blur-3xl"
        />
        <Cloud className="anim-drift absolute left-[3%] top-4 w-20 sm:left-[4%] sm:top-10 sm:w-40" />
        <Cloud className="anim-drift absolute right-[6%] top-40 hidden w-32 [animation-delay:-3s] sm:block" />
        <Cloud className="anim-drift absolute left-[22%] top-[58%] hidden w-24 [animation-delay:-5s] md:block" />
        <Sparkle className="absolute left-[16%] top-24 hidden size-5 sm:block" />
        <Sparkle className="absolute right-[24%] top-16 size-4" />
        <Sparkle className="absolute right-[12%] top-[52%] hidden size-6 sm:block" />
        <Airliner className="anim-bob absolute right-[8%] top-16 hidden w-40 sm:block md:right-[14%] md:w-48" />

        <div className="relative mx-auto max-w-5xl px-6 pb-36 pt-24 text-center sm:pb-44 sm:pt-28">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-6xl">
              Flight Price Notifier
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-2xl font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base font-semibold text-ink/80">
              Set a route and a target price — we email you when the fare drops.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10">
              <Link to="/auth" className="btn-sun px-8 py-3 text-lg">
                Sign in / 登入
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Apron with luggage waiting for boarding */}
        <div className="runway absolute inset-x-0 bottom-0 h-16" aria-hidden />
        <Luggage className="absolute bottom-6 left-[6%] w-24 sm:left-[10%] sm:w-32" />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 120}>
              <article className="ink-card h-full p-6 transition-transform duration-200 hover:-translate-y-1">
                <span className={`ink-badge size-14 ${FEATURE_BADGES[i % FEATURE_BADGES.length]}`}>
                  <feature.icon className="size-7" aria-hidden />
                </span>
                <h2 className="mt-5 text-xl font-semibold">{feature.title}</h2>
                <p className="mt-1 text-sm font-bold text-primary">{feature.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="runway">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-8">
          <p className="rounded-full border-2 border-ink bg-cream px-4 py-1 text-sm font-semibold text-ink">
            © 2026 Flight Price Notifier
          </p>
        </div>
      </footer>
    </div>
  );
}
