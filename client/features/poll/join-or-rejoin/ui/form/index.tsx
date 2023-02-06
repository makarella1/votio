import { Button } from "@shared/ui/button";
import { Form } from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { useForm } from "effector-forms";

import { joinPollModel } from "../../model";

interface JoinPollFormProps {
  onSubmit: () => Promise<void>;
}

export const JoinPollForm = ({ onSubmit }: JoinPollFormProps) => {
  const { fields, eachValid, reset } = useForm(joinPollModel.form);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit();
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
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
    </Form>
  );
};
