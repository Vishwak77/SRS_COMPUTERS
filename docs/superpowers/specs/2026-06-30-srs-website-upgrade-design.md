# SRS Computers Website Upgrade — Design Spec
**Date:** 2026-06-30  
**Status:** Approved — ready for implementation

---

## Overview

Five targeted upgrades to the existing Next.js + Tailwind SRS Computers showcase site:

1. Fix and build out the homepage search bar (live dropdown + navigate on Enter)
2. Replace all demo catalogue products with the real 300+ PDF products across 12 categories
3. Download and host real product images locally in `/public/products/`
4. Add a "VIEW DETAILS" specs section inside the existing ProductModal — category-adaptive fields
5. Make testimonial client avatars slightly larger in the About / Testimonials section

---

## 1. Data Architecture

### Approach
Single `lib/catalogue.ts` file (Approach A). All product data lives here.  
Each category gets its own exported `Category` object; the file assembles them into `CATEGORIES[]`.

### Extended Product type
```ts
export type Spec = { label: string; value: string };

export type Product = {
  name: string;
  brand: string;
  desc: string;
  image: string;       // /products/<slug>.jpg  — falls back to styled placeholder
  specs?: Spec[];      // category-adaptive, rendered in ProductModal
};
```

### 12 Categories

| Key | Label | Notes |
|-----|-------|-------|
| `laptops` | Laptops | Acer Aspire 3/Aspi Light, HP 15 FD/FCO/255R/250R, Dell DC15250/ECS1250/Slim/Ryzen, Lenovo IdeaPad 5 2-in-1/LOQ, Apple MacBook M4 |
| `monitors` | Monitors | Acer 20"/22", Dell 20"/22", MSI 22"/24"/27", Samsung 22"/27", Lenovo S24/E20/S24-30, HP 19.5"/20"/23.8", EVM 22", Fingers 22", Foxin 19.5", Frontech 19.5"/22"/24", Zebstar 15.6"/19"/22", Zebster 22" |
| `desktops` | Desktops & All-in-Ones | Dell Pro Tower QVT1260, HP OmniDesk Slim S03, Lenovo ThinkCentre Neo 30S |
| `components` | PC Components | RAM DDR3/DDR4 (Aarvex, Arvex, Consistent, Crucial, EVM, Elite Team, Frontech, Geonix, Hikvision, Lapcare, Samsung), Processors i3/i5/i7 3rd–12th gen (Intel), Motherboards H81/H110/H310/H510/H610 (ASUS, EVM, Foxin, Frontech, Gigabyte, Lapcare, Zebronics), Graphics GT730 (EVM, Frontech, Zebronic, Zotac), CPU fans, Thermal paste |
| `printers` | Printers | Canon LBP6030/LBP6030W/G2010/MF3010, Epson L3210/L3250/L4360/L6460/M1100/M2050, HP Smart Tank 525, Konica Minolta BH227I, TVS 3200/RP3160/LP46 |
| `ink` | Ink & Toner | Canon 71/75/76/790/GI-790/PG-47/NPG-67, Epson 001/003/005/008/057/664/012, HP 12A/88A/CE278A/W1103/W1335X/GT53/682/56A/335X, Brother BT5000/BTD60BK, ZEB 2365, YHPQ2612A, Panyum PC208, Samsung MLD101 + consumable parts (rollers, teflon, ribbons, maintenance boxes) |
| `cctv` | CCTV & Security | CP Plus (4MP Bullet/Dual Light Bullet/Dual Light Dome/Twoway Dome, 4CH DVR/NVR, 8CH NVR, POE switch, racks, power supply, CAT6), Hikvision (2MP ColorVu/Dual/Twoway, 5MP Bullet, PTZ 360, 4CH/8CH/16CH DVR/NVR), Dahua (2MP Colour Bullet, 8CH/16CH DVR/NVR), Trueview (HD Dome/Bullet, 4G/WiFi/Solar PT cameras, 4CH DVR), COFE 3MP+3MP 4G, IMOU 3MP/5MP WiFi, Prama 4MP Bullet/Dome, Secureye 4G, EZVIZ C8C, accessories (BNC/DC connectors, PVC boxes, racks, SD cards) |
| `networking` | Networking | Tenda (N300/AC1200 routers, 10-port POE switch), D-Link (DIR-615N, 5-port switches), TP-Link (5/8-port switches, range extenders), CP Plus (8-port giga/POE switches), Coconut WiFi dongles 150/300Mbps, Hommok/Hammok WiFi dongles, Live Tech CAT6/WiFi+BT, Lanzone CAT6 305M, Acuraa CAT6, HDMI-VGA adapters, LAN tester |
| `storage` | Storage | SATA SSD (ANT Esports/EVM/Foxin/Frontech/Geonix/Lapcare/Zebronics/Hikvision/Crucial 128–512GB), NVMe SSD (EVM/Foxin/Frontech/Hikvision/Crucial 128GB–1TB), HDD (Consistent/Krystaa/WD Blue/Seagate SkyHawk/Toshiba 500GB–6TB), Pen drives (HP 32/64/128GB), Memory cards (Dahua/EVM/Frontech/Sandisk/Krystaa 32–128GB), External SSD (Lexar 1TB) |
| `accessories` | Accessories | Keyboards (Dell KB216, HP KB115, TVS Champ/Gold, ZEB Nitro, Zebronics K65, TVSE Gold, Lenovo Wirless 2100), Mice (Coconut M110/Zeta, Dell DS111/DS320/MS116, HP MS115/wireless, Frontech wireless, Lenovo 1100/wireless, TVS USB/wireless), Webcams (HP 325/Logitech C270/Lenovo FHD/TVS WC103/Zebronics Crystal), Speakers (Coconut wood/USB/black, Frontech soundbar/BT, ZEB Pluto/Gold/Wonderbar), Bags & cases (Acer/Dell/HP/Lenovo), Adapters (various laptop adapters), Mouse pads, Win11 key, K7 Antivirus, OTG/USB-C cables |
| `power` | UPS & Power | UPS 600VA (Fingers ×18, Zebronics ×8, Frontech ×4, Numeric ×4), Stabilizer 2KVA, SMPS (Coconut, ANT Esports/Value, Foxin with cabinet, Frontech, Zebronics 450W), Batteries (Relicell 7AH ×5, Techie RS1), Spike strips (ERD, Zebronics) |
| `biometric` | Biometric & Scanners | ESSL K30 Pro+IDB, Mantra MFS500, TVS BS-ID 0230U scanner, TVS BS-i201g barcode scanner, ZEB Laminator A3L, Lapcare Laminator LLM006, ZEB Presentation Pointer PP100 |

### Category-adaptive spec fields

| Category | Spec fields |
|----------|-------------|
| `laptops` | Processor · RAM · Storage · Display · OS · Warranty |
| `monitors` | Screen Size · Panel Type · Resolution · Ports · Refresh Rate · Warranty |
| `desktops` | Processor · RAM · Storage · OS · Form Factor · Warranty |
| `components` | Type · Capacity / Speed · Interface · Socket/Form Factor · Brand |
| `printers` | Type · Connectivity · Print Speed · Functions · Ink System |
| `ink` | Compatible Printers · Colour · Volume / Yield · Type |
| `cctv` | Resolution · Camera Type · Night Vision · Audio · Connectivity |
| `networking` | Standard · Ports · Speed · Frequency Band |
| `storage` | Type · Capacity · Interface · Read/Write Speed |
| `accessories` | Type · Connectivity · Compatibility |
| `power` | Capacity · Output · Backup Time · Protection Type |
| `biometric` | Sensor Type · Connectivity · Capacity · OS Support |

---

## 2. Homepage Search Bar

### Current state
`Hero.tsx` has a decorative `<span>` with placeholder text — not a real input. Clicking anywhere navigates to `/products`.

### Target behaviour
**Option C:** live dropdown on the homepage **+** full results on `/products?search=<query>` on Enter.

### Implementation

**`Hero.tsx`** — convert to a real `<input>`:
- `useState` for query string
- `useMemo` derived results: flatten all CATEGORIES products, filter by `name + brand + desc` containing query (case-insensitive), cap at 6 results for dropdown
- Dropdown renders below the search card, `AnimatePresence` fade-in, each result opens `ProductModal` in-place
- On Enter / "Search" button click → `router.push('/products?search=' + encodeURIComponent(query))`
- Escape key / click outside → close dropdown
- Category chips below search box become real links: clicking "Laptops" → `/products?cat=laptops`

**`BrowseProducts.tsx`** — add search filtering:
- Read `search` param from `useSearchParams()`
- When `search` is set, filter every category's products and show only matches (across all categories at once, no per-category grouping)
- Show a "X results for 'query'" count header and a clear-search button
- When `search` is empty, normal category-grouped view resumes

---

## 3. Product Images

### Strategy
For each of the ~300 products, use `WebSearch` + `WebFetch` to find the manufacturer or major Indian retailer (Flipkart, Amazon.in, HP.in, Dell.com, Canon.in, Epson.in) product image URL, then download the file into `/public/products/<slug>.jpg`.

### Naming convention
`<category-key>-<brand-slug>-<product-slug>.jpg`  
Examples:
- `laptops-hp-15-fd0624tu.jpg`
- `monitors-msi-27-mp273.jpg`
- `cctv-hikvision-2mp-colorvu-bullet.jpg`
- `ink-epson-057-bk.jpg`

### Fallback
The existing `onError → styled placeholder` in `ProductCard` and `ProductModal` already handles broken/missing images gracefully — no change needed there.

---

## 4. VIEW DETAILS — Specs in ProductModal

### Current state
`ProductModal.tsx` shows: category label, brand chip, product name, short description, 3 trust chips, WhatsApp + Call CTAs.

### Changes
Add a specs grid between the description and the trust chips:
- Only renders when `product.specs` is defined and non-empty
- Displayed as a 2-column grid of `label: value` rows
- Divider line above, subtle `bg-surface-card` row backgrounds
- No heading needed — the visual layout communicates "specs" clearly
- Scrollable on small screens

### Modal height
Currently fixed. Change to `max-h-[90vh] overflow-y-auto` on the details side so longer spec lists scroll without clipping.

---

## 5. About Page — Testimonial Avatar Size

### Current state
`Testimonials.tsx` — avatar div: `h-11 w-11` (44 × 44 px), text `text-[14px]`.

### Change
Increase to `h-16 w-16` (64 × 64 px), bump initials text to `text-[18px]`, adjust gap from `gap-3` to `gap-4`.  
No other changes to the testimonials section.

---

## Files Changed

| File | Change |
|------|--------|
| `lib/catalogue.ts` | Full rewrite — 12 categories, 300+ products with specs |
| `components/home/Hero.tsx` | Real search input, live dropdown, router push |
| `components/BrowseProducts.tsx` | Search param filtering + clear-search UI |
| `components/ProductModal.tsx` | Specs grid section added |
| `components/home/Testimonials.tsx` | Avatar size bump |
| `/public/products/*.jpg` | ~300 downloaded product images |

---

## Out of Scope

- No prices (showcase only — matches existing intent)
- No cart / checkout
- No CMS or database
- No changes to Services, Contact, or Gallery pages
- No changes to Navbar product menu labels (those map to category keys which are unchanged)
