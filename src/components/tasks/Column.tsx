"use client";

import { useDroppable } from "@dnd-kit/core";

import { Task } from "@/types/task";
import { TaskCard } from "../task/TaskCard";
import { motion, AnimatePresence } from "framer-motion";

interface ColumnProps {
    id: Task["status"];
    title: string;
    tasks: Task[];
}

export function Column({
    id,
    title,
    tasks,
}: ColumnProps) {

    const { setNodeRef } =
        useDroppable({
            id,
        });

    const priorityOrder = {
        high: 0,
        medium: 1,
        low: 2,
    };

    const sortedTasks = [...tasks].sort(
        (a, b) =>
            priorityOrder[a.priority] -
            priorityOrder[b.priority]
    );

    return (
        <section className="
                flex
                h-full
                min-h-[36rem]
                flex-col
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-5
                shadow-lg
                ">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-light text-white">
                    {title}
                </h2>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
                    {tasks.length}
                </span>
            </div>

            <motion.div
                ref={setNodeRef}
                layout
                className="flex flex-1 flex-col gap-4"
            >
                {tasks.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-xl border-slate-300 p-6 text-center">
                        <p className="text-sm text-slate-500">
                            No tasks yet.
                        </p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                    
                        {sortedTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </motion.div>
        </section>
    );
}
