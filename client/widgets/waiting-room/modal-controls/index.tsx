import { PencilSquareIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Button } from "@shared/ui/button";
import { Event } from "effector";

interface ModalControlsProps {
  votersCount: number;
  nominationsCount: number;
  openVotersModal: Event<void>;
  openNominationsModal: Event<void>;
}

export const ModalControls = ({
  votersCount,
  nominationsCount,
  openNominationsModal,
  openVotersModal,
}: ModalControlsProps) => (
  <div className="mx-auto flex w-5/6 justify-between sm:w-1/2">
    <Button
      className="flex-col"
      onClick={() => {
        openVotersModal();
      }}
    >
      <UserGroupIcon className="h-10 w-10" fill="#f97316" />
      <p>{votersCount}</p>
    </Button>
    <Button
      className="flex-col"
      onClick={() => {
        openNominationsModal();
      }}
    >
      <PencilSquareIcon className="h-10 w-10" fill="#ec4899" />
      <p>{nominationsCount}</p>
    </Button>
  </div>
);
