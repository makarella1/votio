import { XCircleIcon } from "@heroicons/react/24/solid";
import ReactDOM from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  isOpened: boolean;
  open?: () => void;
  close?: () => void;
}

type ModalViewProps = Pick<ModalProps, "close"> & React.PropsWithChildren;

const ModalView = ({ close, children }: ModalViewProps) => (
  <>
    {ReactDOM.createPortal(
      <div
        className="absolute top-0 left-0 h-full w-full bg-black opacity-70"
        onClick={close}
      />,
      document.getElementById("modal") as HTMLElement,
    )}
    {ReactDOM.createPortal(
      <div className="absolute bottom-0 h-[80vh] w-screen animate-appear overflow-y-auto bg-white">
        <button onClick={close}>
          <XCircleIcon className="absolute right-5 top-2 h-10 w-10 sm:top-8 sm:right-10" />
        </button>
        <div className="mx-auto w-5/6 sm:w-1/2">{children}</div>
      </div>,
      document.getElementById("modal") as HTMLElement,
    )}
  </>
);

export const BottomSheetModal = ({ isOpened, close, children }: ModalProps) =>
  isOpened ? <ModalView close={close}>{children}</ModalView> : null;
