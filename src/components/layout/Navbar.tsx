"use client";

import { motion } from "framer-motion";
import { Search, Plus, User } from "lucide-react";

import { Button } from "@/components/design/forms/Button";
import { Input } from "@/components/design/forms/Input";

import { useUIStore } from "@/store/ui.store";

export function Navbar() {
  const openCreateTask = useUIStore(
    (state) => state.openCreateTask
  );

  const searchQuery = useUIStore(
    (state) => state.searchQuery
  );

  const setSearchQuery = useUIStore(
    (state) => state.setSearchQuery
  );

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
    >
      <div className="surface mx-2 flex h-20 items-center gap-6 px-6">
        {/* Search */}
        <div className="max-w-md flex-1">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            className="gap-2 rounded-xl px-5 shadow-lg shadow-violet-600/20"
            onClick={()=>{
              console.log("Button clicked");
              openCreateTask();
            }}
          >
            <Plus size={18} />
            New Task
          </Button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full border border-border bg-card
              transition-all duration-200
              hover:border-violet-500/30
              hover:bg-violet-500/10
            "
          >
            <User
              size={20}
              className="text-foreground"
            />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}