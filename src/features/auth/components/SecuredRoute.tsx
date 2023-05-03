import { useEffect } from "react";
import { verifyJwt } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux/redux-hooks";

const SecuredRoute = ({ page }: { page: JSX.Element }) => {
  const { isSuccess, isAuthenticated, jwt } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!jwt || !jwt.token) {
      return;
    };
    dispatch(verifyJwt(jwt.token));
  }, [jwt, isSuccess, dispatch]);

  return isAuthenticated ? page : <Navigate replace to="/login" />;
};

export default SecuredRoute;
