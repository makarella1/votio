import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { closePollModel } from "@features/user/admin/close-poll";
import { leaveModel } from "@features/user/leave";
import { Button } from "@shared/ui/button";
import { Loader } from "@shared/ui/loader";
import { useUnit } from "effector-react";

export const ResultsPage = () => {
  const poll = useUnit(pollModel.$poll);
  const me = useUnit(userModel.$me);
  const userConnection = useUnit(userModel.$userConnection);

  if (!me.id || Object.keys(poll).length === 0) {
    return <Loader />;
  }

  if (Object.keys(poll.results).length > 0) {
    return (
      <div className="flex h-3/4 w-full flex-col justify-between text-center">
        <h2 className="mb-4 text-center text-4xl font-black">Results</h2>
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
