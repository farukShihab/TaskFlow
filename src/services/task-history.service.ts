import { api } from "@/lib/api";
import { TaskHistory } from "@/types/task-history";

export async function getTaskHistory() {
  const response = await api.get<TaskHistory[]>(
    "/tasks/history/"
  );

  return response.data;
}