import { DisplayUser } from "./displayUser";

export type Jwt = { token: string } | null;

export interface DecodedJwt {
  user: DisplayUser;
  exp: number;
  iat: number;
}
