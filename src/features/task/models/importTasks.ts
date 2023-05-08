import { Task, TaskWithError, TaskWithWarning } from "./task";

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
  warnings: TaskWithWarning[];
  fails: TaskWithError[];
}
