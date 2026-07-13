import { api } from "@/lib/api";

import {
    Task,
    TaskFormData,
} from "@/types/task";

export async function getTasks(
    date?: string
): Promise<Task[]> {
    const response = await api.get<Task[]>(
        "/tasks/",
        {
            params: date
                ? { date }
                : undefined,
        }
    );

    return response.data;
}

export async function createTask(
    data: TaskFormData
): Promise<Task> {
    const response = await api.post<Task>(
        "/tasks/",
        data
    );

    return response.data;
}

export async function updateTask(
    id: number,
    data: Partial<TaskFormData>
): Promise<Task> {
    const response = await api.patch<Task>(
        `/tasks/${id}/`,
        data
    );

    return response.data;
}

export async function deleteTask(
    id: number
): Promise<void> {
    await api.delete(`/tasks/${id}/`);
}

export async function moveTask(
  id: number,
  status: string
) {

    console.log(
        "PATCHING",
        id,
        status
    );

  const response =
    await api.patch(
      `/tasks/${id}/move/`,
      {
        status,
      }
    );

  return response.data;
}