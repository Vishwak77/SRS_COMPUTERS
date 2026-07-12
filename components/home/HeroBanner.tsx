import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

// Rebuilt as real HTML/CSS (crisp at any size) with the brand's ORANGE theme.
const CALL = "tel:+917305670008";
const WHATSAPP =
  "https://wa.me/917305670008?text=" +
  encodeURIComponent("Hi SRS Computer Service! I'd like to enquire.");
const MAPS = "https://maps.app.goo.gl/1XavBddaEkbNcwbV6";

export default function HeroBanner() {
  return (
    <section className="relative -mt-[68px] w-full overflow-hidden bg-gradient-to-br from-[#f97316] via-[#ea580c] to-[#b23c0a] pt-[68px]">
      {/* faint tech dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* right-half showroom photo (desktop) */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src="/shop.jpg"
          alt="Inside SRS Computer Service showroom"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#ea580c] via-[#ea580c]/45 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[340px] max-w-[1200px] items-center px-5 py-10 sm:min-h-[400px] sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-sm">
            <span className="block text-[46px] sm:text-[68px]">SRS</span>
            <span className="block text-[30px] text-[#0a1f4d] sm:text-[46px]">
              COMPUTER SERVICE
            </span>
          </h1>
          <p className="mt-4 text-[18px] font-semibold leading-snug text-white sm:text-[22px]">
            Your Trusted Computer &amp; CCTV
            <br className="hidden sm:block" /> Service Partner in Perambalur
          </p>
          <p className="mt-3 text-[11.5px] font-bold uppercase tracking-wide text-white/95 sm:text-[13px]">
            Sales • Service • CCTV • Networking • Printers • Refurbished Laptops
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={CALL}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0a1f4d] px-4 py-2.5 text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5" />
              <span className="text-left text-[13px] font-bold leading-tight">
                CALL NOW<span className="block text-[11px] font-medium opacity-90">73056 70008</span>
              </span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#22c55e] px-4 py-2.5 text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white"><path d="M16 .4C7.4.4.5 7.3.5 15.9c0 2.8.7 5.4 2 7.8L.4 31.6l8.1-2.1c2.3 1.2 4.8 1.9 7.5 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.4 16 .4Z"/></svg>
              <span className="text-left text-[13px] font-bold leading-tight">
                WHATSAPP<span className="block text-[11px] font-medium opacity-90">Chat with us</span>
              </span>
            </a>
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[#ea580c] shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <MapPin className="h-5 w-5" />
              <span className="text-left text-[13px] font-bold leading-tight">
                GET DIRECTIONS<span className="block text-[11px] font-medium opacity-80">Find our shop</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
