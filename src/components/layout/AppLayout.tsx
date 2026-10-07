"use client";

import { motion } from "framer-motion";

import { Navbar } from "./Navbar";
import { CreateTaskModal } from "@/components/task/CreateTaskModal";
import { EditTaskModal } from "../task/EditTaskModal";
import { DeleteTaskDialog } from "../task/DeleteTaskDialog";
import { ReactNode } from "react";
import { PageContainer } from "./PageContainer";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
    >
      <div className="min-h-screen">
        <Navbar />

        <main>
          <PageContainer>{children}</PageContainer>
        </main>

        <CreateTaskModal />
        <EditTaskModal />
        <DeleteTaskDialog />
      </div>
    </motion.div>
  );
}