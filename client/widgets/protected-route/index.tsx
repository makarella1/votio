import { Me } from "@entities/user/model/types";
import { Routes } from "@shared/config/router";
import { Redirect, Route } from "wouter";

interface ProtectedRouteProps extends React.PropsWithChildren {
  me: Me;
  path: string;
}

export const ProtectedRoute = ({ path, children, me }: ProtectedRouteProps) => {
  if (!me.id) {
    return <Redirect to={Routes.WELCOME} />;
  }

  return <Route path={path}>{children}</Route>;
};
