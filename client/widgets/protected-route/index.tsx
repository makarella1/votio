import { Me } from "@entities/user/model/types";
import { Routes } from "@shared/config/router";
import { Route, RouteProps } from "@shared/ui/route";
import { Redirect } from "wouter";

interface ProtectedRouteProps extends RouteProps {
  me: Me;
}

export const ProtectedRoute = ({ path, children, me }: ProtectedRouteProps) => {
  if (!me.id) {
    return <Redirect to={Routes.WELCOME} />;
  }

  return <Route path={path}>{children}</Route>;
};
