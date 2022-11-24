import React from "react";
import { useTranslation } from "react-i18next";
import { AuthRoutes } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, Typography } from "ui";

import { SignUpForm } from "@/components/auth/SignUpForm";

interface Props {}

export const SignUp: React.FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography tag="h1" styling="h4">
        {t("sign-up:title")}
      </Typography>
      <SignUpForm />
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
