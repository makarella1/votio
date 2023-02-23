import { userModel } from "@entities/user/model";
import { Me } from "@entities/user/model/types";
import { removeVoterModel } from "@features/user/admin/remove-voter/model";
import { UserMinusIcon } from "@heroicons/react/24/solid";
import { FlexBox } from "@shared/ui/flex-box";
import { Poll } from "@votio/shared";
import { useUnit } from "effector-react";

interface VotersListProps {
  voters: Poll["voters"];
  me: Me;
}

export const VotersList = ({ voters, me }: VotersListProps) => {
  const userConnection = useUnit(userModel.$userConnection);

  return (
    <div className="flex flex-col gap-4 pb-10">
      {Object.entries(voters).map(([id, voter]) => (
        <FlexBox key={id} emphasize={me.id === id} reverse={me.id === id}>
          <p>{voter}</p>
          {me.isAdmin && me.id !== id && (
            <button
              className="rounded-full border border-primary p-2 shadow-lg"
              onClick={async () => {
                await removeVoterModel.removeFx({
                  // @ts-expect-error bad typings for sockets
                  socket: userConnection.socket,
                  voterId: id,
                });
              }}
            >
              <UserMinusIcon className="h-6 w-6 text-primary" />
            </button>
          )}
        </FlexBox>
      ))}
    </div>
  );
};
