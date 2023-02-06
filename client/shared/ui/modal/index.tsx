import { XCircleIcon } from "@heroicons/react/24/solid";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpened: boolean;
  open?: () => void;
  close?: () => void;
}

type ModalViewProps = Pick<ModalProps, "close">;

const ModalView = ({ close }: ModalViewProps) => (
  <>
    {ReactDOM.createPortal(
      <div
        className="absolute top-0 left-0 h-full w-full bg-black opacity-70"
        onClick={close}
      />,
      document.getElementById("modal") as HTMLElement,
    )}
    {ReactDOM.createPortal(
      <div className="absolute right-1/2 top-1/2 h-[700px] w-[1200px] -translate-y-1/2 translate-x-1/2 animate-appear rounded-xl bg-white">
        <button onClick={close}>
          <XCircleIcon className="absolute right-10 top-8 h-10 w-10" />
        </button>
      </div>,
      document.getElementById("modal") as HTMLElement,
    )}
  </>
);

export const Modal = ({ isOpened, close }: ModalProps) =>
  isOpened ? <ModalView close={close} /> : null;
