"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { TaskForm } from "./TaskForm";

import { useUIStore } from "@/store/ui.store";
import { TaskFormData } from "@/types/task";
import { statsBuffer } from "framer-motion";

import { useTasksStore } from "@/store/task.store";

export function CreateTaskModal() {
    const {
        isCreateTaskOpen,
        closeCreateTask,
        createTaskDraft,
        createTaskTagInput,
        updateCreateTaskDraft,
        setCreateTaskTagInput,
        clearCreateTaskDraft,
    } = useUIStore();

    const [loading, setLoading] =
        useState(false);
    
    const createTask = useTasksStore(
        (state) => state.createTask
    );

    async function handleSubmit(
        data: TaskFormData
    ) {
        try {
            setLoading(true);

            await createTask(data);

            clearCreateTaskDraft();
            closeCreateTask();

            // TODO:
            // refresh board
        } catch (error) {
            console.error(error);
        } finally {
        setLoading(false);
    }
    }

    return (
        <Dialog
            open={isCreateTaskOpen}
            onOpenChange={(open) => {
                if (!open) {
                    closeCreateTask();
                }
            }}
        >
            <DialogContent
                className="sm:max-w-2xl"
            >
                <DialogHeader>
                    <DialogTitle>
                        Create New Task
                    </DialogTitle>

                    <DialogDescription>
                        Add a new task to your board.
                    </DialogDescription>
                </DialogHeader>

                <TaskForm
                    form={createTaskDraft}
                    tagInput={createTaskTagInput}
                    onFieldChange={updateCreateTaskDraft}
                    onTagChange={setCreateTaskTagInput}
                    submitLabel="Create Task"
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            </DialogContent>
        </Dialog>
    );
}