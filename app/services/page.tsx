import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/home/FinalCTA";
import { SERVICES } from "@/lib/site";
import { MessageSquare, Search, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: MessageSquare, title: "Tell us what you need", desc: "Walk in or call. Describe the problem or what you're looking for — no jargon required." },
  { icon: Search, title: "We assess & advise", desc: "We diagnose, quote honestly and explain your options in plain language before doing anything." },
  { icon: CheckCircle2, title: "Sorted & ready", desc: "Repair, build or install done and tested. You leave with it working and someone to call." },
];

export const metadata = {
  title: "Services — SRS Computers",
  description: "Repairs, custom PC builds, CCTV installation, AMC and setup at SRS Computers, Perambalur.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="How we help"
        title={
          <>
            Service that doesn&apos;t
            <br className="hidden sm:block" /> end at the sale
          </>
        }
        subtitle="Repairs, upgrades, custom builds and installations — handled in-house by people you can actually talk to."
      />

      {/* Services grid */}
      <section className="relative py-14 sm:py-20">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.title}
                delay={(i % 3) * 0.08}
                className="group relative overflow-hidden rounded-card border border-white/70 bg-white/80 p-7 shadow-soft frosted transition-shadow hover:shadow-card"
              >
                <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-accent-deep">
                  {s.step}
                </span>
                <h3 className="mt-3 text-[20px] font-bold leading-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {s.desc}
                </p>
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-glow/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-12 sm:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-[32px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
              From problem to sorted, in three steps
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.12}
                className="relative rounded-card border border-white/70 bg-gradient-to-br from-surface-sky to-white p-8 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink">
                  <step.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="mt-5 text-[15px] font-bold text-accent-deep">
                  Step {i + 1}
                </div>
                <h3 className="mt-1 text-[21px] font-extrabold leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
