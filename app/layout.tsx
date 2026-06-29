import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGradient from "@/components/BackgroundGradient";
import OfferPopup from "@/components/OfferPopup";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SRS Computers — Perambalur's Computer & Electronics Destination",
  description:
    "SRS Computers is Perambalur's trusted store for laptops, desktops, CCTV, printers, accessories and expert service. Visit our showroom.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans antialiased">
        <BackgroundGradient />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <OfferPopup />
        </SmoothScroll>
      </body>
    </html>
  );
}
