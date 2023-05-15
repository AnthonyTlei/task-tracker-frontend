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
  date_assigned?: Date;
  date_completed?: Date;
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
  // TODO: modify Task to NEwTask since TaskWithError isnt created so it doesnt have an id
  task: Task;
  error: Error;
}

export interface TaskWithWarning {
  task: Task;
  warning: Warning;
}

export interface GetTasksFilterDTO {
  range?: [Date, Date];
}
