import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useForm } from "effector-forms";
import React from "react";

import { MAX_VOTES, MIN_VOTES } from "../../lib/constants";
import { createPollModel } from "../../model";
import { VoteCounter } from "../vote-counter";

interface CreatePollFormProps {
  onSubmit: () => Promise<void>;
}

export const CreatePollForm = ({ onSubmit }: CreatePollFormProps) => {
  const { fields, eachValid, reset } = useForm(createPollModel.form);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit();
    reset();
  };

  return (
    <form
      className="flex flex-col gap-10 text-center text-lg font-bold"
      onSubmit={handleSubmit}
    >
      <Input
        id="topic"
        label="What's the Poll's Topic?"
        onChange={(event) => fields.topic.onChange(event.target.value)}
        value={fields.topic.value}
      />
      <VoteCounter max={MAX_VOTES} min={MIN_VOTES} />
      <Input
        id="name"
        label="Enter Your Name"
        onChange={(event) => fields.name.onChange(event.target.value)}
        value={fields.name.value}
      />
      <Button
        variant="primary"
        className="w-full"
        disabled={
          !(fields.name.isTouched && fields.topic.isTouched && eachValid)
        }
      >
        Create a Poll!
      </Button>
    </form>
  );
};
