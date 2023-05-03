export enum TaskStatus {
  BACKLOG = "backlog",
  PROGRESS = "progress",
  VALIDATING = "validating",
  DONE = "done",
  PAUSED = "paused",
  CANCELLED = "cancelled",
}

export interface Task {
  id: number;
  full_id: string;
  // TODO: is this needed?
  user_id: number;
  title: string;
  status: TaskStatus;
  manager: string;
}
