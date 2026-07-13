"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

import {
    CSS,
} from "@dnd-kit/utilities";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    Calendar,
    Flag,
} from "lucide-react";

import { Badge } from "@/components/design/forms/Badge";
import { IconButton } from "@/components/design/forms/IconButton";
import { Surface } from "@/components/design/primitives/Surface";
import { TaskActions } from "@/components/task/TaskActions";

import { Task } from "@/types/task";

import { clsx } from "clsx";

interface TaskCardProps {
    task: Task;
}

const priorityColor: Record<Task["priority"], string> = {
    low: "bg-emerald-500",
    medium: "bg-amber-500",
    high: "bg-rose-500",
};

const priorityShadow: Record<Task["priority"], string> = {
    low: "hover:shadow-[0_15px_35px_rgba(16,185,129,.25)]",
    medium: "hover:shadow-[0_15px_35px_rgba(245,158,11,.25)]",
    high: "hover:shadow-[0_15px_35px_rgba(244,63,94,.25)]",
};

const priorityBorder: Record<Task["priority"], string> = {
    low: "hover:border-emerald-400/30",
    medium: "hover:border-amber-400/30",
    high: "hover:border-rose-400/30",
};

export function TaskCard({ task }: TaskCardProps) {
    const [expanded, setExpanded] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(
            transform
        ),
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            layout="position"
            whileHover={{
                y: -5,
                scale: 1.02,
            }}
            whileTap={{
                scale: 0.99,
            }}
            

            initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}

            exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
            }}

            transition={{
                layout: {
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                },
                opacity: {
                    duration: 0.2,
                },
                scale: {
                    duration: 0.2,
                },
            }}

            className="w-full text-left focus-visible:outline-none"
        >
            <Surface
                className={clsx(`
            group
            relative
            overflow-hidden
            rounded-2xl
            border-white/10
            bg-white/5
            backdrop-blur-xl
            transition-all
            hover:border-violet-400/30
            ${priorityBorder[task.priority]}
            ${priorityShadow[task.priority]}
            focus-visible:ring-2
            focus-visible:ring-violet-500
            focus-visible:ring-offset-2
        `,isDragging && "opacity-30")}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-1 ${priorityColor[task.priority]
                        }`}
                />
                {/* Glow */}
                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-br
                        from-violet-500/5
                        to-cyan-500/5
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                    "
                />

                <div className="relative space-y-4">

                    {/* Header */}

                    <div className="flex items-center justify-between">

                        <Badge
                            className="capitalize gap-1"
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${priorityColor[task.priority]
                                    }`}
                            />

                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>

                        <div
                            className="
                                translate-x-2
                                opacity-0
                                transition-all
                                duration-200
                                group-hover:translate-x-0
                                group-hover:opacity-100
                            "
                        >
                            <button
                                {...attributes}
                                {...listeners}
                                className="
                                cursor-grab
                                active:cursor-grabbing
                                text-zinc-500
                                hover:text-zinc-300
                                "
                            >
                                <GripVertical size={16} />
                            </button>
                            <TaskActions task={task} />
                        </div>

                    </div>

                    {/* Title */}

                    <div>

                        <h3 className="font-semibold tracking-tight text-white leading-snug">
                            {task.title}
                        </h3>

                        <p
                            className={`mt-1 text-sm text-zinc-400 ${expanded ? "" : "line-clamp-2"
                                }`}
                        >
                            {task.description}
                        </p>
                        {task.description.length > 60 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpanded(!expanded);
                                }}
                                className="mt-1 text-xs font-medium text-violet-400 hover:text-violet-300"
                            >
                                {expanded ? "See less" : "See more"}
                            </button>
                        )}

                    </div>

                    {/* Tags */}

                    {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {task.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Footer */}

                    <div className="flex items-center justify-between text-xs text-zinc-400">

                        <div className="flex items-center gap-1">

                            <Calendar size={14} />

                            {new Date(task.due_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}

                        </div>

                        <div className="flex items-center gap-1">

                            <Flag size={14} />

                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}

                        </div>

                    </div>

                </div>

            </Surface>
        </motion.div>
    );
}