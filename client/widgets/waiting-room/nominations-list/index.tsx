import { userModel } from "@entities/user/model";
import { Me } from "@entities/user/model/types";
import { removeNominationModel } from "@features/user/admin/remove-nomination/model";
import { TrashIcon } from "@heroicons/react/24/solid";
import { FlexBox } from "@shared/ui/flex-box";
import { useUnit } from "effector-react";
import { Poll } from "shared";

interface NominationsListProps {
  nominations: Poll["nominations"];
  me: Me;
}

export const NominationsList = ({ nominations, me }: NominationsListProps) => {
  const userConnection = useUnit(userModel.$userConnection);

  return (
    <div className="flex flex-col gap-4 pb-10">
      {Object.entries(nominations).map(([id, { text, userId }]) => (
        <FlexBox
          key={id}
          emphasize={me.id === userId}
          reverse={me.id === userId}
        >
          <p>{text}</p>
          {me.isAdmin && (
            <button
              className="rounded-full border border-primary p-2 shadow-lg"
              onClick={async () => {
                await removeNominationModel.removeFx({
                  // @ts-expect-error bad typings for sockets
                  socket: userConnection.socket,
                  nominationId: id,
                });
              }}
            >
              <TrashIcon className="h-6 w-6 text-primary" />
            </button>
          )}
        </FlexBox>
      ))}
    </div>
  );
};
