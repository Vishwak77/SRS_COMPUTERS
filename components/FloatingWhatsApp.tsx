"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  // Appear after a short delay so it doesn't compete with first paint.
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/91${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi SRS Computers! I have a quick question."
  )}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="group fixed bottom-20 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-card transition-transform hover:scale-105"
        >
          {/* gentle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 [animation:ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white" aria-hidden>
            <path d="M16 .4C7.4.4.5 7.3.5 15.9c0 2.8.7 5.4 2 7.8L.4 31.6l8.1-2.1c2.3 1.2 4.8 1.9 7.5 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.4 16 .4Zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5a12.7 12.7 0 0 1-2-6.8C3 8.9 8.8 3.1 16 3.1S29 8.9 29 16.1 23.2 28.7 16 28.7Zm7.1-9.5c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.2-2.7-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.4-.6.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.5-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5Z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
