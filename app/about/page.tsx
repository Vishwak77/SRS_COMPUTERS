import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ScrollIntoViewOnMount from "@/components/ScrollIntoViewOnMount";
import FinalCTA from "@/components/home/FinalCTA";
import Stats from "@/components/home/Stats";
import { Heart, Handshake, Wrench, MapPin } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Treat every customer like a neighbour",
    desc: "Most of Perambalur knows us by name. We'd rather lose a sale than sell you the wrong thing.",
  },
  {
    icon: Handshake,
    title: "Honest pricing, every time",
    desc: "No inflated quotes, no pressure. Fair prices on genuine products from brands you can trust.",
  },
  {
    icon: Wrench,
    title: "We stand behind what we sell",
    desc: "Bought it here? We service it here. Our in-house team keeps your tech running for years.",
  },
];

const TIMELINE = [
  { year: "2009", title: "The shop opens", desc: "R C Ramalingam founds SRS Computers, serving Perambalur's first PC buyers from a small counter." },
  { year: "2013", title: "Service & repairs", desc: "We add an in-house technician bench — repairs and upgrades become a core part of who we are." },
  { year: "2018", title: "CCTV & security", desc: "Growing demand brings camera systems and full installation services into the store." },
  { year: "Today", title: "Your full tech partner", desc: "Laptops, desktops, printers, networking, security and service — all under one roof." },
];

export const metadata = {
  title: "About — SRS Computers",
  description: "The story of SRS Computers, Perambalur's trusted computer and electronics store.",
};

export default function AboutPage() {
  return (
    <>
      {/* On redirect, land on the founder story so the photo is fully visible. */}
      <ScrollIntoViewOnMount targetId="story" offset={-96} />

      <PageHero
        eyebrow="Our story"
        title={
          <>
            Perambalur&apos;s computer shop,
            <br className="hidden sm:block" /> built on trust
          </>
        }
        subtitle="Since 2009, families, students and businesses across the district have come to SRS for honest advice and tech that lasts."
      />

      {/* Story + portrait */}
      <section id="story" className="relative scroll-mt-28 py-16 sm:py-20">
        <div className="container-x">
          <Reveal className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl2 border border-white/70 bg-gradient-to-br from-surface-sky to-surface-mint shadow-soft">
              <div className="grid min-h-[340px] place-items-center p-8">
                <div className="relative h-48 w-48 overflow-hidden rounded-full bg-white shadow-card ring-4 ring-white">
                  <Image
                    src="/founder.jpeg"
                    alt="R C Ramalingam, founder of SRS Computers"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-white/85 px-4 py-1.5 text-center text-[13px] font-semibold text-ink shadow-sm frosted">
                R C Ramalingam · Founder
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.01em] text-ink sm:text-[34px]">
                It started with a simple idea
              </h2>
              <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
                Buying a computer shouldn&apos;t mean a trip to the city or a
                gamble on an online order. Our founder, R C Ramalingam, opened
                SRS Computers in 2009 to give Perambalur a place where technology
                feels approachable — where you can see it, ask questions, and walk
                out with the right product and someone to call if you ever need
                help.
              </p>
              <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
                More than fifteen years later, that&apos;s still exactly how we
                work — one honest conversation at a time.
              </p>
              <div className="mt-6 flex items-center gap-2 text-[14.5px] font-semibold text-ink">
                <MapPin className="h-4 w-4 text-accent-deep" /> Proudly local,
                proudly Perambalur
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-12 sm:py-16">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we stand for</p>
            <h2 className="mt-3 text-[32px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[42px]">
              The values behind the counter
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.1}
                className="rounded-card border border-white/70 bg-white/80 p-7 shadow-soft frosted"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink">
                  <v.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-5 text-[19px] font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {v.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-12 sm:py-16">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our journey</p>
            <h2 className="mt-3 text-[32px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[42px]">
              How we grew with the town
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl">
            {TIMELINE.map((t, i) => (
              <Reveal
                key={t.year}
                delay={i * 0.08}
                className="flex gap-5 border-l-2 border-line pb-10 pl-6 last:pb-0"
              >
                <div className="-ml-[31px] grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-bold text-ink shadow-soft">
                  {t.year === "Today" ? "★" : ""}
                </div>
                <div>
                  <div className="text-[13px] font-bold uppercase tracking-[0.1em] text-accent-deep">
                    {t.year}
                  </div>
                  <h3 className="mt-1 text-[19px] font-bold text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <FinalCTA />
    </>
  );
}
