import { useTranslation } from "next-i18next";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Button, InputField, Toggle } from "ui";

interface Props extends React.HTMLProps<HTMLFormElement> {}

export const SignInForm: React.FC<Props> = (props) => {
  const { className, ...rest } = props;
  const { t } = useTranslation();

  return (
    <form {...rest} className={twMerge(className)}>
      <InputField
        label={t("sign-in:username.label")}
        type="email"
        placeholder={t("sign-in:username.placeholder") || ""}
        name="email"
      />
      <InputField
        label={t("sign-in:password.label")}
        type="password"
        placeholder={t("sign-in:password.placeholder") || ""}
        name="password"
      />

      <div className="flex items-center justify-between">
        <Toggle label={t("sign-in:remember")} />
      </div>

      <Button
        type="submit"
        text={t("sign-in:button")}
        className="w-full mt-4"
      />
    </form>
  );
};
