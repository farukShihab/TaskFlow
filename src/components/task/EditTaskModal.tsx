"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { TaskForm } from "./TaskForm";

import {
    useTasksStore,
} from "@/store/task.store";

import {
    useUIStore,
} from "@/store/ui.store";

import { format } from "date-fns";

export function EditTaskModal() {
    const editingTask = useUIStore(
        (state) => state.editingTask
    );

    const editTaskDraft = useUIStore(
        (state) => state.editTaskDraft
    );

    const editTaskTagInput = useUIStore(
        (state) => state.editTaskTagInput
    );

    const updateEditTaskDraft = useUIStore(
        (state) => state.updateEditTaskDraft
    );

    const setEditTaskTagInput = useUIStore(
        (state) => state.setEditTaskTagInput
    );

    const closeEditTask = useUIStore(
        (state) => state.closeEditTask
    );

    const openDeleteTask = useUIStore(
        (state) => state.openDeleteTask
    );

    const updateTask = useTasksStore(
        (state) => state.updateTask
    );

    const deletingTask = useUIStore(
        (state) => state.deletingTask
    );

    const fetchTasks = useTasksStore(
        (state) => state.fetchTasks
    );

    const selectedDate = useUIStore(
        (state) => state.selectedDate
    );

    const ignoreNextEditClose =
        useUIStore(
            (state) =>
                state.ignoreNextEditClose
        );

    const setIgnoreNextEditClose =
        useUIStore(
            (state) =>
                state.setIgnoreNextEditClose
        );

    if (!editingTask) {
        return null;
    }

    return (
        <Dialog
            open={!!editingTask}
            onOpenChange={(open) => {
                if (
                    !open &&
                    ignoreNextEditClose
                ) {
                    setIgnoreNextEditClose(false);
                    return;
                }

                if (!open) {
                    closeEditTask();
                }
            }}
        >
            <DialogContent className="sm:max-w-lg"
                showCloseButton = {false}
                onInteractOutside={(e) => {
                    if (deletingTask) {
                        e.preventDefault();
                    }
                }}
                onPointerDownOutside={(e) => {
                    if (deletingTask) {
                        e.preventDefault();
                    }
                }}
                onEscapeKeyDown={() =>
                    console.log("escape")
                }
            >
                <DialogHeader>
                    <DialogTitle>
                        Edit Task
                    </DialogTitle>
                </DialogHeader>

                <TaskForm
                    form={editTaskDraft}
                    tagInput={editTaskTagInput}
                    onFieldChange={
                        updateEditTaskDraft
                    }
                    onTagChange={
                        setEditTaskTagInput
                    }
                    submitLabel="Save Changes"
                    onSubmit={async (data) => {
                        await updateTask(
                            editingTask.id,
                            data
                        );

                        await fetchTasks(format(selectedDate, "yyyy-MM-dd"));

                        closeEditTask();
                    }}
                    showDelete
                    onDelete={() => {
                        openDeleteTask(editingTask);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}