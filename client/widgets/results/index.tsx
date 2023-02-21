import { userModel } from "@entities/user/model";
import { Me } from "@entities/user/model/types";
import { closePollModel } from "@features/user/admin/close-poll";
import { leaveModel } from "@features/user/leave";
import { Button } from "@shared/ui/button";
import { useUnit } from "effector-react";
import { Poll } from "shared";

interface ResultsPage {
  poll: Poll;
  me: Me;
}

export const Results = ({ poll, me }: ResultsPage) => {
  const userConnection = useUnit(userModel.$userConnection);

  if (Object.keys(poll.results).length > 0) {
    return (
      <div className="flex h-3/4 w-full flex-col justify-between text-center">
        <div>
          <h2 className="mb-1 text-4xl font-black">Results</h2>
          <h3 className="text-3xl font-bold">{poll.topic}</h3>
        </div>
        <div>
          <div className="grid grid-cols-3 items-center border-b py-4">
            <p className="col-span-2 text-left font-bold">Candidate</p>
            <p className="col-span-1 text-right font-bold">Score</p>
          </div>
          {poll.results.map((result) => (
            <div
              className="grid grid-cols-3 items-center border-b py-2"
              key={result.nominationId}
            >
              <p className="col-span-2 text-left">{result.nominationText}</p>
              <p className="col-span-1 text-right" key={result.nominationId}>
                {result.score.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <Button
          variant="primary"
          onClick={() => {
            // @ts-expect-error bad typings for sockets
            leaveModel.leaveFx(userConnection.socket);
          }}
        >
          Leave Poll
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-3/4 w-full flex-col justify-evenly text-center">
        <div className="text-2xl">
          <span className="text-3xl font-bold text-primary">
            {Object.keys(poll.rankings).length}
          </span>{" "}
          of{" "}
          <span className="text-3xl font-bold text-secondary">
            {Object.keys(poll.voters).length}
          </span>{" "}
          participants have already voted
        </div>

        {!me.isAdmin && (
          <p className="text-xl">
            Waiting for the admin,{" "}
            <span className="font-bold">{poll.voters[poll.adminId]}</span>, to
            finish the poll
          </p>
        )}

        {me.isAdmin && (
          <Button
            variant="secondary"
            className="mb-2 w-full"
            onClick={() => {
              // @ts-expect-error bad typings for sockets
              closePollModel.closeFx(userConnection.socket);
            }}
          >
            Close Poll
          </Button>
        )}
      </div>
    </>
  );
};
