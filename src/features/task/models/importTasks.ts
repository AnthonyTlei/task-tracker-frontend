import { NewTask } from "./newTask";
import { Task } from "./task";

export enum ErrorType {
  DUPLICATE = "DUPLICATE",
  INVALID = "INVALID",
  UNKNOWN = "UNKNOWN",
}

export interface ImportError {
  type: ErrorType;
  message: string;
}

export interface FailTask {
  task: NewTask;
  error: ImportError;
}

export interface ImportResults {
  total: number;
  success: Task[];
  fails: FailTask[];
}
