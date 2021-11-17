import { Route, Redirect } from "react-router";
import { useUser } from "./useUser";

export const PrivateRoute = (props) => {
  const auth = useUser();
  if (!auth) return <Redirect to="/login" />;
  return <Route {...props} />;
};
