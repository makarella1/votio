import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { pollModel } from "@entities/poll/model";
import { FlexBox } from "@shared/ui/flex-box";
import { useUnit } from "effector-react";
import React from "react";

export const VotingPage = () => {
  const poll = useUnit(pollModel.$poll);

  const [ids, setIds] = React.useState(Object.keys(poll.nominations));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // return (
  //   <div className="flex h-3/4 w-full flex-col justify-between text-center">
  //     <div className="flex flex-col gap-4">
  //       {Object.entries(poll.nominations).map(([id, nomination]) => (
  //         <FlexBox className="cursor-grab bg-white" key={id}>
  //           <p>{nomination.text}</p>
  //         </FlexBox>
  //       ))}
  //     </div>
  //   </div>
  // );

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {/* {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))} */}
      </SortableContext>
    </DndContext>
  );
};
