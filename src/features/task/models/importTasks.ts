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

export interface ImportConversionOptions {
  idColName?: string;
  titleColName?: string;
  managerColName?: string;
  assigneeColName?: string;
  statusColName?: string;
}

export interface ImportOptions extends ImportConversionOptions {
  handleErrors?: boolean;
  worksheetName?: string;
}

export interface ImportResults {
  total: number;
  success: Task[];
  fails: FailTask[];
}
