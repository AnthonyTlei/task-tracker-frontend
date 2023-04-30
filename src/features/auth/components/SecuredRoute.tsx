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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, isSuccess]);

  return isAuthenticated ? page : <Navigate replace to="/login" />;
};

export default SecuredRoute;
