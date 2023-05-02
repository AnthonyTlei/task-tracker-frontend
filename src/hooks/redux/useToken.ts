import { useAppSelector } from "./redux-hooks";

export const useToken = () => {
  return useAppSelector(state => state.auth.jwt?.token);
};