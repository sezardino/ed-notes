import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ConfirmModal, ConfirmModalProps } from "ui";

interface Props
  extends Omit<
    ConfirmModalProps,
    "title" | "info" | "declineButton" | "confirmButton"
  > {}

export const DeleteNoteModal: React.FC<Props> = (props) => {
  const { t } = useTranslation("modal-delete-note");

  const declineButton = useMemo(
    () => ({
      text: t("decline"),
    }),
    [t]
  );

  const confirmButton = useMemo(
    () => ({
      text: t("accept"),
    }),
    [t]
  );

  return (
    <ConfirmModal
      {...props}
      sizing="sm"
      title={t("title")}
      info={t("info")}
      declineButton={declineButton}
      confirmButton={confirmButton}
    />
  );
};
