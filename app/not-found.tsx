import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";
import { PRODUCT_MENU } from "@/lib/site";

export const metadata = {
  title: "Page not found — SRS Computers",
  description: "The page you're looking for doesn't exist. Browse our products or head back home.",
};

// Popular categories to help visitors recover from a bad link.
const QUICK_LINKS = PRODUCT_MENU.flat().slice(0, 6);

export default function NotFound() {
  return (
    <section className="relative">
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow text-accent-deep">Error 404</p>
        <h1 className="mt-4 text-[64px] font-extrabold leading-none tracking-[-0.02em] text-ink sm:text-[96px]">
          404
        </h1>
        <h2 className="mt-4 text-[24px] font-extrabold tracking-[-0.01em] text-ink sm:text-[30px]">
          This page took a wrong turn
        </h2>
        <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back to something useful.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-accent">
            <Home className="h-4 w-4" /> Back to home
          </Link>
          <Link href="/products" className="btn-dark">
            <Search className="h-4 w-4" /> Browse all products
          </Link>
        </div>

        {/* Quick category recovery links */}
        <div className="mt-12 w-full max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-light">
            Or jump to a category
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.cat}
                href={`/products?cat=${item.cat}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-white/85 px-4 py-3 text-left shadow-soft frosted transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="text-[14.5px] font-semibold text-ink">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-light transition-colors group-hover:text-accent-deep" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
