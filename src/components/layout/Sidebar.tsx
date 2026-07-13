"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import {
  CheckSquare,
  Image,
  User,
} from "lucide-react";

const navigation = [
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Annotate",
    href: "/annotate",
    icon: Image,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
        fixed
        left-0
        top-0
        z-40
        flex
        h-screen
        w-[260px]
        flex-col
        border-r
        border-border
        bg-gradient-to-b
        from-card
        to-background
        "
    >
      {/* Logo */}
      <div className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600">
            <CheckCheck className="h-6 w-6 text-white" />
        </div>

          <div>
            <h1 className="text-lg font-bold text-foreground">
              TaskFlow
            </h1>

            <p className="text-xs text-muted">
              Productivity Suite
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                key={item.href}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                    ? "bg-violet-600 text-white"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon size={20} />

                  {item.name}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-border bg-card/80 backdrop-blur-xl p-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            surface
            flex
            cursor-pointer
            items-center
            gap-3
            p-3
            transition-all
            duration-200
            "
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/15">
            <User
              size={20}
              className="text-violet-400"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              Ali Faruk
            </p>

            <p className="truncate text-xs text-muted">
              Software Engineer
            </p>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}