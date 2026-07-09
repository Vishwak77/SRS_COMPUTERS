import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center ${className}`}
      aria-label="SRS Computer Service home"
    >
      {/* Wordmark is ~5.65:1 — size by height and let width follow, otherwise
          it squashes. The PNG has a real alpha channel, so it sits directly on
          the peach gradient with no blend-mode trick. */}
      <Image
        src="/logo-wordmark.png"
        alt="SRS Computer Service — Sales & Services"
        width={311}
        height={55}
        className="h-6 w-auto shrink-0 transition-opacity duration-300 group-hover:opacity-80 sm:h-8 xl:h-9"
        priority
      />
    </Link>
  );
}
