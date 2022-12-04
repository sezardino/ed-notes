import React from "react";
import { useTranslation } from "react-i18next";
import { AuthRoutes, IAuthDto } from "shared";
import { Button, Typography } from "ui";

import { SignUpForm } from "@/components/modules/auth/SignUpForm";

interface Props {
  signUpHandler: (dto: IAuthDto) => void;
}

export const SignUp: React.FC<Props> = (props) => {
  const { signUpHandler } = props;
  const { t } = useTranslation("page-sign-up");

  return (
    <>
      <Typography tag="h1" styling="h4">
        {t("title")}
      </Typography>
      <SignUpForm submitHandler={signUpHandler} />
      <Typography styling="p" className="mt-4">
        {t("cta.text")}{" "}
        <Button text={t("cta.link")} variant="link" href={AuthRoutes.SingIn} />
      </Typography>
    </>
  );
};
