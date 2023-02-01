import { createEffect, Event, sample } from "effector";
import { navigate } from "wouter/use-location";

import { RoutesTypes } from "./types";

const redirectFx = createEffect((path: RoutesTypes) => {
  navigate(path);
});

export const redirect = ({
  clock,
  fn,
}: {
  clock: Event<any>;
  fn: () => RoutesTypes;
}) => sample({ clock, fn, target: redirectFx });
