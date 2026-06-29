"use client";

import { motion } from "framer-motion";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative pt-16 sm:pt-20">
      <div className="container-x text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-4xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[58px]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-[19px]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
