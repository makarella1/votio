import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import {
  ClipboardDocumentIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { copyToClipboard } from "@shared/lib/copy-to-clipboard";
import { modalModel } from "@shared/lib/modal";
import { showToast } from "@shared/lib/notifications/toasts";
import { Button } from "@shared/ui/button";
import { ColorizedText } from "@shared/ui/colorized-text";
import { Loader } from "@shared/ui/loader";
import { Modal } from "@shared/ui/modal";
import { useUnit } from "effector-react";
import React from "react";

export const WaitingRoom = () => {
  const userConnection = useUnit(userModel.$userConnection);
  const pollLoading = useUnit(pollModel.$pollLoading);
  const poll = useUnit(pollModel.$poll);

  const { $isOpened, close, open } = modalModel;

  const isOpened = useUnit($isOpened);

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

  if (pollLoading || Object.keys(poll).length === 0) {
    return <Loader />;
  }

  console.log(poll);

  return (
    <>
      <Modal isOpened={isOpened} close={close} />
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
              <ClipboardDocumentIcon
                className="ml-10 h-10 w-10"
                fill="#ec4899"
              />
            </Button>
          </div>
        </div>
        <div className="mx-auto flex w-1/2 justify-between">
          <Button
            className="flex-col"
            onClick={() => {
              open();
            }}
          >
            <UserGroupIcon className="h-10 w-10" fill="#f97316" />
            <p>{Object.keys(poll.voters).length}</p>
          </Button>
          <Button className="flex-col">
            <PencilSquareIcon className="h-10 w-10" fill="#ec4899" />
            <p>{Object.keys(poll.voters).length}</p>
          </Button>
        </div>
        <div>
          <Button>button</Button>
        </div>
      </div>
    </>
  );
};
