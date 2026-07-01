import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${className}`}
      aria-label="SRS Computers home"
    >
      <Image
        src="/LOGO1.png"
        alt="SRS Computers"
        width={56}
        height={56}
        className="h-11 w-11 object-contain transition-opacity duration-300 group-hover:opacity-80 [mix-blend-mode:multiply]"
        priority
      />
    </Link>
  );
}
