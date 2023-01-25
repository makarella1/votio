import { useForm } from "@shared/lib/hooks";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";

import { MAX_VOTES, MIN_VOTES } from "../../lib/constants";
import { createPollModel } from "../../model";
import { VoteCounter } from "../vote-counter";

export const CreatePollForm = () => {
  const { handleFieldChange, form } = useForm(createPollModel.$pollForm);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    createPollModel.pollCreated();
  };

  const areFieldsValid = () => {
    if (form.name.length < 2 || form.name.length > 80) {
      return false;
    }

    if (form.topic.length < 2 || form.topic.length > 120) {
      return false;
    }

    return true;
  };

  return (
    <div className="h-2/4 w-full">
      <form
        className="flex flex-col gap-10 text-center text-lg font-bold"
        onSubmit={handleSubmit}
      >
        <Input
          id="topic"
          label="What's the Poll's Topic?"
          onChange={handleFieldChange("name")}
        />
        <VoteCounter max={MAX_VOTES} min={MIN_VOTES} />
        <Input
          id="name"
          label="Enter Your Name"
          onChange={handleFieldChange("topic")}
        />
        <Button
          variant="primary"
          className="w-full"
          disabled={!areFieldsValid()}
        >
          Create a Poll!
        </Button>
      </form>
    </div>
  );
};
