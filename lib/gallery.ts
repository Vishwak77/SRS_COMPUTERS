// Single source of truth for showroom photography.
// Consumed by: components/GalleryGrid.tsx (/gallery), components/Gallery.tsx
// (/products) and components/home/GalleryMarquee.tsx (home hero strip).

export type GalleryPhoto = {
  src: string;
  alt: string;
  // "contain" for posters/flyers whose text would be cropped by a cover fit.
  fit?: "cover" | "contain";
};

// CP Plus is SRS's main CCTV & networking supplier, so their stock leads the
// gallery. Files live in public/cpplus/.
export const CPPLUS_PHOTOS: GalleryPhoto[] = [
  {
    src: "/cpplus/3.jpeg",
    alt: "CP Plus network video recorders (NVR) in stock at SRS Computers",
  },
  {
    src: "/cpplus/4.jpeg",
    alt: "CP Plus PoE switches and Illumax dual-light CCTV cameras at SRS Computers",
  },
  {
    src: "/cpplus/5.jpeg",
    alt: "CP Plus Illumax dual-light CCTV cameras stacked at SRS Computers",
  },
  {
    src: "/cpplus/1.jpeg",
    alt: "CP Plus PoE/DVR enclosure boxes and Cat6 network cable at SRS Computers",
  },
  {
    src: "/cpplus/2.jpeg",
    alt: "CP Plus PoE/DVR enclosure box and 305 m Cat6 UTP cable at SRS Computers",
  },
];

// Real in-store photos — public/gallery/store-01 … store-10.
// store-10 is a square shop poster, not a shelf photo: a cover crop cuts off
// the shop name and phone number, so it's shown whole.
export const STORE_PHOTOS: GalleryPhoto[] = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  if (n === "10") {
    return {
      src: "/gallery/store-10.jpeg",
      alt: "SRS Computers — sales, service and support in Perambalur",
      fit: "contain" as const,
    };
  }
  return {
    src: `/gallery/store-${n}.jpeg`,
    alt: `Inside SRS Computers, Perambalur — shelf ${i + 1}`,
  };
});

// Full set shown on /gallery and /products.
export const ALL_PHOTOS: GalleryPhoto[] = [...CPPLUS_PHOTOS, ...STORE_PHOTOS];

// The square shop poster (store-10). It leads the home strip and is rendered in
// a square tile there, so nothing is cropped.
export const POSTER_PHOTO: GalleryPhoto = STORE_PHOTOS[9];

// Curated strip for the home hero: shop poster, then CP Plus, then store shots.
// Skips near-duplicates (06 repeats 05, 08 repeats 03), the cluttered 09, and 07
// (Zebronics camera boxes — off-brand for the strip). cpplus/1 and /2 are the
// same scene, so only /1 appears here.
export const MARQUEE_PHOTOS: GalleryPhoto[] = [
  POSTER_PHOTO, // SRS shop poster
  CPPLUS_PHOTOS[0], // NVRs
  CPPLUS_PHOTOS[1], // PoE switches + cameras
  CPPLUS_PHOTOS[2], // dual-light cameras
  CPPLUS_PHOTOS[3], // enclosure boxes + Cat6
  { src: "/gallery/store-01.jpeg", alt: "CCTV pan-tilt cameras on display at SRS Computers" },
  { src: "/gallery/store-02.jpeg", alt: "Accessories and chargers on the shelf at SRS Computers" },
  { src: "/gallery/store-03.jpeg", alt: "Ink, cables and accessories across the SRS Computers shelves" },
  { src: "/gallery/store-04.jpeg", alt: "Wireless mice and keyboards in the SRS Computers display case" },
  { src: "/gallery/store-05.jpeg", alt: "Canon printers and ink at SRS Computers" },
];
