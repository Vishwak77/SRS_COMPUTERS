// Central content source. Rewrite copy here later — UI reads from this file.

export const SITE = {
  name: "SRS Computers",
  tagline: "Perambalur's destination for computers & electronics",
  founder: "R C Ramalingam",
  foundedYear: 2009,
  foundedDate: "15 November 2009",
  phone: "6380876818",
  phoneDisplay: "+91 63808 76818",
  whatsapp: "7305670008",
  whatsappDisplay: "+91 73056 70008",
  email: "srstech123@gmail.com",
  address: {
    line1: "1st Floor, Royal Enfield Showroom",
    line2: "Venkateshapuram, Perambalur, Tamil Nadu 621212",
    maps: "https://www.google.com/maps/search/?api=1&query=Royal+Enfield+Showroom+Venkateshapuram+Perambalur+621212",
    mapsEmbed:
      "https://www.google.com/maps?q=Royal+Enfield+Showroom+Venkateshapuram+Perambalur+621212&output=embed",
  },
  hours: "Open all week · 10:00 AM – 9:00 PM",
};

export const NAV_LINKS = [
  { label: "Products", href: "/products", hasMenu: true },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Brands", href: "/products#brands" },
  { label: "Visit Us", href: "/contact" },
];

// `cat` maps to a catalogue category key (lib/catalogue.ts) for deep-linking
// the Products page filter via /products?cat=<key>.
export const PRODUCT_MENU = [
  [
    { label: "Laptops", desc: "Home, work & gaming", cat: "laptops" },
    { label: "Desktops", desc: "Custom & branded builds", cat: "desktops" },
    { label: "Printers & Ink", desc: "Inkjet, laser & ink-tank", cat: "printers" },
  ],
  [
    { label: "CCTV & Security", desc: "Cameras, DVR & installation", cat: "cctv" },
    { label: "Networking", desc: "Routers, switches & Wi-Fi", cat: "networking" },
    { label: "Storage", desc: "SSD, HDD & pen drives", cat: "storage" },
  ],
  [
    { label: "Accessories", desc: "Keyboards, mice & more", cat: "accessories" },
    { label: "UPS & Power", desc: "Backup & stabilizers", cat: "power" },
    { label: "All products", desc: "Browse the full range", cat: "all" },
  ],
];

// Brand wordmarks shown in the marquee / logo wall — the real names SRS stocks.
export const BRANDS = [
  "Dell",
  "HP",
  "Lenovo",
  "ASUS",
  "Acer",
  "Canon",
  "Epson",
  "Brother",
  "Hikvision",
  "CP Plus",
  "TP-Link",
  "Logitech",
  "Zebronics",
  "Samsung",
  "SanDisk",
  "APC",
];

export const STATS = [
  { value: 15000, suffix: "+", label: "Customers served" },
  { value: 16, suffix: "+", label: "Years in Perambalur" },
  { value: 40, suffix: "+", label: "Trusted brands stocked" },
];

export const PRODUCT_CATEGORIES = [
  {
    title: "Laptops & Notebooks",
    desc: "From everyday student laptops to high-performance gaming machines — handpicked and ready to go.",
    tint: "mint" as const,
    items: ["Student & home", "Business & productivity", "Gaming", "2-in-1 & touch"],
  },
  {
    title: "Desktops & Custom Builds",
    desc: "Branded systems and bespoke builds assembled to your budget and workload, right here in-store.",
    tint: "sky" as const,
    items: ["Branded desktops", "Custom assembled", "Workstations", "All-in-ones"],
  },
  {
    title: "CCTV & Security",
    desc: "Protect your home or business with HD camera systems, professionally surveyed and installed.",
    tint: "mint" as const,
    items: ["Dome & bullet cameras", "DVR / NVR kits", "Remote viewing", "On-site install"],
  },
  {
    title: "Printers & Supplies",
    desc: "Inkjet, laser and ink-tank printers plus genuine cartridges and refills for every brand.",
    tint: "sky" as const,
    items: ["Ink-tank printers", "Laser printers", "Cartridges & toner", "Scanners"],
  },
];

export const SERVICES = [
  {
    title: "Sales & Consultation",
    desc: "Tell us your budget and use-case — we recommend the right machine, no upselling.",
    step: "01",
  },
  {
    title: "Custom PC Building",
    desc: "Pick your parts or let us spec a build. Assembled, tested and ready the same week.",
    step: "02",
  },
  {
    title: "Repairs & Upgrades",
    desc: "Hardware diagnostics, RAM/SSD upgrades, screen and board-level repair done in-house.",
    step: "03",
  },
  {
    title: "CCTV Installation",
    desc: "Free site survey, neat cabling and a system tuned for your premises and phone.",
    step: "04",
  },
  {
    title: "Annual Maintenance (AMC)",
    desc: "Keep offices and shops running with scheduled servicing and priority support.",
    step: "05",
  },
  {
    title: "Software & Setup",
    desc: "OS installation, data transfer, antivirus and first-time setup so you leave ready.",
    step: "06",
  },
];

export const OLD_WAY = [
  "Driving to Trichy for every purchase",
  "No idea if you're getting the right spec",
  "Online orders that arrive wrong or late",
  "Nobody local to call when it breaks",
  "Paying for parts you don't need",
];

export const SRS_WAY = [
  "Everything you need, right here in Perambalur",
  "Honest advice matched to your budget",
  "See it, test it, take it home today",
  "Walk-in service & support whenever you need",
  "Fair pricing from a shop that knows you",
];

// Placeholder testimonials — replace with real customer quotes later.
export const TESTIMONIALS = [
  {
    quote:
      "Bought my son's first laptop here. They patiently explained every option and never pushed the costliest one. Honest people.",
    name: "Ramesh K.",
    role: "Parent · Perambalur",
    initials: "RK",
  },
  {
    quote:
      "Got CCTV installed for my shop. Free survey, neat wiring, and they set up the phone app right there. Very professional.",
    name: "Lakshmi S.",
    role: "Shop owner · Perambalur",
    initials: "LS",
  },
  {
    quote:
      "My office desktop kept crashing. SRS upgraded the SSD and RAM the same day. Runs like new and the price was fair.",
    name: "Arun V.",
    role: "Small business · Perambalur",
    initials: "AV",
  },
  {
    quote:
      "Best place around for printer ink and quick service. They always have stock and remember what I use. Feels like family.",
    name: "Priya M.",
    role: "Home user · Perambalur",
    initials: "PM",
  },
];

export const FAQS = [
  {
    q: "Do you offer service and repairs for products bought elsewhere?",
    a: "Yes. Bring in any laptop, desktop or printer — our in-house technicians diagnose and repair most brands regardless of where you bought them.",
  },
  {
    q: "Can you build a custom PC to my budget?",
    a: "Absolutely. Tell us your budget and what you'll use it for, and we'll spec, assemble and test a build for you, usually within the week.",
  },
  {
    q: "Do you install CCTV at home and for businesses?",
    a: "We do. We start with a free on-site survey, then handle cabling, installation and phone setup so you can view your cameras from anywhere.",
  },
  {
    q: "What brands do you stock?",
    a: "We carry Dell, HP, Lenovo, ASUS, Acer and more, plus printers from Canon and Epson and CCTV from Hikvision — among 40+ trusted brands.",
  },
];
