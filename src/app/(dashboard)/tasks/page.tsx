"use client";

import { useEffect, useState } from "react";


import { DateToolbar } from "@/components/calendar/DateToolbar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Board } from "@/components/tasks/Board";

import { getTasks } from "@/lib/services/tasks";
import { Task } from "@/types/task";
import { useTasksStore } from "@/store/task.store";

import { format } from "date-fns";

import { useUIStore } from "@/store/ui.store";

import { useTaskHistoryStore } from "@/store/task-history.store";

export default function TasksPage() {
    // TODO: Replace with your DateToolbar state later
    const selectedDate = useUIStore(
        (state) => state.selectedDate
    );

    const setSelectedDate = useUIStore(
        (state) => state.setSelectedDate
    );


    const dateString = format(selectedDate, "yyyy-MM-dd");

    const tasks = useTasksStore(
        (state) => state.tasks
    );

    const loading = useTasksStore(
        (state) => state.loading
    );

    const error = useTasksStore(
        (state) => state.error
    );

    const fetchTasks = useTasksStore(
        (state) => state.fetchTasks
    );

    useEffect(() => {
        fetchTasks(dateString);
    }, [dateString, fetchTasks]);

    const fetchHistory = useTaskHistoryStore(
        (state) => state.fetchHistory
    );

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return (
        <div className="flex flex-col gap-6">
            <DateToolbar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />

            <div className="grid gap-6 xl:grid-cols-[3fr_1fr]">
                <Board
                    tasks={tasks}
                    loading={loading}
                    error={error}
                />

                <Dashboard />
            </div>
        </div>
    );
}