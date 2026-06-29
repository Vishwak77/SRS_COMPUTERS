import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { SITE } from "@/lib/site";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from "lucide-react";

export const metadata = {
  title: "Visit Us — SRS Computers",
  description: "Find SRS Computers in Perambalur. Address, hours, phone and directions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit us"
        title={
          <>
            Come say hello
            <br className="hidden sm:block" /> in Perambalur
          </>
        }
        subtitle="No appointment needed. Drop by the showroom, give us a call, or message us — whatever's easiest for you."
      />

      <section className="relative py-14 sm:py-20">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* Contact details */}
            <Reveal className="space-y-4">
              <div className="rounded-card border border-white/70 bg-white/85 p-7 shadow-soft frosted">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Detail icon={MapPin} label="Address">
                    {SITE.address.line1}
                    <br />
                    {SITE.address.line2}
                  </Detail>
                  <Detail icon={Clock} label="Opening hours">
                    {SITE.hours}
                  </Detail>
                  <Detail icon={Phone} label="Phone">
                    <a href={`tel:${SITE.phone}`} className="hover:text-accent-deep">
                      {SITE.phoneDisplay}
                    </a>
                  </Detail>
                  <Detail icon={Mail} label="Email">
                    <a href={`mailto:${SITE.email}`} className="hover:text-accent-deep">
                      {SITE.email}
                    </a>
                  </Detail>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={SITE.address.maps} target="_blank" rel="noreferrer" className="btn-accent flex-1">
                    <Navigation className="h-4 w-4" /> Get directions
                  </a>
                  <a
                    href={`https://wa.me/91${SITE.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost flex-1"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp us
                  </a>
                </div>
              </div>

              <div className="rounded-card border border-white/70 bg-gradient-to-br from-surface-mint to-surface-sky p-7 shadow-soft">
                <h3 className="text-[20px] font-bold text-ink">
                  Prefer to call first?
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Tell us what you&apos;re after and we&apos;ll check stock, give
                  you a price, and have it ready when you arrive.
                </p>
                <a href={`tel:${SITE.phone}`} className="btn-dark mt-5">
                  <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
                </a>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.1} className="overflow-hidden rounded-card border border-white/70 shadow-card">
              <iframe
                title="SRS Computers location"
                src={SITE.address.mapsEmbed}
                className="h-full min-h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-12 sm:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Good to know</p>
            <h2 className="mt-3 text-[32px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQ />
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-surface-card">
        <Icon className="h-5 w-5 text-accent-deep" />
      </div>
      <div>
        <div className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-muted-light">
          {label}
        </div>
        <div className="mt-0.5 text-[15px] font-medium leading-snug text-ink">
          {children}
        </div>
      </div>
    </div>
  );
}
