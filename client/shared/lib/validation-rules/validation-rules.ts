import { Rule } from "effector-forms";

export const required = (): Rule<string> => ({
  name: "required",
  validator: (value) => Boolean(value),
});

export const minLength = (minLength: number): Rule<string> => ({
  name: "minLength",
  validator: (value) => value.length >= minLength,
});
