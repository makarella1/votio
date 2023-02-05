import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { copyToClipboard } from "@shared/lib/copy-to-clipboard";
import { Button } from "@shared/ui/button";
import { ColorizedText } from "@shared/ui/colorized-text";
import { useUnit } from "effector-react";
import React from "react";

export const WaitingRoom = () => {
  const userConnection = useUnit(userModel.$userConnection);
  const poll = useUnit(pollModel.$poll);

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

  return (
    <div className="flex flex-col gap-10 text-center">
      <div>
        <h2 className="mb-2 text-3xl font-bold">Poll Topic:</h2>
        <span className="text-xl italic">{poll?.topic}</span>
      </div>
      <div>
        <div className="mb-3">
          <h2 className="mb-3 text-3xl font-bold">Poll ID:</h2>
          <span className="text-xl italic">Copy and Share!</span>
        </div>
        {poll && (
          <Button
            variant="primary-outlined"
            className="mx-auto hover:bg-transparent"
            onClick={async () => {
              await copyToClipboard(poll.id);
            }}
          >
            <ColorizedText text={poll.id} />
            <ClipboardDocumentIcon className="h-10 w-10" fill="#ec4899" />
          </Button>
        )}
      </div>
    </div>
  );
};
