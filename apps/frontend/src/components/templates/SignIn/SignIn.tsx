import React from "react";
import { useTranslation } from "react-i18next";
import { AuthInput, AuthRoutes } from "shared";
import { Button, Typography } from "ui";

import { SignInForm } from "@/components/modules/auth/SignInForm";

interface Props {
  signInHandler: (dto: AuthInput) => void;
}

export const SignIn: React.FC<Props> = (props) => {
  const { signInHandler } = props;
  const { t } = useTranslation("page-sign-in");

  return (
    <>
      <Typography tag="h1" styling="h4">
        {t("title")}
      </Typography>
      <SignInForm submitHandler={signInHandler} />
      <Typography styling="p" className="mt-4">
        {t("cta.text")}{" "}
        <Button text={t("cta.link")} variant="link" href={AuthRoutes.SingUP} />
      </Typography>
    </>
  );
};
