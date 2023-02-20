import "./index.css";

import { RoutesTypes } from "@shared/config/router";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { Route as WouterRoute, useRoute } from "wouter";

interface RouteProps extends React.PropsWithChildren {
  path: RoutesTypes;
  children: React.ReactNode;
  protected?: boolean;
}

export const Route = ({ path, children }: RouteProps) => {
  const [match] = useRoute(path);

  return (
    <CSSTransition in={match} timeout={300} classNames="page" unmountOnExit>
      <WouterRoute path={path}>{children}</WouterRoute>
    </CSSTransition>
  );
};
