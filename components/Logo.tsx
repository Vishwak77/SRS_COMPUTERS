import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="SRS Computers home"
    >
      {/* Bolt mark in a rounded tile — echoes the reference's app-icon glyph */}
      <span className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-ink shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-accent"
          fill="currentColor"
          aria-hidden
        >
          <path d="M13 2 4.5 13.2c-.4.5 0 1.3.7 1.3H11l-1 7.5c-.1.8.9 1.2 1.4.5L20 11.3c.4-.5 0-1.3-.7-1.3H13l1-7.5c.1-.8-.9-1.2-1.4-.5Z" />
        </svg>
      </span>
      <span className="text-[19px] font-extrabold tracking-tight text-ink">
        srs<span className="text-accent-deep">.</span>
      </span>
    </Link>
  );
}
