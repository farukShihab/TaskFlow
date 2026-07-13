"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
    DndContext,
    DragEndEvent,
    DragOverlay
} from "@dnd-kit/core";

import { Task } from "@/types/task";
import { Column } from "./Column";

import { useUIStore } from "@/store/ui.store";
import { useTasksStore } from "@/store/task.store";

import { TaskCard } from "../task/TaskCard";

interface BoardProps {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export function Board({
    tasks,
    loading,
    error,
}: BoardProps) {
    const searchQuery = useUIStore(
        (state) => state.searchQuery
    );

    const moveTask = useTasksStore(
        (state) => state.moveTask
    );

    const filteredTasks = tasks.filter((task) => {
        const query = searchQuery.toLowerCase();

        return (
            task.title.toLowerCase().includes(query) ||
            task.description
                ?.toLowerCase()
                .includes(query) ||
            task.tags?.some((tag) =>
                tag.toLowerCase().includes(query)
            )
        );
    });

    const todoTasks = filteredTasks.filter(
        (task) => task.status === "todo"
    );

    const inProgressTasks = filteredTasks.filter(
        (task) => task.status === "in_progress"
    );

    const doneTasks = filteredTasks.filter(
        (task) => task.status === "done"
    );

    const [activeTask, setActiveTask] =
        useState<Task | null>(null);

    const handleDragEnd = async (
        event: DragEndEvent
    ) => {
        const { active, over } = event;
        console.log("drag end", active.id, over?.id);

        if (!over) return;

        const taskId = Number(active.id);
        const newStatus = over.id as Task["status"];

        const task = tasks.find(
            (t) => t.id === taskId
        );

        if (!task) return;

        if (task.status === newStatus) {
            return;
        }

        await moveTask(
            taskId,
            newStatus
        );
    };

    if (loading) {
        return (
            <section className="grid gap-6 lg:grid-cols-3">
                <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
                <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
                <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8">
                <p className="text-red-600">
                    {error}
                </p>
            </section>
        );
    }

    if (filteredTasks.length === 0) {
        return (
            <section className="flex items-center justify-center rounded-2xl border border-border bg-card p-12">
                <p className="text-muted-foreground">
                    No tasks found.
                </p>
            </section>
        );
    }

    return (
        <DndContext
            onDragStart={({ active }) => {
                const task = tasks.find(
                    (t) => t.id === active.id
                );

                setActiveTask(task ?? null);
            }}
            onDragEnd={(event) => {
                handleDragEnd(event);
                setActiveTask(null);
            }}

            onDragCancel={() => {
                setActiveTask(null);
            }}
        >
            <section className="grid gap-6 lg:grid-cols-3">
                <Column
                    id="todo"
                    title="To Do"
                    tasks={todoTasks}
                />

                <Column
                    id="in_progress"
                    title="In Progress"
                    tasks={inProgressTasks}
                />

                <Column
                    id="done"
                    title="Done"
                    tasks={doneTasks}
                />
            </section>
            <DragOverlay>
                {activeTask ? (
                    <motion.div
                        initial={{
                            scale: 1,
                            rotate: 0,
                        }}
                        animate={{
                            scale: 1.1,
                            rotate: 2,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                        }}
                        className="
                            shadow-[0_25px_60px_rgba(0,0,0,.45)]
                            ring-1
                            ring-violet-500/20
                        "
                    >
                        <TaskCard task={activeTask} />
                    </motion.div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}