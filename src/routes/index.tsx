import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Radar, MailCheck, CalendarX2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      {
        name: "description",
        content:
          "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
      },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      {
        property: "og:description",
        content:
          "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LandingPage,
});

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

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Plane className="size-5 text-primary" aria-hidden />
            <span>Flight Price Notifier</span>
          </div>
          <Link
            to="/auth"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-glow blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center sm:pt-32">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Flight Price Notifier
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-foreground/90 sm:text-2xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
              Set a route and a target price — we email you when the fare drops.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
              >
                Sign in / 登入
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 120}>
              <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                <feature.icon className="size-8 text-primary" aria-hidden />
                <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {feature.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-8">
          <p className="text-sm text-muted-foreground">
            © 2026 Flight Price Notifier
          </p>
        </div>
      </footer>
    </div>
  );
}
