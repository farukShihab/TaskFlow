import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TaskFormData } from "@/types/task";

import { Task } from "@/types/task";

const DEFAULT_TASK_DRAFT: TaskFormData = {
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: "",
    tags: [],
};

interface UIStore {
    isCreateTaskOpen: boolean;

    createTaskDraft: TaskFormData;
    createTaskTagInput: string;

    editTaskDraft: TaskFormData;
    editTaskTagInput: string;

    editingTask: Task | null;
    deletingTask: Task | null;

    selectedDate: Date;
    setSelectedDate: (date: Date) => void;

    searchQuery: string;
    setSearchQuery: (query: string) => void;

    ignoreNextEditClose: boolean;
    setIgnoreNextEditClose: (
        value: boolean
    ) => void;

    openEditTask: (task: Task) => void;
    closeEditTask: () => void;

    openDeleteTask: (task: Task) => void;
    closeDeleteTask: () => void;

    openCreateTask: () => void;
    closeCreateTask: () => void;
    setCreateTaskOpen: (open: boolean) => void;

    

    updateCreateTaskDraft: <
        K extends keyof TaskFormData
    >(
        field: K,
        value: TaskFormData[K]
    ) => void;

    updateEditTaskDraft: <
        K extends keyof TaskFormData
    >(
        field: K,
        value: TaskFormData[K]
    ) => void;

    setCreateTaskTagInput: (
        value: string
    ) => void;

    setEditTaskTagInput: (
        value: string
    ) => void;

    clearCreateTaskDraft: () => void;
    clearEditTaskDraft: () => void;
}

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({

            searchQuery: "",

            setSearchQuery: (query) =>
                set({
                    searchQuery: query,
                }),

            ignoreNextEditClose: false,

            setIgnoreNextEditClose: (value) =>
            set({
                ignoreNextEditClose: value,
            }),

            editingTask: null,
            deletingTask: null,

            selectedDate: new Date(),

            setSelectedDate: (date) =>
                set({
                    selectedDate: date,
                }),

            openEditTask: (task) =>
                set({
                    editingTask: task,

                    editTaskDraft: {
                        title: task.title,
                        description:
                            task.description,
                        status: task.status,
                        priority: task.priority,
                        due_date: task.due_date,
                        tags: task.tags,
                    },

                    editTaskTagInput:
                        task.tags.join(", "),
                }),

            closeEditTask: () =>
                set({
                    editingTask: null,
                    editTaskDraft: {
                        ...DEFAULT_TASK_DRAFT,
                    },
                    editTaskTagInput: "",
                }),

            openDeleteTask: (task) =>
                set({ deletingTask: task }),

            closeDeleteTask: () =>
                set({ deletingTask: null }),

            isCreateTaskOpen: false,

            createTaskDraft: { ...DEFAULT_TASK_DRAFT },
            createTaskTagInput: "",

            editTaskDraft: {
                ...DEFAULT_TASK_DRAFT,
            },
            editTaskTagInput: "",

            updateEditTaskDraft: (
                field,
                value
            ) =>
                set((state) => ({
                    editTaskDraft: {
                        ...state.editTaskDraft,
                        [field]: value,
                    },
                })),

            setEditTaskTagInput: (
                value
            ) =>
                set({
                    editTaskTagInput: value,
                }),

            clearEditTaskDraft: () =>
                set({
                    editTaskDraft: {
                        ...DEFAULT_TASK_DRAFT,
                    },
                    editTaskTagInput: "",
                }),

            openCreateTask: () =>
                set({ isCreateTaskOpen: true }),

            closeCreateTask: () =>
                set({ isCreateTaskOpen: false }),

            setCreateTaskOpen: (open) =>
                set({ isCreateTaskOpen: open }),

            updateCreateTaskDraft: (
                field,
                value
            ) =>
                set((state) => ({
                    createTaskDraft: {
                        ...state.createTaskDraft,
                        [field]: value,
                    },
                })),

            setCreateTaskTagInput: (
                value
            ) =>
                set({
                    createTaskTagInput: value,
                }),

            clearCreateTaskDraft: () =>
                set({
                    createTaskDraft:
                        { ...DEFAULT_TASK_DRAFT },
                    createTaskTagInput: "",
                }),
        }),

        {
            name: "ui-store",

            partialize: (state) => ({
                createTaskDraft:
                    state.createTaskDraft,
                createTaskTagInput:
                    state.createTaskTagInput,
            }),
        }
    )
);