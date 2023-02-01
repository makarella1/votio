import { joinPollModel } from "@features/join-poll/model";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useForm } from "effector-forms";

export const JoinPollForm = () => {
  const { fields, eachValid, reset } = useForm(joinPollModel.joinPollForm);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    joinPollModel.joinPoll();
    reset();
  };

  return (
    <form
      className="flex flex-col gap-10 text-center text-lg font-bold"
      onSubmit={handleSubmit}
    >
      <Input
        id="topic"
        label="Enter the Code From Your Friend To Join a Poll"
        onChange={(event) => fields.pollId.onChange(event.target.value)}
        value={fields.pollId.value}
      />
      <Input
        id="name"
        label="Enter Your Name"
        onChange={(event) => fields.name.onChange(event.target.value)}
        value={fields.name.value}
      />
      <Button
        variant="secondary"
        className="w-full"
        disabled={
          !(fields.name.isTouched && fields.pollId.isTouched && eachValid)
        }
      >
        Join a Poll!
      </Button>
    </form>
  );
};
