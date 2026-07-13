import { create } from "zustand";

import * as taskService from "@/services/task.service";

import {
    Task,
    TaskFormData,
} from "@/types/task";

interface TasksStore {
    tasks: Task[];

    loading: boolean;

    error: string | null;

    fetchTasks: (
        date?: string
    ) => Promise<void>;

    createTask: (
        data: TaskFormData
    ) => Promise<void>;

    updateTask: (
        id: number,
        data: Partial<TaskFormData>
    ) => Promise<void>;

    deleteTask: (
        id: number
    ) => Promise<void>;

    moveTask: (
        id: number,
        status: Task["status"]
    ) => Promise<void>;
}

export const useTasksStore =
    create<TasksStore>((set, get) => ({
        tasks: [],

        loading: false,

        error: null,

        moveTask: async (
            taskId,
            status
        ) => {
            const previous =
                get().tasks;

            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId
                        ? {
                            ...task,
                            status,
                        }
                        : task
                ),
            }));

            console.log(
                get().tasks.map((t) => ({
                    id: t.id,
                    status: t.status,
                }))
            );

            try {
                const updated =
                    await taskService.moveTask(
                        taskId,
                        status
                    );

                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === taskId
                            ? updated
                            : task
                    ),
                }));
            } catch (e) {
                set({
                    tasks: previous,
                });
            }
        },

        fetchTasks: async (date) => {
            set({
                loading: true,
                error: null,
            });

            try {
                const tasks =
                    await taskService.getTasks(date);

                set({
                    tasks,
                });
            } catch (err) {
                set({
                    error:
                        err instanceof Error
                            ? err.message
                            : "Failed to fetch tasks",
                });
            } finally {
                set({
                    loading: false,
                });
            }
        },

        createTask: async (data) => {
            const task =
                await taskService.createTask(data);

            set((state) => ({
                tasks: [
                    task,
                    ...state.tasks,
                ],
            }));
        },

        updateTask: async (
            id,
            data
        ) => {
            const updated =
                await taskService.updateTask(
                    id,
                    data
                );

            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id
                        ? updated
                        : task
                ),
            }));
        },

        deleteTask: async (id) => {
            await taskService.deleteTask(id);

            set((state) => ({
                tasks: state.tasks.filter(
                    (task) => task.id !== id
                ),
            }));
        },
    })); 