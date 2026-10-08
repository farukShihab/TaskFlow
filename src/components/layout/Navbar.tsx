"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCheck, CheckSquare, Image, Search, Plus, User } from "lucide-react";

import { Button } from "@/components/design/forms/Button";
import { Input } from "@/components/design/forms/Input";

import { useUIStore } from "@/store/ui.store";

import { UserMenu } from "./UserMenu";

const navigation = [
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Annotate", href: "/annotate", icon: Image },
];

export function Navbar() {
  const pathname = usePathname();

  const openCreateTask = useUIStore((state) => state.openCreateTask);
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setSearchQuery = useUIStore((state) => state.setSearchQuery);

  const onTasksPage = pathname.startsWith("/tasks");

  return (
    <motion.header
      className="sticky top-0 z-40 pt-2"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="surface mx-2 flex h-16 items-center gap-6 px-6">
        {/* Logo */}
        <Link href="/tasks" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
            <CheckCheck className="h-5 w-5 text-white" />
          </div>
          <div className="hidden leading-tight sm:block">
            <h1 className="text-base font-bold text-foreground">TaskFlow</h1>
            <p className="text-xs text-muted">Productivity Suite</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <motion.div
                key={item.href}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-violet-600 text-white"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Search (tasks page only) */}
        <div className="max-w-md flex-1">
          {onTasksPage && (
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-3">
          {onTasksPage && (
            <Button
              className="gap-2 rounded-xl px-5 shadow-lg shadow-violet-600/20"
              onClick={openCreateTask}
            >
              <Plus size={18} />
              New Task
            </Button>
          )}

          {/* User */}
          <UserMenu />
        </div>
      </div>
    </motion.header>
  );
}