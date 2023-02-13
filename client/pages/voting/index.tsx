import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { Button } from "@shared/ui/button";
import { FlexBox } from "@shared/ui/flex-box";
import { Loader } from "@shared/ui/loader";
import clsx from "clsx";
import { useUnit } from "effector-react";
import React from "react";

const SortableItem = ({
  id,
  children,
  disabled,
}: { id: string; disabled: boolean } & React.PropsWithChildren) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export const VotingPage = () => {
  const poll = useUnit(pollModel.$poll);
  const userConnection = useUnit(userModel.$userConnection);
  const me = useUnit(userModel.$me);

  const [ids, setIds] = React.useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      setIds((prevIds) => {
        const oldIndex = ids.indexOf(active.id.toString());
        const newIndex = ids.indexOf(over.id.toString());

        return arrayMove(prevIds, oldIndex, newIndex);
      });
    }
  };

  React.useEffect(() => {
    if (poll.rankings?.[me.id as string]) {
      setIds(poll.rankings[me.id as string]);
    } else if (poll.nominations) {
      setIds(Object.keys(poll.nominations));
    }
  }, [poll.rankings?.[me.id as string], poll.nominations]);

  if (Object.keys(poll).length === 0 || !me.id) {
    return <Loader />;
  }

  return (
    <div className="flex h-3/4 w-full flex-col text-center">
      <div className="mb-10">
        <h3 className="text-3xl font-black">
          Select Your Top {poll.votesPerVoter} Choices
        </h3>
        <h4 className="mb-4 text-xl font-black">
          Drag n Drop Your Favorite Options To the Top
        </h4>
        <p>
          Your first pick weighs the most, the second one weighs a little bit
          less... You got the point, choose carefully!
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {ids.map((id, index) => (
              <SortableItem
                key={id}
                id={id}
                disabled={!!poll.rankings[me.id as string]}
              >
                <FlexBox className="cursor-grab bg-white">
                  <p>{poll.nominations[id].text}</p>
                  {poll.votesPerVoter > index && (
                    <p
                      className={clsx(
                        "flex h-6 w-6 items-center justify-center rounded-full text-white",
                        (index + 1) % 2 === 0 && "bg-primary",
                        (index + 1) % 2 !== 0 && "bg-secondary",
                      )}
                    >
                      {index + 1}
                    </p>
                  )}
                </FlexBox>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <Button
        className="mt-auto"
        variant="primary"
        onClick={() => {
          const rankings = Array.from(
            { length: poll.votesPerVoter - 1 },
            (_, index) => ids[index],
          );

          console.log(rankings);

          userConnection.socket?.emit("add_rankings", {
            rankings,
          });
        }}
        disabled={!!poll.rankings[me.id]}
      >
        Submit Votes
      </Button>
    </div>
  );
};
