import "./index.css";

import { RoutesTypes } from "@shared/config/router";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { Route, useRoute } from "wouter";

interface AnimatedRouteProps extends React.PropsWithChildren {
  path: RoutesTypes;
  children: React.ReactNode;
}

export const AnimatedRoute = ({ path, children }: AnimatedRouteProps) => {
  const [match] = useRoute(path);

  return (
    <CSSTransition in={match} timeout={300} classNames="page" unmountOnExit>
      <Route path={path}>{children}</Route>
    </CSSTransition>
  );
};
