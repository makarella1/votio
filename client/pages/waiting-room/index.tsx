import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { nominationModel } from "@features/user/nominate/model";
import {
  ClipboardDocumentIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
  UserMinusIcon,
} from "@heroicons/react/24/solid";
import { copyToClipboard } from "@shared/lib/copy-to-clipboard";
import { modalModel } from "@shared/lib/modal";
import { showToast } from "@shared/lib/notifications/toasts";
import { Button } from "@shared/ui/button";
import { ColorizedText } from "@shared/ui/colorized-text";
import { Form } from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { Loader } from "@shared/ui/loader";
import { BottomSheetModal } from "@shared/ui/modal";
import clsx from "clsx";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";
import React from "react";

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

export const WaitingRoom = () => {
  const userConnection = useUnit(userModel.$userConnection);
  const me = useUnit(userModel.$me);
  const pollLoading = useUnit(pollModel.$pollLoading);
  const poll = useUnit(pollModel.$poll);

  const isVotersModalOpened = useUnit($isVotersModalOpened);
  const isNominationsModalOpened = useUnit($isNominationsModalOpened);

  const { fields, reset } = useForm(nominationModel.$nominationForm);

  React.useEffect(() => {
    const connectToRoom = async () => {
      if (!userConnection.socket) {
        const socket = await userModel.initializeConnectionFx();

        // @ts-expect-error bad typings for sockets
        pollModel.listenToPollUpdatesFx(socket);
      } else {
        // @ts-expect-error bad typings for sockets
        pollModel.listenToPollUpdatesFx(userConnection.socket);
      }
    };

    connectToRoom();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await nominationModel.nominateFx({
      // @ts-expect-error bad typings for sockets
      socket: userConnection.socket,
      text: fields.text.value,
    });

    reset();
  };

  if (pollLoading || Object.keys(poll).length === 0) {
    return <Loader />;
  }

  return (
    <>
      <BottomSheetModal isOpened={isVotersModalOpened} close={closeVotersModal}>
        <div className="flex flex-col gap-4">
          {Object.entries(poll.voters).map(([id, voter]) => (
            <div
              key={id}
              className={clsx(
                "w-full rounded-xl border-2 border-black p-6",
                me.id === id && "border-secondary shadow-lg",
              )}
            >
              <div className="flex items-center justify-between font-bold">
                <p>{voter}</p>
                {me.isAdmin && me.id !== id && (
                  <button className="rounded-full border border-primary p-2 shadow-lg">
                    <UserMinusIcon className="h-8 w-8 text-primary" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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
            <Button
              variant="primary"
              onClick={() => {
                userConnection.socket?.emit("nominate", {
                  text: "ultra text!!!",
                });
              }}
            >
              Nominate!
            </Button>
          </Form>
          <div className="flex flex-col gap-4 pb-10">
            {Object.entries(poll.nominations).map(([id, { text, userId }]) => (
              <div
                key={id}
                className={clsx(
                  "w-full rounded-xl border-2 border-black p-4",
                  me.id === userId && "border-secondary shadow-lg",
                )}
              >
                <div
                  className={clsx(
                    "flex items-center justify-between font-bold",
                    me.id === userId && "flex-row-reverse",
                  )}
                >
                  <p>{text}</p>
                  {me.isAdmin && (
                    <button className="rounded-full border border-primary p-2 shadow-lg">
                      <TrashIcon className="h-6 w-6 text-primary" />
                    </button>
                  )}
                  {me.id === userId && !me.isAdmin && (
                    <button className="rounded-full border border-primary p-2 shadow-lg">
                      <TrashIcon className="h-6 w-6 text-primary" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BottomSheetModal>
      <div className="flex h-3/4 w-full flex-col justify-between text-center">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-black">{poll.topic}</h2>
          </div>
          <div>
            <Button
              className="mx-auto w-1/2 py-2"
              onClick={async () => {
                await copyToClipboard(poll.id);
                showToast({ type: "success", message: "Copied" });
              }}
            >
              <ColorizedText text={poll.id} />
              <ClipboardDocumentIcon className="ml-10 h-10 w-10 text-primary" />
            </Button>
          </div>
        </div>
        <div className="mx-auto flex w-1/2 justify-between">
          <Button
            className="flex-col"
            onClick={() => {
              openVotersModal();
            }}
          >
            <UserGroupIcon className="h-10 w-10" fill="#f97316" />
            <p>{Object.keys(poll.voters).length}</p>
          </Button>
          <Button
            className="flex-col"
            onClick={() => {
              openNominationsModal();
            }}
          >
            <PencilSquareIcon className="h-10 w-10" fill="#ec4899" />
            <p>{Object.keys(poll.nominations).length}</p>
          </Button>
        </div>
        <div className="mx-auto flex w-1/2 flex-col gap-6">
          {me.isAdmin ? (
            <Button className="w-full" variant="secondary">
              Start Voting
            </Button>
          ) : (
            <p className="font-xl">
              Waiting for the admin,{" "}
              <span className="font-bold">{poll.voters[poll.adminId]}</span>, to
              start the poll!
            </p>
          )}
          <Button className="w-full" variant="primary">
            Leave Poll
          </Button>
        </div>
      </div>
    </>
  );
};
