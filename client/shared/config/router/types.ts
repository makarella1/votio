import { Routes } from "./routes";

export type RoutesTypes = (typeof Routes)[keyof typeof Routes];
