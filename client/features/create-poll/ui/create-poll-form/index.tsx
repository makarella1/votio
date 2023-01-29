import { MAX_VOTES, MIN_VOTES } from "@features/create-poll/lib/constants";
import { createPollModel } from "@features/create-poll/model";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useForm } from "effector-forms";
import React from "react";

import { VoteCounter } from "./vote-counter";

export const CreatePollForm = () => {
  const { fields, eachValid } = useForm(createPollModel.pollForm);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    createPollModel.createPoll();
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
