import { createEvent, Store } from "effector";
import { useStore } from "effector-react";
import React from "react";

export const useForm = <T>($store: Store<T>) => {
  const setField = createEvent<{ key: keyof T; value: string }>();
  const reset = createEvent();
  const form = useStore($store);

  $store
    .on(setField, (s, { key, value }) => ({
      ...s,
      [key]: value,
    }))
    .reset(reset);

  const handleFieldChange =
    (field: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setField({ key: field, value });
    };

  return { handleFieldChange, reset, form };
};
