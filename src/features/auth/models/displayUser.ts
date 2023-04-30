import { UserRole } from "./userRole";

export interface DisplayUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
}
