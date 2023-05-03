import { Task } from "../../task/models/task";
import { DisplayUser } from "../../auth/models/displayUser";

export interface TaskWithUser extends Task {
  user: DisplayUser;
}
