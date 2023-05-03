import { TaskStatus } from "./task";

export interface NewTask {
  full_id: string;
  // TODO: is this needed?
  user_id: number;
  title: string;
  status: TaskStatus;
  manager: string;
}
