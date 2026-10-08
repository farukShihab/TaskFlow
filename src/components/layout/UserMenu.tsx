"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, User } from "lucide-react";

import { useAuthStore } from "@/store/auth.store"; // adapt

import { resetAllStores } from "@/lib/resetStores";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const username = useAuthStore((state) => state.user?.username); // adapt
  const logout = useAuthStore((state) => state.logout); // adapt

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

    const handleLogout = async () => {
        setOpen(false);
        await logout();
        resetAllStores();
        router.replace("/");
        router.refresh();
    };

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="surface flex items-center gap-3 py-1.5 pl-1.5 pr-3 transition-all duration-200"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/15">
          <User size={18} className="text-violet-400" />
        </div>

        <span className="hidden max-w-[140px] truncate text-sm font-medium text-foreground md:block">
          {username}
        </span>

        <ChevronDown
          size={16}
          className={`text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="surface absolute right-0 top-full z-50 mt-2 w-44 p-1.5"
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}