// src/lib/services/tasks.ts

import { api } from "@/lib/api";
import {
  CreateTaskDto,
  Task,
  UpdateTaskDto,
} from "@/types/task";

export async function getTasks(date: string): Promise<Task[]> {
  const { data } = await api.get<Task[]>("/tasks/", {
    params: {
      date,
    },
  });

  return data;
}

export async function createTask(
  task: CreateTaskDto
): Promise<Task> {
  const { data } = await api.post<Task>("/tasks/", task);

  return data;
}

export async function updateTask(
  id: number,
  task: UpdateTaskDto
): Promise<Task> {
  const { data } = await api.patch<Task>(
    `/tasks/${id}/`,
    task
  );

  return data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}/`);
}