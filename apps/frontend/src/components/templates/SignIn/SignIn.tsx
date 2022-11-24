import React from "react";
import { useTranslation } from "react-i18next";
import { AuthRoutes } from "shared";
import { Button, Typography } from "ui";

import { SignInForm } from "@/components/auth/SignInForm";

interface Props {}

export const SignIn: React.FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography tag="h1" styling="h4">
        {t("sign-in:title")}
      </Typography>
      <SignInForm />
      <Typography styling="p" className="mt-4">
        {t("sign-in:cta.text")}{" "}
        <Button
          text={t("sign-in:cta.link")}
          variant="link"
          href={AuthRoutes.SingUP}
        />
      </Typography>
    </>
  );
};
