import { useEffect } from "react";
import { verifyJwt } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux/redux-hooks";

const SecuredRoute = ({ page }: { page: JSX.Element }) => {
  const { isSuccess, isLoading, isAuthenticated, jwt } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!jwt || !jwt.token) {
      return;
    };
    dispatch(verifyJwt(jwt.token));
  }, [jwt, dispatch]);

  // TODO: refactor loading into a shared component
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return isAuthenticated ? page : <Navigate replace to="/login" />;
  }

  // TODO: replace with a better error page
  return <div>Something went wrong...</div>;
  
};

export default SecuredRoute;
