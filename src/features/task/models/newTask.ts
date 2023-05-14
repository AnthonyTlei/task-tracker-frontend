import { TaskStatus } from "./task";

export interface NewTask {
  full_id: string;
  user_id: number;
  title: string;
  status: TaskStatus;
  manager: string;
  date_assigned?: Date;
  date_completed?: Date;
}
