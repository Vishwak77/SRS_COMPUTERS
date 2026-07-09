import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Monitor,
  Laptop,
  Wrench,
  Cpu,
  Printer,
  Cctv,
  Network,
  Database,
  Star,
  Users,
  Award,
  ShieldCheck,
  Clock,
  BadgeIndianRupee,
  Headphones,
  ArrowRight,
  MapPinned,
} from "lucide-react";

// Self-contained business-style home page matching the SRS Computer Service
// reference design. Only the "/" route uses this — every other page keeps the
// existing site chrome (see components/RouteChrome.tsx).

const PHONE = "7305670008";
const PHONE_DISPLAY = "73056 70008";
const EMAIL = "srstech22@gmail.com";
const ADDRESS = "106, First Floor, Royal Enfield Showroom, Venkatesapuram, Perambalur – 621212";
const MAPS = "https://maps.app.goo.gl/1XavBddaEkbNcwbV6";
const MAPS_EMBED =
  "https://www.google.com/maps?q=SRS+COMPUTER+%26+SERVICE,11.2347228,78.8770143&ll=11.2347228,78.8770143&z=16&output=embed";
const WHATSAPP = `https://wa.me/91${PHONE}`;

const NAV = [
  { label: "HOME", href: "/", active: true },
  { label: "ABOUT US", href: "/about" },
  { label: "SERVICES", href: "#services" },
  { label: "PRODUCTS", href: "/products" },
  { label: "CCTV", href: "/products?cat=cctv" },
  { label: "GALLERY", href: "#gallery" },
  { label: "BLOG", href: "#" },
  { label: "CONTACT", href: "#contact" },
];

const SERVICES = [
  { icon: Monitor, color: "#2563eb", title: "COMPUTER SALES", desc: "Branded Desktops & All in One PCs Sales" },
  { icon: Laptop, color: "#f57c00", title: "LAPTOP SALES", desc: "All Brands Laptops Sales at Best Price" },
  { icon: Wrench, color: "#16a34a", title: "DESKTOP REPAIR", desc: "Hardware & Software Troubleshooting Expertise" },
  { icon: Cpu, color: "#7c3aed", title: "LAPTOP REPAIR", desc: "Chip Level Service & Motherboard Repair" },
  { icon: Printer, color: "#ef4444", title: "PRINTER SERVICE", desc: "All Types of Printer Sales & Service Available" },
  { icon: Cctv, color: "#06b6d4", title: "CCTV INSTALLATION", desc: "CCTV Sales, Installation & Maintenance" },
  { icon: Network, color: "#2563eb", title: "NETWORKING", desc: "LAN, Wi-Fi, Router, Switching & More" },
  { icon: Database, color: "#ec4899", title: "DATA RECOVERY", desc: "Data Recovery & Backup Solutions" },
];

const BRANDS = [
  { name: "DELL", color: "#0076ce" },
  { name: "hp", color: "#0096d6" },
  { name: "Lenovo", color: "#e2231a" },
  { name: "ASUS", color: "#00539b" },
  { name: "acer", color: "#83b81a" },
  { name: "intel", color: "#0071c5" },
  { name: "EPSON", color: "#003399" },
  { name: "Canon", color: "#cc0000" },
  { name: "SAMSUNG", color: "#1428a0" },
  { name: "SONY", color: "#111111" },
];

const PRODUCTS = [
  {
    name: "Dell Latitude 5410",
    img: "/products/laptop-dell-inspiron-15.jpg",
    specs: ["Intel Core i5 10th Gen", "8GB RAM | 256GB SSD", "14\" Display | Win 11 Pro", "1 Year Warranty"],
    price: "₹25,500/-",
  },
  {
    name: "HP 250 G8",
    img: "/products/laptop-hp-250r-g10.jpg",
    specs: ["Intel Core i3 10th Gen", "8GB RAM | 256GB SSD", "15.6\" Display | Win 11", "1 Year Warranty"],
    price: "₹21,500/-",
  },
  {
    name: "Dell OptiPlex 3060",
    img: "/products/desktop-dell-optiplex.jpg",
    specs: ["Intel Core i5 8th Gen", "8GB RAM | 256GB SSD", "Win 11 Pro", "1 Year Warranty"],
    price: "₹18,500/-",
  },
  {
    name: "Dell AIO 24\"",
    img: "/products/desktop-hp-aio-24.jpg",
    specs: ["Intel Core i3 6th Gen", "8GB RAM | 1TB HDD", "24\" Display | Win 11", "1 Year Warranty"],
    price: "₹22,500/-",
  },
  {
    name: "Epson L3250",
    img: "/products/printer-epson-l3250.jpg",
    specs: ["All-in-One Ink Tank Printer", "Print | Scan | Copy", "Wi-Fi | USB", "1 Year Warranty"],
    price: "₹11,990/-",
  },
];

const WHY = [
  { icon: Users, stat: "1000+", label: "Happy Customers" },
  { icon: Award, stat: "8+", label: "Years Experience" },
  { icon: ShieldCheck, stat: "100%", label: "Genuine Products" },
  { icon: Clock, stat: "Fast", label: "Quick Service" },
  { icon: BadgeIndianRupee, stat: "Affordable", label: "Best Price" },
  { icon: Headphones, stat: "Warranty", label: "Support" },
];

const TESTIMONIALS = [
  { name: "Karthik S", quote: "Excellent service and very professional staff. My laptop is working like new now!" },
  { name: "Priya R", quote: "Best CCTV installation service in Perambalur. Clean work and timely completed." },
  { name: "Rajesh M", quote: "Affordable price and good support. Highly recommended for everyone." },
];

const GALLERY = [
  "/gallery/store-01.jpeg",
  "/gallery/store-02.jpeg",
  "/gallery/store-03.jpeg",
  "/gallery/store-04.jpeg",
  "/gallery/store-05.jpeg",
  "/gallery/store-06.jpeg",
];

function SectionTitle({ light, before, accent }: { light?: boolean; before: string; accent: string }) {
  return (
    <div className="text-center">
      <h2 className={`text-[26px] font-extrabold tracking-tight sm:text-[30px] ${light ? "text-white" : "text-slate-800"}`}>
        {before} <span className="text-[#f57c00]">{accent}</span>
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#f57c00]" />
    </div>
  );
}

export default function NewHome() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* ============ TOP CONTACT BAR ============ */}
      <div className="bg-[#123a7a] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-1 px-4 py-2 text-[12.5px] sm:flex-row">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" /> {ADDRESS}
          </span>
          <div className="flex items-center gap-4">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-[#ffd28a]">
              <Mail className="h-3.5 w-3.5" /> {EMAIL}
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1.5 hover:text-[#ffd28a]">
              <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
            </a>
            <div className="flex items-center gap-2">
              <a aria-label="Facebook" href="#" className="grid h-6 w-6 place-items-center rounded-full bg-white/15 hover:bg-white/30"><Facebook className="h-3.5 w-3.5" /></a>
              <a aria-label="Instagram" href="#" className="grid h-6 w-6 place-items-center rounded-full bg-white/15 hover:bg-white/30"><Instagram className="h-3.5 w-3.5" /></a>
              <a aria-label="WhatsApp" href={WHATSAPP} className="grid h-6 w-6 place-items-center rounded-full bg-white/15 hover:bg-white/30"><MessageCircle className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/LOGO1.png" alt="SRS Computer Service" width={52} height={52} className="h-12 w-12 object-contain" priority />
            <div className="leading-none">
              <div className="text-[20px] font-extrabold tracking-tight">
                <span className="text-[#e11d48]">S</span>
                <span className="text-[#db2777]">R</span>
                <span className="text-[#f57c00]">S</span>
                <span className="ml-1 text-slate-700">COMPUTER SERVICE</span>
              </div>
              <div className="mt-1 inline-block rounded bg-[#e11d48] px-2 py-[1px] text-[10px] font-bold tracking-[0.2em] text-white">
                SALES &amp; SERVICES
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className={`relative px-3 py-2 text-[13.5px] font-semibold transition-colors ${
                  n.active ? "text-[#f57c00]" : "text-slate-700 hover:text-[#123a7a]"
                }`}
              >
                {n.label}
                {n.active && <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-[#f57c00]" />}
              </Link>
            ))}
          </nav>

          {/* Call now */}
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-md bg-[#123a7a] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#0e2f63]">
            <Phone className="h-4 w-4" /> CALL NOW
          </a>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#0a1b3d]">
        {/* tech grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,132,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,132,255,0.6) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 15% 20%, rgba(21,58,122,0.5), transparent 60%)" }}
        />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-16">
          {/* Left copy */}
          <div>
            <h1 className="text-[44px] font-extrabold leading-[1.02] tracking-tight text-white sm:text-[56px]">
              SRS
              <br />
              <span className="text-[#f57c00]">COMPUTER SERVICE</span>
            </h1>
            <p className="mt-4 max-w-md text-[19px] font-semibold text-white/90">
              Your Trusted Computer &amp; CCTV Service Partner in Perambalur
            </p>
            <p className="mt-3 text-[13px] font-semibold tracking-wide text-white/70">
              SALES &nbsp;•&nbsp; SERVICE &nbsp;•&nbsp; CCTV &nbsp;•&nbsp; NETWORKING &nbsp;•&nbsp; PRINTERS &nbsp;•&nbsp; REFURBISHED LAPTOPS
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-lg bg-[#1a73e8] px-5 py-3 text-white shadow-lg transition hover:brightness-110">
                <Phone className="h-5 w-5" />
                <span className="text-left leading-tight"><span className="block text-[13px] font-bold">CALL NOW</span><span className="block text-[12px] opacity-90">{PHONE_DISPLAY}</span></span>
              </a>
              <a href={WHATSAPP} className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-5 py-3 text-white shadow-lg transition hover:brightness-110">
                <MessageCircle className="h-5 w-5" />
                <span className="text-left leading-tight"><span className="block text-[13px] font-bold">WHATSAPP</span><span className="block text-[12px] opacity-90">Chat with us</span></span>
              </a>
              <a href={MAPS} className="inline-flex items-center gap-2 rounded-lg bg-[#f57c00] px-5 py-3 text-white shadow-lg transition hover:brightness-110">
                <MapPinned className="h-5 w-5" />
                <span className="text-left leading-tight"><span className="block text-[13px] font-bold">GET DIRECTIONS</span><span className="block text-[12px] opacity-90">Find our shop</span></span>
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <Image src="/gallery/store-01.jpeg" alt="SRS Computer Service showroom" width={720} height={480} unoptimized className="h-full max-h-[360px] w-full object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="scroll-mt-20 bg-white py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <SectionTitle before="OUR" accent="SERVICES" />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-xl border border-slate-100 bg-white p-5 text-center shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl" style={{ backgroundColor: s.color }}>
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-4 text-[14px] font-bold text-slate-800">{s.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BRANDS ============ */}
      <section className="bg-white pb-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <SectionTitle before="BRANDS WE" accent="DEAL" />
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-10">
            {BRANDS.map((b) => (
              <div key={b.name} className="grid h-20 place-items-center rounded-xl border border-slate-100 bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.4)]">
                <span className="text-[18px] font-extrabold tracking-tight" style={{ color: b.color }}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section id="products" className="scroll-mt-20 bg-slate-50 py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <SectionTitle before="FEATURED" accent="PRODUCTS" />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]">
                <div className="relative aspect-[4/3] bg-white">
                  <Image src={p.img} alt={p.name} fill unoptimized sizes="220px" className="object-contain p-3" />
                </div>
                <div className="flex flex-1 flex-col border-t border-slate-100 p-3.5">
                  <h3 className="text-[14px] font-bold text-slate-800">{p.name}</h3>
                  <ul className="mt-1.5 space-y-0.5 text-[11.5px] leading-snug text-slate-500">
                    {p.specs.map((sp) => (
                      <li key={sp}>{sp}</li>
                    ))}
                  </ul>
                  <div className="mt-2 text-[18px] font-extrabold text-[#e11d48]">{p.price}</div>
                  <a href={WHATSAPP} className="mt-2.5 inline-flex items-center justify-center gap-1.5 rounded-md bg-[#123a7a] px-3 py-2 text-[12px] font-bold text-white transition hover:bg-[#0e2f63]">
                    <MessageCircle className="h-3.5 w-3.5" /> ENQUIRE NOW
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-md bg-[#f57c00] px-6 py-3 text-[14px] font-bold text-white shadow transition hover:brightness-105">
              VIEW ALL PRODUCTS <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE ============ */}
      <section className="bg-[#123a7a] py-12 text-white">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-center text-[24px] font-extrabold tracking-tight sm:text-[28px]">
            WHY CHOOSE <span className="text-[#f57c00]">SRS</span> COMPUTER SERVICE?
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {WHY.map((w) => (
              <div key={w.label} className="text-center">
                <w.icon className="mx-auto h-9 w-9 text-white/90" strokeWidth={1.6} />
                <div className="mt-2 text-[22px] font-extrabold text-[#f9a03f]">{w.stat}</div>
                <div className="text-[13px] text-white/80">{w.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <SectionTitle before="WHAT OUR" accent="CUSTOMERS SAY" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_12px_34px_-20px_rgba(15,23,42,0.4)]">
                <div className="flex text-[#f9a03f]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#123a7a] text-[13px] font-bold text-white">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <span className="text-[13.5px] font-bold text-slate-800">- {t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section id="gallery" className="scroll-mt-20 bg-slate-50 py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <SectionTitle before="OUR" accent="GALLERY" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {GALLERY.map((src, i) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-lg border border-slate-100 shadow-sm">
                <Image src={src} alt={`SRS gallery ${i + 1}`} fill unoptimized sizes="200px" className="object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer id="contact" className="scroll-mt-20 border-t border-slate-200 bg-white pt-12">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact */}
          <div>
            <h3 className="text-[15px] font-extrabold uppercase tracking-wide text-[#123a7a]">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-[13.5px] text-slate-600">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#123a7a]" /> <a href={`tel:${PHONE}`} className="hover:text-[#123a7a]">{PHONE_DISPLAY}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#123a7a]" /> <a href={`mailto:${EMAIL}`} className="hover:text-[#123a7a]">{EMAIL}</a></li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#123a7a]" /> <span>{ADDRESS}</span></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-[15px] font-extrabold uppercase tracking-wide text-[#123a7a]">Business Hours</h3>
            <ul className="mt-4 space-y-3 text-[13.5px] text-slate-600">
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#123a7a]" /> <span>Monday – Saturday<br />9:00 AM – 9:00 PM</span></li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#123a7a]" /> <span>Sunday<br />9:00 AM – 2:00 PM</span></li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h3 className="text-[15px] font-extrabold uppercase tracking-wide text-[#123a7a]">Follow Us</h3>
            <ul className="mt-4 space-y-3 text-[13.5px] text-slate-600">
              <li><a href="#" className="inline-flex items-center gap-2 hover:text-[#123a7a]"><Facebook className="h-4 w-4 text-[#1877f2]" /> Facebook</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 hover:text-[#123a7a]"><Instagram className="h-4 w-4 text-[#e1306c]" /> Instagram</a></li>
              <li><a href={WHATSAPP} className="inline-flex items-center gap-2 hover:text-[#123a7a]"><MessageCircle className="h-4 w-4 text-[#25d366]" /> WhatsApp</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 hover:text-[#123a7a]"><Youtube className="h-4 w-4 text-[#ff0000]" /> YouTube</a></li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-[15px] font-extrabold uppercase tracking-wide text-[#123a7a]">Find Us</h3>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <iframe
                title="SRS Computer Service location"
                src={MAPS_EMBED}
                className="h-40 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-4 py-4 text-[12.5px] text-slate-500 sm:flex-row">
            <span>© 2024 SRS Computer Service. All Rights Reserved.</span>
            <span className="flex items-center gap-3">
              <a href="#" className="hover:text-[#123a7a]">Privacy Policy</a>
              <span className="text-slate-300">|</span>
              <a href="#" className="hover:text-[#123a7a]">Terms &amp; Conditions</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
