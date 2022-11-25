import React from "react";
import { useTranslation } from "react-i18next";
import { AuthRoutes, IAuthDto } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, Typography } from "ui";

import { SignUpForm } from "@/components/auth/SignUpForm";

interface Props {
  signUpHandler: (dto: IAuthDto) => void;
}

export const SignUp: React.FC<Props> = (props) => {
  const { signUpHandler } = props;
  const { t } = useTranslation();

  return (
    <>
      <Typography tag="h1" styling="h4">
        {t("sign-up:title")}
      </Typography>
      <SignUpForm submitHandler={signUpHandler} />
      <Typography styling="p" className="mt-4">
        {t("sign-up:cta.text")}{" "}
        <Button
          text={t("sign-up:cta.link")}
          variant="link"
          href={AuthRoutes.SingIn}
        />
      </Typography>
    </>
  );
};
