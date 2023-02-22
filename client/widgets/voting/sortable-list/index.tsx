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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { userModel } from "@entities/user/model";
import { Me } from "@entities/user/model/types";
import { Button } from "@shared/ui/button";
import { FlexBox } from "@shared/ui/flex-box";
import clsx from "clsx";
import { useUnit } from "effector-react";
import React from "react";
import { Poll } from "shared";

import { SortableItem } from "../sortable-item";

interface SortableListProps {
  poll: Poll;
  me: Me;
}

export const SortableList = ({ poll, me }: SortableListProps) => {
  const [ids, setIds] = React.useState(Object.keys(poll.nominations));
  const userConnection = useUnit(userModel.$userConnection);

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

  return (
    <>
      <div className="flex h-2/3 flex-col gap-4 overflow-auto sm:h-1/2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {ids.map((id, index) => {
              return (
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
              );
            })}
          </SortableContext>
        </DndContext>
      </div>

      <Button
        variant="primary"
        className="mt-auto w-full"
        onClick={() => {
          const rankings = Array.from(
            { length: Object.keys(poll.nominations).length },
            (_, index) => ids[index],
          );

          userConnection.socket?.emit("add_rankings", {
            rankings,
          });
        }}
      >
        Submit Votes
      </Button>
    </>
  );
};
