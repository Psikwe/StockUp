import classNames from "classnames";
import React, { ReactNode } from "react";

type IProp = {
  type?: "button" | "reset" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: ReactNode | string;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  attr?: any;
};

export const Button = ({ ...prop }: IProp) => {
  prop.loading ??= false;
  prop.disabled ??= false;

  return (
    <>
      <button
        disabled={prop.disabled}
        onClick={prop.onClick}
        type={prop.type ?? "button"}
        data-te-ripple-init
        data-te-ripple-color="light"
        className={classNames(
          "mtn-button rounded-md p-2 text-sm",
          prop.className,
          {
            "bg-green-400 text-black": !prop.className?.includes(" bg-"),
          }
        )}
        {...prop.attr}
      >
        {prop.loading ? <span className="animate-spin"></span> : prop.label}
      </button>
    </>
  );
};
