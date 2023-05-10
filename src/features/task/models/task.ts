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
  warning?: Warning;
}

export enum WarningCode {
  INVALID_STATUS = "INVALID_STATUS",
}

export enum ErrorCode {
  DUPLICATE = "DUPLICATE",
  INVALID = "INVALID",
  UNKNOWN = "UNKNOWN",
}

export interface Warning {
  code: WarningCode;
  message: string;
}

export interface TaskWithError {
  task: Task;
  error: Error;
}
