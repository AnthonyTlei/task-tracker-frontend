export enum TaskStatus {
  BACKLOG = "backlog",
  PROGRESS = "progress",
  VALIDATING = "validating",
  DONE = "done",
  PAUSED = "paused",
  CANCELLED = "cancelled",
  UNKNOWN = "unknown",
}

export interface Task {
  id: number;
  full_id: string;
  user_id: number;
  title: string;
  status: TaskStatus;
  manager: string;
}

export enum WarningType {
  INVALID_STATUS = "INVALID_STATUS",
}

export interface Warning {
  code: WarningType;
  message: string;
}

export interface TaskWithWarning {
  task: Task;
  warning: Warning;
}
