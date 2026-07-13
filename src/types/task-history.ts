export type TaskHistoryAction =
  | "created"
  | "updated"
  | "deleted"
  | "moved";

export interface TaskHistory {
  id: number;
  task: number | null;
  owner: number;
  action: TaskHistoryAction;
  task_title: string;
  details: Record<string, any>;
  created_at: string;
}