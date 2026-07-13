"use client";

import {
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IconButton } from "@/components/design/forms/IconButton";

import { Task } from "@/types/task";

import { useUIStore } from "@/store/ui.store";

interface TaskActionsProps {
    task: Task;
}

export function TaskActions({
    task,
}: TaskActionsProps) {
    const openEditTask =
        useUIStore(
            (state) => state.openEditTask
        );

    const openDeleteTask =
        useUIStore(
            (state) =>
                state.openDeleteTask
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                onPointerDown={(e) =>
                    e.stopPropagation()
                }
            >
                <IconButton
                    variant="ghost"
                    aria-label="Task options"
                >
                    <MoreHorizontal size={16} />
                </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="
          w-44
          border-white/10
          bg-zinc-950/95
          backdrop-blur-xl
        "
            >
                <DropdownMenuItem
                    onClick={() =>
                        openEditTask(task)
                    }
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Task
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() =>
                        openDeleteTask(task)
                    }
                    className="
            text-red-400
            focus:text-red-400
          "
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Task
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}