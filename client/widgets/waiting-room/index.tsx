import { userModel } from "@entities/user/model";
import { Me } from "@entities/user/model/types";
import { startVotingModel } from "@features/user/admin/start-voting";
import { leaveModel } from "@features/user/leave";
import { nominationModel } from "@features/user/nominate/model";
import { modalModel } from "@shared/lib/modal";
import { Button } from "@shared/ui/button";
import { Form } from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { BottomSheetModal } from "@shared/ui/modal";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { Poll } from "shared";

import { ModalControls } from "./modal-controls";
import { NominationsList } from "./nominations-list";
import { PollInfo } from "./poll-info";
import { VotersList } from "./voters-list";

const {
  $isOpened: $isVotersModalOpened,
  close: closeVotersModal,
  open: openVotersModal,
} = modalModel.createModal();

const {
  $isOpened: $isNominationsModalOpened,
  close: closeNominationsModal,
  open: openNominationsModal,
} = modalModel.createModal();

interface WaitingRoomProps {
  poll: Poll;
  me: Me;
}

export const WaitingRoom = ({ poll, me }: WaitingRoomProps) => {
  const { fields, reset } = useForm(nominationModel.$nominationForm);

  const isVotersModalOpened = useUnit($isVotersModalOpened);
  const isNominationsModalOpened = useUnit($isNominationsModalOpened);
  const userConnection = useUnit(userModel.$userConnection);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await nominationModel.nominateFx({
      // @ts-expect-error bad typings for sockets
      socket: userConnection.socket,
      text: fields.text.value,
    });

    reset();
  };

  return (
    <div className="flex h-3/4 w-full flex-col justify-between text-center">
      <BottomSheetModal isOpened={isVotersModalOpened} close={closeVotersModal}>
        <VotersList voters={poll.voters} me={me} />
      </BottomSheetModal>
      <BottomSheetModal
        isOpened={isNominationsModalOpened}
        close={closeNominationsModal}
      >
        <div className="flex flex-col gap-20">
          <Form onSubmit={handleSubmit}>
            <Input
              label="Nomination"
              id="nomination"
              value={fields.text.value}
              onChange={(event) => fields.text.onChange(event.target.value)}
            />
            <Button variant="primary">Nominate!</Button>
          </Form>
          <NominationsList nominations={poll.nominations} me={me} />
        </div>
      </BottomSheetModal>
      <PollInfo poll={poll} />
      <ModalControls
        votersCount={Object.keys(poll.voters).length}
        nominationsCount={Object.keys(poll.nominations).length}
        openNominationsModal={openNominationsModal}
        openVotersModal={openVotersModal}
      />
      <div className="mx-auto flex w-1/2 flex-col gap-6">
        {me.isAdmin ? (
          <Button
            className="w-full"
            variant="secondary"
            onClick={async () => {
              // @ts-expect-error bad typings for sockets
              await startVotingModel.startFx(userConnection.socket);
            }}
          >
            Start Voting
          </Button>
        ) : (
          <p className="font-xl">
            Waiting for the admin,{" "}
            <span className="font-bold">{poll.voters[poll.adminId]}</span>, to
            start the poll!
          </p>
        )}
        <Button
          className="w-full"
          variant="primary"
          onClick={async () => {
            // @ts-expect-error bad typings for sockets
            await leaveModel.leaveFx(userConnection.socket);
          }}
        >
          Leave Poll
        </Button>
      </div>
    </div>
  );
};
