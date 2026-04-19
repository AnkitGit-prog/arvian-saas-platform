import { pricingCards } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

// ── Logo Image Component ──────────────────────────────────────────
const ArvianLogo = ({ width = 48, height = 48 }) => (
  <Image
    src="/assets/arvion-logo.png"
    alt="Arvian Logo"
    width={width}
    height={height}
    className="rounded-xl object-contain drop-shadow-2xl"
    unoptimized
  />
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M3 7.5l3 3 6-6" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  {
    num: "01",
    title: "Pipeline CRM",
    desc: "Visual drag-and-drop sales pipelines. Track every deal from lead to close with zero friction.",
    tag: "Sales",
  },
  {
    num: "02",
    title: "Funnel Builder",
    desc: "Build stunning landing pages with our visual editor. No code required, fully customisable.",
    tag: "Marketing",
  },
  {
    num: "03",
    title: "Sub-Account Management",
    desc: "White-label accounts for every client. Full control, complete separation, zero overlap.",
    tag: "Agency",
  },
  {
    num: "04",
    title: "Automations",
    desc: "Trigger workflows on contact form fills, pipeline moves, and more. Run your agency on autopilot.",
    tag: "Automation",
  },
  {
    num: "05",
    title: "Revenue Dashboard",
    desc: "Real-time analytics on income, conversions, and pipeline value. Data-driven decisions, always.",
    tag: "Analytics",
  },
  {
    num: "06",
    title: "Integrated Billing",
    desc: "Accept payments via Razorpay. Manage subscriptions, invoices, and add-ons seamlessly.",
    tag: "Payments",
  },
];

const socialProofLogos = ["Razorpay", "Clerk", "UploadThing", "Prisma", "Vercel"];

export default async function Home() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #06060f 0%, #0c0c1e 50%, #080818 100%)" }}
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 30% at 80% 60%, rgba(6,182,212,0.1) 0%, transparent 60%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%,black 30%,transparent 100%)",
          }}
        />

        {/* Pill badge */}
        <div className="relative mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-sm text-indigo-300 font-medium backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          The all-in-one Agency Operating System
        </div>

        {/* Logo + Brand */}
        <div className="relative flex flex-col items-center mb-6">
          <div className="mb-5 drop-shadow-[0_0_32px_rgba(99,102,241,0.5)] flex items-center justify-center">
            <ArvianLogo width={80} height={80} />
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tight leading-[0.9] mb-4">
            <span className="text-white">Arvian</span>
          </h1>
          <p
            className="text-xl md:text-2xl font-light max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Build, scale, and automate your agency —
            <br />
            <span className="text-indigo-400 font-medium">all in one platform.</span>
          </p>
        </div>

        {/* CTA row */}
        <div className="relative flex flex-col sm:flex-row items-center gap-4 mt-8 mb-16">
          <Link
            href="/agency"
            className="group px-7 py-3.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Start Free — No Card Needed
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="#features"
            className="px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-300"
          >
            Explore Features
          </Link>
        </div>

        {/* Stats row */}
        <div className="relative flex flex-wrap justify-center gap-10 mt-2">
          {[
            { n: "10K+", l: "Agencies" },
            { n: "₹2Cr+", l: "Revenue Managed" },
            { n: "99.9%", l: "Uptime" },
            { n: "500+", l: "Funnels Live" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {s.n}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Dashboard preview image */}
        <div className="relative mt-20 w-full max-w-5xl mx-auto">
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 pointer-events-none"
            style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)" }}
          />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/assets/preview.png"
              alt="Arvian Dashboard"
              width={1100}
              height={700}
              className="w-full object-cover object-top"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080818] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ───────────────────────────────────────────── */}
      <section className="py-12 px-6 border-y border-white/5">
        <p className="text-center text-xs uppercase tracking-widest text-zinc-600 mb-8">
          Powered by world-class technology
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {socialProofLogos.map((logo) => (
            <span key={logo} className="text-sm font-semibold text-zinc-600 hover:text-zinc-400 transition-colors">
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-4">
              Platform Features
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
              Every tool your agency
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                will ever need.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={clsx(
                  "group relative p-8 bg-[#080818] hover:bg-[#0d0d24] transition-all duration-300 cursor-default",
                )}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.06), transparent 70%)" }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-white/5 select-none">{f.num}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 font-medium">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-4">
              Simple Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Start free.{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Scale anytime.
              </span>
            </h2>
            <p className="text-zinc-500 max-w-md mx-auto">
              No hidden fees, no lock-ins. Pick a plan that fits your agency&apos;s current stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {pricingCards.map((card) => {
              const isPopular = card.title === "Unlimited Saas";
              return (
                <div
                  key={card.title}
                  className={clsx(
                    "relative flex flex-col p-7 rounded-2xl border transition-all duration-300",
                    isPopular
                      ? "border-indigo-500/50 bg-gradient-to-b from-indigo-950/60 to-[#080818] shadow-2xl shadow-indigo-500/15 scale-[1.03]"
                      : "border-white/8 bg-[#0d0d24]/60 hover:border-white/15"
                  )}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full text-xs font-bold text-white shadow-lg">
                      ✦ Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">{card.description}</p>
                    <h3 className={clsx("text-xl font-bold mb-4", isPopular ? "text-white" : "text-zinc-300")}>
                      {card.title}
                    </h3>
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-black text-white">{card.price}</span>
                      {card.duration && (
                        <span className="text-zinc-500 text-sm pb-1.5">/{card.duration}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-1">
                    {card.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5">
                        <CheckIcon />
                        <span className="text-sm text-zinc-300">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/agency?plan=${card.priceId}`}
                    className={clsx(
                      "block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                      isPopular
                        ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-500/20"
                        : "border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {card.price === "Free" ? "Get Started Free" : "Choose Plan"}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto relative">
          <div
            className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none"
            style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)" }}
          />
          <div className="relative rounded-3xl border border-white/8 overflow-hidden p-14 text-center"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.06))" }}
          >
            <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-4">
              Join thousands of agencies
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Your agency deserves
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                better infrastructure.
              </span>
            </h2>
            <p className="text-zinc-400 mb-10 max-w-lg mx-auto">
              Start for free. No credit card needed. See why agencies switch to Arvian and never look back.
            </p>
            <Link
              href="/agency"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl font-bold text-white text-sm hover:from-indigo-500 hover:to-cyan-500 shadow-xl shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
            >
              Launch Your Agency Today
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <ArvianLogo width={28} height={28} />
            <span className="text-sm font-bold text-zinc-400">Arvian</span>
          </div>
          <p className="text-xs text-zinc-700">© Ankit Tiwari@2026</p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
