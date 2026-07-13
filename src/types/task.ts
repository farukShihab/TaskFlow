export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  owner: number;

  title: string;
  description: string;

  status: TaskStatus;
  priority: TaskPriority;

  due_date: string;
  tags: string[];

  position: number;

  created_at: string;
  updated_at: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;

  status?: TaskStatus;
  priority?: TaskPriority;

  due_date: string;
  tags?: string[];

  position?: number;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}

export interface TaskFormData {
  title: string;
  description: string;

  status: TaskStatus;
  priority: TaskPriority;

  due_date: string;
  tags: string[];
}