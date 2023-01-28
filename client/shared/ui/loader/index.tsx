import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";

const spinnerStyle: CSSProperties = {
  margin: "auto",
  background: "transparent",
  display: "block",
  shapeRendering: "auto",
};

const Spinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    preserveAspectRatio="xMidYMid"
    style={spinnerStyle}
    viewBox="0 0 100 100"
  >
    <g>
      <path
        fill="none"
        stroke="#1d0e0b"
        strokeWidth="12"
        d="M50 18a32 32 0 1 0 22.627 9.373"
      />
      <path fill="#1d0e0b" d="M49 6v24l12-12L49 6" />
      <animateTransform
        attributeName="transform"
        dur="0.6896551724137931s"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 50 50;360 50 50"
      />
    </g>
  </svg>
);

export const Loader = () => (
  <>
    {ReactDOM.createPortal(
      <div className="absolute top-0 left-0 flex h-full w-full bg-black opacity-70" />,
      document.getElementById("loader") as HTMLElement,
    )}
    {ReactDOM.createPortal(
      <div className="absolute top-1/2 mx-auto w-full -translate-y-1/2">
        <Spinner />
      </div>,
      document.getElementById("loader") as HTMLElement,
    )}
  </>
);
