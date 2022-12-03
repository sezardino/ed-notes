import { Button, ButtonProps } from "./Button";
import { ModalProps, ModalWindow } from "./ModalWindow";
import { Typography } from "./Typography";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<ModalProps, "sizing"> {
  title: string;
  info: string;
  confirmButton: ButtonProps;
  declineButton: ButtonProps;
}

export const ConfirmModal: React.FC<Props> = (props) => {
  const { title, info, confirmButton, declineButton, className, ...rest } =
    props;

  const declineProps: ButtonProps = {
    variant: "dark",
    size: "xl",
    ...declineButton,
  };

  const confirmProps: ButtonProps = {
    variant: "red",
    size: "xl",
    ...confirmButton,
  };

  const defaultHandler = (cb?: () => void) => {
    props.closeHandler();

    if (cb) cb();
  };

  return (
    <ModalWindow {...rest} className={twMerge(className)}>
      <div className="text-center grid gap-6">
        <Typography tag="h2" styling="h2" text={title} />
        <Typography styling="leading" text={info} />
        <div className="flex flex-wrap gap-7 justify-center">
          <Button
            {...declineProps}
            onClick={() => defaultHandler(declineProps.onClick)}
          />
          <Button
            {...confirmProps}
            onClick={() => defaultHandler(declineProps.onClick)}
          />
        </div>
      </div>
    </ModalWindow>
  );
};
