import clsx from "clsx";
import React from "react";

interface FlexBoxProps extends React.ComponentPropsWithRef<"div"> {
  reverse?: boolean;
  emphasize?: boolean;
}

export const FlexBox = ({
  reverse,
  children,
  emphasize,
  className,
  ...props
}: FlexBoxProps) => (
  <div
    className={clsx(
      "w-full rounded-xl border-2 p-4",
      !emphasize && "border-black",
      emphasize && "border-secondary shadow-lg",
      className,
    )}
    {...props}
  >
    <div
      className={clsx(
        "flex items-center justify-between font-bold",
        reverse && "flex-row-reverse",
      )}
    >
      {children}
    </div>
  </div>
);
