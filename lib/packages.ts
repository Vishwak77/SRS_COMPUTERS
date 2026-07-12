// Store packages — the ready-made bundles SRS sells off the shelf.
// Data only; icons are resolved by key in components/home/Packages.tsx.

export type PackageIcon =
  | "cctv"
  | "monitor"
  | "home"
  | "gaming"
  | "workstation";

export type Package = {
  name: string;
  /** One-line spec summary shown under the name. */
  detail: string;
  /** Formatted for display — these are indicative store prices. */
  price: string;
  icon: PackageIcon;
  popular?: boolean;
};

export type PackageGroup = {
  key: string;
  title: string;
  blurb?: string;
  packages: Package[];
};

const CCTV_PACKAGES: PackageGroup = {
  key: "cctv",
  title: "Our CCTV packages",
  blurb:
    "Camera kits with recorder, cabling and installation — surveyed, fitted and set up on your phone by our team.",
  packages: [
    { name: "Basic Package", detail: "2 Cameras + DVR", price: "₹6,999", icon: "cctv" },
    { name: "Standard Package", detail: "4 Cameras + DVR", price: "₹11,999", icon: "cctv" },
    { name: "Premium Package", detail: "8 Cameras + DVR", price: "₹18,999", icon: "cctv", popular: true },
    { name: "Ultimate Package", detail: "16 Cameras + DVR", price: "₹29,999", icon: "cctv" },
  ],
};

const PC_PACKAGES: PackageGroup = {
  key: "pc",
  title: "Our PC setup packages",
  blurb:
    "Ready-to-use desktop setups for home, office, gaming and business — assembled, installed and tested by our team.",
  packages: [
    { name: "Basic Setup", detail: "i3 / 8GB / 256GB SSD", price: "₹16,999", icon: "monitor" },
    { name: "Home / Office Setup", detail: "i5 / 8GB / 512GB SSD", price: "₹24,999", icon: "home" },
    { name: "Gaming Setup", detail: "i5 / 16GB / GTX 1650", price: "₹42,999", icon: "gaming", popular: true },
    { name: "Workstation Setup", detail: "i7 / 16GB / 1TB SSD", price: "₹59,999", icon: "workstation" },
  ],
};

export const PACKAGE_GROUPS: PackageGroup[] = [CCTV_PACKAGES, PC_PACKAGES];
